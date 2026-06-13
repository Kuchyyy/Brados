import React, { useEffect, useRef } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import gsap from "gsap";
import { pages } from "../data/page";
import { ArrowUpRight } from "lucide-react";
import { Check } from "lucide-react";

type DescriptionProps = {
  title: string;
  description: string;
  products: string[];
  producers: string[];
};

const Description: React.FC<DescriptionProps> = ({
  title,
  description,
  products,
  producers,
}) => {
  const location = useLocation();
  const { slug } = useParams<{ slug: string }>();

  const loaderRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLImageElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    document.body.style.overflow = "hidden";

    const run = () => {
      if (!loaderRef.current || !logoRef.current || !titleRef.current) return;

      gsap.set(loaderRef.current, { opacity: 1, pointerEvents: "all" });
      gsap.set(logoRef.current, { opacity: 0, scale: 0.8, y: 30 });
      gsap.set(titleRef.current, { opacity: 0, y: 50 });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          gsap.to(loaderRef.current, {
            opacity: 0,
            duration: 0.6,
            pointerEvents: "none",
            onComplete: () => {
              document.body.style.overflow = "auto";
            },
          });
        },
      });

      tl.to(logoRef.current, { opacity: 1, scale: 1, y: 0, duration: 0.8 })
        .to(titleRef.current, { opacity: 1, y: 0, duration: 0.8 }, "-=0.4")
        .to({}, { duration: 0.6 });
    };

    const id = requestAnimationFrame(run);

    return () => {
      cancelAnimationFrame(id);
      gsap.killTweensOf([loaderRef.current, logoRef.current, titleRef.current]);
      document.body.style.overflow = "auto";
    };
  }, [location.pathname]);

  return (
    <>
      <div
        key={location.pathname}
        ref={loaderRef}
        className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-white"
        style={{ opacity: 0, pointerEvents: "none" }}
      >
        <img
          ref={logoRef}
          src="/photos/brados.webp"
          alt="Logo"
          className="w-20 mb-6"
        />
        <h2
          ref={titleRef}
          className="heading-h2 text-blackk text-center max-w-xl px-4"
        >
          {title}
        </h2>
      </div>

      <div className="w-full flex justify-center items-center bg-background">
        <section className="maxw py-16 pt-30 font-geist">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-2 space-y-6 ml-1">
              <h2 className="heading-h2 text-blackk mb-3 text-start">
                {title}
              </h2>

              <p className="text-sm leading-relaxed tracking-tight text-blackk/65">
                {description}
              </p>
              <ul className="list-none space-y-2">
                {products.map((product, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-sm tracking-tight text-blackk/65"
                  >
                    <Check size={18} className="mt-0.5 text-blackk/45" />
                    <span>{product}</span>
                  </li>
                ))}
              </ul>
            </div>

            <aside className="rounded-xl border border-blackk/10 bg-white p-6 space-y-4">
              <h3 className="heading-h3 mb-4 px-2">Pozostałe kategorie</h3>
              <ul className="space-y-2 text-sm tracking-tight text-blackk/65">
                {pages.map((sub) => {
                  const isActive = slug === sub.slug;
                  return (
                    <li key={sub.id}>
                      <Link
                        to={`/${sub.slug}`}
                        className={`flex items-center justify-between rounded-md py-2 px-2 transition-colors ${
                          isActive
                            ? "bg-tile text-blackk"
                            : "hover:bg-hero-btn-muted hover:text-blackk"
                        }`}
                      >
                        <span>{sub.title}</span>
                        <ArrowUpRight size={18} className="shrink-0 w-4 h-4" />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </aside>
          </div>

          <div className="mt-16">
            <h2 className="heading-h2 text-blackk mb-6 text-start ml-1">
              Partnerzy
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 items-center justify-items-center w-full">
              {producers.map((logo, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-center w-full aspect-square bg-tile rounded-lg border border-blackk/8"
                >
                  <img
                    src={logo}
                    alt={`logo producenta ${idx}`}
                    className="max-w-[60%] max-h-[60%] object-contain grayscale mix-blend-multiply"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Description;
