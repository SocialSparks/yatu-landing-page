import { FAQ, MODULES, faqAnswerText } from "@/lib/content";
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

/**
 * The home page’s structured data: who publishes Yatu, what Yatu is, and the
 * FAQ.
 *
 * The FAQ entries are the ones rendered in the accordion further down the same
 * page - Google requires the marked-up answers to be visible, so both read from
 * lib/content.ts. Nothing here claims a rating or a number of users.
 */
export function HomeStructuredData() {
  const organization = {
    "@type": "Organization",
    "@id": absoluteUrl("/#organization"),
    name: PUBLISHER,
    url: SITE_URL,
    email: CONTACT_EMAIL,
    telephone: CONTACT_PHONE_HREF,
    address: COMPANY_ADDRESS,
    logo: absoluteUrl("/icon-512.png"),
  };

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
    offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
    publisher: { "@id": absoluteUrl("/#organization") },
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

  return (
    <JsonLd data={{ "@context": "https://schema.org", "@graph": [organization, application, faq] }} />
  );
}
