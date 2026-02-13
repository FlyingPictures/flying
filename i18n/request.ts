import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  // Importa todos los archivos JSON y combínalos
  const messages = {
    ...(await import(`../locales/${locale}/common.json`)).default,
    ...(await import(`../locales/${locale}/contact.json`)).default,
    ...(await import(`../locales/${locale}/flight-experiences.json`)).default,
    ...(await import(`../locales/${locale}/home.json`)).default,
    ...(await import(`../locales/${locale}/legal.json`)).default,
    ...(await import(`../locales/${locale}/not-found.json`)).default,
    ...(await import(`../locales/${locale}/plan-your-visit.json`)).default,
    ...(await import(`../locales/${locale}/product.json`)).default,
    ...(await import(`../locales/${locale}/safety-heritage.json`)).default,
  };

  return {
    locale,
    messages,
  };
});