import type { DecorItem } from "@/lib/decor";

/**
 * The tool icons drifting behind a section. Purely decorative, so the whole
 * layer is aria-hidden and non-interactive; the parent section clips it.
 */
export function Decor({ items }: { items: DecorItem[] }) {
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
      {items.map((d, i) => (
        <img
          key={`${d.i}-${i}`}
          src={`/assets/tools/${d.i}.png`}
          alt=""
          data-float=""
          style={
            {
              position: "absolute",
              left: d.l,
              right: d.r,
              top: d.t,
              bottom: d.b,
              width: d.s,
              height: d.s,
              opacity: d.o,
              rotate: `${d.rot}deg`,
              "--yq-amp": `${d.amp}px`,
              "--yq-dur": d.dur,
              "--yq-lag": d.lag,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
