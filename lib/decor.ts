/**
 * The tool icons that drift in the background of each section, transcribed
 * from Accueil.dc.html. Every section clips its own decor (`overflow:hidden`),
 * so the `calc(50% - Npx)` items deliberately sit outside the 1200px content
 * column on wide screens and disappear on narrow ones.
 */

export type DecorItem = {
  /** file name under /assets/tools */
  i: string;
  l?: string;
  r?: string;
  t?: string;
  b?: string;
  /** px */
  s: number;
  o: number;
  /** deg */
  rot: number;
  /** float amplitude, px */
  amp: number;
  dur: string;
  lag: string;
};

export const HERO_DECOR: DecorItem[] = [
  { i: "liste", l: "calc(50% - 664px)", t: "12%", s: 34, o: 0.82, rot: -10, amp: 9, dur: "6.60s", lag: "1.13s" },
  { i: "img", r: "calc(50% - 668px)", t: "8%", s: 30, o: 0.82, rot: 12, amp: 8, dur: "6.05s", lag: "0.76s" },
  { i: "planning", r: "calc(50% - 652px)", b: "12%", s: 32, o: 0.82, rot: -6, amp: 10, dur: "4.40s", lag: "1.50s" },
  { i: "heart", l: "3%", t: "9%", s: 32, o: 0.34, rot: -14, amp: 9, dur: "6.60s", lag: "1.13s" },
  { i: "ticket", r: "4%", t: "7%", s: 30, o: 0.34, rot: 11, amp: 10, dur: "4.40s", lag: "1.50s" },
  { i: "send", l: "5%", b: "8%", s: 34, o: 0.34, rot: 8, amp: 11, dur: "4.95s", lag: "1.87s" },
  { i: "bell", r: "6%", b: "6%", s: 32, o: 0.34, rot: -9, amp: 12, dur: "5.50s", lag: "0.04s" },
  { i: "people", l: "14%", b: "22%", s: 28, o: 0.34, rot: 13, amp: 13, dur: "6.05s", lag: "0.41s" },
  { i: "calendar", r: "15%", t: "24%", s: 28, o: 0.34, rot: -11, amp: 8, dur: "6.05s", lag: "0.76s" },
];

export const GALERE_DECOR: DecorItem[] = [
  { i: "chat", l: "calc(50% - 660px)", t: "16%", s: 32, o: 0.82, rot: -9, amp: 9, dur: "6.60s", lag: "1.13s" },
  { i: "budget", r: "calc(50% - 666px)", t: "22%", s: 34, o: 0.82, rot: 7, amp: 10, dur: "4.40s", lag: "1.50s" },
  { i: "documents", r: "calc(50% - 608px)", b: "14%", s: 26, o: 0.82, rot: -12, amp: 8, dur: "6.05s", lag: "0.76s" },
  { i: "ticket", r: "4%", t: "7%", s: 30, o: 0.34, rot: 11, amp: 10, dur: "4.40s", lag: "1.50s" },
  { i: "send", l: "5%", b: "8%", s: 34, o: 0.34, rot: 8, amp: 11, dur: "4.95s", lag: "1.87s" },
  { i: "bell", r: "6%", b: "6%", s: 32, o: 0.34, rot: -9, amp: 12, dur: "5.50s", lag: "0.04s" },
  { i: "people", l: "14%", b: "22%", s: 28, o: 0.34, rot: 13, amp: 13, dur: "6.05s", lag: "0.41s" },
  { i: "calendar", r: "15%", t: "24%", s: 28, o: 0.34, rot: -11, amp: 8, dur: "6.05s", lag: "0.76s" },
  { i: "pin", l: "22%", t: "5%", s: 28, o: 0.34, rot: 7, amp: 9, dur: "6.60s", lag: "1.13s" },
];

/* The right half of this section holds the two event screens, so the icons
   that sit under them stay faint. */
export const YATU_DECOR: DecorItem[] = [
  { i: "bubble", l: "calc(50% - 662px)", t: "18%", s: 32, o: 0.82, rot: -9, amp: 9, dur: "6.60s", lag: "1.13s" },
  { i: "heart", r: "calc(50% - 664px)", t: "24%", s: 30, o: 0.82, rot: 8, amp: 10, dur: "4.40s", lag: "1.50s" },
  { i: "img", l: "calc(50% - 606px)", b: "18%", s: 26, o: 0.82, rot: 12, amp: 11, dur: "4.95s", lag: "1.87s" },
  { i: "budget", r: "calc(50% - 606px)", b: "22%", s: 26, o: 0.82, rot: -12, amp: 9, dur: "6.05s", lag: "0.76s" },
  { i: "send", l: "5%", b: "8%", s: 34, o: 0.34, rot: 8, amp: 11, dur: "4.95s", lag: "1.87s" },
  { i: "pin", l: "22%", t: "5%", s: 28, o: 0.34, rot: 7, amp: 9, dur: "6.60s", lag: "1.13s" },
  { i: "chart", r: "15%", t: "24%", s: 28, o: 0.13, rot: -11, amp: 8, dur: "6.05s", lag: "0.76s" },
  { i: "addpeople", r: "24%", b: "16%", s: 30, o: 0.12, rot: -13, amp: 10, dur: "4.40s", lag: "1.50s" },
];

export const CYCLE_DECOR: DecorItem[] = [
  { i: "planning", l: "calc(50% - 662px)", t: "18%", s: 32, o: 0.82, rot: -8, amp: 9, dur: "6.60s", lag: "1.13s" },
  { i: "img", l: "calc(50% - 604px)", b: "22%", s: 26, o: 0.82, rot: 13, amp: 11, dur: "4.95s", lag: "1.87s" },
  { i: "liste", r: "calc(50% - 664px)", t: "30%", s: 30, o: 0.82, rot: 9, amp: 10, dur: "4.40s", lag: "1.50s" },
  { i: "send", l: "5%", b: "8%", s: 34, o: 0.34, rot: 8, amp: 11, dur: "4.95s", lag: "1.87s" },
  { i: "bell", r: "6%", b: "6%", s: 32, o: 0.34, rot: -9, amp: 12, dur: "5.50s", lag: "0.04s" },
  { i: "people", l: "14%", b: "22%", s: 28, o: 0.34, rot: 13, amp: 13, dur: "6.05s", lag: "0.41s" },
  { i: "calendar", r: "15%", t: "24%", s: 28, o: 0.34, rot: -11, amp: 8, dur: "6.05s", lag: "0.76s" },
  { i: "pin", l: "22%", t: "5%", s: 28, o: 0.34, rot: 7, amp: 9, dur: "6.60s", lag: "1.13s" },
  { i: "bubble", r: "24%", b: "16%", s: 30, o: 0.34, rot: -13, amp: 10, dur: "4.40s", lag: "1.50s" },
];

export const USAGES_DECOR: DecorItem[] = [
  { i: "img", l: "calc(50% - 660px)", t: "14%", s: 30, o: 0.82, rot: -10, amp: 10, dur: "4.40s", lag: "1.50s" },
  { i: "chat", r: "calc(50% - 664px)", t: "12%", s: 28, o: 0.82, rot: 8, amp: 12, dur: "5.50s", lag: "0.04s" },
  { i: "heart", l: "3%", t: "9%", s: 32, o: 0.34, rot: -14, amp: 12, dur: "5.50s", lag: "0.04s" },
  { i: "ticket", r: "4%", t: "7%", s: 30, o: 0.34, rot: 11, amp: 13, dur: "6.05s", lag: "0.41s" },
  { i: "send", l: "5%", b: "8%", s: 34, o: 0.34, rot: 8, amp: 8, dur: "6.05s", lag: "0.76s" },
  { i: "bell", r: "6%", b: "6%", s: 32, o: 0.34, rot: -9, amp: 9, dur: "6.60s", lag: "1.13s" },
  { i: "people", l: "14%", b: "22%", s: 28, o: 0.34, rot: 13, amp: 10, dur: "4.40s", lag: "1.50s" },
  { i: "calendar", r: "15%", t: "24%", s: 28, o: 0.34, rot: -11, amp: 11, dur: "4.95s", lag: "1.87s" },
];

export const DEMO_DECOR: DecorItem[] = [
  { i: "documents", l: "calc(50% - 660px)", t: "24%", s: 30, o: 0.82, rot: -11, amp: 10, dur: "4.40s", lag: "1.50s" },
  { i: "bell", r: "calc(50% - 666px)", t: "16%", s: 32, o: 0.82, rot: 8, amp: 9, dur: "6.60s", lag: "1.13s" },
  { i: "heart", l: "3%", t: "9%", s: 22, o: 0.12, rot: -14, amp: 11, dur: "4.95s", lag: "1.87s" },
  { i: "ticket", r: "4%", t: "7%", s: 20, o: 0.11, rot: 11, amp: 12, dur: "5.50s", lag: "0.04s" },
  { i: "send", l: "5%", b: "8%", s: 24, o: 0.12, rot: 8, amp: 8, dur: "6.05s", lag: "0.76s" },
  { i: "people", r: "6%", b: "6%", s: 22, o: 0.1, rot: -9, amp: 13, dur: "6.05s", lag: "0.41s" },
];

export const WAITLIST_DECOR: DecorItem[] = [
  { i: "heart", l: "calc(50% - 664px)", t: "22%", s: 32, o: 0.82, rot: -9, amp: 9, dur: "6.60s", lag: "1.13s" },
  { i: "ticket", r: "calc(50% - 662px)", t: "28%", s: 30, o: 0.82, rot: 7, amp: 10, dur: "4.40s", lag: "1.50s" },
  { i: "people", r: "calc(50% - 606px)", b: "20%", s: 26, o: 0.82, rot: -13, amp: 11, dur: "4.95s", lag: "1.87s" },
  { i: "send", l: "5%", b: "8%", s: 34, o: 0.34, rot: 8, amp: 8, dur: "6.05s", lag: "0.76s" },
  { i: "bell", r: "6%", b: "6%", s: 32, o: 0.34, rot: -9, amp: 9, dur: "6.60s", lag: "1.13s" },
  { i: "people", l: "14%", b: "22%", s: 28, o: 0.34, rot: 13, amp: 10, dur: "4.40s", lag: "1.50s" },
  { i: "calendar", r: "15%", t: "24%", s: 28, o: 0.34, rot: -11, amp: 11, dur: "4.95s", lag: "1.87s" },
  { i: "pin", l: "22%", t: "5%", s: 28, o: 0.34, rot: 7, amp: 12, dur: "5.50s", lag: "0.04s" },
  { i: "bubble", r: "24%", b: "16%", s: 30, o: 0.34, rot: -13, amp: 13, dur: "6.05s", lag: "0.41s" },
];

/* ── Legal / confirmation pages: three icons, narrow column ─────────── */

export const MENTIONS_DECOR: DecorItem[] = [
  { i: "documents", l: "calc(50% - 620px)", t: "12%", s: 32, o: 0.82, rot: -10, amp: 9, dur: "6.60s", lag: "1.13s" },
  { i: "ticket", r: "calc(50% - 624px)", t: "26%", s: 30, o: 0.82, rot: 9, amp: 11, dur: "4.95s", lag: "1.87s" },
  { i: "pin", l: "calc(50% - 600px)", b: "14%", s: 26, o: 0.82, rot: 12, amp: 10, dur: "4.40s", lag: "1.50s" },
];

export const CONFIDENTIALITE_DECOR: DecorItem[] = [
  { i: "people", l: "calc(50% - 620px)", t: "12%", s: 32, o: 0.82, rot: -10, amp: 9, dur: "6.60s", lag: "1.13s" },
  { i: "chart", r: "calc(50% - 624px)", t: "26%", s: 30, o: 0.82, rot: 9, amp: 11, dur: "4.95s", lag: "1.87s" },
  { i: "bell", l: "calc(50% - 600px)", b: "14%", s: 26, o: 0.82, rot: 12, amp: 10, dur: "4.40s", lag: "1.50s" },
];

export const BIENVENUE_DECOR: DecorItem[] = [
  { i: "heart", l: "calc(50% - 620px)", t: "12%", s: 32, o: 0.82, rot: -10, amp: 9, dur: "6.60s", lag: "1.13s" },
  { i: "bell", r: "calc(50% - 624px)", t: "26%", s: 30, o: 0.82, rot: 9, amp: 11, dur: "4.95s", lag: "1.87s" },
  { i: "people", l: "calc(50% - 600px)", b: "14%", s: 26, o: 0.82, rot: 12, amp: 10, dur: "4.40s", lag: "1.50s" },
];

/**
 * /go - the link-in-bio page. Its column is 520px wide, so the side icons hug
 * it far more closely than anywhere else on the site (`calc(50% - 300px)` rather
 * than `calc(50% - 660px)`); on a phone they fall outside the viewport and the
 * section clips them, leaving only the four faint ones the Decor component
 * scatters through the background.
 */
export const GO_DECOR: DecorItem[] = [
  { i: "heart", l: "calc(50% - 330px)", t: "9%", s: 34, o: 0.82, rot: -11, amp: 9, dur: "6.60s", lag: "1.13s" },
  { i: "img", r: "calc(50% - 336px)", t: "17%", s: 30, o: 0.82, rot: 12, amp: 8, dur: "6.05s", lag: "0.76s" },
  { i: "bell", r: "calc(50% - 302px)", t: "46%", s: 26, o: 0.82, rot: -12, amp: 12, dur: "5.50s", lag: "0.04s" },
  { i: "liste", l: "calc(50% - 304px)", t: "54%", s: 26, o: 0.82, rot: 13, amp: 9, dur: "6.05s", lag: "0.41s" },
  { i: "planning", r: "calc(50% - 324px)", b: "20%", s: 32, o: 0.82, rot: -7, amp: 10, dur: "4.40s", lag: "1.50s" },
  { i: "ticket", l: "calc(50% - 320px)", b: "11%", s: 28, o: 0.82, rot: 9, amp: 11, dur: "4.95s", lag: "1.87s" },
  { i: "send", s: 30, o: 0.3, rot: 8, amp: 11, dur: "4.95s", lag: "1.87s" },
  { i: "calendar", s: 28, o: 0.28, rot: -11, amp: 8, dur: "6.05s", lag: "0.76s" },
  { i: "pin", s: 26, o: 0.26, rot: 7, amp: 9, dur: "6.60s", lag: "1.13s" },
  { i: "bubble", s: 28, o: 0.24, rot: -13, amp: 10, dur: "4.40s", lag: "1.50s" },
  { i: "chart", s: 30, o: 0.28, rot: 12, amp: 12, dur: "5.50s", lag: "0.50s" },
  { i: "documents", s: 26, o: 0.25, rot: -8, amp: 9, dur: "6.05s", lag: "1.20s" },
  { i: "people", s: 32, o: 0.22, rot: 14, amp: 11, dur: "4.95s", lag: "0.80s" },
  { i: "addpeople", s: 28, o: 0.20, rot: -10, amp: 8, dur: "6.60s", lag: "1.50s" },
];

/* ── BDE ─────────────────────────────────────────────────────────────── */

export const BDE_HERO_DECOR: DecorItem[] = [
  { i: "bell", l: "calc(50% - 664px)", t: "14%", s: 34, o: 0.82, rot: -10, amp: 9, dur: "6.60s", lag: "1.13s" },
  { i: "people", l: "calc(50% - 604px)", b: "16%", s: 28, o: 0.82, rot: 12, amp: 11, dur: "4.95s", lag: "1.87s" },
  { i: "ticket", r: "calc(50% - 668px)", t: "10%", s: 32, o: 0.82, rot: 9, amp: 8, dur: "6.05s", lag: "0.76s" },
  { i: "heart", l: "3%", t: "9%", s: 32, o: 0.34, rot: -14, amp: 9, dur: "6.60s", lag: "1.13s" },
  { i: "ticket", r: "4%", t: "7%", s: 30, o: 0.34, rot: 11, amp: 10, dur: "4.40s", lag: "1.50s" },
  { i: "send", l: "5%", b: "8%", s: 34, o: 0.34, rot: 8, amp: 11, dur: "4.95s", lag: "1.87s" },
  { i: "bell", r: "6%", b: "6%", s: 32, o: 0.34, rot: -9, amp: 12, dur: "5.50s", lag: "0.04s" },
  { i: "people", l: "14%", b: "22%", s: 28, o: 0.34, rot: 13, amp: 13, dur: "6.05s", lag: "0.41s" },
  { i: "calendar", r: "15%", t: "24%", s: 28, o: 0.34, rot: -11, amp: 8, dur: "6.05s", lag: "0.76s" },
];

export const BDE_PROBLEMES_DECOR: DecorItem[] = [
  { i: "liste", l: "calc(50% - 660px)", t: "18%", s: 32, o: 0.82, rot: -9, amp: 10, dur: "4.40s", lag: "1.50s" },
  { i: "chart", r: "calc(50% - 664px)", t: "24%", s: 34, o: 0.82, rot: 8, amp: 9, dur: "6.60s", lag: "1.13s" },
  { i: "ticket", r: "4%", t: "7%", s: 30, o: 0.34, rot: 11, amp: 10, dur: "4.40s", lag: "1.50s" },
  { i: "send", l: "5%", b: "8%", s: 34, o: 0.34, rot: 8, amp: 11, dur: "4.95s", lag: "1.87s" },
  { i: "bell", r: "6%", b: "6%", s: 32, o: 0.34, rot: -9, amp: 12, dur: "5.50s", lag: "0.04s" },
  { i: "people", l: "14%", b: "22%", s: 28, o: 0.34, rot: 13, amp: 13, dur: "6.05s", lag: "0.41s" },
  { i: "calendar", r: "15%", t: "24%", s: 28, o: 0.34, rot: -11, amp: 8, dur: "6.05s", lag: "0.76s" },
  { i: "pin", l: "22%", t: "5%", s: 28, o: 0.34, rot: 7, amp: 9, dur: "6.60s", lag: "1.13s" },
];

export const BDE_DEROULE_DECOR: DecorItem[] = [
  { i: "ticket", l: "calc(50% - 662px)", t: "16%", s: 32, o: 0.82, rot: -8, amp: 9, dur: "6.60s", lag: "1.13s" },
  { i: "planning", r: "calc(50% - 660px)", b: "18%", s: 30, o: 0.82, rot: 10, amp: 11, dur: "4.95s", lag: "1.87s" },
  { i: "send", l: "5%", b: "8%", s: 34, o: 0.34, rot: 8, amp: 11, dur: "4.95s", lag: "1.87s" },
  { i: "bell", r: "6%", b: "6%", s: 32, o: 0.34, rot: -9, amp: 12, dur: "5.50s", lag: "0.04s" },
  { i: "people", l: "14%", b: "22%", s: 28, o: 0.34, rot: 13, amp: 13, dur: "6.05s", lag: "0.41s" },
  { i: "calendar", r: "15%", t: "24%", s: 28, o: 0.34, rot: -11, amp: 8, dur: "6.05s", lag: "0.76s" },
  { i: "pin", l: "22%", t: "5%", s: 28, o: 0.34, rot: 7, amp: 9, dur: "6.60s", lag: "1.13s" },
  { i: "bubble", r: "24%", b: "16%", s: 30, o: 0.34, rot: -13, amp: 10, dur: "4.40s", lag: "1.50s" },
];

export const BDE_USAGES_DECOR: DecorItem[] = [
  { i: "heart", l: "calc(50% - 662px)", t: "22%", s: 32, o: 0.82, rot: -9, amp: 10, dur: "4.40s", lag: "1.50s" },
  { i: "send", r: "calc(50% - 664px)", t: "28%", s: 30, o: 0.82, rot: 8, amp: 9, dur: "6.60s", lag: "1.13s" },
  { i: "heart", l: "3%", t: "9%", s: 32, o: 0.34, rot: -14, amp: 12, dur: "5.50s", lag: "0.04s" },
  { i: "ticket", r: "4%", t: "7%", s: 30, o: 0.34, rot: 11, amp: 13, dur: "6.05s", lag: "0.41s" },
  { i: "send", l: "5%", b: "8%", s: 34, o: 0.34, rot: 8, amp: 8, dur: "6.05s", lag: "0.76s" },
  { i: "bell", r: "6%", b: "6%", s: 32, o: 0.34, rot: -9, amp: 9, dur: "6.60s", lag: "1.13s" },
  { i: "people", l: "14%", b: "22%", s: 28, o: 0.34, rot: 13, amp: 10, dur: "4.40s", lag: "1.50s" },
  { i: "calendar", r: "15%", t: "24%", s: 28, o: 0.34, rot: -11, amp: 11, dur: "4.95s", lag: "1.87s" },
];

export const BDE_DEMO_DECOR: DecorItem[] = [
  { i: "bubble", l: "calc(50% - 660px)", t: "20%", s: 32, o: 0.82, rot: -10, amp: 10, dur: "4.40s", lag: "1.50s" },
  { i: "bell", r: "calc(50% - 662px)", b: "18%", s: 30, o: 0.82, rot: 9, amp: 9, dur: "6.60s", lag: "1.13s" },
  { i: "ticket", r: "4%", t: "7%", s: 30, o: 0.34, rot: 11, amp: 13, dur: "6.05s", lag: "0.41s" },
  { i: "send", l: "5%", b: "8%", s: 34, o: 0.34, rot: 8, amp: 8, dur: "6.05s", lag: "0.76s" },
  { i: "bell", r: "6%", b: "6%", s: 32, o: 0.34, rot: -9, amp: 9, dur: "6.60s", lag: "1.13s" },
  { i: "people", l: "14%", b: "22%", s: 28, o: 0.34, rot: 13, amp: 10, dur: "4.40s", lag: "1.50s" },
  { i: "calendar", r: "15%", t: "24%", s: 28, o: 0.34, rot: -11, amp: 11, dur: "4.95s", lag: "1.87s" },
  { i: "pin", l: "22%", t: "5%", s: 28, o: 0.34, rot: 7, amp: 12, dur: "5.50s", lag: "0.04s" },
];

export const COOKIES_DECOR: DecorItem[] = [
  { i: "chart", l: "calc(50% - 620px)", t: "12%", s: 32, o: 0.82, rot: -10, amp: 9, dur: "6.60s", lag: "1.13s" },
  { i: "bubble", r: "calc(50% - 624px)", t: "26%", s: 30, o: 0.82, rot: 9, amp: 11, dur: "4.95s", lag: "1.87s" },
  { i: "heart", l: "calc(50% - 600px)", b: "14%", s: 26, o: 0.82, rot: 12, amp: 10, dur: "4.40s", lag: "1.50s" },
];
