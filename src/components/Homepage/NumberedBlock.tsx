interface INumberedBlocks {
  Number: string;
  Text: string;
  Description: string;
}

const NumberedBlock = ({ Number, Text, Description }: INumberedBlocks) => {
  return (
    <div className=" w-full h-full p-4 relative font-lexend flex items-center justify-center flex-col">
      <div className="w-full h-full flex items-start justify-center flex-col">
        <p className="absolute font-black text-6xl text-custom-primary 2xl:top-7 2xl:left-0 z-0">
          {Number}
        </p>
        <p className=" text-custom-black text-lg md:text-2xl font-semibold z-50">
          {Text}
        </p>
        <p className=" text-custom-black text-sm z-50">{Description}</p>
      </div>
    </div>
  );
};

export default NumberedBlock;
