import { FooterMainLinks, FooterServiceLinks } from "@/constants";

const Footer = () => {
  return (
    <div className=" w-full text-sm bg-custom-primary text-custom-black p-20 flex items-center justify-center gap-24">
      <div className=" flex flex-col gap-5 text-center">
        {FooterMainLinks.map((l) => {
          return (
            <div className=" flex items-center gap-2">
              <l.icon />
              <p className="underline text-xs">{l.label}</p>
            </div>
          );
        })}
      </div>
      <div className=" flex flex-col gap-5">
        {FooterServiceLinks.map((l) => {
          return (
            <div className=" flex items-center gap-2">
              <l.icon />
              <p className="underline text-xs">{l.label}</p>
            </div>
          );
        })}
      </div>
      <div className=" flex flex-col gap-5">
        <div className=" flex flex-col ">
          <p className=" text-2xl font-bold gap-1">CALL US</p>
          <p>+961 81674891</p>
        </div>
        <div className=" flex flex-col gap-1">
          <p className=" text-2xl font-bold">OR WRITE</p>
          <p>support@doctoronline.com</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
