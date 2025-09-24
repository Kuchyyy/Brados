'use client';

const Hero = () => {
  return (
    <section className="w-screen bg-stone-100 flex items-center justify-center mt-24">
      {/* Ten div musi być relative, żeby absolute działało tylko w jego obrębie */}
      <div className="relative w-[96%] h-[86vh] flex items-center justify-center z-20 rounded-2xl overflow-hidden shadow-lg">
        {/* Tło */}
        <img 
          src="/firma.png" 
          alt="firma" 
          className="w-full h-full object-cover"
        />

        {/* Teksty na obrazie */}
        <div className="absolute special-font hero-heading top-5 left-10 text-white drop-shadow-lg">
          HURTOWNIA
        </div>

        <div className="absolute special-font hero-heading bottom-5 right-10 text-white drop-shadow-lg"> 
          BRADOS
        </div>
      </div>
    </section>
  )
}

export default Hero;
