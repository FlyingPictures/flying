"use client";

import * as Menu from "@radix-ui/react-dropdown-menu";
import { CaretDownIcon, WhatsappLogoIcon } from "@phosphor-icons/react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useSyncExternalStore, type MouseEventHandler, type ReactElement } from "react";
import { isBusinessOpen } from "@/lib/commercial-config";
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

function subscribeToBusinessHours(update: () => void) {
  const timer = window.setInterval(update, 60_000);
  return () => window.clearInterval(timer);
}

function WhatsAppContacts({ message, packageId, onContactClick }: Pick<WhatsAppMenuProps, "message" | "packageId" | "onContactClick">) {
  const t = useTranslations("contact.whatsapp");
  const concierge = useTranslations("concierge");
  const available = useSyncExternalStore(subscribeToBusinessHours, isBusinessOpen, () => false);

  return (
    <>
      <Menu.Label className="border-b border-[#e9edef] bg-[#f0f2f5] px-4 py-4">
        <span className="block text-base font-semibold leading-snug text-[#111b21]">{t("heading")}</span>
        <span title={`${concierge("hours")} · ${concierge("location")}`} className={`mt-2 flex items-center gap-1.5 text-sm font-normal ${available ? "text-[#008069]" : "text-[#54656f]"}`}>
          <span aria-hidden="true" className={`size-2 shrink-0 rounded-full ${available ? "bg-[#25d366]" : "bg-[#8696a0]"}`} />
          {t(available ? "serviceOpen" : "serviceClosed")}
        </span>
      </Menu.Label>
      <Menu.Group className="space-y-1.5 p-2">
        {SALES_CONTACTS.map(({ name, display, whatsapp, photoSrc }) => (
          <Menu.Item asChild key={name}>
            <a href={message ? `${whatsapp}?text=${encodeURIComponent(message)}` : whatsapp}
              target="_blank" rel="noopener noreferrer" data-package-id={packageId}
              onClick={onContactClick} aria-label={t("contactLabel", { name, phone: display })}
              className="group flex cursor-pointer items-center gap-3 rounded-xl border border-[#e9edef] bg-white px-3 py-3 outline-none transition-colors data-[highlighted]:border-[#25d366] data-[highlighted]:bg-[#f0f2f5]">
              <span data-contact-photo={name} aria-hidden="true" className="relative flex size-11 shrink-0 items-center justify-center rounded-full bg-[#e9edef] text-lg font-medium text-[#54656f]">
                {photoSrc ? <Image src={photoSrc} width={44} height={44} alt="" className="size-full rounded-full object-cover" /> : name[0]}
                <span className={`absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-white ${available ? "bg-[#25d366]" : "bg-[#8696a0]"}`} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center justify-between gap-2">
                  <span className="text-base font-semibold text-[#111b21]">{name}</span>
                  <WhatsappLogoIcon size={18} aria-hidden="true" className="shrink-0 text-[#008069]" />
                </span>
                <span title={t(`previews.${name}`)} className="mt-0.5 block truncate text-sm leading-snug text-[#54656f]">{t(`previews.${name}`)}</span>
                <span className="mt-1 block whitespace-nowrap text-sm tabular-nums text-[#667781]">{display}</span>
              </span>
            </a>
          </Menu.Item>
        ))}
      </Menu.Group>
    </>
  );
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
          className="z-90 w-80 max-w-[calc(100vw-1.5rem)] max-h-[var(--radix-dropdown-menu-content-available-height)] overflow-y-auto rounded-2xl border border-[#e9edef] bg-white text-[#111b21] shadow-2xl">
          <WhatsAppContacts message={message} packageId={packageId} onContactClick={onContactClick} />
        </Menu.Content>
      </Menu.Portal>
    </Menu.Root>
  );
}

export function WhatsAppMenuCaret() {
  return <CaretDownIcon size={14} aria-hidden="true" className="shrink-0" />;
}
