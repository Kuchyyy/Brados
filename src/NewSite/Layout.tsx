import { useEffect, useState, type ReactNode } from "react";
import { FONTS_URL } from "./constants";
import { TeamSheetContext } from "./hooks/useOpenTeam";
import { CSS } from "./styles";
import { Footer } from "./sections/footer/Footer";
import { Navbar } from "./sections/navbar/Navbar";
import { TeamSheet } from "./sections/team/TeamSheet";

export function Layout({
  title,
  solidNav = false,
  children,
}: {
  title: string;
  solidNav?: boolean;
  children: ReactNode;
}) {
  useEffect(() => {
    const prev = document.title;
    document.title = title;
    return () => {
      document.title = prev;
    };
  }, [title]);

  const [teamOpen, setTeamOpen] = useState(false);
  return (
    <TeamSheetContext.Provider value={() => setTeamOpen(true)}>
      <div className="ns-root min-h-screen bg-white text-[#0A0A0A] antialiased">
        <link rel="stylesheet" href={FONTS_URL} precedence="default" />
        <style>{CSS}</style>
        <Navbar solid={solidNav} />
        <main>{children}</main>
        <Footer />
      </div>
      <TeamSheet open={teamOpen} onOpenChange={setTeamOpen} />
    </TeamSheetContext.Provider>
  );
}
