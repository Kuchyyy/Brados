"use client";

import { Heart } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { pages } from "../data/page";
import HeroCtaButtons from "./HeroCtaButtons";
import { TextAnimate } from "@/components/ui/text-animate";

const CTAAndFooter = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleTeamClick = () => {
    const scrollToTeam = (attempt = 0) => {
      const element = document.querySelector("#zespół");
      if (!element) {
        if (attempt < 30) {
          setTimeout(() => scrollToTeam(attempt + 1), 50);
        }
        return;
      }

      const top = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top, behavior: "smooth" });
    };

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        scrollToTeam(0);
      }, 200);
    } else {
      scrollToTeam(0);
    }
  };

  const oferta1 = pages.slice(0, 5);
  const oferta2 = pages.slice(5);

  return (
    <div className="w-full">
      <section className="w-full bg-gradient-to-b from-background to-white py-20 font-geist md:py-28">
        <div className="maxw flex flex-col items-center text-center">
          <TextAnimate
            as="h2"
            animation="fadeIn"
            by="word"
            once
            startOnView
            viewport={{ once: true, amount: 0.4 }}
            className="max-w-2xl text-center font-gesit text-2xl font-normal leading-[1.15] tracking-tight text-blackk sm:text-2xl md:text-[2.75rem]"
          >
            Dołącz do grona naszych klientów
          </TextAnimate>

          <HeroCtaButtons
            onTeamClick={handleTeamClick}
            centered
            className="mt-6"
          />
        </div>
      </section>

      <footer className="w-full bg-white">
        <div className="maxw flex flex-col pt-16 md:pt-20">
          <div className="grid grid-cols-1 gap-x-14 gap-y-10 md:grid-cols-6">
            <div className="flex flex-col gap-4 md:col-span-2">
              <p className="max-w-xs font-geist text-sm leading-relaxed text-blackk/65">
                Kompleksowe zaopatrzenie w materiały elektryczne i
                telekomunikacyjne dla firm wykonawczych oraz klientów
                biznesowych.
              </p>

              <div className="flex flex-col gap-1.5">
                <span className="font-geist text-xs text-blackk/40">
                  © {new Date().getFullYear()} Brados
                </span>
                <Link
                  to="/faq"
                  className="font-geist text-xs text-blackk/40 transition-colors hover:text-blackk"
                >
                  FAQ
                </Link>
              </div>
            </div>

            <div>
              <h3 className="mb-4 font-geist text-xs uppercase tracking-wide text-blackk/45">
                Oferta
              </h3>
              <ul className="space-y-2.5">
                {oferta1.map((page) => (
                  <li key={page.id}>
                    <Link
                      to={`/${page.slug}`}
                      className="font-geist text-sm text-blackk/65 transition-colors hover:text-blackk"
                    >
                      {page.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-4 font-geist text-xs uppercase tracking-wide text-blackk/45">
                Oferta
              </h3>
              <ul className="space-y-2.5">
                {oferta2.map((page) => (
                  <li key={page.id}>
                    <Link
                      to={`/${page.slug}`}
                      className="font-geist text-sm text-blackk/65 transition-colors hover:text-blackk"
                    >
                      {page.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-4 font-geist text-xs uppercase tracking-wide text-blackk/45">
                Siedziba
              </h3>
              <ul className="space-y-2.5 font-geist text-sm leading-relaxed text-blackk/65">
                <li>Eugeniusza Kwiatkowskiego 17</li>
                <li>52-326 Wrocław</li>
                <li>Poniedziałek - Piątek 07:30-16:00</li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 font-geist text-xs uppercase tracking-wide text-blackk/45">
                Dane
              </h3>
              <ul className="space-y-2.5 font-geist text-sm text-blackk/65">
                <li>NIP: 8992556301</li>
                <li>KRS: 0000295667</li>
              </ul>
            </div>
          </div>

          <div className="mt-20 flex flex-col items-start justify-between gap-3 pb-6 text-xs text-blackk/40 sm:flex-row sm:items-center md:mt-28 md:pb-8">
            <span className="font-geist">BRADOS sp. z o.o.</span>

            <span className="font-geist">
              Made with{" "}
              <Heart
                size={12}
                className="mb-0.5 inline-block fill-red-500 text-red-500"
              />{" "}
              by{" "}
              <a
                href="tel:+48724788884"
                className="transition-colors hover:text-blackk"
              >
                Kuchy
              </a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CTAAndFooter;
