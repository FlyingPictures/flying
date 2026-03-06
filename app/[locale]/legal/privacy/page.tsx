import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.flyingpicturesmexico.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal" });
  return {
    title: t("privacyTitle"),
    description: t("privacyDescription"),
    alternates: {
      canonical: `${SITE_URL}/${locale}/legal/privacy`,
      languages: { es: `${SITE_URL}/es/legal/privacy`, en: `${SITE_URL}/en/legal/privacy`, "x-default": `${SITE_URL}/en/legal/privacy` },
    },
  };
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal" });
  const tp = await getTranslations({ locale, namespace: "legal.privacy" });

  return (
    <article className="container mx-auto px-6 pt-24 lg:pt-52 pb-24 max-w-4xl text-secondary">
      <header className="mb-12 border-b border-secondary/20 pb-8">
        <h1 className="mb-4">{t("privacyTitle")}</h1>
        <p className="text-muted-foreground text-lg mt-4">{t("privacyDescription")}</p>
        <p className="text-muted-foreground text-sm mt-2">{t("lastUpdated")}: 17 de enero de 2026</p>
      </header>

      <div className="space-y-12">

        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">{tp("introTitle")}</h2>
          <p>{tp("introText")}</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">{tp("dataTitle")}</h2>
          <p>{tp("dataIntro")}</p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            {(["personalInfo", "identificationInfo", "healthInfo", "technicalInfo", "photosVideos"] as const).map(k => (
              <li key={k} dangerouslySetInnerHTML={{ __html: tp(k) }} />
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">{tp("usageTitle")}</h2>
          <p>{tp("usageIntro")}</p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            {(["useProcess", "useCommunicate", "useSafety", "useImprove", "useLegal", "useMarketing", "usePayment"] as const).map(k => <li key={k}>{tp(k)}</li>)}
          </ul>
        </section>

        {(["protection", "cookies"] as const).map(key => (
          <section key={key}>
            <h2 className="text-2xl font-bold tracking-tight mb-4">{tp(`${key}Title`)}</h2>
            <p>{tp(`${key}Text`)}</p>
          </section>
        ))}

        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">{tp("sharingTitle")}</h2>
          <p>{tp("sharingIntro")}</p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            {(["sharingProviders", "sharingAuthorities", "sharingPartners"] as const).map(k => (
              <li key={k} dangerouslySetInnerHTML={{ __html: tp(k) }} />
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">{tp("rightsTitle")}</h2>
          <p>{tp("rightsIntro")}</p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            {(["rightAccess", "rightRectify", "rightDelete", "rightObject", "rightPortability", "rightWithdraw"] as const).map(k => <li key={k}>{tp(k)}</li>)}
          </ul>
        </section>

        {(["retention", "minors", "changes"] as const).map(key => (
          <section key={key}>
            <h2 className="text-2xl font-bold tracking-tight mb-4">{tp(`${key}Title`)}</h2>
            <p>{tp(`${key}Text`)}</p>
          </section>
        ))}

        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">{tp("contactTitle")}</h2>
          <p>{tp("contactEmail")} <a href={`mailto:${t("emailPrivacy")}`} className="text-primary font-bold hover:underline">{t("emailPrivacy")}</a></p>
        </section>

      </div>
    </article>
  );
}