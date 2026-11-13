"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { CaretDownIcon, WhatsappLogoIcon } from "@phosphor-icons/react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { CONTACT_LINES } from "@/lib/site-config";

export function FlightContactMenu() {
  const t = useTranslations("flightExperiences.hero");
  const contact = useTranslations("contact.info");
  const message = encodeURIComponent(t("whatsappMessage"));

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
        <DropdownMenu.Content align="start" sideOffset={8} collisionPadding={12} className="z-50 w-72 max-w-[calc(100vw-1.5rem)] rounded-2xl border border-secondary/15 bg-background p-2 text-secondary shadow-xl">
          <DropdownMenu.Label className="px-4 py-2 text-sm font-bold leading-snug">{contact("contactHeading")}</DropdownMenu.Label>
          {CONTACT_LINES.map(({ display, whatsapp }) => (
            <DropdownMenu.Item key={display} asChild>
              <a href={`${whatsapp}?text=${message}`} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center gap-3 rounded-xl px-4 py-3 outline-none data-[highlighted]:bg-secondary/10">
                <WhatsappLogoIcon size={20} aria-hidden="true" />
                <span className="font-semibold tabular-nums">{display}</span>
              </a>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
