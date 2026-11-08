import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site-config";
import "./globals.css";

export const metadata: Metadata = {
  icons: { icon: { url: "/favicon.svg", type: "image/svg+xml" }, apple: "/apple-touch-icon.png" },
  metadataBase: new URL(SITE_URL),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
