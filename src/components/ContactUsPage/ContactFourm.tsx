import { SendContactUsMessage } from "@/api/mail";
import Spinner from "../Spinner";
import SplitText from "@/components/SplitText";
import TextType from "../TextType";
import toaster from "../Toaster";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// 1️⃣ Zod schema
const contactSchema = z.object({
  email: z.string().email("Invalid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(5, "Message must be at least 5 characters"),
});

// 2️⃣ Infer TypeScript type
type ContactFormInputs = z.infer<typeof contactSchema>;

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormInputs>({
    resolver: zodResolver(contactSchema),
  });

  const { mutate: ContactUsMutate, isPending } = useMutation({
    mutationFn: (data: ContactFormInputs) =>
      SendContactUsMessage(
        data.email.split("@")[0],
        data.email,
        data.subject,
        data.message
      ),
    mutationKey: ["SEND-CONTACT-US"],
    onSuccess: () => {
      toaster("Success", "Email has been sent successfully!");
      reset();
    },
    onError: (e) => {
      toaster("Error", e.message);
    },
  });

  return (
    <div className="w-full flex items-center justify-center py-20 font-lexend px-4">
      <div className="w-full max-w-2xl bg-custom-primary rounded-2xl p-8 md:p-10 shadow-md flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <SplitText
            text="Contact Us!"
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-custom-black"
            delay={100}
            duration={0.4}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="start"
          />
          <TextType
            text={[
              "Have a question or need help? Fill out the form below and our team will get back to you shortly.",
            ]}
            typingSpeed={80}
            pauseDuration={3000}
            showCursor={true}
            cursorCharacter="|"
            className="text-custom-black/70 text-sm"
          />
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit((data) => ContactUsMutate(data))}
          className="flex flex-col gap-4"
        >
          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-custom-black">
              Email
            </label>
            <input
              type="email"
              placeholder="example@domain.com"
              className={`border-b border-custom-black/30 bg-transparent outline-none py-2 focus:border-custom-blue transition ${
                errors.email ? "border-red-500" : ""
              }`}
              {...register("email")}
            />
            {errors.email && (
              <span className="text-red-500 text-xs">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Subject */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-custom-black">
              Subject
            </label>
            <input
              type="text"
              placeholder="Enter the subject"
              className={`border-b border-custom-black/30 bg-transparent outline-none py-2 focus:border-custom-blue transition ${
                errors.subject ? "border-red-500" : ""
              }`}
              {...register("subject")}
            />
            {errors.subject && (
              <span className="text-red-500 text-xs">
                {errors.subject.message}
              </span>
            )}
          </div>

          {/* Message */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-custom-black">
              Message
            </label>
            <textarea
              placeholder="Write your message here..."
              rows={4}
              className={`border-b border-custom-black/30 bg-transparent outline-none py-2 resize-none focus:border-custom-blue transition ${
                errors.message ? "border-red-500" : ""
              }`}
              {...register("message")}
            ></textarea>
            {errors.message && (
              <span className="text-red-500 text-xs">
                {errors.message.message}
              </span>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-11 rounded-md text-sm flex items-center justify-center bg-custom-blue text-white font-semibold hover:bg-custom-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? <Spinner /> : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
