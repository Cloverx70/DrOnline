import { OurServices, navBlocks } from "@/constants";

import EmergencySection from "@/components/Homepage/EmergencySection";
import HeroSection from "@/components/Homepage/HeroSection";
import MeetOurClinic from "@/components/Homepage/MeetOurClinic";
import NavSectionBlock from "@/components/Homepage/NavSectionBlock";
import ServiceBlock from "@/components/Homepage/ServiceBlock";
import { motion } from "framer-motion";

const HomePage = () => {
  return (
    <section className="w-full min-h-screen overflow-x-hidden overflow-y-auto  bg-white  text-custom-white font-lexend">
      <HeroSection />

      <div className=" relative w-full h-[150vh] md:h-[70vh] lg:h-auto xl:h-auto 2xl:h-auto flex flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row items-center justify-center gap-10 sm:gap-12 lg:gap-14 p-5 bg-white  ">
        {" "}
        <motion.div
          initial={{ scale: 1.25 }}
          whileInView={{ scale: 1 }}
          transition={{ ease: "linear", duration: 0.3 }}
          className=" absolute hidden lg:block w-[200px] h-[200px] sm:w-[260px] sm:h-[260px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px] -right-20 md:-right-40 lg:-right-52 bg-custom-beige rounded-full z-10 "
        />{" "}
        <motion.div
          initial={{ scale: 1.25 }}
          whileInView={{ scale: 1 }}
          transition={{ ease: "linear", duration: 0.3 }}
          className=" absolute hidden lg:block sm:w-[260px] sm:h-[260px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px] -left-20 md:-left-40 lg:-left-52 bg-custom-beige rounded-full z-10 "
        />{" "}
        {navBlocks.map((b, _i) => (
          <NavSectionBlock
            key={_i}
            Icon={b.Icon}
            title={b.title}
            description={b.description}
            CallToActionLink={{
              Label: b.CallToActionLink.Label,
              Link: b.CallToActionLink.Link,
            }}
          />
        ))}{" "}
      </div>

      <MeetOurClinic />

      <div className="w-full px-6 py-12 md:px-12 lg:px-20 flex flex-col md:flex-row items-center justify-between gap-12">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ ease: "linear", duration: 0.4 }}
          className="w-full md:w-[45%] flex flex-col gap-6 text-custom-black"
        >
          <p className="text-4xl md:text-5xl font-semibold">Our services</p>

          <p className="text-base md:text-lg leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, nam
            voluptates sequi minima dolorum sunt amet consequuntur earum
            perspiciatis vel facilis iusto ad voluptatibus sed officiis libero
            maxime incidunt ratione!
          </p>

          <button className="w-48 md:w-64 h-10 rounded-sm font-semibold bg-custom-primary text-sm text-custom-black hover:bg-custom-white hover:shadow-lg transition-all ease-linear duration-150 font-lexend cursor-pointer">
            Our services
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ ease: "linear", duration: 0.4 }}
          className="w-full md:w-[45%] grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-10"
        >
          {OurServices.map((s, i) => (
            <ServiceBlock key={i} Icon={s.Icon} Text={s.Text} />
          ))}
        </motion.div>
      </div>

      <EmergencySection />
    </section>
  );
};

export default HomePage;
