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
    title: t("privacyTitle"),
    description: t("privacyDescription"),
    alternates: {
      canonical: `${SITE_URL}/${locale}/legal/privacy`,
      languages: {
        es: `${SITE_URL}/es/legal/privacy`,
        en: `${SITE_URL}/en/legal/privacy`,
        "x-default": `${SITE_URL}/en/legal/privacy`,
      },
    },
  };
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal" });
  const tp = await getTranslations({ locale, namespace: "legal.privacy" });

  return (
    <article className="container mx-auto px-4 pt-[3rem] lg:pt-[13rem] pb-16 max-w-4xl">
      <header className="mb-12">
        <h1 className="text-h1 text-secondary font-bold">
          {t("privacyTitle")}
        </h1>
        <p className="text-body text-muted-foreground mt-4">
          {t("privacyDescription")}
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
            {tp("dataTitle")}
          </h2>
          <p className="mb-4">{tp("dataIntro")}</p>
          <ul className="list-disc pl-6 space-y-2">
            <li dangerouslySetInnerHTML={{ __html: tp("personalInfo") }} />
            <li dangerouslySetInnerHTML={{ __html: tp("identificationInfo") }} />
            <li dangerouslySetInnerHTML={{ __html: tp("healthInfo") }} />
            <li dangerouslySetInnerHTML={{ __html: tp("technicalInfo") }} />
            <li dangerouslySetInnerHTML={{ __html: tp("photosVideos") }} />
          </ul>
        </section>

        <section>
          <h2 className="text-h4 text-secondary font-semibold mb-4">
            {tp("usageTitle")}
          </h2>
          <p className="mb-4">{tp("usageIntro")}</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>{tp("useProcess")}</li>
            <li>{tp("useCommunicate")}</li>
            <li>{tp("useSafety")}</li>
            <li>{tp("useImprove")}</li>
            <li>{tp("useLegal")}</li>
            <li>{tp("useMarketing")}</li>
            <li>{tp("usePayment")}</li>
          </ul>
        </section>

        <section>
          <h2 className="text-h4 text-secondary font-semibold mb-4">
            {tp("protectionTitle")}
          </h2>
          <p>{tp("protectionText")}</p>
        </section>

        <section>
          <h2 className="text-h4 text-secondary font-semibold mb-4">
            {tp("cookiesTitle")}
          </h2>
          <p>{tp("cookiesText")}</p>
        </section>

        <section>
          <h2 className="text-h4 text-secondary font-semibold mb-4">
            {tp("sharingTitle")}
          </h2>
          <p className="mb-4">{tp("sharingIntro")}</p>
          <ul className="list-disc pl-6 space-y-2">
            <li dangerouslySetInnerHTML={{ __html: tp("sharingProviders") }} />
            <li dangerouslySetInnerHTML={{ __html: tp("sharingAuthorities") }} />
            <li dangerouslySetInnerHTML={{ __html: tp("sharingPartners") }} />
          </ul>
        </section>

        <section>
          <h2 className="text-h4 text-secondary font-semibold mb-4">
            {tp("rightsTitle")}
          </h2>
          <p className="mb-4">{tp("rightsIntro")}</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>{tp("rightAccess")}</li>
            <li>{tp("rightRectify")}</li>
            <li>{tp("rightDelete")}</li>
            <li>{tp("rightObject")}</li>
            <li>{tp("rightPortability")}</li>
            <li>{tp("rightWithdraw")}</li>
          </ul>
        </section>

        <section>
          <h2 className="text-h4 text-secondary font-semibold mb-4">
            {tp("retentionTitle")}
          </h2>
          <p>{tp("retentionText")}</p>
        </section>

        <section>
          <h2 className="text-h4 text-secondary font-semibold mb-4">
            {tp("minorsTitle")}
          </h2>
          <p>{tp("minorsText")}</p>
        </section>

        <section>
          <h2 className="text-h4 text-secondary font-semibold mb-4">
            {tp("changesTitle")}
          </h2>
          <p>{tp("changesText")}</p>
        </section>

        <section>
          <h2 className="text-h4 text-secondary font-semibold mb-4">
            {tp("contactTitle")}
          </h2>
          <p>
            {tp("contactEmail")}{" "}
            <a
              href={`mailto:${t("emailPrivacy")}`}
              className="text-primary hover:underline"
            >
              {t("emailPrivacy")}
            </a>
          </p>
        </section>
      </div>
    </article>
  );
}
