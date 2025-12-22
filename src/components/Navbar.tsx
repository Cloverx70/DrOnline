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
import type { User } from "@/api/auth";
import { motion } from "framer-motion";

interface INavbarProps {
  user: User;
}

const Navbar = ({ user }: INavbarProps) => {
  const loginStatusNavOptions = user
    ? NavOptions.filter((o) => o.label !== "Login")
    : NavOptions.filter((o) => o.label !== "Your Studies");

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

      <div className=" flex flex-1 text-custom-black items-center justify-end gap-10">
        <ul className=" hidden md:visible md:flex items-center gap-6 font-lexend text-sm font-semibold">
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

            <SheetContent className="px-7 w-[300px] md:w-[600px] lg:w-[700px] bg-custom-white flex flex-col gap-5 items-start font-lexend ">
              <SheetHeader className="w-full flex flex-col gap-4">
                <SheetTitle className="text-2xl">
                  <input
                    className="w-full border-b-2 py-3 border-custom-black outline-none rounded-none text-2xl md:text-3xl font-light placeholder:font-semibold text-custom-gray"
                    placeholder="Search for..."
                    type="text"
                  />
                </SheetTitle>
              </SheetHeader>
              <div className=" flex flex-col gap-3 px-5">
                <p className=" uppercase font-bold text-xs text-custom-gray">
                  Navigation Bar
                </p>
                <div className="flex-1 flex flex-col items-start ">
                  {loginStatusNavOptions.map((o, i) => (
                    <div key={i} className="w-full  flex ">
                      <NavsheetOption label={o.label} to={o.to} />
                    </div>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
