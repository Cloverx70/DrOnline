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

import { FaLock } from "react-icons/fa";
import { PiDoorBold } from "react-icons/pi";
import { Register } from "@/api/auth"; // Your register API function
import Spinner from "@/components/Spinner";
import toaster from "@/components/Toaster";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Zod schema
export const RegisterSchema = z.object({
  firstname: z.string().min(2, "First name is required"),
  lastname: z.string().min(2, "Last name is required"),
  username: z.string().min(3, "Username is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const RegisterPage = () => {
  const navigate = useNavigate();
  type RegisterInputs = z.infer<typeof RegisterSchema>;

  const RegisterForm = useForm<RegisterInputs>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      password: "",
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
      navigate("/login");
      toaster("Success", "Registered successfully. Please login!");
    },
    onError: (e) => {
      toaster("Error", e.message);
      RegisterForm.reset();
    },
  });

  return (
    <section className="relative w-full h-screen flex items-center justify-center font-lexend">
      <Link to={"/"}>
        {" "}
        <div className="absolute flex items-center justify-center gap-3 top-1 left-1 p-5 text-custom-blue">
          <IoMedicalOutline size={38} className="min-w-[38px]" />
          <p className="text-2xl md:text-3xl font-sendflowers font-bold whitespace-nowrap">
            Dr.Online
          </p>
        </div>
      </Link>

      <Form {...RegisterForm}>
        <form
          onSubmit={RegisterForm.handleSubmit((data) => RegisterMutate(data))}
          className="w-full flex items-center justify-center"
        >
          <div className="w-[30%] bg-custom-white shadow-2xl rounded-xl z-20 flex flex-col items-center justify-center py-10">
            <div className="w-full flex flex-col items-center justify-center gap-3">
              <div className="w-full flex items-center justify-center">
                <div className="w-20 h-20 flex items-center justify-center rounded-full bg-custom-primary">
                  <PiDoorBold size={40} color="204389" />
                </div>
              </div>
              <div className="w-full flex flex-col items-center justify-center gap-1">
                <p className="text-4xl text-center">Register an account</p>
                <p className="text-sm text-custom-gray">
                  Join Dr.Online and start managing your appointments.
                </p>
              </div>
            </div>

            <div className="w-full flex flex-col gap-5 p-10">
              {/* Firstname */}
              <FormField
                control={RegisterForm.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative flex items-center justify-start">
                        <IoMdPerson
                          size={25}
                          color="#6a7282"
                          className="absolute left-4"
                        />
                        <input
                          type="text"
                          placeholder="First Name"
                          {...field}
                          className="w-full bg-gray-200 focus:bg-gray-300 outline-none rounded-2xl text-custom-black py-3 px-12"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Lastname */}
              <FormField
                control={RegisterForm.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative flex items-center justify-start">
                        <IoMdPerson
                          size={25}
                          color="#6a7282"
                          className="absolute left-4"
                        />
                        <input
                          type="text"
                          placeholder="Last Name"
                          {...field}
                          className="w-full bg-gray-200 focus:bg-gray-300 outline-none rounded-2xl text-custom-black py-3 px-12"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Username */}
              <FormField
                control={RegisterForm.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative flex items-center justify-start">
                        <IoMdPerson
                          size={25}
                          color="#6a7282"
                          className="absolute left-4"
                        />
                        <input
                          type="text"
                          placeholder="Username"
                          {...field}
                          className="w-full bg-gray-200 focus:bg-gray-300 outline-none rounded-2xl text-custom-black py-3 px-12"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={RegisterForm.control}
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

              {/* Password */}
              <FormField
                control={RegisterForm.control}
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
            </div>

            <div className="px-10 flex flex-col gap-5 items-center justify-center w-full">
              <button
                type="submit"
                className="w-full py-2.5 rounded-2xl bg-custom-blue hover:bg-gray-200 hover:text-custom-black transition-all ease-linear text-custom-white cursor-pointer"
              >
                {isPending ? <Spinner /> : "Register"}
              </button>

              <p className="text-xs text-center text-custom-gray font-semibold">
                Or sign up with
              </p>

              <button className="w-fit px-10 py-2.5 rounded-xl bg-custom-white text-custom-blue hover:bg-custom-blue hover:text-custom-white transition-all ease-linear shadow-lg cursor-pointer">
                <IoLogoGoogle size={25} />
              </button>
            </div>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default RegisterPage;
