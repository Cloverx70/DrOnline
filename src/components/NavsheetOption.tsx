import { Link } from "react-router-dom";

interface NavsheetOption {
  label: string;
  to: string;
}

const NavsheetOption = ({ label, to }: NavsheetOption) => {
  return (
    <Link
      to={to}
      className="relative h-10 md:h-12 w-fit text-xl md:text-3xl flex items-center justify-start font-light
      after:content-[''] after:absolute after:left-0 after:bottom-0
    after:h-0.5 after:w-0 after:bg-custom-black
    after:transition-all after:duration-300
    hover:after:w-full
      "
    >
      {label.toUpperCase()}
    </Link>
  );
};

export default NavsheetOption;
