import type { Metadata, Viewport } from "next";
import { Capriola, Lato, Outfit } from "next/font/google";
import { BackToTop } from "@/components/back-to-top";
import { CookieBanner } from "@/components/cookie-banner";
import { Motion } from "@/components/motion";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

/* Capriola - display / titles. Lato - UI + body.
   Outfit stands in for Safiro (commercial); it only appears on brand boards. */
const capriola = Capriola({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-capriola",
});

const lato = Lato({
  weight: ["300", "400", "700", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lato",
});

const outfit = Outfit({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Yatu - Vos sorties, vos voyages. Une seule appli.",
  description:
    "Yatu réunit tout ce qu'un groupe doit décider et partager autour d'un événement : la date, les invitations, le programme, les dépenses, les listes, les documents et les photos. Sortie le 9 septembre 2026.",
  openGraph: {
    title: "Yatu - Vos sorties, vos voyages. Une seule appli.",
    description:
      "Tu crées l'événement, tu partages le lien. Chacun rejoint, tout le monde voit la même chose.",
    locale: "fr_FR",
    type: "website",
    siteName: "Yatu",
  },
};

export const viewport: Viewport = {
  themeColor: "#F7F4ED",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      className={`${capriola.variable} ${lato.variable} ${outfit.variable}`}
    >
      <body>
        <noscript>
          {/* site-motion.js hid elements from script; without script nothing should stay hidden. */}
          <style>{`[data-reveal],[data-fly],[data-reveal="stagger"]>*,[data-float]{opacity:1!important;transform:none!important;scale:1!important}`}</style>
        </noscript>
        <Motion />
        {/* Every page in the design project imports these three. */}
        <SiteHeader />
        {children}
        <SiteFooter />
        <BackToTop />
        <CookieBanner />
      </body>
    </html>
  );
}
