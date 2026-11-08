"use client";

import * as Menu from "@radix-ui/react-dropdown-menu";
import { Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { SITE_CONTACT } from "@/lib/site-config";

export function CallMenu({ onOpenChange }: { onOpenChange?: (open: boolean) => void }) {
  const t = useTranslations("nav");
  const lines = [
    [t("salesLine"), SITE_CONTACT.phone, SITE_CONTACT.display],
    [t("serviceLine"), SITE_CONTACT.whatsappPhone, SITE_CONTACT.whatsappDisplay],
  ];

  return (
    <Menu.Root modal={false} onOpenChange={onOpenChange}>
      <Menu.Trigger asChild>
        <button type="button" className="inline-flex min-h-11 shrink-0 items-center justify-center gap-1.5 rounded-full px-2.5 text-xs font-bold text-secondary hover:bg-secondary/8 focus-visible:ring-2 focus-visible:ring-primary sm:px-4 sm:text-sm">
          <Phone size={17} aria-hidden="true" />{t("call")}
        </button>
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Content side="top" align="end" sideOffset={10} collisionPadding={12} aria-label={t("call")}
          className="z-90 w-64 max-w-[calc(100vw-1.5rem)] rounded-2xl border border-border bg-background p-2 text-secondary shadow-2xl">
          {lines.map(([label, phone, display]) => (
            <Menu.Item asChild key={phone}>
              <a href={`tel:${phone}`} className="flex items-center gap-3 rounded-xl px-3 py-3 outline-none data-[highlighted]:bg-secondary/8">
                <Phone size={20} aria-hidden="true" />
                <span><span className="block text-xs font-semibold">{label}</span>
                  <strong className="tabular-nums">{display}</strong></span>
              </a>
            </Menu.Item>
          ))}
        </Menu.Content>
      </Menu.Portal>
    </Menu.Root>
  );
}
