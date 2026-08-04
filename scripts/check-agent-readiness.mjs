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

async function check() {
  const { child, origin } = await startNextServer("start");

  try {
    const sitemap = await fetch(`${origin}/sitemap.xml`);
    assert(sitemap.ok, "sitemap.xml is unavailable");
    const paths = pathsFromSitemap(await sitemap.text());
    assert(paths.length > 0, "sitemap.xml contains no pages");

    for (const pathname of paths) {
      const html = await fetch(new URL(pathname, origin), {
        headers: { Accept: "text/html" },
      });
      assert(html.ok, `${pathname} HTML returned ${html.status}`);
      assert(
        html.headers.get("content-type")?.startsWith("text/html"),
        `${pathname} did not default to HTML`,
      );
      assert(
        html.headers.get("vary")?.toLowerCase().includes("accept"),
        `${pathname} HTML response does not vary on Accept`,
      );

      const markdown = await fetch(new URL(pathname, origin), {
        headers: { Accept: "text/markdown" },
      });
      const body = await markdown.text();
      assert(markdown.ok, `${pathname} Markdown returned ${markdown.status}`);
      assert(
        markdown.headers.get("content-type")?.startsWith("text/markdown"),
        `${pathname} did not return text/markdown`,
      );
      assert(
        markdown.headers.get("vary")?.toLowerCase().includes("accept"),
        `${pathname} Markdown response does not vary on Accept`,
      );
      assert(body.startsWith("---\n"), `${pathname} Markdown has no frontmatter`);
      assert(!body.includes("<!DOCTYPE html>"), `${pathname} returned HTML instead of Markdown`);
    }

    const homepage = await fetch(origin);
    assert(
      homepage.headers.get("link")?.includes('</llms.txt>; rel="describedby"'),
      "Homepage has no describedby Link header",
    );

    const rejectedMarkdown = await fetch(origin, {
      headers: { Accept: "text/markdown;q=0, text/html" },
    });
    assert(
      rejectedMarkdown.headers.get("content-type")?.startsWith("text/html"),
      "An explicitly rejected Markdown representation was returned",
    );

    const llms = await fetch(`${origin}/llms.txt`);
    const llmsBody = await llms.text();
    assert(llms.ok && llmsBody.startsWith("# Yatu\n"), "llms.txt is unavailable or invalid");

    const privatePage = await fetch(`${origin}/bienvenue`, {
      headers: { Accept: "text/markdown" },
    });
    assert(
      privatePage.headers.get("content-type")?.startsWith("text/html"),
      "The non-indexable bienvenue page was exposed as Markdown",
    );

    process.stdout.write(`Agent readiness checks passed for ${paths.length} pages.\n`);
  } finally {
    await stopNextServer(child);
  }
}

await check();
