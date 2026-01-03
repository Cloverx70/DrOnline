import EmergencyPic from "./../../assets/EmergencyPic.png";
import TextType from "../TextType";

const EmergencySection = () => {
  return (
    <div className="w-full py-16 px-6 md:px-12 lg:px-20 flex flex-col lg:flex-row text-custom-black gap-10 lg:gap-0">
      <div className="w-full lg:w-1/2 flex justify-center">
        <img src={EmergencyPic} alt="" className="w-full h-auto object-cover" />
      </div>

      <div className="w-full lg:w-1/2 bg-custom-primary p-8 md:p-12 flex items-center">
        <div className="w-full flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <TextType
              text={["Need an Emergency Help? Call Us!"]}
              typingSpeed={75}
              pauseDuration={1500}
              showCursor={true}
              cursorCharacter="|"
              className="text-3xl md:text-4xl font-semibold"
            />
            <p className="text-xl md:text-2xl text-custom-blue font-semibold">
              +961674891
            </p>
          </div>

          <p className="text-base md:text-lg leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam omnis
            asperiores quidem quisquam explicabo tempora iure distinctio quia
            ea. Rem sequi atque facere. Illo, fuga deserunt unde ab eveniet
            quam.
          </p>

          <button className="w-48 md:w-64 h-10 rounded-sm font-semibold bg-custom-blue text-sm text-white hover:text-custom-black font-lexend cursor-pointer hover:bg-custom-white hover:shadow-lg transition-all ease-linear duration-150">
            Contact us
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmergencySection;
