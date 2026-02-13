import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import fs from "fs";
import path from "path";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  const localePath = path.join(process.cwd(), "locales", locale);
  const files = fs.readdirSync(localePath);

  const messages = {};

  for (const file of files) {
    if (file.endsWith(".json")) {
      const content = (await import(`../locales/${locale}/${file}`)).default;
      Object.assign(messages, content);
    }
  }

  return {
    locale,
    messages
  };
});
