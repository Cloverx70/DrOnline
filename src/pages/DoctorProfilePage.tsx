import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";

import { Button } from "@/components/ui/button";
import { GetDoctorById } from "@/api/doctor";
import { SendPatientMessage } from "@/api/mail";
import Spinner from "@/components/Spinner";
import toaster from "@/components/Toaster";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const ContactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
});

type ContactFormInputs = z.infer<typeof ContactSchema>;

const DoctorProfilePage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { register, handleSubmit, reset } = useForm<ContactFormInputs>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const navigate = useNavigate();
  const { did } = useParams();

  if (!did) navigate("/doctors");

  const { data: doctor, isLoading } = useQuery({
    queryKey: ["DOCTORPROFILE"],
    queryFn: () => GetDoctorById(did!),
    enabled: !!did,
  });

  const { mutate: SendMessageToDr, isPending } = useMutation({
    mutationKey: ["SENDEMAILTODR"],
    mutationFn: (data: ContactFormInputs) =>
      SendPatientMessage(
        data.name,
        data.email,
        data.subject,
        data.message,
        doctor!.user.email
      ),
    onSuccess: () => {
      toaster("Success", "Message sent successfully");
      setIsDialogOpen(false);
      reset();
    },
  });

  if (isLoading)
    return (
      <div className=" w-full h-[700px] flex justify-center items-center">
        <Spinner />
      </div>
    );

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-start font-lexend py-10">
      {/* Doctor Header */}
      <div className="flex items-center gap-3 mb-10">
        <h1 className="text-5xl font-bold">
          {doctor?.user.firstname} {doctor?.user.lastname}
        </h1>
      </div>

      {/* Doctor Info */}
      <div className="w-[50%] bg-custom-white shadow-2xl rounded-xl p-8 flex flex-col gap-5">
        <div className="w-full  flex items-center gap-5">
          <div className="w-25 h-25 flex items-center justify-center border-4 border-custom-blue rounded-full overflow-hidden bg-custom-primary">
            <img
              src={doctor?.pfpURL}
              alt={doctor?.user.firstname}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col">
            <p className="text-lg font-semibold">
              Specialization: {doctor?.specialization}
            </p>
            {doctor?.bio && (
              <p className="text-sm text-custom-gray">{doctor.bio}</p>
            )}
            {doctor?.yearsOfExperience && (
              <p className="text-sm text-custom-gray">
                {doctor?.yearsOfExperience} years of experience
              </p>
            )}
            {doctor?.clinicName && (
              <p className="text-sm text-custom-gray">
                Clinic: {doctor?.clinicName}
              </p>
            )}
          </div>
        </div>

        {/* Doctor Studies */}
        <h2 className="text-xl font-semibold mb-3">Assigned Studies</h2>
        <div className=" overflow-y-auto h-96">
          {doctor?.studies.length === 0 ? (
            <p className="text-sm text-custom-gray">No studies assigned yet.</p>
          ) : (
            <ul className="flex flex-col gap-3">
              {doctor?.studies.map((study) => (
                <li
                  key={study.id}
                  className="border p-3 rounded-xl flex flex-col gap-1 hover:shadow-lg transition"
                >
                  <p className="font-semibold">{study.title}</p>
                  <p className="text-sm text-custom-gray">
                    {study.description}
                  </p>
                  <span className="text-xs font-semibold uppercase text-custom-black">
                    {study.status}
                  </span>
                  {study.dueDate && (
                    <p className="text-xs text-custom-gray">
                      Due: {new Date(study.dueDate).toLocaleDateString()}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Contact Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger className="w-full py-2 bg-custom-black text-custom-primary rounded-lg hover:bg-gray-300 hover:text-custom-black transition-all ease-linear duration-150">
            Get in Touch
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className=" text-sm">
                Send an email, and the doctor will reply shortly.
              </DialogTitle>
            </DialogHeader>

            <form
              onSubmit={handleSubmit((data) => SendMessageToDr(data))}
              className="flex flex-col gap-4 mt-4"
            >
              <div className="flex flex-col gap-1">
                <label htmlFor="name" className="text-sm font-semibold">
                  Name
                </label>
                <input
                  id="name"
                  {...register("name")}
                  className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-custom-primary"
                  placeholder="Your Name"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-sm font-semibold">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-custom-primary"
                  placeholder="Your Email"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="subject" className="text-sm font-semibold">
                  Subject
                </label>
                <input
                  id="subject"
                  {...register("subject")}
                  className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-custom-primary"
                  placeholder="Subject"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="message" className="text-sm font-semibold">
                  Message
                </label>
                <textarea
                  id="message"
                  {...register("message")}
                  className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-custom-primary resize-none"
                  rows={4}
                  placeholder="Write your message here..."
                />
              </div>

              <Button
                type="submit"
                className="bg-custom-black text-white hover:bg-gray-300 hover:text-custom-black"
              >
                {isPending ? <Spinner /> : "Send"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default DoctorProfilePage;
