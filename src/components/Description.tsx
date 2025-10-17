import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import gsap from "gsap";

type DescriptionProps = {
  title: string;
  description: string;
  products: string[];
  producers: string[];
  subpages?: { id: string; title: string }[];
};

const Description: React.FC<DescriptionProps> = ({
  title,
  description,
  products,
  producers,
}) => {
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();

  const categories = [
    { id: "1", title: "Aparatura modułowa i sterowanie" },
    { id: "2", title: "Narzędzia i mierniki" },
    { id: "3", title: "Sieci niskoprądowe i okablowanie" },
    { id: "4", title: "Rozdzielnice i obudowy" },
    { id: "5", title: "Osprzęt elektroinstalacyjny i siłowy" },
    { id: "6", title: "Technika świetlna" },
    { id: "7", title: "System tras i mocowania" },
    { id: "8", title: "Kable i przewody" },
    { id: "9", title: "Ochrona odgromowa" },
    { id: "10", title: "Pozostałe" },
  ];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      gsap.set(".loader-logo", { opacity: 0, scale: 0.8, y: 30 });
      gsap.set(".loader-title", { opacity: 0, y: 50 });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          document.body.style.overflow = "auto";
          gsap.to(loaderRef.current, {
            opacity: 0,
            duration: 0.6,
            pointerEvents: "none",
          });
        },
      });

      gsap.set(loaderRef.current, { opacity: 1, pointerEvents: "all" });
      tl.to(".loader-logo", { opacity: 1, scale: 1, y: 0, duration: 0.8 })
        .to(".loader-title", { opacity: 1, y: 0, duration: 0.8 }, "-=0.4")
        .to({}, { duration: 0.8 });
    }, loaderRef);

    return () => {
      ctx.revert();
      document.body.style.overflow = "auto";
    };
  }, [location.pathname]);

  return (
    <>
      <div
        ref={loaderRef}
        className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-white"
      >
        <img src="/brados.png" alt="Logo" className="loader-logo w-20 mb-6" />
        <h1 className="loader-title text-2xl md:text-4xl font-bold font-robert-medium text-gray-800 text-center">
          {title}
        </h1>
      </div>

      <section className="w-full max-w-7xl mx-auto px-6 py-16">
        <h1 className="font-robert-medium text-3xl md:text-5xl font-bold mb-10 text-center">
          {title}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2 space-y-6">
            <p className="text-lg leading-relaxed text-gray-700">
              {description}
            </p>
            <ul className="list-none space-y-2">
              {products.map((product, idx) => (
                <li key={idx} className="flex items-start gap-2 text-gray-800">
                  <span className="text-green-600">✔</span>
                  <span>{product}</span>
                </li>
              ))}
            </ul>
          </div>

          <aside className="bg-stone-100 rounded-xl shadow-md p-6 space-y-4">
            <h3 className="text-lg font-semibold mb-4">Pozostałe kategorie</h3>
            <ul className="space-y-2">
              {categories.map((sub) => (
                <li key={sub.id}>
                  <Link
                    to={`/page/${sub.id}`}
                    className="text-orange-600 hover:underline"
                  >
                    {sub.title}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </div>

        <div className="mt-16">
          <h2 className="text-xl font-semibold mb-8 text-center">Partnerzy</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center justify-items-center">
            {producers.map((logo, idx) => (
              <img
                key={idx}
                src={logo}
                alt={`logo producenta ${idx}`}
                className="h-12 object-contain"
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Description;
