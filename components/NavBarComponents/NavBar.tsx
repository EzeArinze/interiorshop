import Logo from "./Logo";
// import Menu from "../Menu";
import NavBarLinks from "./NavBarLinks";

function NavBar() {
  return (
    <div className="flex justify-between md:w-[80%] mx-auto items-center py-4 w-full px-2">
      <Logo />
      <div className="flex items-center gap-8">
        <NavBarLinks />
        {/* <Menu /> */}
      </div>
    </div>
  );
}

export default NavBar;
