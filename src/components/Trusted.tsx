import { InfiniteSlider } from "@/components/ui/infinite-slider";

export default function InfiniteSliderBasic() {
  const logos = [
    { src: "/photos/awex.webp", alt: "Awex logo" },
    { src: "/photos/dehn.webp", alt: "Dehn logo" },
    { src: "/photos/elektro.webp", alt: "Elektroplast logo" },
    { src: "/photos/hager.webp", alt: "Hager logo" },
    { src: "/photos/kanlux.webp", alt: "Kanlux logo" },
    { src: "/photos/koelner.webp", alt: "Koelner logo" },
    { src: "/photos/Kopos.webp", alt: "Kopos logo" },
    { src: "/photos/legrand.webp", alt: "Legrand logo" },
    { src: "/photos/noark.webp", alt: "Noark logo" },
    { src: "/photos/ospel.webp", alt: "Ospel logo" },
    { src: "/photos/wago.webp", alt: "Wago logo" },
    { src: "/photos/awex.webp", alt: "Awex logo" },
    { src: "/photos/dehn.webp", alt: "Dehn logo" },
    { src: "/photos/elektro.webp", alt: "Elektroplast logo" },
    { src: "/photos/hager.webp", alt: "Hager logo" },
    { src: "/photos/kanlux.webp", alt: "Kanlux logo" },
    { src: "/photos/koelner.webp", alt: "Koelner logo" },
    { src: "/photos/Kopos.webp", alt: "Kopos logo" },
    { src: "/photos/legrand.webp", alt: "Legrand logo" },
    { src: "/photos/noark.webp", alt: "Noark logo" },
    { src: "/photos/ospel.webp", alt: "Ospel logo" },
    { src: "/photos/wago.webp", alt: "Wago logo" },
  ];

  return (
    <section className="py-12 bg-stone-100">
      <div className="w-[96%] max-w-[1440px] mx-auto">
        <h2 className="text-left text-2xl md:text-3xl font-robert-medium font-bold mb-8">
          NASI DOSTAWCY <br />
          WSZYTSKO W JEDNYM MIEJSCU
        </h2>

        <div className="relative w-full h-[180px] overflow-hidden touch-pan-x">
          <div className="absolute inset-0 mask-[linear-gradient(to_right,transparent_0%,black_15%,black_85%,transparent_100%)]">
            <InfiniteSlider
              gap={16}
              reverse
              className="w-full h-full"
              duration={50}
            >
              {logos.map((logo, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center w-[160px] h-[160px] bg-white rounded-md shadow-md/20 "
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    draggable="false"
                    className="max-w-[120px] max-h-[120px] object-contain  transition duration-300"
                  />
                </div>
              ))}
            </InfiniteSlider>
          </div>
        </div>
      </div>
    </section>
  );
}
