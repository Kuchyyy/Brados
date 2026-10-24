import { useEffect, useState } from "react";
import { FONTS_URL } from "./constants";
import { TeamSheetContext } from "./hooks/useOpenTeam";
import { CSS } from "./styles";
import { Cta } from "./sections/cta/Cta";
import { Gallery } from "./sections/gallery/Gallery";
import { Footer } from "./sections/footer/Footer";
import { Hero } from "./sections/hero/Hero";
import { HowItWorks } from "./sections/how-it-works/HowItWorks";
import { Navbar } from "./sections/navbar/Navbar";
import { TeamSheet } from "./sections/team/TeamSheet";
import { WhyScroll } from "./sections/why/WhyScroll";

export default function NewSite() {
  useEffect(() => {
    const prev = document.title;
    document.title = "Brados – hurtownia materiałów elektrycznych we Wrocławiu";
    return () => {
      document.title = prev;
    };
  }, []);

  const [teamOpen, setTeamOpen] = useState(false);
  return (
    <TeamSheetContext.Provider value={() => setTeamOpen(true)}>
      <div className="ns-root min-h-screen bg-white text-[#0A0A0A] antialiased">
        <link rel="stylesheet" href={FONTS_URL} precedence="default" />
        <style>{CSS}</style>
        <Navbar />
        <main>
          <Hero />
          <HowItWorks />
          <WhyScroll />
          <Gallery />
          <Cta />
        </main>
        <Footer />
      </div>
      <TeamSheet open={teamOpen} onOpenChange={setTeamOpen} />
    </TeamSheetContext.Provider>
  );
}
