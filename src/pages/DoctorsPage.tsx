import { Doctors } from "@/constants";
import SplitText from "@/components/SplitText";
import { motion } from "framer-motion";

const DoctorsPage = () => {
  return (
    <div className="w-full py-20 px-10 text-custom-black">
      <div className=" w-full flex items-center justify-center">
        <SplitText
          text="Meet Our Doctors"
          delay={100}
          duration={0.4}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="start"
          className="text-6xl font-lexend font-bold mb-12 text-center"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {Doctors.map((doc) => (
          <motion.div
            key={doc.id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ ease: "linear", duration: 0.4 }}
            className="bg-custom-primary p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col items-center gap-4 text-center"
          >
            <img
              src={doc.image}
              alt={doc.name}
              className="w-32 h-32 rounded-full object-cover border-4 border-custom-blue"
            />

            <h2 className="text-xl font-semibold">{doc.name}</h2>
            <p className="text-custom-blue font-medium">{doc.specialty}</p>
            <p className="text-sm text-custom-black/80">{doc.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsPage;
