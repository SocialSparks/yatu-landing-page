import {mkdir, rename, rm, writeFile} from "node:fs/promises";
import path from "node:path";
import {NodeHtmlMarkdown} from "node-html-markdown";
import {parse} from "node-html-parser";
import {startNextServer, stopNextServer} from "./agent-server.mjs";

const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, "public");
const OUTPUT_DIR = path.join(PUBLIC_DIR, "_agent-markdown");
const TEMP_DIR = `${OUTPUT_DIR}.tmp-${process.pid}`;
const LLMS_PATH = path.join(PUBLIC_DIR, "llms.txt");
const LLMS_TEMP_PATH = `${LLMS_PATH}.tmp-${process.pid}`;

const markdown = new NodeHtmlMarkdown({
  blockElements: ["span", "label", "button"],
  bulletMarker: "-",
  codeBlockStyle: "fenced",
  keepDataImages: false,
  useLinkReferenceDefinitions: false,
});

function sitemapPaths(xml) {
  return parse(xml)
    .querySelectorAll("loc")
    .map((element) => new URL(element.text.trim()).pathname);
}

function outputPath(pathname) {
  const relative = pathname === "/" ? "index" : pathname.replace(/^\/+|\/+$/g, "");
  return path.join(TEMP_DIR, `${relative}.md`);
}

function yamlString(value) {
  return JSON.stringify(value.replace(/\s+/g, " ").trim());
}

function pageToMarkdown(html, pathname) {
  const document = parse(html);
  const main = document.querySelector("main");
  const title = document.querySelector("title")?.text.trim();
  const description = document
    .querySelector('meta[name="description"]')
    ?.getAttribute("content")
    ?.trim();
  const canonical = document
    .querySelector('link[rel="canonical"]')
    ?.getAttribute("href")
    ?.trim();

  if (!main || !title || !description || !canonical) {
    throw new Error(`Missing main content or metadata for ${pathname}`);
  }

  for (const element of main.querySelectorAll('[aria-hidden="true"], [hidden], img[alt=""]')) {
    element.remove();
  }

  const body = markdown.translate(main.toString()).trim();
  if (!body) throw new Error(`Markdown conversion produced an empty page for ${pathname}`);

  return {
    title,
    description,
    canonical,
    contents: [
      "---",
      `title: ${yamlString(title)}`,
      `description: ${yamlString(description)}`,
      `canonical: ${yamlString(canonical)}`,
      "---",
      "",
      body,
      "",
    ].join("\n"),
  };
}

function llmsDocument(pages) {
  const home = pages.find(({ pathname }) => pathname === "/");
  if (!home) throw new Error("The sitemap does not contain the homepage");

  return [
    "# Yatu",
    "",
    `> ${home.description}`,
    "",
    "## Pages",
    "",
    ...pages.map(
      ({ title, description, canonical }) => `- [${title}](${canonical}): ${description}`,
    ),
    "",
  ].join("\n");
}

async function generate() {
  const { child, origin } = await startNextServer("dev");

  try {
    const sitemapResponse = await fetch(`${origin}/sitemap.xml`);
    if (!sitemapResponse.ok) throw new Error("Unable to read the local sitemap");

    const paths = sitemapPaths(await sitemapResponse.text());
    if (paths.length === 0) throw new Error("The local sitemap contains no pages");

    await rm(TEMP_DIR, { recursive: true, force: true });
    await mkdir(TEMP_DIR, { recursive: true });

    const pages = [];
    for (const pathname of paths) {
      const response = await fetch(new URL(pathname, origin), {
        headers: { Accept: "text/html" },
      });
      if (!response.ok) throw new Error(`${pathname} returned HTTP ${response.status}`);

      const page = pageToMarkdown(await response.text(), pathname);
      const filePath = outputPath(pathname);
      await mkdir(path.dirname(filePath), { recursive: true });
      await writeFile(filePath, page.contents, "utf8");
      pages.push({ pathname, ...page });
    }

    await writeFile(LLMS_TEMP_PATH, llmsDocument(pages), "utf8");
    await rm(OUTPUT_DIR, { recursive: true, force: true });
    await rename(TEMP_DIR, OUTPUT_DIR);
    await rename(LLMS_TEMP_PATH, LLMS_PATH);
    process.stdout.write(`Generated agent content for ${pages.length} pages.\n`);
  } finally {
    await stopNextServer(child);
    await rm(TEMP_DIR, { recursive: true, force: true });
    await rm(LLMS_TEMP_PATH, { force: true });
  }
}

await generate();
