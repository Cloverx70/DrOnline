import { CiMenuBurger, CiSearch } from "react-icons/ci";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { IoMedicalOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { NavOptions } from "@/constants";
import NavsheetOption from "./NavsheetOption";
import { Logout, type User } from "@/api/auth";
import { motion } from "framer-motion";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toaster from "./Toaster";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { useState } from "react";
interface INavbarProps {
  user: User;
}

const Navbar = ({ user }: INavbarProps) => {
  const navigate = useNavigate();
  const client = useQueryClient();

  const [NavOpen, setNavOpen] = useState(false);

  const loginStatusNavOptions = user
    ? NavOptions.filter((o) => o.label !== "Login")
    : NavOptions.filter((o) => o.label !== "Your Studies");

  const doctorStatusNavOptions = !user?.doctor
    ? loginStatusNavOptions.filter((o) => o.label !== "Doctor Dashboard")
    : loginStatusNavOptions.filter((o) => o.label !== "Your Studies");

  const { mutate: logoutMutate } = useMutation({
    mutationFn: Logout,
    mutationKey: ["LOGOUT"],
    onSuccess: () => {
      client.removeQueries({ queryKey: ["auth-status"] });
      setNavOpen(false);
      toaster("Success", "Logged out successfully");
      navigate("/");
    },
    onError: (e) => {
      toaster("Error", e.message);
    },
  });

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
          <Sheet open={NavOpen} onOpenChange={() => setNavOpen(!NavOpen)}>
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
                <div className="flex-1 flex flex-col items-start">
                  {doctorStatusNavOptions.map((o, i) => (
                    <div key={i} className="w-full  flex">
                      <NavsheetOption label={o.label} to={o.to} />
                    </div>
                  ))}

                  <Dialog>
                    <DialogTrigger>
                      {user && (
                        <p
                          className="uppercase cursor-pointer relative h-10 md:h-12 w-fit text-xl md:text-3xl flex items-center justify-start font-light
      after:content-[''] after:absolute after:left-0 after:bottom-0
    after:h-0.5 after:w-0 after:bg-custom-black
    after:transition-all after:duration-300
    hover:after:w-full
      "
                        >
                          Logout
                        </p>
                      )}
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Ready to log out?</DialogTitle>
                        <DialogDescription>
                          You can log back in anytime to continue where you left
                          off.
                        </DialogDescription>
                      </DialogHeader>

                      <DialogFooter className="flex gap-2 sm:justify-end">
                        <DialogClose>
                          <Button
                            className="cursor-pointer"
                            variant={"destructive"}
                            onClick={() => logoutMutate()}
                          >
                            Log out
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
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
