import type { IconType } from "react-icons";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface INavSectionBlock {
  Icon: IconType;
  title: string;
  description: string;
  CallToActionLink: { Label: string; Link: string };
}
const NavSectionBlock = ({
  Icon,
  title,
  description,
  CallToActionLink,
}: INavSectionBlock) => {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ ease: "easeInOut", duration: 0.5 }}
      viewport={{ once: true, amount: 0.3 }}
      className="z-20 w-full sm:w-[80%] md:w-[45%] lg:w-[30%] xl:w-[22%] 2xl:w-[20%] h-[330px] sm:h-[360px] md:h-[380px] lg:h-[400px] bg-custom-white rounded-lg shadow-lg shadow-black/20 flex flex-col items-center justify-between py-10 text-black hover:-translate-y-2 hover:bg-custom-blue hover:text-white transition-all duration-150 ease-linear "
    >
      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-custom-primary flex items-center justify-center rounded-full">
        <Icon size={30} className="text-custom-blue" />
      </div>
      <div className="w-full flex flex-col items-center gap-4 sm:gap-5">
        <p className="text-xl sm:text-2xl">{title}</p>
        <p className="w-4/5 sm:w-3/4 text-center text-xs sm:text-sm">
          {description}
        </p>
      </div>
      <button
        className=" w-32 sm:w-40 h-8 sm:h-9 rounded-sm font-semibold bg-custom-primary text-sm text-custom-black hover:text-custom-black font-lexend cursor-pointer hover:bg-white transition-colors ease-linear duration-100 "
        onClick={() => navigate(CallToActionLink.Link)}
      >
        {CallToActionLink.Label}
      </button>
    </motion.div>
  );
};
export default NavSectionBlock;
