import type { NextPage } from "next";
import Image from "next/image";

export type ContentWrapperType = {
  className?: string;
};

const ContentWrapper: NextPage<ContentWrapperType> = ({ className = "" }) => {
  return (
    <section
      className={`w-[1432px] flex flex-row items-start justify-start gap-[25px] max-w-full text-center text-131xl text-royalblue-200 font-anta ${className}`}
    >
      <div className="w-[175px] flex flex-col items-start justify-start pt-[91px] px-0 pb-0 box-border min-h-[723px] mq1050:hidden">
        <h1 className="m-0 w-[632px] h-[175px] relative text-inherit font-normal font-[inherit] inline-block shrink-0 [transform:_rotate(-90deg)] max-w-[362%] mq450:text-18xl mq1050:text-41xl">
          Terminal
        </h1>
      </div>
      <div className="h-[778px] flex-1 relative max-w-[calc(100%_-_200px)] text-left text-21xl text-white mq1050:max-w-full">
        <div className="absolute top-[48px] left-[0px] rounded-blur-100 bg-gray-400 w-full flex flex-col items-start justify-between py-10 px-16 box-border min-h-[730px] max-w-full lg:pl-8 lg:pr-8 lg:box-border">
          <div className="w-[603px] relative leading-[150%] inline-block max-w-full z-[1] mq450:text-3xl mq450:leading-[36px] mq1050:text-10xl mq1050:leading-[48px]">
            <span>{`Now you’ve got my attention. `}</span>
            <span className="text-17xl whitespace-pre-wrap">
              Just you, me, and whatever’s on your mind—drop a tweet my way, and
              I’ll make it our next move. Let’s chat, interact, and shake things
              up together.
            </span>
          </div>
          <div className="self-stretch h-[72px] relative [backdrop-filter:blur(28.2px)] rounded-8xs bg-darkslateblue min-w-[250px] z-[1]">
            <div className="absolute top-[16px] left-[40px] rounded-radius-sm w-10 h-10 flex flex-row items-center justify-start p-2 box-border">
              <Image
                className="h-6 w-6 relative"
                width={24}
                height={24}
                alt=""
                src="/group-3466045.svg"
              />
            </div>
            <input
              className="[border:none] [outline:none] font-trispace text-lg bg-[transparent] absolute top-[25px] left-[88px] leading-[120%] text-steelblue text-left inline-block w-[60px] h-[22px]"
              type="text"
            />
            <div className="absolute top-[16px] left-[1024px] [backdrop-filter:blur(24px)] rounded-corner-extra-small bg-royalblue-100 w-10 h-10 flex flex-row items-center justify-start p-2 box-border">
              <Image
                className="h-6 w-6 relative"
                width={24}
                height={24}
                alt=""
                src="/group-3466044.svg"
              />
            </div>
          </div>
        </div>
        <Image
          className="absolute top-[0px] left-[513px] w-[666px] h-[666px] object-cover z-[2]"
          loading="lazy"
          width={666}
          height={666}
          alt=""
          src="/01-1@2x.png"
        />
      </div>
    </section>
  );
};

export default ContentWrapper;
