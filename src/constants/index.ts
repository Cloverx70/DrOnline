import {
  FaCalendarCheck,
  FaClipboardList,
  FaFileDownload,
  FaFirstAid,
  FaIdCard,
  FaLongArrowAltRight,
  FaRegCommentDots,
} from "react-icons/fa";
import { LuBrain, LuHeartPulse, LuStethoscope } from "react-icons/lu";
import { LuBriefcaseMedical, LuClipboardList } from "react-icons/lu";

import { FaUserDoctor } from "react-icons/fa6";

export const specialties = [
  {
    number: "01",
    text: "Personalized Patient Care",
    description:
      "Doctors provide tailored updates and guidance for every patient’s condition.",
  },
  {
    number: "02",
    text: "Latest Medical Studies",
    description:
      "Stay informed with up-to-date research and treatment options shared by qualified doctors.",
  },
  {
    number: "03",
    text: "Collaborative Discussions",
    description:
      "Patients and doctors can discuss diseases, treatments, and general health topics together.",
  },
  {
    number: "04",
    text: "Accessible Platform",
    description:
      "All information is stored securely and accessible anytime, from anywhere.",
  },
];

export const navBlocks = [
  {
    Icon: LuClipboardList,
    title: "Online Surveys",
    description:
      "Online surveys are forms you answer on the internet. They help companies, researchers, and creators understand what people think, want, or prefer.",
    CallToActionLink: {
      Label: "Apply",
      Link: "",
    },
  },
  {
    Icon: LuBriefcaseMedical,
    title: "Emergency Case",
    description:
      "For urgent medical concerns or immediate assistance, our team is available to respond quickly and guide you to the help you need.",
    CallToActionLink: {
      Label: "Contact us",
      Link: "/contact-us",
    },
  },
  {
    Icon: FaUserDoctor,
    title: "Our Doctors",
    description:
      "Our doctors are qualified specialists committed to delivering trusted medical advice and patient-centered care.",
    CallToActionLink: {
      Label: "Doctors",
      Link: "",
    },
  },
];

export const OurServices = [
  {
    Icon: LuStethoscope,
    Text: "General Checkups",
  },
  {
    Icon: LuClipboardList,
    Text: "Online Surveys",
  },
  {
    Icon: LuBriefcaseMedical,
    Text: "Emergency Care",
  },
  {
    Icon: FaUserDoctor,
    Text: "Our Doctors",
  },
  {
    Icon: LuHeartPulse,
    Text: "Health Monitoring",
  },
  {
    Icon: LuBrain,
    Text: "Medical Consultation",
  },
];

export const FooterMainLinks = [
  { label: "Home", icon: FaLongArrowAltRight },
  { label: "About Us", icon: FaLongArrowAltRight },
  { label: "Services", icon: FaLongArrowAltRight },
  { label: "Contact", icon: FaLongArrowAltRight },
];

export const FooterServiceLinks = [
  { label: "Online Surveys", icon: FaLongArrowAltRight },
  { label: "Emergency Case", icon: FaLongArrowAltRight },
  { label: "Our Doctors", icon: FaLongArrowAltRight },
  { label: "Privacy Policy", icon: FaLongArrowAltRight },
];

export const NavOptions = [
  {
    label: "Doctors",
    to: "/doctors",
  },
  {
    label: "Our services",
    to: "/our-services",
  },
  {
    label: "Emergency case",
    to: "/emergency",
  },
];

export const Fourms = [
  {
    title: "Online Survey",
    description:
      "Help us improve our services by filling out a short online survey.",
    icon: FaClipboardList,
    button: "Start Survey",
    link: "/survey",
  },
  {
    title: "Appointment Request",
    description:
      "Request an appointment with your preferred doctor quickly and easily.",
    icon: FaCalendarCheck,
    button: "Request Appointment",
    link: "/appointment-request",
  },
  {
    title: "Emergency Fast Form",
    description:
      "For urgent concerns—send a quick message and we’ll contact you immediately.",
    icon: FaFirstAid,
    button: "Send Emergency Message",
    link: "/emergency-form",
  },
  {
    title: "Medical History Form",
    description:
      "Download and fill the medical history form before your next check-up.",
    icon: FaFileDownload,
    button: "Download Form",
    link: "/medical-history",
  },
  {
    title: "Feedback Form",
    description:
      "Tell us about your experience so we can continue improving our care.",
    icon: FaRegCommentDots,
    button: "Give Feedback",
    link: "/feedback",
  },
  {
    title: "Insurance Information",
    description:
      "Submit your insurance details to speed up the verification process.",
    icon: FaIdCard,
    button: "Fill Insurance Form",
    link: "/insurance",
  },
];

export const Doctors = [
  {
    id: 1,
    name: "Dr. Joe Johnson",
    specialty: "Cardiologist",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7",
    description:
      "Expert in heart health and patient care with 10+ years experience.",
  },
  {
    id: 2,
    name: "Dr. Sarah Lee",
    specialty: "Neurologist",
    image:
      "https://cdn.pixabay.com/photo/2024/01/11/06/27/ai-generated-8500905_960_720.jpg",
    description:
      "Specialist in neurological disorders and advanced treatments.",
  },
  {
    id: 3,
    name: "Dr. Lebron Davis",
    specialty: "Pediatrician",
    image: "https://images.unsplash.com/photo-1550831107-1553da8c8464",
    description: "Dedicated to children’s health and family care.",
  },
  {
    id: 4,
    name: "Dr. Eva Smith",
    specialty: "General Practitioner",
    image:
      "https://cdn.pixabay.com/photo/2022/06/14/12/48/doctor-7261806_960_720.jpg",
    description: "Committed to providing high-quality care for all patients.",
  },
];
