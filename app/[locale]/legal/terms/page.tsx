import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { cn } from "@/lib/utils";

type Props = {
  params: Promise<{ locale: string }>;
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.flyingpicturesmexico.com";

// --- CONFIGURACIÓN DRY DE ESTILOS ---
const STYLES = {
  // Limpieza total: quitamos sombras, forzamos azul, alineamos izquierda y quitamos fondo
  baseText: "!text-secondary !text-left !filter-none !bg-transparent !shadow-none !drop-shadow-none",
  heading: "!text-secondary !tracking-tight !text-2xl font-bold mb-4 !text-left !filter-none !drop-shadow-none",
  listWrapper: "list-disc pl-6 space-y-2",
};

const TermsSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="text-left bg-transparent border-none">
    <h2 className={STYLES.heading}>{title}</h2>
    {/* Este div asegura que CUALQUIER etiqueta interna (p, li, span) herede el azul y pierda el shadow */}
    <div className={cn("space-y-4 font-medium", STYLES.baseText, "[&_p]:!text-secondary [&_p]:!text-left [&_p]:!filter-none [&_li]:!text-secondary [&_li]:!filter-none")}>
      {children}
    </div>
  </section>
);

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
    <article className="container mx-auto px-6 pt-[6rem] lg:pt-[13rem] pb-24 max-w-4xl bg-transparent">
      <header className="mb-12 border-b border-secondary/20 pb-8 text-left !bg-transparent">
        <h1 className={cn(STYLES.baseText, "mb-4 !text-4xl lg:!text-5xl font-bold")}>
          {t("termsTitle")}
        </h1>
        <p className={cn(STYLES.baseText, "text-lg mt-4 !opacity-100")}>
          {t("termsDescription")}
        </p>
        <p className={cn(STYLES.baseText, "text-sm mt-2 !opacity-70")}>
          {t("lastUpdated")}: 17 de enero de 2026
        </p>
      </header>

      <div className="space-y-12 !bg-transparent">
        <TermsSection title={tp("introTitle")}>
          <p>{tp("introText")}</p>
        </TermsSection>

        <TermsSection title={tp("servicesTitle")}>
          <p>{tp("servicesIntro")}</p>
          <ul className={STYLES.listWrapper}>
            {["serviceShared", "servicePrivate", "serviceVip", "serviceExtras"].map(k => <li key={k}>{tp(k)}</li>)}
          </ul>
        </TermsSection>

        <TermsSection title={tp("bookingTitle")}>
          <p>{tp("bookingIntro")}</p>
          <ul className={STYLES.listWrapper}>
            {["booking1", "booking2", "booking3", "booking4"].map(k => <li key={k}>{tp(k)}</li>)}
          </ul>
          <p className="mt-2 font-bold">{tp("bookingNote")}</p>
        </TermsSection>

        <TermsSection title={tp("pricingTitle")}>
          <p>{tp("pricingIntro")}</p>
          <ul className={STYLES.listWrapper}>
            {["priceInclude1", "priceInclude2", "priceInclude3", "priceInclude4"].map(k => <li key={k}>{tp(k)}</li>)}
          </ul>
          <p className="mt-2 font-bold">{tp("priceNote")}</p>
        </TermsSection>

        <TermsSection title={tp("requirementsTitle")}>
          <p>{tp("requirementsIntro")}</p>
          <ul className={STYLES.listWrapper}>
            {["reqAge", "reqWeight", "reqHealth", "reqDocs"].map(k => (
              <li key={k} dangerouslySetInnerHTML={{ __html: tp(k) }} />
            ))}
          </ul>
        </TermsSection>

        {/* Secciones de texto simple */}
        {[
          { t: "safetyTitle", b: "safetyText" },
          { t: "weatherTitle", b: "weatherText" },
          { t: "liabilityTitle", b: "liabilityText" },
          { t: "ipTitle", b: "ipText" },
          { t: "mediaTitle", b: "mediaText" },
          { t: "modificationsTitle", b: "modificationsText" },
          { t: "lawTitle", b: "lawText" }
        ].map(sec => (
          <TermsSection key={sec.t} title={tp(sec.t)}>
            <p>{tp(sec.b)}</p>
          </TermsSection>
        ))}

        <TermsSection title={tp("responsibilitiesTitle")}>
          <p>{tp("responsibilitiesIntro")}</p>
          <ul className={STYLES.listWrapper}>
            {["resp1", "resp2", "resp3", "resp4", "resp5", "resp6"].map(k => <li key={k}>{tp(k)}</li>)}
          </ul>
        </TermsSection>

        <section className="pt-8 border-t border-secondary/20 text-left !bg-transparent">
          <h2 className={STYLES.heading}>{tp("contactTitle")}</h2>
          <p className={STYLES.baseText}>
            {tp("contactEmail")}{" "}
            <a href={`mailto:${t("emailTerms")}`} className="!text-primary font-bold hover:underline !bg-transparent !filter-none">
              {t("emailTerms")}
            </a>
          </p>
        </section>
      </div>
    </article>
  );
}