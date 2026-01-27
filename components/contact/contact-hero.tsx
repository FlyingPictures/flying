import { getTranslations } from "next-intl/server";
import { 
  HeroContainer, 
  HeroBackground, 
  HeroContent, 
  HeroTitle, 
  HeroSubtitle, 
  HeroDescription 
} from "@/components/shared/hero-primitives";

const CONTACT_HERO_IMAGE = 'v1769106748/contact_hero_hb2kwa';

const SPACING = {
  TITLE_TO_SUBTITLE: 'mb-4 sm:mb-5 md:mb-6',
  SUBTITLE_TO_DESCRIPTION: 'mb-4 sm:mb-5 md:mb-6',
} as const;

export async function ContactHero() {
  const t = await getTranslations("contact");

  return (
    <HeroContainer height="default">
      <HeroBackground publicId={CONTACT_HERO_IMAGE}>
        <HeroContent verticalAlign="center">
          <HeroTitle className={SPACING.TITLE_TO_SUBTITLE}>
            {t("heroTitle")}
          </HeroTitle>
          
          <HeroSubtitle className={SPACING.SUBTITLE_TO_DESCRIPTION}>
            {t("heroSubtitle")}
          </HeroSubtitle>
          
          <HeroDescription>
            {t("heroDescription")}
          </HeroDescription>
        </HeroContent>
      </HeroBackground>
    </HeroContainer>
  );
}