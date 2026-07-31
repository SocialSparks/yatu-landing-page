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
