import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";

export type HeadType = {
  className?: string;

  /** Style props */
  terminalColor?: CSSProperties["color"];
  headJustifyContent?: CSSProperties["justifyContent"];
  headGap?: CSSProperties["gap"];
  aiGGDisplay?: CSSProperties["display"];
  aiGGMinWidth?: CSSProperties["minWidth"];
  homeWidth?: CSSProperties["width"];
  agentWidth?: CSSProperties["width"];
  agentDisplay?: CSSProperties["display"];
  agentMinWidth?: CSSProperties["minWidth"];
  terminalWidth?: CSSProperties["width"];
  terminalDisplay?: CSSProperties["display"];
  terminalMinWidth?: CSSProperties["minWidth"];
  l9598D4827Height?: CSSProperties["height"];
  l9598D4827Display?: CSSProperties["display"];
  l9598D4827AlignItems?: CSSProperties["alignItems"];
  l9598D4827JustifyContent?: CSSProperties["justifyContent"];
};

const Head: NextPage<HeadType> = ({
  className = "",
  terminalColor,
  headJustifyContent,
  headGap,
  aiGGDisplay,
  aiGGMinWidth,
  homeWidth,
  agentWidth,
  agentDisplay,
  agentMinWidth,
  terminalWidth,
  terminalDisplay,
  terminalMinWidth,
  l9598D4827Height,
  l9598D4827Display,
  l9598D4827AlignItems,
  l9598D4827JustifyContent,
}) => {
  const terminalStyle: CSSProperties = useMemo(() => {
    return {
      color: terminalColor,
      width: terminalWidth,
      display: terminalDisplay,
      minWidth: terminalMinWidth,
    };
  }, [terminalColor, terminalWidth, terminalDisplay, terminalMinWidth]);

  const headStyle: CSSProperties = useMemo(() => {
    return {
      justifyContent: headJustifyContent,
      gap: headGap,
    };
  }, [headJustifyContent, headGap]);

  const aiGGStyle: CSSProperties = useMemo(() => {
    return {
      display: aiGGDisplay,
      minWidth: aiGGMinWidth,
    };
  }, [aiGGDisplay, aiGGMinWidth]);

  const homeStyle: CSSProperties = useMemo(() => {
    return {
      width: homeWidth,
    };
  }, [homeWidth]);

  const agentStyle: CSSProperties = useMemo(() => {
    return {
      width: agentWidth,
      display: agentDisplay,
      minWidth: agentMinWidth,
    };
  }, [agentWidth, agentDisplay, agentMinWidth]);

  const l9598D4827Style: CSSProperties = useMemo(() => {
    return {
      height: l9598D4827Height,
      display: l9598D4827Display,
      alignItems: l9598D4827AlignItems,
      justifyContent: l9598D4827JustifyContent,
    };
  }, [
    l9598D4827Height,
    l9598D4827Display,
    l9598D4827AlignItems,
    l9598D4827JustifyContent,
  ]);

  return (
    <header
      className={`self-stretch [background:linear-gradient(-90deg,_rgba(16,_16,_16,_0),_rgba(40,_37,_120,_0.18)_50%,_rgba(16,_16,_16,_0))] flex flex-row items-start justify-between pt-[19px] pb-[22px] pl-[307px] pr-[193px] box-border top-[0] z-[99] sticky gap-5 max-w-full text-center text-17xl text-royalblue-100 font-anta mq700:pl-[76px] mq700:pr-12 mq700:box-border mq975:pl-[153px] mq975:pr-24 mq975:box-border ${className}`}
      style={headStyle}
    >
      <div className="h-[86px] w-[1920px] relative [background:linear-gradient(-90deg,_rgba(16,_16,_16,_0),_rgba(40,_37,_120,_0.18)_50%,_rgba(16,_16,_16,_0))] hidden max-w-full" />
      <a
        className="[text-decoration:none] relative text-[inherit] text-left z-[1]"
        style={aiGGStyle}
      >
        AiGG
      </a>
      <div className="w-[513px] flex flex-col items-start justify-start pt-3.5 px-0 pb-0 box-border max-w-full text-lg text-white font-trispace mq950:w-0">
        <div className="self-stretch flex flex-row items-start justify-between gap-5 mq950:hidden">
          <a
            className="[text-decoration:none] relative text-[inherit] inline-block min-w-[52px] z-[1]"
            style={homeStyle}
          >
            Home
          </a>
          <a
            className="[text-decoration:none] relative text-[inherit] z-[1]"
            style={agentStyle}
          >
            Agent
          </a>
          <a
            className="[text-decoration:none] relative text-[inherit] z-[1]"
            style={terminalStyle}
          >
            Terminal
          </a>
        </div>
      </div>
      <div className="w-[195px] flex flex-col items-start justify-start pt-[3px] px-0 pb-0 box-border text-5xl">
        <div className="self-stretch rounded-10xs bg-gray-100 flex flex-row items-start justify-start py-1 pl-3 pr-2.5 z-[1]">
          <div className="h-[42px] w-[195px] relative rounded-10xs bg-gray-100 hidden" />
          <a
            className="[text-decoration:none] flex-1 relative text-[inherit] z-[1]"
            style={l9598D4827Style}
          >
            8L9598D4827
          </a>
        </div>
      </div>
    </header>
  );
};

export default Head;
