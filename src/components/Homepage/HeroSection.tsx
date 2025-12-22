import Navbar from "../Navbar";
import NumberedBlock from "./NumberedBlock";
import Shuffle from "@/components/Shuffle";
import SplitText from "@/components/SplitText";
import Stehoscope from "./../../assets/Stehoscope.png";
import femaleImage from "./../../assets/FemaleDr.png";
import { motion } from "framer-motion";
import { specialties } from "@/constants";
import { useAuthStatus } from "@/hooks/useAuthStatus";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  const { data: user } = useAuthStatus();
  return (
    <div className=" w-full flex flex-col h-screen bg-custom-primary">
      <Navbar user={user} />

      <div className=" h-full flex-1 flex flex-col">
        <div className="h-[80%] flex ">
          <div className="relative w-1/2 h-full items-center justify-center ">
            <div className=" w-full h-full flex items-center justify-center">
              <div className="w-3/4 h-full flex flex-col gap-5 items-start justify-center text-custom-black">
                <SplitText
                  text="Your Health, Connected."
                  className="text-3xl 2xl:text-6xl lg:text-6xl md:text-5xl sm:text-4xl font-bold z-50"
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
                <div className="w-3/4">
                  <Shuffle
                    text="Dr. Online bridges the gap between patients and doctors. Get
                    the latest medical updates, discuss conditions, and stay
                    informed — all in one secure platform."
                    shuffleDirection="right"
                    duration={0.35}
                    animationMode="evenodd"
                    shuffleTimes={1}
                    ease="power3.out"
                    stagger={0.03}
                    threshold={0.1}
                    triggerOnce={true}
                    triggerOnHover={true}
                    respectReducedMotion={true}
                    textAlign="start"
                    className=" text-xs 2xl:text-xl xl:text-xl lg:text-sm md:text-sm sm:text-xs font-lexend font-light lowercase"
                  />
                </div>

                <button
                  onClick={() => navigate("/about-us")}
                  className="z-50 px-8 2xl:px-16 py-2 2xl:py-3 text-xs 2xl:text-base rounded-sm bg-custom-blue text-white font-lexend cursor-pointer hover:bg-custom-gray transition-colors ease-linear duration-100 "
                >
                  Read more
                </button>
              </div>
              <div className=" absolute w-[200px] h-[200px] 2xl:w-[600px] 2xl:h-[600px] xl:w-[600px] xl:h-[600px] lg:w-[600px] lg:h-[600px] -bottom-20 -left-6 2xl:-bottom-94 2xl:-left-20 xl:-bottom-94 xl:-left-20 lg:-bottom-94 lg:-left-20  rotate-20 z-0">
                <img src={Stehoscope} alt="" />
              </div>
              <div className="absolute w-[70px] h-[70px] -left-5 top-30 z-10 bg-custom-beige rounded-full" />
            </div>
          </div>
          <div className="relative h-full w-1/2 flex items-end justify-center overflow-hidden">
            <motion.div
              initial={{ scale: 1.25 }}
              animate={{ scale: 1 }}
              transition={{ ease: "linear", duration: 0.3 }}
              className="absolute w-[200px] h-[200px] 2xl:w-[800px] 2xl:h-[800px] xl:w-[600px] xl:h-[600px] lg:w-[450px] lg:h-[450px] md:w-[400px] md:h-[400px] md:-right-10 sm:w-[300px] sm:h-[300px] 2xl:top-20 z-10 bg-custom-beige rounded-full"
            />
            <motion.div
              initial={{ scale: 1.25 }}
              animate={{ scale: 1 }}
              transition={{ ease: "linear", duration: 0.3 }}
              className="absolute w-[100px] h-[100px] 2xl:right-20 -right-10 top-0 z-10 bg-custom-beige rounded-full"
            />

            <div className=" 2xl:w-[600px] 2xl:h-[600px] z-50">
              <img src={femaleImage} alt="" />
            </div>
          </div>
        </div>
        <div className="w-full min-h-[20%] flex-col md:flex-row flex  items-center justify-center gap-10 z-30  p-5 bg-white">
          {specialties.map((s, i) => {
            return (
              <div key={i} className="w-full h-full overflow-hidden ">
                <NumberedBlock
                  Number={s.number}
                  Text={s.text}
                  Description={s.description}
                />
                ;
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
