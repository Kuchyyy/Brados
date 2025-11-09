'use client';

const Hero = () => {
  return (
    <section className="bg-stone-100 flex items-center justify-center mt-24">
      <div className="relative w-[96%] md:h-[86dvh] flex items-center justify-center z-20 rounded-2xl overflow-hidden shadow-lg mask-b-from-80% mask-b-to-96%">
        

        <img 
          src="/firma.png"
          alt="firma"
          loading="eager"
          className="hidden sm:block w-full h-full object-cover"
        />

        <img 
          src="/firmatel.png"
          alt="firma mobile"
          loading="eager"
          className="sm:hidden w-full h-full object-cover"
        />
        
        <div className="
          absolute special-font font-zentry hero-heading text-white drop-shadow-lg
          top-5 sm:top-5
          left-1/2 sm:left-10
          -translate-x-1/2 sm:translate-x-0
        ">
          HURTOWNIA
        </div>

        <div className="
          absolute special-font font-zentry hero-heading text-white drop-shadow-lg
          bottom-5 sm:bottom-5
          left-1/2 sm:right-10 sm:left-auto
          -translate-x-1/2 sm:translate-x-0
        ">
          BRADOS
        </div>
      </div>
    </section>
  )
}

export default Hero;
