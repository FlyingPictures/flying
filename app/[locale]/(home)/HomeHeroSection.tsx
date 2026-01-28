"use client";

import { CloudinaryImage } from '@/components/ui/CloudinaryImage';
import { Button } from '@/components/ui/button';
import { 
  HeroContainer, HeroContent, HeroTitle, 
  HeroSubtitle, HeroDescription, HeroGallery 
} from '@/components/shared/hero-primitives';

const BRAND_LOGOS = [
  { publicId: 'v1769092252/bbclogo150150_kqylht', alt: 'BBC' },
  { publicId: 'v1769092252/columbiapogo150150_nuzc7v', alt: 'Columbia' },
  { publicId: 'v1769092252/Discoveryogo150150_qrubrn', alt: 'Discovery' },
  { publicId: 'v1769092252/natgeoogo150150_leob98', alt: 'National Geographic' },
  { publicId: 'v1769092252/redbullogo150150_z0uxsl', alt: 'Red Bull' },
  { publicId: 'v1769092252/telcelogo150150_wslrln', alt: 'Telcel' },
] as const;

export function HomeHeroSection() {
  return (
    <HeroContainer publicId="v1769270545/hero1_rszxmn" overlay>
      <HeroContent>
        {/* Estrellas */}
        <CloudinaryImage
          publicId="v1769270546/5_stars_xbtijo"
          alt="5 Stars"
          width={160}
          height={44}
          className="w-40 mb-2 h-auto object-contain"
        />  

        <HeroTitle>
          The Original <br/> Teotihuacán Balloon Flight.
        </HeroTitle>

        <HeroSubtitle>
          British precision. Mexican heart.
        </HeroSubtitle>

        <HeroDescription>
          Welcome to the safest balloon ride in Mexico.
        </HeroDescription>

        <div className="flex flex-col sm:flex-row gap-4 mt-2">
          <Button variant="outline" size="sm" className="bg-white text-black px-8">
            Check Flight Availability
          </Button>
          <Button variant="ghost" size="sm" className="text-white">
            Taking off at first light
          </Button>
        </div>

        {/* Cameron Branding */}
        <div className="flex items-center gap-4 mt-4">
          <CloudinaryImage 
            publicId="v1769096588/b5884911c3141d5efecb262d7371f5c738f8aff1_o9yrql" 
            alt="Cameron Logo" 
            width={70} height={30} className="w-16 object-contain" 
          />
          <em className="text-[0.75rem] text-white/90 leading-tight not-italic text-left">
            Powered by Cameron Balloons UK <br/>
            & a lifetime of safe landings.
          </em>
        </div>

        <HeroGallery logos={BRAND_LOGOS} />
      </HeroContent>
    </HeroContainer>
  );
}