import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { cn } from "@/lib/utils";

type Props = {
  params: Promise<{ locale: string }>;
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.flyingpicturesmexico.com";

/**
 * Componente de Sección optimizado para aplicar el azul 'secondary' 
 * y alineación izquierda a TODO su contenido hijo.
 */
const LegalSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="text-left group">
    <h2 className="!text-secondary !tracking-tight !text-2xl font-bold mb-4">
      {title}
    </h2>
    {/* Este div fuerza a todos los p, li y span internos a ser el azul secondary */}
    <div className="space-y-4 [&_p]:!text-secondary [&_p]:!text-left [&_li]:!text-secondary [&_li]:!text-left [&_p]:!filter-none">
      {children}
    </div>
  </section>
);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal" });
  return {
    title: t("cancellationTitle"),
    description: t("cancellationDescription"),
    alternates: {
      canonical: `${SITE_URL}/${locale}/legal/cancellation`,
      languages: {
        es: `${SITE_URL}/es/legal/cancellation`,
        en: `${SITE_URL}/en/legal/cancellation`,
        "x-default": `${SITE_URL}/en/legal/cancellation`,
      },
    },
  };
}

export default async function CancellationPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal" });
  const tp = await getTranslations({ locale, namespace: "legal.cancellation" });

  // Clase para párrafos individuales fuera de LegalSection si fuera necesario
  const azulSecondary = "!text-secondary !text-left !filter-none font-medium";

  return (
    <article className="container mx-auto px-6 pt-[6rem] lg:pt-[13rem] pb-24 max-w-4xl">
      <header className="mb-12 border-b border-secondary/20 pb-8 text-left">
        <h1 className="!text-secondary !text-left !filter-none mb-4">{t("cancellationTitle")}</h1>
        <p className="!text-muted-foreground !text-left !filter-none text-lg mt-4">{t("cancellationDescription")}</p>
        <p className="!text-muted-foreground !text-left !filter-none text-sm mt-2">{t("lastUpdated")}: 17 de enero de 2026</p>
      </header>

      <div className="space-y-12">
        {/* 1. Introducción */}
        <LegalSection title={tp("introTitle")}>
          <p>{tp("introText")}</p>
        </LegalSection>

        {/* 2. Cancelaciones por el Cliente */}
        <LegalSection title={tp("customerTitle")}>
          <p>{tp("customerIntro")}</p>
          <div className="bg-secondary/5 rounded-xl p-6 border border-secondary/10">
            <h4 className="!text-secondary font-bold mb-4 !text-base !normal-case !filter-none">
              {t("pricingTitle")}
            </h4>
            <div className="grid gap-4">
              {["refund72", "refund48", "refund24"].map((key, i) => (
                <div key={key} className={cn("border-l-4 pl-4", i === 0 ? "border-green-500" : i === 1 ? "border-yellow-500" : "border-red-500")}>
                  <p className="font-bold">{tp(key)}</p>
                </div>
              ))}
            </div>
          </div>
          <p>{tp("customerNote")}</p>
        </LegalSection>

        {/* 3. No Show */}
        <LegalSection title={tp("noshowTitle")}>
          <p>{tp("noshowText")}</p>
        </LegalSection>

        {/* 4. Cambios de Fecha */}
        <LegalSection title={tp("changesTitle")}>
          <p>{tp("changesIntro")}</p>
          <ul className="list-disc pl-6 space-y-3">
            {["change72", "change48", "change24"].map(k => <li key={k}>{tp(k)}</li>)}
          </ul>
          <p className="mt-4">{tp("changesNote")}</p>
        </LegalSection>

        {/* 5. Clima */}
        <LegalSection title={tp("weatherTitle")}>
          <p>{tp("weatherIntro")}</p>
          <ul className="list-disc pl-6 space-y-3">
            {["weatherRefund", "weatherReschedule", "weatherCredit"].map(k => <li key={k}>{tp(k)}</li>)}
          </ul>
          <p className="italic mt-4">{tp("weatherNote")}</p>
        </LegalSection>

        {/* 6. Salud */}
        <LegalSection title={tp("healthTitle")}>
          <p>{tp("healthIntro")}</p>
          <ul className="list-disc pl-6 space-y-3">
            {["healthWithCert", "healthWithoutCert"].map(k => <li key={k}>{tp(k)}</li>)}
          </ul>
          <p>{tp("healthNote")}</p>
        </LegalSection>

        {/* 7. Proceso de Reembolso */}
        <LegalSection title={tp("processTitle")}>
          <p>{tp("processIntro")}</p>
          <ol className="list-decimal pl-6 space-y-3">
            {["process1", "process2", "process3", "process4", "process5", "process6"].map(k => <li key={k}>{tp(k)}</li>)}
          </ol>
        </LegalSection>

        {/* 8, 9, 10. Secciones Directas */}
        {[
          { t: "groupsTitle", b: "groupsText" },
          { t: "insuranceTitle", b: "insuranceText" },
          { t: "exceptionsTitle", b: "exceptionsText" }
        ].map(sec => (
          <LegalSection key={sec.t} title={tp(sec.t)}>
            <p>{tp(sec.b)}</p>
          </LegalSection>
        ))}

        {/* 11. Contacto */}
        <section className="pt-8 border-t border-secondary/20 text-left">
          <h2 className="!text-secondary !tracking-tight !text-2xl font-bold mb-6">{tp("contactTitle")}</h2>
          <div className="space-y-3">
            <p className={azulSecondary}>
              {tp("contactEmail")} <a href={`mailto:${t("emailCancellation")}`} className="text-primary font-bold hover:underline">{t("emailCancellation")}</a>
            </p>
            <p className={azulSecondary}>{tp("contactPhone")} <span className="font-bold">{t("phone")}</span></p>
            <p className={azulSecondary}>{tp("contactSchedule")} <span className="font-bold">{t("schedule")}</span></p>
          </div>
        </section>
      </div>
    </article>
  );
}