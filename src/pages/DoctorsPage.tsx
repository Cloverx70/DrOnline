import { GetAllDoctors } from "@/api/doctor";
import Spinner from "@/components/Spinner";
import SplitText from "@/components/SplitText";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";

const DoctorsPage = () => {
  const navigate = useNavigate();
  const { data: doctors, isLoading } = useQuery({
    queryKey: ["Doctors"],
    queryFn: GetAllDoctors,
  });

  if (isLoading)
    return (
      <div className=" w-full h-[700px] max-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  return (
    <>
      <head>
        <title>Doctors</title>
      </head>
      <section className="w-full py-20 px-10 text-custom-black">
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
        <h1 className="  font-bold text-xl py-5">
          {doctors?.length} Doctors found :
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {doctors?.map((doc) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ ease: "linear", duration: 0.5 }}
              onClick={() => navigate(`/doctors/${doc.id}`)}
              className="bg-custom-primary p-6 rounded-xl cursor-pointer shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col items-center gap-4 text-center"
            >
              <img
                src={doc.pfpURL}
                alt={doc.user.firstname}
                className="w-32 h-32 rounded-full object-cover border-4 border-custom-blue"
              />

              <h2 className="text-xl font-semibold">
                {doc.user.firstname + " " + doc.user.lastname}
              </h2>
              <p className="text-custom-blue font-medium">
                {doc.specialization}
              </p>
              <p className="text-sm text-custom-black/80">{doc.bio}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
};

export default DoctorsPage;
