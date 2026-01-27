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

  return (
    <article className="container mx-auto px-4 pt-[3rem] lg:pt-[13rem] pb-16 max-w-4xl">
      <header className="mb-12">
        <h1 className="text-h1 text-secondary font-bold">
          {t("cancellationTitle")}
        </h1>
        <p className="text-body text-muted-foreground mt-4">
          {t("cancellationDescription")}
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
            {tp("customerTitle")}
          </h2>
          <p className="mb-4">{tp("customerIntro")}</p>
          
          <div className="bg-muted/50 rounded-lg p-6 mb-6">
            <h3 className="text-h5 text-secondary font-semibold mb-4">
              {t("pricingTitle")}
            </h3>
            <div className="grid gap-4">
              <div className="border-l-4 border-green-500 pl-4">
                <p className="font-medium">72+ horas de anticipación</p>
                <p className="text-muted-foreground">{tp("refund72")}</p>
              </div>
              <div className="border-l-4 border-yellow-500 pl-4">
                <p className="font-medium">24-72 horas de anticipación</p>
                <p className="text-muted-foreground">{tp("refund48")}</p>
              </div>
              <div className="border-l-4 border-red-500 pl-4">
                <p className="font-medium">Menos de 24 horas</p>
                <p className="text-muted-foreground">{tp("refund24")}</p>
              </div>
            </div>
          </div>

          <p>{tp("customerNote")}</p>
        </section>

        <section>
          <h2 className="text-h4 text-secondary font-semibold mb-4">
            {tp("noshowTitle")}
          </h2>
          <p>{tp("noshowText")}</p>
        </section>

        <section>
          <h2 className="text-h4 text-secondary font-semibold mb-4">
            {tp("changesTitle")}
          </h2>
          <p className="mb-4">{tp("changesIntro")}</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>{tp("change72")}</li>
            <li>{tp("change48")}</li>
            <li>{tp("change24")}</li>
          </ul>
          <p className="mt-4">{tp("changesNote")}</p>
        </section>

        <section>
          <h2 className="text-h4 text-secondary font-semibold mb-4">
            {tp("weatherTitle")}
          </h2>
          <p className="mb-4">{tp("weatherIntro")}</p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li dangerouslySetInnerHTML={{ __html: tp("weatherRefund") }} />
            <li dangerouslySetInnerHTML={{ __html: tp("weatherReschedule") }} />
            <li dangerouslySetInnerHTML={{ __html: tp("weatherCredit") }} />
          </ul>
          <p>{tp("weatherNote")}</p>
        </section>

        <section>
          <h2 className="text-h4 text-secondary font-semibold mb-4">
            {tp("healthTitle")}
          </h2>
          <p className="mb-4">{tp("healthIntro")}</p>
          <ul className="list-disc pl-6 space-y-2">
            <li dangerouslySetInnerHTML={{ __html: tp("healthWithCert") }} />
            <li dangerouslySetInnerHTML={{ __html: tp("healthWithoutCert") }} />
          </ul>
          <p className="mt-4">{tp("healthNote")}</p>
        </section>

        <section>
          <h2 className="text-h4 text-secondary font-semibold mb-4">
            {tp("processTitle")}
          </h2>
          <p className="mb-4">{tp("processIntro")}</p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>{tp("process1")}</li>
            <li>{tp("process2")}</li>
            <li>{tp("process3")}</li>
            <li>{tp("process4")}</li>
            <li>{tp("process5")}</li>
            <li>{tp("process6")}</li>
          </ol>
        </section>

        <section>
          <h2 className="text-h4 text-secondary font-semibold mb-4">
            {tp("groupsTitle")}
          </h2>
          <p>{tp("groupsText")}</p>
        </section>

        <section>
          <h2 className="text-h4 text-secondary font-semibold mb-4">
            {tp("insuranceTitle")}
          </h2>
          <p>{tp("insuranceText")}</p>
        </section>

        <section>
          <h2 className="text-h4 text-secondary font-semibold mb-4">
            {tp("exceptionsTitle")}
          </h2>
          <p>{tp("exceptionsText")}</p>
        </section>

        <section>
          <h2 className="text-h4 text-secondary font-semibold mb-4">
            {tp("contactTitle")}
          </h2>
          <p className="mb-2">
            {tp("contactEmail")}{" "}
            <a
              href={`mailto:${t("emailCancellation")}`}
              className="text-primary hover:underline"
            >
              {t("emailCancellation")}
            </a>
          </p>
          <p className="mb-2">{t("contactPhone")} {t("phone")}</p>
          <p>{t("contactSchedule")} {t("schedule")}</p>
        </section>
      </div>
    </article>
  );
}
