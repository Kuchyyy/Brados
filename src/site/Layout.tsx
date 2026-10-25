import { useState, type ReactNode } from "react";
import { TeamSheetContext } from "./hooks/useOpenTeam";
import { usePageMeta } from "./hooks/usePageMeta";
import { CSS } from "./styles";
import { Footer } from "./sections/footer/Footer";
import { Navbar } from "./sections/navbar/Navbar";
import { TeamSheet } from "./sections/team/TeamSheet";

export function Layout({
  title,
  description,
  path,
  noindex = false,
  solidNav = false,
  bare = false,
  children,
}: {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
  solidNav?: boolean;
  bare?: boolean;
  children: ReactNode;
}) {
  usePageMeta({ title, description, path, noindex });

  const [teamOpen, setTeamOpen] = useState(false);
  return (
    <TeamSheetContext.Provider value={() => setTeamOpen(true)}>
      <div className="ns-root min-h-screen bg-white text-[#0A0A0A] antialiased">
        <style>{CSS}</style>
        {!bare && <Navbar solid={solidNav} />}
        <main>{children}</main>
        {!bare && <Footer />}
      </div>
      {!bare && <TeamSheet open={teamOpen} onOpenChange={setTeamOpen} />}
    </TeamSheetContext.Provider>
  );
}
