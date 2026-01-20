"use client";

import { useRef } from "react";
import { Ripple } from "./ui/shadcn-io/ripple";
import Numbers from "./Numbers";


const About = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="w-full bg-linear-to-b from-stone-100 to-white">
      <div className="w-full flex justify-center items-center bg-linear-to-t from-stone-100 to-white border border-black/20 rounded-4xl">
        <section
          id="about"
          className="py-20 w-[95%] max-w-[1200px] mx-auto min-h-svh"
        >
          <div className="mb-10 ml-1 text-center flex flex-col font-poppins tracking-tight">
            <p className="text-sm text-black">Poznaj naszą firmę</p>
            <h2 className="text-sm text-black/60">
              Dlaczego warto wybrać właśnie nas
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 auto-rows-fr font-robert-medium">

            <div className="col-span-1 flex flex-col gap-3 h-full">

              <div className="relative overflow-hidden border border-black/20 rounded-xl bg-white p-6 flex flex-col justify-between flex-1 ">
                <div className="mt-3 md:mt-0 font-poppins tracking-tight">
                  <h3 className="text-xl  mb-1 text-black">
                    El-Sigma
                  </h3>
                  <p className="text-black/80 text-sm">
                    Współpraca z największą w Polsce siecią dystrybucji materiałów
                    elektrotechnicznych to gwarancja niezawodności i najwyższych standardów.
                  </p>

                </div>
                <div className="relative h-full top-7 md:top-10 -right-7">

                  <div className="flex justify-center items-center mt-4 sm:mt-0 h-full border border-black/20 bg-stone-50 rounded-tl-xl p-4 ">
                    <img
                      src="/photos/elsigma.webp"
                      alt="Logo El-Sigma"
                      className="object-contain pointer-events-none w-full h-full select-none pt-2"
                    />
                  </div>
                </div>
              </div>


              <div className="relative overflow-hidden flex-1 rounded-xl bg-white p-6  flex items-end border border-black/20 aspect-square">
                <Ripple className="z-0 opacity-40" />
                <div className="relative z-10 font-poppins tracking-tight">
                  <h4 className="text-xl mb-1 text-black">
                    Nasza Misja
                  </h4>
                  <p className="text-black/80 text-sm">
                    Łączymy technologię i doświadczenie, aby dostarczać klientom
                    rozwiązania, które inspirują i wspierają codzienną pracę.
                  </p>
                </div>

                <img src="photos/logo3d.webp" alt="" className="absolute top-1/2 left-1/2 w-40 -translate-x-1/2 -translate-y-1/2" />

              </div>
            </div>


            <div
              ref={containerRef}
              className="col-span-1 relative overflow-hidden border border-black/20 rounded-xl bg-white flex items-start"
            >
              <Numbers />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
