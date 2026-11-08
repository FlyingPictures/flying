import Image from "next/image";
import logo from "@/public/cameron-balloons.png";

export function CameronBalloonsLogo({ className }: { className: string }) {
  return (
    <Image
      src={logo}
      alt="Cameron Balloons"
      unoptimized
      className={`h-auto shrink-0 ${className}`}
    />
  );
}
