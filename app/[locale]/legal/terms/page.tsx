import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.flyingpicturesmexico.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal" });

  return {
    title: t("termsTitle"),
    description: t("termsDescription"),
    alternates: {
      canonical: `${SITE_URL}/${locale}/legal/terms`,
      languages: {
        es: `${SITE_URL}/es/legal/terms`,
        en: `${SITE_URL}/en/legal/terms`,
        "x-default": `${SITE_URL}/en/legal/terms`,
      },
    },
  };
}

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal" });
  const tp = await getTranslations({ locale, namespace: "legal.terms" });

  return (
    <article className="container mx-auto px-4 pt-[3rem] lg:pt-[13rem] pb-16 max-w-4xl">
      <header className="mb-12">
        <h1 className="text-h1 text-secondary font-bold">
          {t("termsTitle")}
        </h1>
        <p className="text-body text-muted-foreground mt-4">
          {t("termsDescription")}
        </p>
        <p className="text-small text-muted-foreground mt-2">
          {t("lastUpdated")}: 17 de enero de 2026
        </p>
      </header>

      <div className="space-y-10 text-body text-secondary/90 leading-relaxed">
        <section>
          <h2 className="text-h4 text-secondary font-semibold mb-4">
            {tp("introTitle")}
          </h2>
          <p>{tp("introText")}</p>
        </section>

        <section>
          <h2 className="text-h4 text-secondary font-semibold mb-4">
            {tp("servicesTitle")}
          </h2>
          <p className="mb-4">{tp("servicesIntro")}</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>{tp("serviceShared")}</li>
            <li>{tp("servicePrivate")}</li>
            <li>{tp("serviceVip")}</li>
            <li>{tp("serviceExtras")}</li>
          </ul>
        </section>

        <section>
          <h2 className="text-h4 text-secondary font-semibold mb-4">
            {tp("bookingTitle")}
          </h2>
          <p className="mb-4">{tp("bookingIntro")}</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>{tp("booking1")}</li>
            <li>{tp("booking2")}</li>
            <li>{tp("booking3")}</li>
            <li>{tp("booking4")}</li>
          </ul>
          <p className="mt-4">{tp("bookingNote")}</p>
        </section>

        <section>
          <h2 className="text-h4 text-secondary font-semibold mb-4">
            {tp("pricingTitle")}
          </h2>
          <p className="mb-4">{tp("pricingIntro")}</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>{tp("priceInclude1")}</li>
            <li>{tp("priceInclude2")}</li>
            <li>{tp("priceInclude3")}</li>
            <li>{tp("priceInclude4")}</li>
          </ul>
          <p className="mt-4">{tp("priceNote")}</p>
        </section>

        <section>
          <h2 className="text-h4 text-secondary font-semibold mb-4">
            {tp("requirementsTitle")}
          </h2>
          <p className="mb-4">{tp("requirementsIntro")}</p>
          <ul className="list-disc pl-6 space-y-2">
            <li dangerouslySetInnerHTML={{ __html: tp("reqAge") }} />
            <li dangerouslySetInnerHTML={{ __html: tp("reqWeight") }} />
            <li dangerouslySetInnerHTML={{ __html: tp("reqHealth") }} />
            <li dangerouslySetInnerHTML={{ __html: tp("reqDocs") }} />
          </ul>
        </section>

        <section>
          <h2 className="text-h4 text-secondary font-semibold mb-4">
            {tp("safetyTitle")}
          </h2>
          <p>{tp("safetyText")}</p>
        </section>

        <section>
          <h2 className="text-h4 text-secondary font-semibold mb-4">
            {tp("weatherTitle")}
          </h2>
          <p>{tp("weatherText")}</p>
        </section>

        <section>
          <h2 className="text-h4 text-secondary font-semibold mb-4">
            {tp("responsibilitiesTitle")}
          </h2>
          <p className="mb-4">{tp("responsibilitiesIntro")}</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>{tp("resp1")}</li>
            <li>{tp("resp2")}</li>
            <li>{tp("resp3")}</li>
            <li>{tp("resp4")}</li>
            <li>{tp("resp5")}</li>
            <li>{tp("resp6")}</li>
          </ul>
        </section>

        <section>
          <h2 className="text-h4 text-secondary font-semibold mb-4">
            {tp("liabilityTitle")}
          </h2>
          <p>{tp("liabilityText")}</p>
        </section>

        <section>
          <h2 className="text-h4 text-secondary font-semibold mb-4">
            {tp("ipTitle")}
          </h2>
          <p>{tp("ipText")}</p>
        </section>

        <section>
          <h2 className="text-h4 text-secondary font-semibold mb-4">
            {tp("mediaTitle")}
          </h2>
          <p>{tp("mediaText")}</p>
        </section>

        <section>
          <h2 className="text-h4 text-secondary font-semibold mb-4">
            {tp("modificationsTitle")}
          </h2>
          <p>{tp("modificationsText")}</p>
        </section>

        <section>
          <h2 className="text-h4 text-secondary font-semibold mb-4">
            {tp("lawTitle")}
          </h2>
          <p>{tp("lawText")}</p>
        </section>

        <section>
          <h2 className="text-h4 text-secondary font-semibold mb-4">
            {tp("contactTitle")}
          </h2>
          <p>
            {tp("contactEmail")}{" "}
            <a
              href={`mailto:${t("emailTerms")}`}
              className="text-primary hover:underline"
            >
              {t("emailTerms")}
            </a>
          </p>
        </section>
      </div>
    </article>
  );
}
