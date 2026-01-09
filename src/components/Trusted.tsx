"use client";

export default function Trusted() {
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
    {
      src: "https://cdn.traconelectric.com/o/tracon-liferay-theme/images/tracon_logo.png",
      alt: "tracon logo",
    },
  ];

  return (
    <section className=" mt-2">
      <div className="w-[90%] max-w-[1440px] mx-auto flex flex-col items-center border border-black/30 rounded-xl p-2">
        <h2 className="flex flex-col justify-center items-center font-poppins text-xl tracking-tight py-8">
          <div>Nasi dostawcy</div>
          <div className="text-black/60">wszytsko w jednym miejscu</div>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 w-full">
          {logos.map((logo, index) => (
            <div
              key={index}
              className="flex items-center justify-center h-32  rounded-md border border-black/30 transition-colors bg-stone-50"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                draggable="false"
                className="max-w-[80%] max-h-[80%] object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
