const DEFAULT_SITE_URL = "https://www.flyingpicturesmexico.mx";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL
).replace(/\/+$/, "");

export const SITE_NAME = "Flying Pictures México";

export const SITE_CONTACT = {
  phone: "+525580251057",
  phoneDigits: "525580251057",
  display: "(+52) 55 8025-1057",
  email: "ventas@flyingpictures.mx",
  whatsappPhone: "+525510484758",
  whatsapp: "https://wa.me/525510484758",
  whatsappDisplay: "(+52) 55 1048-4758",
  whatsappEmail: "volamoscontigo@flyingpictures.mx",
} as const;

export const SITE_LOCATION = {
  latitude: 19.6923323,
  longitude: -98.8244167,
  googleMaps:
    "https://www.google.com/maps/dir/?api=1&destination=19.6923323,-98.8244167",
  waze: "https://waze.com/ul?ll=19.6923323,-98.8244167&navigate=yes",
  embed:
    "https://www.google.com/maps?q=19.6923323,-98.8244167&z=15&output=embed",
} as const;

export const SITE_SOCIALS = [
  "https://www.facebook.com/flyingpicturesmexico",
  "https://www.instagram.com/flyingpictures_mexico",
] as const;

export const SITE_LOGO_URL = `${SITE_URL}/favicon.svg`;

export function localizedUrl(locale: string, path = "") {
  const normalizedPath = path && !path.startsWith("/") ? `/${path}` : path;
  return `${SITE_URL}/${locale}${normalizedPath}`;
}
