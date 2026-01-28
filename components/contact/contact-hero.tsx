import { getTranslations } from "next-intl/server";
import { 
  HeroContainer, 
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

export async function ContactHero() {
  const t = await getTranslations("contact");

  return (
    <HeroContainer publicId={IMAGES.hero.contact}>
      <HeroContent>
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
    </HeroContainer>
  );
}