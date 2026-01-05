import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { IoIosMail, IoMdPerson } from "react-icons/io";
import { IoLogoGoogle, IoMedicalOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router";

import { PiDoorBold } from "react-icons/pi";
import { Register } from "@/api/auth";
import Spinner from "@/components/Spinner";
import toaster from "@/components/Toaster";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

/* -------------------- ZOD SCHEMA -------------------- */
export const RegisterSchema = z
  .object({
    firstname: z.string().min(2, "First name is required"),
    lastname: z.string().min(2, "Last name is required"),
    username: z.string().min(3, "Username is required"),
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type RegisterInputs = z.infer<typeof RegisterSchema>;

const RegisterPage = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const RegisterForm = useForm<RegisterInputs>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { mutate: RegisterMutate, isPending } = useMutation({
    mutationFn: (data: RegisterInputs) =>
      Register(
        data.firstname,
        data.lastname,
        data.username,
        data.email,
        data.password
      ),
    onSuccess: () => {
      toaster("Success", "Registered successfully. Please login!");
      navigate("/login");
    },
    onError: (e: Error) => {
      toaster("Error", e.message);
    },
  });

  return (
    <section className="relative min-h-screen flex items-center justify-center font-lexend px-4">
      {/* LOGO */}
      <Link to="/">
        <div className="absolute top-2 left-2 flex items-center gap-3 p-4 text-custom-blue">
          <IoMedicalOutline size={36} />
          <p className="text-2xl md:text-3xl font-sendflowers font-bold">
            Dr.Online
          </p>
        </div>
      </Link>

      <Form {...RegisterForm}>
        <form
          onSubmit={RegisterForm.handleSubmit((data) => RegisterMutate(data))}
          className="w-full flex justify-center"
        >
          <div className="w-full max-w-md md:max-w-lg xl:max-w-xl bg-custom-white shadow-2xl rounded-xl flex flex-col items-center py-8">
            {/* HEADER */}
            <div className="flex flex-col items-center gap-3">
              <div className="w-20 h-20 flex items-center justify-center rounded-full bg-custom-primary">
                <PiDoorBold size={40} />
              </div>
              <p className="text-3xl md:text-4xl text-center">
                Register an account
              </p>
              <p className="text-sm text-custom-gray text-center px-6">
                Join Dr.Online and start managing your appointments.
              </p>
            </div>

            {/* FORM */}
            <div className="w-full flex flex-col gap-4 px-6 md:px-10 mt-6">
              {[
                { name: "firstname", placeholder: "First Name" },
                { name: "lastname", placeholder: "Last Name" },
                { name: "username", placeholder: "Username" },
              ].map(({ name, placeholder }) => (
                <FormField
                  key={name}
                  control={RegisterForm.control}
                  name={name as keyof RegisterInputs}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <IoMdPerson className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                          <input
                            {...field}
                            placeholder={placeholder}
                            className="w-full bg-gray-200 focus:bg-gray-300 rounded-2xl py-3 pl-12 outline-none"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}

              {/* EMAIL */}
              <FormField
                control={RegisterForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <IoIosMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                          {...field}
                          placeholder="Email"
                          className="w-full bg-gray-200 focus:bg-gray-300 rounded-2xl py-3 pl-12 outline-none"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* PASSWORD */}
              <FormField
                control={RegisterForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          className="w-full bg-gray-200 focus:bg-gray-300 rounded-2xl py-3 pl-12 pr-12 outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((p) => !p)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600"
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* CONFIRM PASSWORD */}
              <FormField
                control={RegisterForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                          {...field}
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm Password"
                          className="w-full bg-gray-200 focus:bg-gray-300 rounded-2xl py-3 pl-12 pr-12 outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword((p) => !p)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600"
                        >
                          {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* ACTIONS */}
            <div className="w-full px-6 md:px-10 mt-6 flex flex-col gap-4">
              <button
                type="submit"
                className="w-full py-2.5 rounded-2xl flex items-center justify-center bg-custom-blue text-white hover:bg-gray-200 hover:text-black transition"
              >
                {isPending ? <Spinner /> : "Register"}
              </button>

              <p className="text-xs text-center text-custom-gray font-semibold">
                Or sign up with
              </p>

              <button className="mx-auto px-10 py-2.5 rounded-xl shadow-lg hover:bg-custom-blue hover:text-white transition">
                <IoLogoGoogle size={24} />
              </button>

              <Link
                to="/login"
                className="text-sm text-center text-custom-blue"
              >
                Already have an account? Login
              </Link>
            </div>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default RegisterPage;
