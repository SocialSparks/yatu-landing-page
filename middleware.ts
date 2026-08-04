import {NextRequest, NextResponse} from "next/server";
import {SITE_PAGES} from "@/lib/site";

const AGENT_MARKDOWN_PREFIX = "/_agent-markdown";
const INDEXABLE_PATHS = new Set(SITE_PAGES.map(({ path }) => path));
const NEXT_VARY = [
  "Accept",
  "RSC",
  "Next-Router-State-Tree",
  "Next-Router-Prefetch",
  "Next-Router-Segment-Prefetch",
].join(", ");

function explicitlyAcceptsMarkdown(accept: string | null) {
  if (!accept) return false;

  return accept.split(",").some((entry) => {
    const [mediaType, ...parameters] = entry.trim().toLowerCase().split(";");
    if (mediaType !== "text/markdown") return false;

    const quality = parameters
      .map((parameter) => parameter.trim())
      .find((parameter) => parameter.startsWith("q="));

    return quality ? Number.parseFloat(quality.slice(2)) > 0 : true;
  });
}

function markdownAssetPath(pathname: string) {
  return pathname === "/"
    ? `${AGENT_MARKDOWN_PREFIX}/index.md`
    : `${AGENT_MARKDOWN_PREFIX}${pathname}.md`;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!INDEXABLE_PATHS.has(pathname)) {
    return NextResponse.next();
  }

  if (!explicitlyAcceptsMarkdown(request.headers.get("accept"))) {
    const response = NextResponse.next();
    response.headers.set("Vary", NEXT_VARY);
    return response;
  }

  const target = request.nextUrl.clone();
  target.pathname = markdownAssetPath(pathname);
  target.search = "";

  const response = NextResponse.rewrite(target);
  response.headers.set("Content-Type", "text/markdown; charset=utf-8");
  response.headers.set("Vary", NEXT_VARY);
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
