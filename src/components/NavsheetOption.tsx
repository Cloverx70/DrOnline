import { Link } from "react-router-dom";

interface NavsheetOption {
  label: string;
  to: string;
}

const NavsheetOption = ({ label, to }: NavsheetOption) => {
  return (
    <Link
      to={to}
      className=" w-full py-3 flex items-center justify-center text-sm "
    >
      {label.toUpperCase()}
    </Link>
  );
};

export default NavsheetOption;
