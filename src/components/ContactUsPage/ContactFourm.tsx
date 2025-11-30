import SplitText from "@/components/SplitText";
import TextType from "../TextType";

const ContactForm = () => {
  return (
    <div className="w-full h-full flex items-center justify-center py-20 font-lexend">
      <div className="w-[40%] bg-custom-primary rounded-2xl p-10 shadow-md flex flex-col gap-6">
        <div className=" flex flex-col gap-2">
          <SplitText
            text="Contact Us!"
            className="text-6xl font-bold text-custom-black"
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
          ></TextType>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-custom-black">
            Email
          </label>
          <input
            type="email"
            placeholder="example@domain.com"
            className="border-b border-custom-black/30 bg-transparent outline-none py-2 focus:border-custom-blue transition"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-custom-black">
            Message
          </label>
          <textarea
            placeholder="Write your message here..."
            rows={4}
            className="border-b border-custom-black/30 bg-transparent outline-none py-2 resize-none focus:border-custom-blue transition"
          ></textarea>
        </div>

        <button className="w-full h-11 rounded-md text-sm bg-custom-blue text-white font-semibold hover:bg-custom-black transition-all">
          Send Message
        </button>
      </div>
    </div>
  );
};

export default ContactForm;
