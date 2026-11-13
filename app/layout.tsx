import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site-config";
import { getLocale } from "next-intl/server";
import "./globals.css";

export const metadata: Metadata = {
  icons: { icon: { url: "/favicon.svg", type: "image/svg+xml" }, apple: "/apple-touch-icon.png" },
  metadataBase: new URL(SITE_URL),
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={await getLocale()} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
