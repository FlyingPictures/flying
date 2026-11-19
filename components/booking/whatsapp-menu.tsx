"use client";

import * as Menu from "@radix-ui/react-dropdown-menu";
import { CaretDownIcon } from "@phosphor-icons/react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import type { MouseEventHandler, ReactElement } from "react";
import { SALES_CONTACTS } from "@/lib/site-config";

interface WhatsAppMenuProps {
  children: ReactElement;
  message?: string;
  location?: string;
  packageId?: string;
  onOpenChange?: (open: boolean) => void;
  onContactClick?: MouseEventHandler<HTMLAnchorElement>;
  side?: "top" | "bottom";
  align?: "start" | "end";
}

export function WhatsAppMenu({
  children, message, location, packageId, onOpenChange, onContactClick,
  side = "top", align = "end",
}: WhatsAppMenuProps) {
  const t = useTranslations("contact.whatsapp");

  return (
    <Menu.Root modal={false} onOpenChange={onOpenChange}>
      <Menu.Trigger data-whatsapp-trigger data-cta-location={location} asChild>{children}</Menu.Trigger>
      <Menu.Portal>
        <Menu.Content data-cta-location={location} data-whatsapp-menu side={side} align={align}
          sideOffset={10} collisionPadding={12} aria-label={t("heading")}
          className="z-90 w-64 max-w-[calc(100vw-1.5rem)] max-h-[var(--radix-dropdown-menu-content-available-height)] overflow-y-auto rounded-2xl border border-border bg-background p-2 text-secondary shadow-2xl">
          <Menu.Label className="px-3 py-2 text-sm font-bold leading-snug">{t("heading")}</Menu.Label>
          <Menu.Group className="space-y-2">
            {SALES_CONTACTS.map(({ name, display, whatsapp, photoSrc }) => (
              <Menu.Item asChild key={name}>
                <a href={message ? `${whatsapp}?text=${encodeURIComponent(message)}` : whatsapp}
                  target="_blank" rel="noopener noreferrer" data-package-id={packageId}
                  onClick={onContactClick} aria-label={t("contactLabel", { name, phone: display })}
                  className="flex cursor-pointer items-center gap-3 rounded-xl border border-secondary/25 bg-background px-3 py-3 outline-none transition-colors data-[highlighted]:border-primary data-[highlighted]:bg-primary/10">
                  <span data-contact-photo={name} aria-hidden="true" className="relative flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full border border-secondary/10 bg-secondary/[.05] text-sm font-semibold text-secondary/70">
                    {photoSrc ? <Image src={photoSrc} width={32} height={32} alt="" className="size-full object-cover" /> : name[0]}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold">{name}</span>
                    <span className="block whitespace-nowrap text-sm tabular-nums text-secondary/70">{display}</span>
                  </span>
                </a>
              </Menu.Item>
            ))}
          </Menu.Group>
        </Menu.Content>
      </Menu.Portal>
    </Menu.Root>
  );
}

export function WhatsAppMenuCaret() {
  return <CaretDownIcon size={14} aria-hidden="true" className="shrink-0" />;
}
