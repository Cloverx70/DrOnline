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
    <section className="relative min-h-screen flex items-center justify-center px-4 font-lexend bg-gray-50">
      {/* Logo */}
      <Link to="/">
        <div className="absolute top-4 left-4 flex items-center gap-2 text-custom-blue">
          <IoMedicalOutline size={30} />
          <p className="text-xl sm:text-2xl font-sendflowers font-bold">
            Dr.Online
          </p>
        </div>
      </Link>

      <Form {...LoginForm}>
        <form
          onSubmit={LoginForm.handleSubmit((data) => LoginMutate(data))}
          className="w-full flex justify-center"
        >
          <div className="w-[90%] sm:w-[70%] md:w-[45%] lg:w-[32%] bg-custom-white shadow-2xl rounded-2xl flex flex-col py-8 sm:py-10">
            {/* Header */}
            <div className="flex flex-col items-center gap-3 px-6">
              <div className="w-20 h-20 rounded-full bg-custom-primary flex items-center justify-center">
                <PiDoorBold size={40} color="#204389" />
              </div>

              <h1 className="text-3xl text-center font-semibold">
                Log in with email
              </h1>
              <p className="text-sm text-custom-gray text-center">
                Welcome back! Let’s get things done.
              </p>
            </div>

            {/* Inputs */}
            <div className="flex flex-col gap-5 px-6 sm:px-10 mt-8">
              <FormField
                control={LoginForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <IoIosMail
                          size={22}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-custom-gray"
                        />
                        <input
                          {...field}
                          placeholder="Email"
                          className="w-full py-3 pl-12 pr-4 rounded-2xl bg-gray-200 focus:bg-gray-300 outline-none"
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
                      <div className="relative">
                        <FaLock
                          size={18}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-custom-gray"
                        />
                        <input
                          {...field}
                          type="password"
                          placeholder="Password"
                          className="w-full py-3 pl-12 pr-4 rounded-2xl bg-gray-200 focus:bg-gray-300 outline-none"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col sm:flex-row sm:justify-between text-sm gap-2">
                <Link to="/register" className="text-custom-blue">
                  New? Register now
                </Link>
                <span className="cursor-pointer text-custom-gray">
                  Forgot password?
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="px-6 sm:px-10 mt-8 flex flex-col gap-4">
              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-custom-blue text-custom-white hover:bg-gray-200 hover:text-custom-black transition"
              >
                {isPending ? <Spinner /> : "Login"}
              </button>

              <p className="text-xs text-center text-custom-gray font-semibold">
                Or sign in with
              </p>

              <button className="mx-auto px-10 py-2.5 rounded-xl shadow-lg text-custom-blue hover:bg-custom-blue hover:text-custom-white transition">
                <IoLogoGoogle size={24} />
              </button>
            </div>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default LoginPage;
