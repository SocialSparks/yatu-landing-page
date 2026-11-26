/** Styles used by the vitrine and by the public campaign Worker. */
export const GO_CSS = `
.yq-go-page{--ease-standard:cubic-bezier(.2,.8,.2,1);--shadow-card:0 4px 16px rgba(0,0,0,.06);box-sizing:border-box}
.yq-go-page .yq-go-campaign-actions{color:#fff;font:400 14px/1.5 var(--font-ui,Lato),system-ui,sans-serif}
.yq-go-page .yq-go-campaign-actions p{margin:0 0 8px}
.yq-go-page .yq-go-campaign-actions p:last-child{margin-bottom:0}
.yq-go-page .yq-go-campaign-actions a{color:inherit;text-underline-offset:3px}
.yq-go-page .yq-go-campaign-actions b{overflow-wrap:anywhere}
.yq-go-static [data-float]{opacity:var(--yq-o,1);animation:yq-go-float var(--yq-dur,5s) ease-in-out var(--yq-lag,0s) infinite alternate}
@keyframes yq-go-float{
  from{translate:0 calc(var(--yq-amp,8px)*-1)}
  to{translate:0 var(--yq-amp,8px)}
}
@media(prefers-reduced-motion:reduce){
  .yq-go-page .yq-go-row,.yq-go-page .yq-go-arrow,.yq-go-page .yq-store-badge,.yq-go-static [data-float]{animation:none;transition:none}
}
/* --------------------- /go: the link-in-bio rows -------------------- */

/* The surface lives here rather than inline, unlike most of this site: an
   inline background beats a stylesheet rule, so a card that paints itself
   white in its style attribute can never be repainted by a :hover. That is
   why .yq-btn-light only ever lifts the cards that use it. These rows are the
   whole point of the page, so they get a hover that actually answers. */
.yq-go-row {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px;
  background: #ffffff;
  border: 1px solid #ebe7de;
  border-radius: 20px;
  text-decoration: none;
  box-shadow: var(--shadow-card);
  translate: 0 0;
  transition:
    background 200ms var(--ease-standard),
    border-color 200ms var(--ease-standard),
    translate 200ms var(--ease-standard),
    box-shadow 200ms var(--ease-standard);
}

.yq-go-row:hover {
  border-color: #dcd6cb;
  translate: 0 -2px;
  box-shadow: 0 10px 26px rgba(42, 52, 61, 0.13);
}

.yq-go-row:active {
  translate: 0 0;
  box-shadow: var(--shadow-card);
}

.yq-go-arrow {
  transition: transform 200ms var(--ease-standard);
}

.yq-go-row:hover .yq-go-arrow {
  transform: translateX(3px);
}

.yq-go-row.yq-shimmer-border {
  animation: yq-shimmer-border 1.5s ease-in-out infinite alternate;
}

@keyframes yq-shimmer-border {
  0% {
    border-color: rgba(254, 216, 115, 0.4);
    box-shadow: 0 0 2px rgba(254, 216, 115, 0.2), var(--shadow-card);
  }
  100% {
    border-color: #fed873;
    box-shadow: 0 0 12px rgba(254, 216, 115, 0.8), var(--shadow-card);
  }
}

/* The ink card holding the store buttons. The global focus ring is ink too, so on this
   background it would be a dark outline on a dark panel - the brand yellow is
   the one colour that reads against both the card and the white field. */
.yq-go-cta :focus-visible {
  outline-color: #fed873;
}

.yq-go-legal {
  transition: color 200ms var(--ease-standard);
}

.yq-go-legal:hover {
  color: #2a343d;
}

`;

export const STORE_BADGES_CSS = `
/* Official store artwork, kept undistorted inside two strictly equal slots. */
.yq-store-badges {
  width: 100%;
  max-width: 390px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: clamp(8px, 2vw, 12px);
}

.yq-store-badges[data-layout="column"] {
  max-width: 190px;
  flex-direction: column;
  align-items: stretch;
}

.yq-store-badges[data-layout="column"] .yq-store-badge {
  width: 100%;
  flex: none;
}

.yq-store-badge {
  flex: 1 1 0;
  min-width: 0;
  aspect-ratio: 239 / 71;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9px;
  text-decoration: none;
  transition:
    translate 180ms var(--ease-standard),
    filter 180ms var(--ease-standard);
}

.yq-store-badge img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: contain;
}

.yq-store-badge:hover {
  translate: 0 -2px;
  filter: drop-shadow(0 7px 10px rgba(42, 52, 61, 0.2));
}

.yq-store-badge:active {
  translate: 0 0;
}

`;
