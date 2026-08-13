import Link from "next/link";

type NotFoundContentProps = {
  title: string;
  description: string;
  backHome: string;
  homeHref: string;
};

export function NotFoundContent({
  title,
  description,
  backHome,
  homeHref,
}: NotFoundContentProps) {
  return (
    <section className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-24 text-center">
      <p className="font-poppins text-[5rem] md:text-[7rem] lg:text-[8rem] font-bold text-secondary leading-none mb-4 tracking-tight" aria-hidden="true">
        404
      </p>
      <h1 className="font-poppins text-2xl md:text-3xl font-semibold text-foreground mb-6">
        {title}
      </h1>
      <p className="font-inter text-muted-foreground text-lg md:text-xl max-w-md mb-10 leading-relaxed">
        {description}
      </p>
      <Link
        href={homeHref}
        className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-secondary border-b-2 border-primary transition-colors hover:text-primary"
      >
        {backHome}
      </Link>
    </section>
  );
}
