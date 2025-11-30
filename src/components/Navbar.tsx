import { CiMenuBurger, CiSearch } from "react-icons/ci";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { IoMedicalOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { NavOptions } from "@/constants";
import NavsheetOption from "./NavsheetOption";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <div className="w-full h-auto p-5 md:p-7 font-lexend flex items-center justify-between">
      <Link to={"/"}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: "linear" }}
          className="flex items-center justify-center gap-3 text-custom-blue"
        >
          <IoMedicalOutline size={38} className="min-w-[38px]" />
          <p className="text-2xl md:text-3xl font-sendflowers font-bold whitespace-nowrap">
            Dr.Online
          </p>
        </motion.div>
      </Link>

      <div className="hidden md:flex flex-1 text-custom-black items-center justify-end gap-10">
        <ul className="flex items-center gap-6 font-lexend text-sm font-semibold">
          <Link to={"/fourms"}>
            <li className="cursor-pointer hover:text-custom-blue transition">
              Forums
            </li>
          </Link>
          <Link to={"/about-us"}>
            <li className="cursor-pointer hover:text-custom-blue transition">
              About us
            </li>
          </Link>
          <Link to={"/contact-us"}>
            <li className="cursor-pointer hover:text-custom-blue transition">
              Contact
            </li>
          </Link>
        </ul>

        <div className="text-custom-blue flex items-center gap-4 px-2">
          <CiSearch size={25} />
          <Sheet>
            <SheetTrigger>
              <div className="cursor-pointer">
                <CiMenuBurger size={25} />
              </div>
            </SheetTrigger>

            <SheetContent className="bg-custom-primary flex flex-col">
              <SheetHeader>
                <SheetTitle className="text-2xl">Menu</SheetTitle>
              </SheetHeader>

              <div className="flex-1 pt-20">
                {NavOptions.map((o, i) => (
                  <NavsheetOption key={i} label={o.label} to={o.to} />
                ))}
              </div>

              <div className="w-full p-5">
                <button className="w-full h-9 rounded-sm font-light bg-custom-blue text-sm text-custom-primary hover:text-custom-black font-lexend cursor-pointer hover:bg-custom-white hover:shadow-lg transition-all ease-linear duration-100">
                  Login
                </button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="flex md:hidden items-center gap-4 text-custom-blue">
        <CiSearch size={25} />
        <Sheet>
          <SheetTrigger>
            <CiMenuBurger size={25} className="cursor-pointer" />
          </SheetTrigger>
          <SheetContent className="bg-custom-primary flex flex-col">
            <SheetHeader>
              <SheetTitle className="text-2xl">Menu</SheetTitle>
            </SheetHeader>

            <div className="flex-1 pt-20">
              {NavOptions.map((o, i) => (
                <NavsheetOption key={i} label={o.label} to={o.to} />
              ))}
            </div>

            <div className="w-full p-5">
              <button className="w-full h-9 rounded-sm font-light bg-custom-blue text-sm text-custom-primary hover:text-custom-black font-lexend cursor-pointer hover:bg-custom-white hover:shadow-lg transition-all ease-linear duration-100">
                Login
              </button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default Navbar;
