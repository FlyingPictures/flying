"use client";

import * as Menu from "@radix-ui/react-dropdown-menu";
import { CaretDownIcon, ChatCircleDotsIcon, PhoneIcon, WhatsappLogoIcon } from "@phosphor-icons/react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import type { MouseEventHandler, ReactElement } from "react";
import { BrandLogo } from "@/components/BrandLogo";
import { usePathname } from "@/i18n/routing";
import { getInquiryMessage, getProductName, type ProductSlug } from "@/lib/commercial-config";
import { SALES_CONTACTS } from "@/lib/site-config";
import { resolveWhatsAppContext } from "@/lib/whatsapp-context";

interface WhatsAppMenuProps {
  children: ReactElement;
  message?: string;
  location?: string;
  packageId?: ProductSlug;
  onOpenChange?: (open: boolean) => void;
  onContactClick?: MouseEventHandler<HTMLAnchorElement>;
  side?: "top" | "bottom";
  align?: "start" | "end";
}

function WhatsAppContacts({ message, packageId, onContactClick }: Pick<WhatsAppMenuProps, "message" | "packageId" | "onContactClick">) {
  const t = useTranslations("contact.whatsapp");
  const locale = useLocale();
  const context = resolveWhatsAppContext(usePathname(), packageId);
  const product = context.packageId ? getProductName(context.packageId, locale) : "";
  const inquiry = message ?? (context.packageId
    ? getInquiryMessage(context.packageId, locale)
    : t(`messages.${context.key}`));

  return (
    <>
      <Menu.Label className="flex items-start gap-3 border-b border-[#e9edef] bg-[#f0f2f5] px-4 py-3">
        <span data-contact-brand-avatar className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white bg-[#ed1c24] p-1.5 shadow-sm">
          <BrandLogo className="size-full object-contain" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-base font-semibold leading-snug text-[#111b21]">{t("heading")}</span>
          <span className="mt-2 flex items-center gap-1.5 text-sm font-normal text-[#008069]">
            <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-[#25d366]" />
            {t("online")}
          </span>
        </span>
      </Menu.Label>
      <div className="divide-y divide-[#e9edef] px-4">
        {SALES_CONTACTS.map(({ name, phone, display, whatsapp, photoSrc }) => (
          <Menu.Group key={name} aria-label={name} className="py-3">
            <div className="flex items-start gap-3">
              <span data-contact-photo={name} aria-hidden="true" className="relative flex size-12 shrink-0 items-center justify-center rounded-full bg-[#d9fdd3] text-lg font-medium text-[#008069]">
                {photoSrc ? <Image src={photoSrc} width={48} height={48} alt="" className="size-full rounded-full object-cover" /> : name[0]}
                <span className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-white bg-[#25d366]" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-base font-medium text-[#111b21]">{name}</span>
                <span title={t(`previews.${context.key}.${name}`, { product })} className="mt-0.5 block truncate text-sm leading-snug text-[#54656f]">{t(`previews.${context.key}.${name}`, { product })}</span>
                <span className="mt-1 block whitespace-nowrap text-sm tabular-nums text-[#667781]">{display}</span>
              </span>
            </div>
            <div className="mt-3 grid grid-cols-[1fr_auto] items-center gap-3">
              <Menu.Item asChild>
                <a href={`${whatsapp}?text=${encodeURIComponent(inquiry)}`}
                  target="_blank" rel="noopener noreferrer" data-package-id={context.packageId}
                  onClick={onContactClick} aria-label={t("contactLabel", { name, phone: display })}
                  className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-1.5 rounded-full border border-[#008069] bg-[#008069] px-2 text-sm font-semibold text-white outline-none transition-colors data-[highlighted]:border-[#005c4b] data-[highlighted]:bg-[#005c4b]">
                  <WhatsappLogoIcon size={18} aria-hidden="true" />{t("whatsappAction")}
                </a>
              </Menu.Item>
              <Menu.Item asChild>
                <a href={`tel:${phone}`} data-package-id={context.packageId}
                  onClick={onContactClick} aria-label={t("callLabel", { name, phone: display })} title={t("callAction")}
                  className="inline-flex size-12 cursor-pointer items-center justify-center rounded-full border border-[#0eab61] bg-[#0eab61] text-white outline-none transition-colors data-[highlighted]:border-[#078c4e] data-[highlighted]:bg-[#078c4e] data-[highlighted]:ring-2 data-[highlighted]:ring-[#0eab61]/30 data-[highlighted]:ring-offset-2">
                  <PhoneIcon size={24} weight="fill" aria-hidden="true" /><span className="sr-only">{t("callAction")}</span>
                </a>
              </Menu.Item>
            </div>
          </Menu.Group>
        ))}
      </div>
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

export function ContactMenuLabel() {
  const t = useTranslations("contact.whatsapp");
  return <><ChatCircleDotsIcon size={18} aria-hidden="true" />{t("button")}<WhatsAppMenuCaret /></>;
}
