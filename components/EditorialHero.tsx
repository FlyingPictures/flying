import { CloudinaryImage } from "@/components/CloudinaryImage";

type EditorialHeroProps = {
  image: string;
  title: string;
  subtitle: string;
  description: string;
};

export function EditorialHero({ image, title, subtitle, description }: EditorialHeroProps) {
  return (
    <section className="relative isolate bg-secondary text-background">
      <div className="relative flex min-h-[68svh] flex-col justify-end px-6 pb-6 pt-[max(12rem,35svh)] sm:static sm:min-h-0 sm:items-center sm:pt-[max(16rem,48svh)] sm:text-center">
        <div className="absolute inset-0 overflow-hidden">
          <CloudinaryImage publicId={image} alt="" fill priority sizes="100vw" className="object-top" />
          <div className="absolute inset-0 bg-linear-to-t from-secondary via-secondary/20 to-transparent" />
        </div>
        <h1 className="title hero hero-enter relative max-sm:text-left sm:whitespace-pre-line">{title}</h1>
        <p className="decorative hero hero-enter hero-follow relative mt-3! max-w-2xl max-sm:text-left">{subtitle}</p>
      </div>
      <div className="relative mx-auto max-w-[42rem] space-y-3 px-6 pb-10 sm:pb-[clamp(3rem,9vh,7rem)] sm:text-center">
        {description.split("\n\n").map((paragraph) => (
          <p key={paragraph} className="hero-enter hero-follow text-[0.9375rem] leading-relaxed text-white/90 sm:text-base">{paragraph}</p>
        ))}
      </div>
    </section>
  );
}
