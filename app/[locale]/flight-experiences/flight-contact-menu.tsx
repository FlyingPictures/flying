"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { CaretDownIcon, WhatsappLogoIcon } from "@phosphor-icons/react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { SITE_CONTACT } from "@/lib/site-config";

export function FlightContactMenu() {
  const t = useTranslations("flightExperiences.hero");
  const contact = useTranslations("contact.info");
  const message = encodeURIComponent(t("whatsappMessage"));
  const channels = [
    { label: contact("salesChannel"), number: SITE_CONTACT.display, url: `https://wa.me/${SITE_CONTACT.phoneDigits}` },
    { label: contact("supportChannel"), number: SITE_CONTACT.whatsappDisplay, url: SITE_CONTACT.whatsapp },
  ];

  return (
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger asChild>
        <Button variant="outline" size="lg" className="border border-background/35 bg-background/10 px-6 text-background shadow-none backdrop-blur-md hover:bg-background hover:text-secondary">
          <WhatsappLogoIcon size={20} aria-hidden="true" />
          {t("ctaSecondary")}
          <CaretDownIcon size={16} aria-hidden="true" />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content align="start" sideOffset={8} collisionPadding={12} className="z-50 min-w-[var(--radix-dropdown-menu-trigger-width)] rounded-2xl border border-secondary/15 bg-background p-2 text-secondary shadow-xl">
          {channels.map(({ label, number, url }) => (
            <DropdownMenu.Item key={number} asChild>
              <a href={`${url}?text=${message}`} target="_blank" rel="noopener noreferrer" className="flex flex-col rounded-xl px-4 py-3 outline-none data-[highlighted]:bg-secondary/10">
                <strong>{label}</strong>
                <span className="text-sm">{number}</span>
              </a>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
