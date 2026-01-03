import type { IconType } from "react-icons";

interface IServiceBLock {
  Icon: IconType;
  Text: string;
}

const ServiceBlock = ({ Icon, Text }: IServiceBLock) => {
  return (
    <div className=" flex flex-col items-center justify-center gap-3">
      <div className="p-4 rounded-full flex items-center justify-center bg-custom-primary text-custom-blue">
        <Icon size={35} />
      </div>
      <div>
        <p className="text-custom-black text-xs font-lexend">{Text}</p>
      </div>
    </div>
  );
};

export default ServiceBlock;
