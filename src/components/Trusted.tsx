import { InfiniteSlider } from "@/components/ui/infinite-slider";


export default function InfiniteSliderBasic() {
  const logos = [
    { src: "/photos/awex.png", alt: "Awex logo" },
    { src: "/photos/dehn.png", alt: "Dehn logo" },
    { src: "/photos/elektro.png", alt: "Elektroplast logo" },
    { src: "/photos/hager.png", alt: "Hager logo" },
    { src: "/photos/kanlux.png", alt: "Kanlux logo" },
    { src: "/photos/koelner.jpg", alt: "Koelner logo" },
    { src: "/photos/Kopos.png", alt: "Kopos logo" },
    { src: "/photos/legrand.png", alt: "Legrand logo" },
    { src: "/photos/noark.png", alt: "Noark logo" },
    { src: "/photos/ospel.png", alt: "Ospel logo" },
    { src: "/photos/wago.png", alt: "Wago logo" },
    { src: "/photos/awex.png", alt: "Awex logo" },
    { src: "/photos/dehn.png", alt: "Dehn logo" },
    { src: "/photos/elektro.png", alt: "Elektroplast logo" },
    { src: "/photos/hager.png", alt: "Hager logo" },
    { src: "/photos/kanlux.png", alt: "Kanlux logo" },
    { src: "/photos/koelner.jpg", alt: "Koelner logo" },
    { src: "/photos/Kopos.png", alt: "Kopos logo" },
    { src: "/photos/legrand.png", alt: "Legrand logo" },
    { src: "/photos/noark.png", alt: "Noark logo" },
    { src: "/photos/ospel.png", alt: "Ospel logo" },
    { src: "/photos/wago.png", alt: "Wago logo" },
  ];

  return (
    <section className="py-12 bg-stone-100">
    <div className="w-[96%] mx-auto">
      <h2 className="text-left text-2xl md:text-3xl font-robert-medium font-bold mb-8">
        NASI DOSTAWCY <br />WSZYTSKO W JEDNYM MIEJSCU

      </h2>
  
      <div className="relative w-full h-[180px] overflow-hidden touch-pan-x">
        <div className="absolute inset-0 mask-[linear-gradient(to_right,transparent_0%,black_15%,black_85%,transparent_100%)]">
          <InfiniteSlider gap={24} reverse className="w-full h-full" duration={50}>
            {logos.map((logo, index) => (
              <div
                key={index}
                className="flex items-center justify-center w-[160px] h-[160px] bg-white rounded-lg shadow-md/20 "
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  draggable="false"
                  className="max-w-[120px] max-h-[120px] object-contain grayscale hover:grayscale-0 transition duration-300"
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
