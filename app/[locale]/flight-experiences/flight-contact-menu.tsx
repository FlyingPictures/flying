"use client";

import { WhatsappLogoIcon } from "@phosphor-icons/react";
import { useTranslations } from "next-intl";
import { WhatsAppMenu, WhatsAppMenuCaret } from "@/components/booking/whatsapp-menu";
import { Button } from "@/components/ui/button";

export function FlightContactMenu() {
  const t = useTranslations("flightExperiences.hero");

  return (
    <WhatsAppMenu message={t("whatsappMessage")} location="catalog_header" side="bottom" align="start">
      <Button variant="outline" size="lg" className="border border-background/35 bg-background/10 px-6 text-background shadow-none backdrop-blur-md hover:bg-background hover:text-secondary">
        <WhatsappLogoIcon size={20} aria-hidden="true" />
        {t("ctaSecondary")}<WhatsAppMenuCaret />
      </Button>
    </WhatsAppMenu>
  );
}
