const VARIANT = /\.(jpg|jpeg|png|svg|webp)$/;

/**
 * One image, served as AVIF then WebP, at the width the device actually needs.
 *
 * The variants are the files `scripts/optimize-images.mjs` writes next to the
 * source (`usage-evjf.jpg` → `usage-evjf-480.webp`, `-1040.avif`…), because the
 * Workers deployment has no image optimizer and `next/image` has nothing to
 * call. Adding a width here means adding it to that script and re-running it.
 *
 * The WebP is the `<img src>` rather than the original: every browser that can
 * run this site reads WebP, and the sources are 5 to 20 times heavier.
 *
 * `sizes` is not optional. With `w` descriptors and no `sizes`, a browser
 * assumes the image fills the viewport and downloads the largest variant on a
 * phone - the opposite of the point.
 */
export function Picture({
  src,
  alt,
  widths,
  sizes,
  avif = true,
  priority = false,
  className,
  style,
  width,
  height,
}: {
  /** The source file as it sits in public/, e.g. "/assets/usecases/usage-evjf.jpg". */
  src: string;
  alt: string;
  /** Generated widths, ascending. The last one is the fallback `src`. */
  widths: number[];
  sizes: string;
  avif?: boolean;
  /** Above the fold: fetched eagerly and early. */
  priority?: boolean;
  className?: string;
  style?: React.CSSProperties;
  width?: number;
  height?: number;
}) {
  const base = src.replace(VARIANT, "");
  const variant = (w: number, format: string) => `${base}-${w}.${format}`;
  const srcSet = (format: string) =>
    widths.map((w) => `${variant(w, format)} ${w}w`).join(", ");

  return (
    <picture>
      {avif ? <source type="image/avif" srcSet={srcSet("avif")} sizes={sizes} /> : null}
      <img
        src={variant(widths[widths.length - 1], "webp")}
        srcSet={srcSet("webp")}
        sizes={sizes}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
        width={width}
        height={height}
        className={className}
        style={style}
      />
    </picture>
  );
}
