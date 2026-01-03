import {
  CalendarCheck,
  MessageSquare,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

import { motion } from "framer-motion";

const services = [
  {
    icon: Stethoscope,
    title: "Doctor Profiles",
    description:
      "Verified doctors with full profiles, specialties, experience, and clinic information so patients can choose confidently.",
  },
  {
    icon: CalendarCheck,
    title: "Appointments & Studies",
    description:
      "Seamless appointment booking and medical study management between doctors and patients.",
  },
  {
    icon: MessageSquare,
    title: "Secure Communication",
    description:
      "Private and secure messaging between doctors and patients for follow-ups and updates.",
  },
  {
    icon: ShieldCheck,
    title: "Privacy & Security",
    description:
      "Your medical data is protected with authentication, authorization, and encrypted sessions.",
  },
];

export default function OurServicesPage() {
  return (
    <>
      <head>
        <title>Our Services</title>
      </head>
      <div className="min-h-screen bg-background px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-5xl text-center"
        >
          <h1 className="text-4xl font-bold tracking-tight">Our Services</h1>
          <p className="mt-4 text-muted-foreground text-lg">
            We connect patients and doctors through a modern, secure, and
            easy-to-use healthcare platform.
          </p>
        </motion.div>

        <div className="mx-auto mt-16 grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
            >
              <Card className="h-full rounded-2xl shadow-sm">
                <CardContent className="flex h-full flex-col items-center text-center p-6">
                  <service.icon className="mb-4 h-10 w-10 text-primary" />
                  <h3 className="text-xl font-semibold">{service.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mx-auto mt-24 max-w-3xl text-center"
        >
          <h2 className="text-3xl font-bold">How We Serve You</h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Our platform is designed to reduce friction in healthcare. Patients
            get fast access to trusted doctors, and doctors get powerful tools
            to manage studies, appointments, and communication — all in one
            place.
          </p>
        </motion.div>
      </div>
    </>
  );
}
