import DesktopNav from "./nav/DesktopNav";
import MobileNav from "./nav/MobileNav";

const Navbar = () => {
  return (
    <>
      <div className="hidden md:block">
        <DesktopNav />
      </div>
      <div className="md:hidden">
        <MobileNav />
      </div>
    </>
  );
};

export default Navbar;
