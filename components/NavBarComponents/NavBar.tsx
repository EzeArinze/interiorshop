import Logo from "./Logo";
import Menu from "../Menu";
import NavBarLinks from "./NavBarLinks";

function NavBar() {
  return (
    <div className="flex justify-between w-[80%] mx-auto items-center py-4  ">
      <Logo />
      <div className="flex items-center gap-8">
        <NavBarLinks />
        <Menu />
      </div>
    </div>
  );
}

export default NavBar;
