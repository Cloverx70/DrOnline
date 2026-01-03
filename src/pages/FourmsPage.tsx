import { FaLongArrowAltRight } from "react-icons/fa";
import { Fourms } from "@/constants";
import SplitText from "@/components/SplitText";
import { motion } from "framer-motion";

const FourmsPage = () => {
  return (
    <>
      <head>
        <title>Fourms</title>
      </head>
      <section className="w-full py-20 px-10 text-custom-black">
        <div className=" w-full flex items- justify-center">
          <SplitText
            text="Forms & Requests"
            delay={100}
            duration={0.4}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="start"
            className="text-4xl font-lexend font-bold mb-10 text-center"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {Fourms.map((form, index) => {
            const Icon = form.icon;

            return (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ ease: "linear", duration: 0.4 }}
                key={index}
                className="bg-custom-primary p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col gap-4"
              >
                <Icon className="text-custom-blue text-4xl" />

                <h2 className="text-xl font-semibold">{form.title}</h2>

                <p className="text-sm text-custom-black/80 leading-relaxed">
                  {form.description}
                </p>

                <button className="mt-auto flex items-center gap-2 text-white bg-custom-blue px-4 py-2 rounded-md font-semibold text-sm hover:bg-custom-black transition-all">
                  {form.button}
                  <FaLongArrowAltRight />
                </button>
              </motion.div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default FourmsPage;
