import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.flyingpicturesmexico.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal" });
  return {
    title: t("cancellationTitle"),
    description: t("cancellationDescription"),
    alternates: {
      canonical: `${SITE_URL}/${locale}/legal/cancellation`,
      languages: { es: `${SITE_URL}/es/legal/cancellation`, en: `${SITE_URL}/en/legal/cancellation`, "x-default": `${SITE_URL}/en/legal/cancellation` },
    },
  };
}

export default async function CancellationPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal" });
  const tp = await getTranslations({ locale, namespace: "legal.cancellation" });

  return (
    <article className="container mx-auto px-6 pt-24 lg:pt-52 pb-24 max-w-4xl text-secondary">
      <header className="mb-12 border-b border-secondary/20 pb-8">
        <h1 className="mb-4">{t("cancellationTitle")}</h1>
        <p className="text-muted-foreground text-lg mt-4">{t("cancellationDescription")}</p>
        <p className="text-muted-foreground text-sm mt-2">{t("lastUpdated")}: 17 de enero de 2026</p>
      </header>

      <div className="space-y-12">

        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">{tp("introTitle")}</h2>
          <p>{tp("introText")}</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">{tp("customerTitle")}</h2>
          <p>{tp("customerIntro")}</p>
          <div className="bg-secondary/5 rounded-xl p-6 border border-secondary/10 my-4">
            <div className="grid gap-4">
              {(["refund72", "refund48", "refund24"] as const).map((key, i) => (
                <div key={key} className={`border-l-4 pl-4 ${i === 0 ? "border-green-500" : i === 1 ? "border-yellow-500" : "border-red-500"}`}>
                  <p className="font-bold">{tp(key)}</p>
                </div>
              ))}
            </div>
          </div>
          <p>{tp("customerNote")}</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">{tp("noshowTitle")}</h2>
          <p>{tp("noshowText")}</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">{tp("changesTitle")}</h2>
          <p>{tp("changesIntro")}</p>
          <ul className="list-disc pl-6 space-y-3 mt-4">
            {(["change72", "change48", "change24"] as const).map(k => <li key={k}>{tp(k)}</li>)}
          </ul>
          <p className="mt-4">{tp("changesNote")}</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">{tp("weatherTitle")}</h2>
          <p>{tp("weatherIntro")}</p>
          <ul className="list-disc pl-6 space-y-3 mt-4">
            {(["weatherRefund", "weatherReschedule", "weatherCredit"] as const).map(k => <li key={k}>{tp(k)}</li>)}
          </ul>
          <p className="italic mt-4">{tp("weatherNote")}</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">{tp("healthTitle")}</h2>
          <p>{tp("healthIntro")}</p>
          <ul className="list-disc pl-6 space-y-3 mt-4">
            {(["healthWithCert", "healthWithoutCert"] as const).map(k => <li key={k}>{tp(k)}</li>)}
          </ul>
          <p className="mt-4">{tp("healthNote")}</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">{tp("processTitle")}</h2>
          <p>{tp("processIntro")}</p>
          <ol className="list-decimal pl-6 space-y-3 mt-4">
            {(["process1", "process2", "process3", "process4", "process5", "process6"] as const).map(k => <li key={k}>{tp(k)}</li>)}
          </ol>
        </section>

        {(["groups", "insurance", "exceptions"] as const).map(key => (
          <section key={key}>
            <h2 className="text-2xl font-bold tracking-tight mb-4">{tp(`${key}Title`)}</h2>
            <p>{tp(`${key}Text`)}</p>
          </section>
        ))}

        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">{tp("contactTitle")}</h2>
          <p>{tp("contactEmail")} <a href={`mailto:${t("emailCancellation")}`} className="text-primary font-bold hover:underline">{t("emailCancellation")}</a></p>
          <p className="mt-2">{tp("contactPhone")} <span className="font-bold">{t("phone")}</span></p>
          <p className="mt-2">{tp("contactSchedule")} <span className="font-bold">{t("schedule")}</span></p>
        </section>

      </div>
    </article>
  );
}