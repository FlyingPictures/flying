"use client";

import * as Menu from "@radix-ui/react-dropdown-menu";
import { Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { SALES_CONTACTS } from "@/lib/site-config";

export function CallMenu({ location, onOpenChange }: { location: "floating_bar" | "product_gallery"; onOpenChange?: (open: boolean) => void }) {
  const t = useTranslations("nav");
  const contact = useTranslations("contact.info");

  return (
    <Menu.Root modal={false} onOpenChange={onOpenChange}>
      <Menu.Trigger asChild>
        <button type="button" className="inline-flex min-h-11 shrink-0 items-center justify-center gap-1.5 rounded-full px-2.5 text-xs font-bold text-secondary hover:bg-secondary/8 focus-visible:ring-2 focus-visible:ring-primary sm:px-4 sm:text-sm">
          <Phone size={17} aria-hidden="true" />{t("call")}
        </button>
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Content data-cta-location={location} side="top" align="end" sideOffset={10} collisionPadding={12} aria-label={t("call")}
          className="z-90 w-64 max-w-[calc(100vw-1.5rem)] rounded-2xl border border-border bg-background p-2 text-secondary shadow-2xl">
          <Menu.Label className="px-3 py-2 text-sm font-bold leading-snug">{contact("contactHeading")}</Menu.Label>
          <Menu.Group className="space-y-2">
            {SALES_CONTACTS.map(({ name, phone, display }) => (
              <Menu.Item asChild key={phone}>
                <a href={`tel:${phone}`} className="flex cursor-pointer items-center gap-3 rounded-xl border border-secondary/25 bg-background px-3 py-3 outline-none transition-colors data-[highlighted]:border-primary data-[highlighted]:bg-primary/10">
                  <Phone size={20} aria-hidden="true" className="shrink-0" />
                  <span>
                    <span className="block font-semibold">{name}</span>
                    <span className="block text-sm tabular-nums text-secondary/70">{display}</span>
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
