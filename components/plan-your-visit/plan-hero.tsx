import { getTranslations } from "next-intl/server";
import { 
  HeroContainer, 
  HeroBackground, 
  HeroContent, 
  HeroTitle, 
  HeroSubtitle, 
  HeroDescription 
} from "@/components/shared/hero-primitives";

const PLAN_HERO_IMAGE = 'v1769106749/plan_hero_drpbt9';

const SPACING = {
  TITLE_TO_SUBTITLE: 'mb-4 sm:mb-5 md:mb-6',
  SUBTITLE_TO_DESCRIPTION: 'mb-4 sm:mb-5 md:mb-6',
} as const;

export async function PlanHero() {
  const t = await getTranslations("planYourVisit.hero");

  return (
    <HeroContainer height="default">
      <HeroBackground publicId={PLAN_HERO_IMAGE}>
        <HeroContent verticalAlign="center">
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