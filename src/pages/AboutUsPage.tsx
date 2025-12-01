import SplitText from "@/components/SplitText";
import { motion } from "framer-motion";

const AboutUsPage = () => {
  return (
    <>
      <head>
        <title>About us</title>
      </head>
      <div className="w-full text-custom-black">
        <section className="w-full py-20 bg-custom-primary flex flex-col items-center justify-center text-center px-6">
          <SplitText
            text="About Doctor Online"
            delay={100}
            duration={0.4}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="start"
            className="text-4xl font-bold mb-4"
          />

          <p className="text-lg max-w-2xl text-custom-black/70">
            We are committed to making healthcare more accessible, efficient,
            and supportive by connecting patients with trusted medical
            professionals—anywhere, anytime.
          </p>
        </section>

        <section className="py-20 px-10 grid grid-cols-1 md:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ ease: "linear", duration: 0.4 }}
          >
            <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
            <p className="text-custom-black/70">
              Our mission is to simplify healthcare access by offering secure
              online consultations, professional medical guidance, and seamless
              communication between patients and doctors. We aim to empower
              individuals to take control of their health with convenience and
              trust.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ ease: "linear", duration: 0.4 }}
          >
            <h2 className="text-3xl font-semibold mb-4">Our Vision</h2>
            <p className="text-custom-black/70">
              We envision a future where healthcare is borderless—where every
              person can receive immediate support, reliable diagnosis, and
              expert care without delays, travel, or stress.
            </p>
          </motion.div>
        </section>

        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ ease: "linear", duration: 0.4 }}
          className="py-20 px-10 bg-custom-primary"
        >
          <h2 className="text-3xl font-semibold text-center mb-12">
            Our Core Values
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            <div className="p-6 bg-white rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-3">Trust</h3>
              <p className="text-custom-black/70">
                We ensure every patient receives reliable and confidential
                medical assistance.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-3">Compassion</h3>
              <p className="text-custom-black/70">
                Our doctors provide care with empathy, understanding, and
                respect.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-3">Efficiency</h3>
              <p className="text-custom-black/70">
                We make healthcare fast, simple, and accessible through modern
                technology.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-3">Professionalism</h3>
              <p className="text-custom-black/70">
                Our team consists of certified doctors committed to ethical and
                high-quality care.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-3">Innovation</h3>
              <p className="text-custom-black/70">
                We continuously improve our services to elevate the patient
                experience.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-3">Accessibility</h3>
              <p className="text-custom-black/70">
                We connect people with medical support from any location or
                circumstance.
              </p>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ ease: "linear", duration: 0.4 }}
          className="py-20 px-10"
        >
          <h2 className="text-3xl font-semibold text-center mb-10">
            Why Choose Us?
          </h2>
          <p className="text-center max-w-3xl mx-auto text-custom-black/70 leading-relaxed">
            Our team is built from experienced, trusted doctors across multiple
            specialties. We focus on delivering accurate medical guidance while
            maintaining a personal, human-centered touch. With Doctor Online,
            you’re not just receiving a service— you’re receiving care.
          </p>
        </motion.section>

        <section className="w-full py-20 bg-custom-blue flex flex-col items-center justify-center text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="max-w-xl mb-6 text-lg">
            Connect with our doctors today and receive fast, reliable medical
            support.
          </p>
          <a
            href="/contact-us"
            className="px-8 py-3 bg-white text-custom-blue font-semibold rounded-md hover:bg-custom-black hover:text-white transition-all"
          >
            Contact Us
          </a>
        </section>
      </div>
    </>
  );
};

export default AboutUsPage;
