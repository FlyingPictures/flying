import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.flyingpicturesmexico.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal" });
  return {
    title: t("termsTitle"),
    description: t("termsDescription"),
    alternates: {
      canonical: `${SITE_URL}/${locale}/legal/terms`,
      languages: { es: `${SITE_URL}/es/legal/terms`, en: `${SITE_URL}/en/legal/terms`, "x-default": `${SITE_URL}/en/legal/terms` },
    },
  };
}

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal" });
  const tp = await getTranslations({ locale, namespace: "legal.terms" });

  return (
    <article className="container mx-auto px-6 pt-24 lg:pt-52 pb-24 max-w-4xl text-secondary">
      <header className="mb-12 border-b border-secondary/20 pb-8">
        <h1 className="mb-4">{t("termsTitle")}</h1>
        <p className="text-muted-foreground text-lg mt-4">{t("termsDescription")}</p>
        <p className="text-muted-foreground text-sm mt-2">{t("lastUpdated")}: 17 de enero de 2026</p>
      </header>

      <div className="space-y-12">

        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">{tp("introTitle")}</h2>
          <p>{tp("introText")}</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">{tp("servicesTitle")}</h2>
          <p>{tp("servicesIntro")}</p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            {(["serviceShared", "servicePrivate", "serviceVip", "serviceExtras"] as const).map(k => <li key={k}>{tp(k)}</li>)}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">{tp("bookingTitle")}</h2>
          <p>{tp("bookingIntro")}</p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            {(["booking1", "booking2", "booking3", "booking4"] as const).map(k => <li key={k}>{tp(k)}</li>)}
          </ul>
          <p className="font-bold mt-4">{tp("bookingNote")}</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">{tp("pricingTitle")}</h2>
          <p>{tp("pricingIntro")}</p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            {(["priceInclude1", "priceInclude2", "priceInclude3", "priceInclude4"] as const).map(k => <li key={k}>{tp(k)}</li>)}
          </ul>
          <p className="font-bold mt-4">{tp("priceNote")}</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">{tp("requirementsTitle")}</h2>
          <p>{tp("requirementsIntro")}</p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            {(["reqAge", "reqWeight", "reqHealth", "reqDocs"] as const).map(k => (
              <li key={k} dangerouslySetInnerHTML={{ __html: tp(k) }} />
            ))}
          </ul>
        </section>

        {(["safety", "weather", "liability", "ip", "media", "modifications", "law"] as const).map(key => (
          <section key={key}>
            <h2 className="text-2xl font-bold tracking-tight mb-4">{tp(`${key}Title`)}</h2>
            <p>{tp(`${key}Text`)}</p>
          </section>
        ))}

        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">{tp("responsibilitiesTitle")}</h2>
          <p>{tp("responsibilitiesIntro")}</p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            {(["resp1", "resp2", "resp3", "resp4", "resp5", "resp6"] as const).map(k => <li key={k}>{tp(k)}</li>)}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">{tp("contactTitle")}</h2>
          <p>{tp("contactEmail")} <a href={`mailto:${t("emailTerms")}`} className="text-primary font-bold hover:underline">{t("emailTerms")}</a></p>
        </section>

      </div>
    </article>
  );
}