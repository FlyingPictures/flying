import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { cn } from "@/lib/utils";

type Props = {
  params: Promise<{ locale: string }>;
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.flyingpicturesmexico.com";

// Componente para unificar el color azul y la alineación izquierda
const PrivacySection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="text-left group">
    <h2 className="!text-secondary !tracking-tight !text-2xl font-bold mb-4">
      {title}
    </h2>
    {/* Este contenedor fuerza a todos los p y li internos a ser azul secondary y sin sombras */}
    <div className="space-y-4 [&_p]:!text-secondary [&_p]:!text-left [&_li]:!text-secondary [&_li]:!text-left [&_p]:!filter-none [&_li]:!filter-none">
      {children}
    </div>
  </section>
);

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

  // Clase para elementos fuera del wrapper
  const azulSecondary = "!text-secondary !text-left !filter-none font-medium";

  return (
    <article className="container mx-auto px-6 pt-[6rem] lg:pt-[13rem] pb-24 max-w-4xl">
      <header className="mb-12 border-b border-secondary/20 pb-8 text-left">
        <h1 className="!text-secondary !text-left !filter-none mb-4">
          {t("privacyTitle")}
        </h1>
        <p className="!text-muted-foreground !text-left !filter-none text-lg mt-4">
          {t("privacyDescription")}
        </p>
        <p className="!text-muted-foreground !text-left !filter-none text-sm mt-2">
          {t("lastUpdated")}: 17 de enero de 2026
        </p>
      </header>

      <div className="space-y-12">
        {/* 1. Introducción */}
        <PrivacySection title={tp("introTitle")}>
          <p>{tp("introText")}</p>
        </PrivacySection>

        {/* 2. Datos Recopilados */}
        <PrivacySection title={tp("dataTitle")}>
          <p>{tp("dataIntro")}</p>
          <ul className="list-disc pl-6 space-y-2">
            <li dangerouslySetInnerHTML={{ __html: tp("personalInfo") }} />
            <li dangerouslySetInnerHTML={{ __html: tp("identificationInfo") }} />
            <li dangerouslySetInnerHTML={{ __html: tp("healthInfo") }} />
            <li dangerouslySetInnerHTML={{ __html: tp("technicalInfo") }} />
            <li dangerouslySetInnerHTML={{ __html: tp("photosVideos") }} />
          </ul>
        </PrivacySection>

        {/* 3. Uso de la Información */}
        <PrivacySection title={tp("usageTitle")}>
          <p>{tp("usageIntro")}</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>{tp("useProcess")}</li>
            <li>{tp("useCommunicate")}</li>
            <li>{tp("useSafety")}</li>
            <li>{tp("useImprove")}</li>
            <li>{tp("useLegal")}</li>
            <li>{tp("useMarketing")}</li>
            <li>{tp("usePayment")}</li>
          </ul>
        </PrivacySection>

        {/* 4. Protección de Datos */}
        <PrivacySection title={tp("protectionTitle")}>
          <p>{tp("protectionText")}</p>
        </PrivacySection>

        {/* 5. Cookies */}
        <PrivacySection title={tp("cookiesTitle")}>
          <p>{tp("cookiesText")}</p>
        </PrivacySection>

        {/* 6. Compartir Información */}
        <PrivacySection title={tp("sharingTitle")}>
          <p>{tp("sharingIntro")}</p>
          <ul className="list-disc pl-6 space-y-2">
            <li dangerouslySetInnerHTML={{ __html: tp("sharingProviders") }} />
            <li dangerouslySetInnerHTML={{ __html: tp("sharingAuthorities") }} />
            <li dangerouslySetInnerHTML={{ __html: tp("sharingPartners") }} />
          </ul>
        </PrivacySection>

        {/* 7. Derechos ARCO */}
        <PrivacySection title={tp("rightsTitle")}>
          <p>{tp("rightsIntro")}</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>{tp("rightAccess")}</li>
            <li>{tp("rightRectify")}</li>
            <li>{tp("rightDelete")}</li>
            <li>{tp("rightObject")}</li>
            <li>{tp("rightPortability")}</li>
            <li>{tp("rightWithdraw")}</li>
          </ul>
        </PrivacySection>

        {/* 8. Retención */}
        <PrivacySection title={tp("retentionTitle")}>
          <p>{tp("retentionText")}</p>
        </PrivacySection>

        {/* 9. Menores */}
        <PrivacySection title={tp("minorsTitle")}>
          <p>{tp("minorsText")}</p>
        </PrivacySection>

        {/* 10. Cambios en el Aviso */}
        <PrivacySection title={tp("changesTitle")}>
          <p>{tp("changesText")}</p>
        </PrivacySection>

        {/* 11. Contacto */}
        <section className="pt-8 border-t border-secondary/20 text-left">
          <h2 className="!text-secondary !tracking-tight !text-2xl font-bold mb-6">
            {tp("contactTitle")}
          </h2>
          <p className={azulSecondary}>
            {tp("contactEmail")}{" "}
            <a
              href={`mailto:${t("emailPrivacy")}`}
              className="text-primary font-bold hover:underline"
            >
              {t("emailPrivacy")}
            </a>
          </p>
        </section>
      </div>
    </article>
  );
}