"use client";

import { CloudinaryImage } from '@/components/ui/CloudinaryImage';
import { Button } from '@/components/ui/button';
import { 
  HeroContainer, HeroBackground, HeroContent, 
  HeroTitle, HeroSubtitle, HeroDescription, HeroGallery 
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
    <HeroContainer>
      <HeroBackground publicId="v1769270545/hero1_rszxmn" overlay />
      
      <HeroContent>
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
          British precision. Mexican heart. <br/>
          The morning view of a lifetime.
        </HeroSubtitle>

        <HeroDescription>
          We’ve spent many decades proving that the best adventures <br/> 
          are the ones designed with engineering rigour. <br/>
          Welcome to the safest balloon ride in Mexico.
        </HeroDescription>

        <div className="flex flex-col sm:flex-row gap-4 mt-2 items-center justify-center">
          <Button variant="outline"size="sm" className="bg-white text-black hover:bg-white/90 px-8">
            Check Flight Availability
          </Button>
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex text-white hover:bg-white/10">
            Taking off at first light
          </Button>
        </div>

        <div className="flex items-center gap-4 mt-4">
          <CloudinaryImage 
            publicId="v1769096588/b5884911c3141d5efecb262d7371f5c738f8aff1_o9yrql" 
            alt="Cameron Logo" 
            width={70} 
            height={30} 
            className="w-16 object-contain" 
          />
          <em className="text-[0.75rem]">
            Powered by Cameron Balloons UK <br/>
            & a lifetime of safe landings.
          </em>
        </div>

        <HeroGallery logos={BRAND_LOGOS} />
      </HeroContent>
    </HeroContainer>
  );
}