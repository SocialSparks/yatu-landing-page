import { FAQ, LAUNCH_DATE, MODULES, faqAnswerText } from "@/lib/content";
import { LANDING_INDEX_PATH, LANDING_PAGES, type LandingPage } from "@/lib/landing-content";
import type { Crumb } from "@/lib/routes";
import {
  COMPANY_ADDRESS,
  CONTACT_EMAIL,
  CONTACT_PHONE_HREF,
  PUBLISHER,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
} from "@/lib/site";

function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // The payload is built here from typed constants, never from user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** The two nodes every page points at, by @id, instead of repeating them. */
const ORGANIZATION_ID = absoluteUrl("/#organization");
const WEBSITE_ID = absoluteUrl("/#website");

const graph = (...nodes: object[]) => ({ "@context": "https://schema.org", "@graph": nodes });

/**
 * Who publishes the site, and what the site is. Rendered once in the layout, so
 * every page - including the guides - carries the publisher identity Google
 * needs to attach the pages to an entity.
 */
export function SiteStructuredData() {
  const organization = {
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: PUBLISHER,
    url: SITE_URL,
    email: CONTACT_EMAIL,
    telephone: CONTACT_PHONE_HREF,
    address: COMPANY_ADDRESS,
    logo: absoluteUrl("/icon-512.png"),
    sameAs: ["https://www.instagram.com/yatu_app/", "https://www.tiktok.com/@yatu_app"],
  };

  const website = {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "fr-FR",
    publisher: { "@id": ORGANIZATION_ID },
  };

  return <JsonLd data={graph(organization, website)} />;
}

const breadcrumbNode = (trail: Crumb[]) => ({
  "@type": "BreadcrumbList",
  itemListElement: trail.map((crumb, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: crumb.name,
    item: absoluteUrl(crumb.path),
  })),
});

/** The trail rendered by <Breadcrumbs>, in the machine-readable form. */
export function BreadcrumbStructuredData({ trail }: { trail: Crumb[] }) {
  return <JsonLd data={graph(breadcrumbNode(trail))} />;
}

/**
 * The home page: what Yatu is, and the FAQ.
 *
 * The FAQ entries are the ones rendered in the accordion further down the same
 * page - Google requires the marked-up answers to be visible, so both read from
 * lib/content.ts. Nothing here claims a rating or a number of users.
 */
export function HomeStructuredData() {
  const application = {
    "@type": "SoftwareApplication",
    "@id": absoluteUrl("/#app"),
    name: SITE_NAME,
    url: SITE_URL,
    applicationCategory: "LifestyleApplication",
    operatingSystem: "iOS, Android",
    inLanguage: "fr",
    description:
      "Application d’organisation d’événements entre amis : discussion, budget partagé, listes et tâches, planning, documents et album photo dans un même espace.",
    featureList: MODULES.map((module) => module.label),
    datePublished: LAUNCH_DATE.slice(0, 10),
    offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
    publisher: { "@id": ORGANIZATION_ID },
    isPartOf: { "@id": WEBSITE_ID },
  };

  const faq = {
    "@type": "FAQPage",
    "@id": absoluteUrl("/#faq"),
    mainEntity: FAQ.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: faqAnswerText(item) },
    })),
  };

  return <JsonLd data={graph(application, faq)} />;
}

/**
 * An occasion guide: the page itself, its method as a HowTo, its questions as a
 * FAQPage, and the trail back to the index.
 *
 * Every marked-up string is also rendered on the page - the steps as an ordered
 * list, the answers inside the accordion. Marking up anything the reader cannot
 * see is what gets a site penalised.
 */
export function LandingStructuredData({ page, trail }: { page: LandingPage; trail: Crumb[] }) {
  const url = absoluteUrl(`/${page.slug}`);

  const webPage = {
    "@type": "WebPage",
    "@id": url,
    url,
    name: page.title,
    description: page.description,
    inLanguage: "fr-FR",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": absoluteUrl("/#app") },
    primaryImageOfPage: absoluteUrl(page.photo),
    breadcrumb: breadcrumbNode(trail),
  };

  const howTo = {
    "@type": "HowTo",
    "@id": `${url}#methode`,
    name: page.h1,
    description: page.lede,
    inLanguage: "fr-FR",
    image: absoluteUrl(page.photo),
    step: page.steps.map((step, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: step.title,
      text: step.body,
      url: `${url}#etape-${i + 1}`,
    })),
  };

  const faq = {
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    mainEntity: page.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return <JsonLd data={graph(webPage, howTo, faq)} />;
}

/** The /organiser index: the list of guides, in the order the page shows them. */
export function LandingIndexStructuredData({ trail }: { trail: Crumb[] }) {
  const url = absoluteUrl(LANDING_INDEX_PATH);

  const collection = {
    "@type": "CollectionPage",
    "@id": url,
    url,
    name: "Organiser un événement entre amis : tous les guides",
    inLanguage: "fr-FR",
    isPartOf: { "@id": WEBSITE_ID },
    breadcrumb: breadcrumbNode(trail),
    mainEntity: {
      "@type": "ItemList",
      itemListElement: LANDING_PAGES.map((page, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: page.cardTitle,
        url: absoluteUrl(`/${page.slug}`),
      })),
    },
  };

  return <JsonLd data={graph(collection)} />;
}

/** /bde - the page itself plus its trail; the offer is the free pilot pack. */
export function BdeStructuredData({ trail }: { trail: Crumb[] }) {
  const url = absoluteUrl("/bde");

  const webPage = {
    "@type": "WebPage",
    "@id": url,
    url,
    name: "Yatu pour les BDE : organiser un WEI ou un événement étudiant",
    description:
      "Un espace unique pour un WEI, un gala ou un séjour ski : inscriptions validées, annonces officielles, planning, chambres, discussion et album photo.",
    inLanguage: "fr-FR",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": absoluteUrl("/#app") },
    breadcrumb: breadcrumbNode(trail),
  };

  return <JsonLd data={graph(webPage)} />;
}
