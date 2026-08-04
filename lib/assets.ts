import fs from "node:fs";
import path from "node:path";

/**
 * Some bitmaps from the design project are larger than the 256 KiB the design
 * MCP returns in one read, so they could not be imported with the rest. The
 * components that use them try a list of candidates and fall back to a CSS
 * rendition; drop a real file into public/assets/ and it takes over with no
 * code change.
 */
export function hasAsset(publicPath: string): boolean {
  try {
    return fs.existsSync(path.join(process.cwd(), "public", publicPath));
  } catch {
    return false;
  }
}

/** First candidate that exists on disk, or null. */
export function findAsset(candidates: string[]): string | null {
  return candidates.find(hasAsset) ?? null;
}
