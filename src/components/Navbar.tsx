import DesktopNav from "./nav/DesktopNav";
import MobileNav from "./nav/MobileNav";
import { useNavbarOverlay } from "@/hooks/useNavbarOverlay";

const Navbar = () => {
  const { overlay } = useNavbarOverlay();

  return (
    <>
      <div className="hidden md:block">
        <DesktopNav overlay={overlay} />
      </div>
      <div className="md:hidden">
        <MobileNav overlay={overlay} />
      </div>
    </>
  );
};

export default Navbar;
