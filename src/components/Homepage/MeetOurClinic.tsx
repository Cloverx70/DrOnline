import AboutUs from "./../../assets/AboutUs.jpg";
import { motion } from "framer-motion";

const MeetOurClinic = () => {
  return (
    <div className="w-full px-6 py-12 md:px-12 lg:px-20 lg:py-20 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20">
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ ease: "linear", duration: 0.4 }}
        className="w-full md:w-[50%] lg:w-[45%] xl:w-[40%] rounded-lg shadow-xl"
      >
        <img
          className="rounded-lg w-full h-auto object-cover"
          src={AboutUs}
          alt="Clinic"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ ease: "linear", duration: 0.4 }}
        className="w-full md:w-[45%] lg:w-[35%] xl:w-[30%] text-black flex flex-col justify-start gap-6"
      >
        <p className="text-3xl md:text-4xl font-semibold">Meet our clinic</p>

        <p className="text-base md:text-lg leading-relaxed">
          Discover a modern, patient-focused medical clinic built on trust,
          care, and professionalism. We prioritize comfort, quality service, and
          accessible healthcare for everyone.
        </p>

        <button className="w-48 md:w-64 h-10 rounded-sm font-semibold bg-custom-primary text-sm text-custom-black hover:text-custom-black font-lexend cursor-pointer hover:bg-custom-white hover:shadow-lg transition-all ease-linear duration-150">
          About us
        </button>
      </motion.div>
    </div>
  );
};

export default MeetOurClinic;
