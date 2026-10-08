import {parse} from "node-html-parser";
import {startNextServer, stopNextServer} from "./agent-server.mjs";

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function pathsFromSitemap(xml) {
  return parse(xml)
    .querySelectorAll("loc")
    .map((element) => new URL(element.text.trim()).pathname);
}

/**
 * The agent contract, checked against a production build:
 * - every indexable page announces its Markdown copy with
 *   <link rel="alternate" type="text/markdown">, and that copy exists;
 * - a client that asks for Markdown still gets the page, never a 404. Content
 *   negotiation used to live in a middleware whose rewrite never reached the
 *   static files once deployed: every such request got the HTML 404 page,
 *   rendered by the Worker at several times the cost of a cached page;
 * - /llms.txt lists every page with its Markdown copy;
 * - the homepage points at /llms.txt with a Link header.
 *
 * The charset and noindex headers of the copies come from public/_headers,
 * which only Cloudflare applies: `next start` cannot check them, use
 * `npm run preview` for that.
 */
async function check() {
  const { child, origin } = await startNextServer("start");

  try {
    const sitemap = await fetch(`${origin}/sitemap.xml`);
    assert(sitemap.ok, "sitemap.xml is unavailable");
    const paths = pathsFromSitemap(await sitemap.text());
    assert(paths.length > 0, "sitemap.xml contains no pages");

    const copies = [];
    for (const pathname of paths) {
      const html = await fetch(new URL(pathname, origin), {
        headers: { Accept: "text/html" },
      });
      assert(html.ok, `${pathname} HTML returned ${html.status}`);
      assert(
        html.headers.get("content-type")?.startsWith("text/html"),
        `${pathname} did not return HTML`,
      );

      const alternate = parse(await html.text())
        .querySelector('link[rel="alternate"][type="text/markdown"]')
        ?.getAttribute("href");
      assert(alternate, `${pathname} does not link to its Markdown copy`);

      const copyPath = new URL(alternate).pathname;
      const markdown = await fetch(new URL(copyPath, origin));
      const body = await markdown.text();
      assert(markdown.ok, `${pathname} Markdown copy ${copyPath} returned ${markdown.status}`);
      assert(body.startsWith("---\n"), `${copyPath} has no frontmatter`);
      assert(!body.includes("<!DOCTYPE html>"), `${copyPath} contains HTML`);
      copies.push(copyPath);

      const asked = await fetch(new URL(pathname, origin), {
        headers: { Accept: "text/markdown, text/html;q=0.9, */*;q=0.8" },
      });
      assert(asked.ok, `${pathname} returned ${asked.status} to a client asking for Markdown`);
    }

    const homepage = await fetch(origin);
    assert(
      homepage.headers.get("link")?.includes('</llms.txt>; rel="describedby"'),
      "Homepage has no describedby Link header",
    );

    const llms = await fetch(`${origin}/llms.txt`);
    const llmsBody = await llms.text();
    assert(llms.ok && llmsBody.startsWith("# Yatu\n"), "llms.txt is unavailable or invalid");
    for (const copyPath of copies) {
      assert(llmsBody.includes(`${copyPath})`), `llms.txt does not list ${copyPath}`);
    }

    process.stdout.write(`Agent readiness checks passed for ${paths.length} pages.\n`);
  } finally {
    await stopNextServer(child);
  }
}

await check();
