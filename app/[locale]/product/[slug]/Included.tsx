import { getTranslations } from "next-intl/server";

// ── Icons — replace with your actual SVGs ─────────────────────────────────────
const FlightIcon = () => (
  <svg width="40" height="40" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* TODO: flight/clock icon */}
    <rect x="1" y="1" width="47" height="47" rx="6" stroke="#03303B" strokeWidth="1.5"/>
  </svg>
);
const CoffeeIcon = () => (
  <svg width="40" height="40" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* TODO: coffee icon */}
    <rect x="1" y="1" width="47" height="47" rx="6" stroke="#03303B" strokeWidth="1.5"/>
  </svg>
);
const CertificateIcon = () => (
  <svg width="40" height="40" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* TODO: certificate icon */}
    <rect x="1" y="1" width="47" height="47" rx="6" stroke="#03303B" strokeWidth="1.5"/>
  </svg>
);
const ToastIcon = () => (
  <svg width="40" height="40" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* TODO: toast/wine icon */}
    <rect x="1" y="1" width="47" height="47" rx="6" stroke="#03303B" strokeWidth="1.5"/>
  </svg>
);
const InsuranceIcon = () => (
  <svg width="40" height="40" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* TODO: insurance/shield icon */}
    <rect x="1" y="1" width="47" height="47" rx="6" stroke="#03303B" strokeWidth="1.5"/>
  </svg>
);
const PilotsIcon = () => (
  <svg width="40" height="40" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* TODO: pilots/star icon */}
    <rect x="1" y="1" width="47" height="47" rx="6" stroke="#03303B" strokeWidth="1.5"/>
  </svg>
);

// ── Config ────────────────────────────────────────────────────────────────────
const ITEMS = [
  { icon: <FlightIcon />,      titleKey: "included1", descKey: "description1" },
  { icon: <ToastIcon />,       titleKey: "included4", descKey: "description4" },
  { icon: <CoffeeIcon />,      titleKey: "included2", descKey: "description2" },
  { icon: <InsuranceIcon />,   titleKey: "included5", descKey: "description5" },
  { icon: <CertificateIcon />, titleKey: "included3", descKey: "description3" },
  { icon: <PilotsIcon />,      titleKey: "included6", descKey: "description6" },
] as const;

// ── Server Component ──────────────────────────────────────────────────────────
export default async function Included() {
  const t = await getTranslations("product.included");

  return (
    <section className="w-full flex flex-col items-center px-4 md:px-10 lg:px-20 py-12 gap-8 lg:gap-16">
      <div className="w-full h-px bg-border" />

      <h3 className="w-full text-left lg:text-center">{t("title")}</h3>

      <div className="w-full max-w-180 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
        {ITEMS.map(({ icon, titleKey, descKey }) => (
          <div key={titleKey} className="flex items-start gap-4">
            <div className="shrink-0">{icon}</div>
            <div className="flex flex-col gap-1">
              <h5 className="font-bold text-lg">{t(titleKey)}</h5>
              <p className="text-sm leading-relaxed">{t(descKey)}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}