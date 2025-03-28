import React from "react";
import { FloatingNav } from "./ui/FloatingNavbar";
import { MobileNav } from "./ui/MobileNavbar";
import { navItems } from "@/data";

const Navbar = () => {
  return (
    <>
      <FloatingNav navItems={navItems} className="hidden lg:flex" />
      <MobileNav navItems={navItems} className="lg:hidden" />
    </>
  );
};

export default Navbar;
