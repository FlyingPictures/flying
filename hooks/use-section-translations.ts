// hooks/use-section-translations.ts
import { useTranslations } from 'next-intl';

/**
 * Hook personalizado para obtener traducciones de secciones comunes
 * Aplica principio DRY para evitar repetir useTranslations
 */
export function useSectionTranslations() {
  const nav = useTranslations('nav');
  const hero = useTranslations('herosection');
  const flightOptions = useTranslations('flightOptions');
  const reviews = useTranslations('reviews');
  const weather = useTranslations('weather');
  const tradition = useTranslations('tradition');

  return {
    nav,
    hero,
    flightOptions,
    reviews,
    weather,
    tradition,
  };
}
