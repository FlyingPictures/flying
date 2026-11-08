import Image from "next/image";

export function BrandLogo({ className, priority = false }: { className: string; priority?: boolean }) {
  return (
    <Image src="/favicon.svg" alt="Flying Pictures México" width={123} height={155}
      unoptimized priority={priority} className={className} />
  );
}
