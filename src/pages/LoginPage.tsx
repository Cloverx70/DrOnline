import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Link, useNavigate } from "react-router";

import { FaLock } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { IoLogoGoogle } from "react-icons/io";
import { IoMedicalOutline } from "react-icons/io5";
import { Login } from "@/api/auth";
import { PiDoorBold } from "react-icons/pi";
import Spinner from "@/components/Spinner";
import toaster from "@/components/Toaster";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const LoginSchema = z.object({
  email: z.email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const LoginPage = () => {
  const navigate = useNavigate();

  type LoginInputs = z.infer<typeof LoginSchema>;

  const LoginForm = useForm<LoginInputs>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: LoginMutate, isPending } = useMutation({
    mutationKey: ["LOGIN"],
    mutationFn: (data: LoginInputs) => Login(data.email, data.password),
    onSuccess: () => {
      navigate("/");
      toaster("Success", "Logged in successfully..");
    },
    onError: (e) => {
      toaster("Error Logging in", e.message);
      LoginForm.reset();
    },
  });

  return (
    <section className="relative w-full h-screen flex items-center justify-center font-lexend">
      <Link to={"/"}>
        <div className="absolute flex items-center justify-center gap-3 top-1 left-1 p-5 text-custom-blue">
          <IoMedicalOutline size={38} className="min-w-[38px]" />
          <p className="text-2xl md:text-3xl font-sendflowers font-bold whitespace-nowrap">
            Dr.Online
          </p>
        </div>
      </Link>
      <Form {...LoginForm}>
        <form
          onSubmit={LoginForm.handleSubmit((data) => {
            LoginMutate(data);
          })}
          className="w-full flex items-center justify-center"
        >
          <div className="w-[30%] bg-custom-white shadow-2xl rounded-xl z-20 flex flex-col items-center justify-center py-10">
            <div className=" w-full flex flex-col items-center justify-center gap-3 ">
              <div className="w-full flex items-center justify-center">
                <div className=" w-20 h-20 flex items-center justify-center rounded-full bg-custom-primary">
                  <PiDoorBold size={40} color="204389" />
                </div>
              </div>
              <div className=" w-full flex flex-col items-center justify-center gap-1">
                <p className="text-4xl text-center">Log in with email</p>
                <p className=" text-sm text-custom-gray">
                  Welcome back! Let’s get things done.
                </p>
              </div>
            </div>
            <div className="w-full flex flex-col gap-5 p-10">
              <FormField
                control={LoginForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative flex items-center justify-start">
                        <IoIosMail
                          size={25}
                          color="#6a7282"
                          className="absolute left-4"
                        />
                        <input
                          type="text"
                          placeholder="Email"
                          {...field}
                          className="w-full bg-gray-200 focus:bg-gray-300 outline-none rounded-2xl text-custom-black py-3 px-12"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={LoginForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative flex items-center justify-start">
                        <FaLock
                          size={20}
                          color="#6a7282"
                          className="absolute left-4"
                        />
                        <input
                          type="password"
                          placeholder="Password"
                          {...field}
                          className="w-full bg-gray-200 focus:bg-gray-300 outline-none rounded-2xl text-custom-black py-3 px-12"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className=" flex items-center justify-between">
                <Link to={"/register"}>
                  <p className=" text-start cursor-pointer">
                    New? Register now
                  </p>
                </Link>
                <p className=" text-end cursor-pointer">Forgot password?</p>
              </div>
            </div>
            <div className=" px-10 flex flex-col gap-5 items-center justify-center w-full">
              <button
                type="submit"
                className=" w-full py-2.5 rounded-2xl bg-custom-blue hover:bg-gray-200 hover:text-custom-black transition-all ease-linear text-custom-white cursor-pointer"
              >
                {isPending ? <Spinner /> : "Login"}
              </button>
              <p className=" text-xs text-center text-custom-gray font-semibold">
                Or sign in with
              </p>
              <button className="w-fit px-10 py-2.5 rounded-xl bg-custom-white text-custom-blue hover:bg-custom-blue hover:text-custom-white transition-all ease-linear    shadow-lg cursor-pointer">
                <IoLogoGoogle size={25} />
              </button>
            </div>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default LoginPage;
