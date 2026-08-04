import type { DecorItem } from "@/lib/decor";

const BACKGROUND_POSITIONS: Pick<DecorItem, "l" | "r" | "t" | "b">[] = [
  { l: "2%", t: "52%" },
  { r: "2%", t: "50%" },
  { l: "7%", b: "7%" },
  { r: "7%", b: "8%" },
  { l: "20%", t: "7%" },
  { r: "20%", b: "24%" },
  { r: "27%", t: "10%" },
  { l: "29%", b: "24%" },
];

/**
 * The tool icons drifting behind a section. Purely decorative, so the whole
 * layer is aria-hidden and non-interactive; the parent section clips it.
 */
export function Decor({ items }: { items: DecorItem[] }) {
  let backgroundIndex = 0;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      {items.map((d, i) => {
        const position =
          d.o < 0.5
            ? BACKGROUND_POSITIONS[backgroundIndex++ % BACKGROUND_POSITIONS.length]
            : d;

        return (
          <img
            loading="lazy"
            decoding="async"
            key={`${d.i}-${i}`}
            src={`/assets/tools/${d.i}.svg`}
            alt=""
            data-float=""
            style={
              {
                position: "absolute",
                left: position.l,
                right: position.r,
                top: position.t,
                bottom: position.b,
                width: d.s,
                height: d.s,
                rotate: `${d.rot}deg`,
                "--yq-amp": `${d.amp}px`,
                "--yq-dur": d.dur,
                "--yq-lag": d.lag,
                "--yq-o": d.o,
              } as React.CSSProperties
            }
          />
        );
      })}
    </div>
  );
}
