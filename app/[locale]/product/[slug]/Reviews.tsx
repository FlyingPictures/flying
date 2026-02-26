import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { cloudinaryUrl } from "@/lib/cloudinary";

type Review = {
  id: number;
  name: string;
  location: string;
  quote: string;
  text: string;
  avatarIndex: number;
};

const starsImg = "Group_64_xrfcje";

const avatars = [
  "Ellipse_8_reoc5x",
  "Ellipse_8_reoc5x",
  "Ellipse_8_reoc5x",
  "Ellipse_8_reoc5x",
];

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="bg-background border border-secondary rounded-(--radius) p-4 lg:p-8 flex flex-col justify-between w-75 h-65 lg:w-full lg:h-89 shrink-0">

      <div className="flex items-center gap-3 lg:hidden">
        <Image
          src={cloudinaryUrl(avatars[review.avatarIndex], 200)}
          alt={review.name}
          width={60}
          height={60}
          className="rounded-full object-cover w-8 h-8"
        />
        <div className="leading-tight">
          <p>{review.name}</p>
          <p>{review.location}</p>
        </div>
      </div>

      <div className="hidden lg:flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <Image
            src={cloudinaryUrl(avatars[review.avatarIndex], 200)}
            alt={review.name}
            width={60}
            height={60}
            className="rounded-full object-cover lg:w-23 lg:h-23"
          />
          <div className="leading-tight">
            <p>{review.name}</p>
            <p>{review.location}</p>
          </div>
        </div>
        <Image
          src={cloudinaryUrl(starsImg, 200)}
          alt="stars"
          width={100}
          height={20}
          className="lg:w-32 lg:h-6"
        />
      </div>

      <div className="w-full h-px bg-secondary my-1 lg:my-2" />

      <div className="flex flex-col gap-2 lg:grid lg:grid-cols-[40%_60%] lg:gap-4 lg:items-start">
        <span className="font-libre-baskerville italic text-xl lg:text-2xl">
          &ldquo;{review.quote}&rdquo;
        </span>
        <span className="font-poppins text-sm lg:text-base">{review.text}</span>
      </div>

      <div className="mt-3 lg:hidden">
        <Image
          src={cloudinaryUrl(starsImg, 200)}
          alt="stars"
          width={100}
          height={20}
        />
      </div>

    </div>
  );
}

export default async function Reviews() {
  const t = await getTranslations("reviews");

  const averageRating = t("averageRating");
  const totalReviews = t("totalReviews");
  const items = t.raw("items") as Review[];

  return (
    <section className="w-full flex flex-col items-center px-4 md:px-10 lg:px-20 py-12 gap-8 lg:gap-16">
      <div className="w-full h-px bg-border" />

      <div className="w-full text-left lg:text-center flex flex-col gap-6">
        <h3>{t("tittle")}</h3>

        <div className="text-md lg:text-xl flex items-center gap-2 lg:justify-center ">
          <span>★ {averageRating}</span>
          <span>{totalReviews}</span>
        </div>
      </div>

      <div
        className="
          w-full
          flex flex-row overflow-x-auto snap-x snap-mandatory gap-4 px-4
          [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
          lg:grid lg:grid-cols-2 lg:justify-items-center lg:gap-x-20 lg:gap-y-20 lg:overflow-x-visible lg:max-w-300 lg:mx-auto
        "
      >
        {items.map((review) => (
          <div key={review.id} className="snap-center shrink-0 lg:contents">
            <ReviewCard review={review} />
          </div>
        ))}
      </div>

    </section>
  );
}