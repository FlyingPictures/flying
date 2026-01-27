import { getTranslations } from "next-intl/server";
import { 
  HeroContainer, 
  HeroBackground, 
  HeroContent, 
  HeroTitle, 
  HeroSubtitle, 
  HeroDescription 
} from "@/components/shared/hero-primitives";
import { IMAGES } from '@/lib/cloudinary';

const SPACING = {
  TITLE_TO_SUBTITLE: 'mb-4 sm:mb-5 md:mb-6',
  SUBTITLE_TO_DESCRIPTION: 'mb-4 sm:mb-5 md:mb-6',
} as const;

export async function SafetyHero() {
  const t = await getTranslations("safetyHeritage.hero");

  return (
    <HeroContainer>
      <HeroBackground publicId={IMAGES.hero.safety}>
        <HeroContent>
          <HeroTitle className={SPACING.TITLE_TO_SUBTITLE}>
            {t("title")}
          </HeroTitle>
          
          <HeroSubtitle className={SPACING.SUBTITLE_TO_DESCRIPTION}>
            {t("subtitle")}
          </HeroSubtitle>
          
          <HeroDescription>
            {t("description")}
          </HeroDescription>
        </HeroContent>
      </HeroBackground>
    </HeroContainer>
  );
}