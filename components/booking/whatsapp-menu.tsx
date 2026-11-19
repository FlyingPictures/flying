"use client";

import * as Menu from "@radix-ui/react-dropdown-menu";
import { CaretDownIcon, WhatsappLogoIcon } from "@phosphor-icons/react";
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
          sideOffset={12} collisionPadding={12} aria-label={t("heading")}
          className="z-90 w-80 max-w-[calc(100vw-1.5rem)] max-h-[var(--radix-dropdown-menu-content-available-height)] overflow-y-auto rounded-3xl border border-secondary/10 bg-background p-2.5 text-secondary shadow-[0_16px_60px_rgba(3,48,59,.22)]">
          <Menu.Label className="px-3 pb-4 pt-3">
            <span className="block max-w-60 font-poppins text-lg font-semibold leading-snug">{t("heading")}</span>
          </Menu.Label>
          <Menu.Group className="space-y-1.5">
            {SALES_CONTACTS.map(({ name, display, whatsapp, photoSrc }) => (
              <Menu.Item asChild key={name}>
                <a href={message ? `${whatsapp}?text=${encodeURIComponent(message)}` : whatsapp}
                  target="_blank" rel="noopener noreferrer" data-package-id={packageId}
                  onClick={onContactClick} aria-label={t("contactLabel", { name, phone: display })}
                  className="group flex min-h-20 items-center gap-3 rounded-2xl border border-secondary/10 px-3 py-3 outline-none transition-colors data-[highlighted]:border-[#18794e]/30 data-[highlighted]:bg-[#18794e]/[.06]">
                  <span data-contact-photo={name} aria-hidden="true" className="relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-secondary/10 bg-secondary/[.05] font-poppins text-xl font-semibold text-secondary/65">
                    {photoSrc ? <Image src={photoSrc} width={48} height={48} alt="" className="size-full object-cover" /> : name[0]}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-base font-bold">{name}</span>
                    <span className="block text-sm tabular-nums text-secondary/65">{display}</span>
                  </span>
                  <span aria-hidden="true" className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#18794e]/[.08] text-[#18794e] group-data-[highlighted]:bg-[#18794e]/15">
                    <WhatsappLogoIcon size={21} />
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
