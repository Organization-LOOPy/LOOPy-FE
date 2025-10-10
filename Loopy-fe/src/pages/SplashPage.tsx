import LoopyLogo from "../assets/images/LoopyLogo.svg?react";

const SplashPage = () => {
  return (
    <div
      className="flex flex-col items-center justify-center h-screen text-white text-center -mx-[1.5rem]"
      style={{
        background: "linear-gradient(135deg, #6970F3 0%, #3D418D 100%)",
      }}
    >
      <h1 className="font-bold text-[1.5rem] leading-[150%]">
        오늘의 커피, 매일의 루피
      </h1>

      <LoopyLogo className="w-[12.25rem] h-[4rem] mt-[1rem]" />
    </div>
  );
};

export default SplashPage;
