"use client";

import { useTranslations } from "next-intl";
import { CloudinaryImage } from "@/components/CloudinaryImage";
import { IMAGES } from "@/lib/images";

export function WhyFlightWhitUs() {
  const t = useTranslations("whyChoose");
  const reasons = t.raw("reasons") as Array<{
    title: string;
    description: string;
  }>;
  const titleWidths = ["302px", "291px", "328px"];

  return (
    <section className="relative w-full bg-foreground overflow-hidden border-0 outline-none ring-0 shadow-none" style={{ height: "2304px" }}>
      <style jsx>{`
        section { height: 2304px; }
        @media (min-width: 1024px) {
          section { height: 1655px !important; }
        }
        .content-wrapper {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: clamp(345px, 90vw, 1240px);
          padding-left: 1.5rem;
          padding-right: 1.5rem;
        }
        @media (min-width: 1024px) {
          .content-wrapper {
            padding-left: 0;
            padding-right: 0;
            height: clamp(520px, 60vw, 785px);
            bottom: 224px;
            top: auto;
          }
        }
        @media (max-width: 1023px) {
          .content-wrapper {
            top: auto;
            bottom: 0;
            height: auto;
            padding-bottom: clamp(24px, 6vw, 40px);
          }
        }
        @media (max-width: 1023px) {
          .cards-wrapper {
            margin-top: 287px;
          }
        }
      `}</style>

      <CloudinaryImage
          publicId={IMAGES.home.whyChoose.background}
          alt=""
          fill
          className="object-cover object-fill lg:object-cover object-[center_top]"
          
          priority
        />

      <div className="content-wrapper">
        <div className="flex flex-col lg:flex-row w-full items-start">
          <div className="hidden lg:block w-full lg:w-1/2">
            <h2 className="text-background !text-left">{t("title")}</h2>
          </div>

          <div className="w-full lg:w-1/2 flex flex-col gap-3">
            <h4 className="text-background font-bold text-[14px] uppercase tracking-widest text-center lg:text-left">
              {t("takeAway")}
            </h4>
            <h2 className="text-background text-left lg:hidden mb-6">
              {t("title")}
            </h2>
            <p className="text-background px-6 lg:px-0">
              {t("await")}
            </p>
          </div>
        </div>

        <div className="cards-wrapper mt-16 flex flex-col lg:flex-row gap-6 lg:gap-12 items-center justify-center">
          {reasons.slice(0, 3).map((reason, index) => (
            <div
              key={index}
              className="flex flex-col items-center lg:items-start"
              style={{
                width: "clamp(345px, 90vw, 374px)",
                height: "513px",
              }}
            >
              <div
                className="relative w-full overflow-hidden rounded-card"
                style={{ height: "437px", border: "none", boxShadow: "none" }}
              >
                <CloudinaryImage
                  publicId={IMAGES.home.whyChoose.cards[index]}
                  alt={reason.title}
                  fill
                  className="object-cover"
                />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-popover-foreground/73 opacity-40" />

                <div
                  className="absolute bottom-[32px] left-[31px] flex flex-col"
                  style={{ maxWidth: titleWidths[index] }}
                >
                  {index === 0 && (
                    <div className="relative mb-[14px] w-[66px] h-[28px]">
                      <CloudinaryImage
                        publicId={IMAGES.home.whyChoose.cameronLogo}
                        alt="Cameron Balloons UK"
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}

                  <h3 className="text-card-title text-left text-background">
                    {reason.title}
                  </h3>
                </div>
              </div>

              <p className="text-card-body text-center lg:text-left text-background opacity-90 mt-4">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}