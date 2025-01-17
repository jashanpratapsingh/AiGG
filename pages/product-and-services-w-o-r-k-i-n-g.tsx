import type { NextPage } from "next";
import Head from "../components/head";
import ContentWrapper from "../components/content-wrapper";

const ProductAndServicesWORKING: NextPage = () => {
  return (
    <div className="w-full relative bg-gray-300 overflow-hidden flex flex-col items-end justify-start pt-0 px-0 pb-[198px] box-border gap-[18px] leading-[normal] tracking-[normal]">
      <Head
        terminalColor="#4d76ff"
        headJustifyContent="center"
        headGap="314.5px"
        aiGGDisplay="inline-block"
        aiGGMinWidth="83px"
        homeWidth="52px"
        agentWidth="60px"
        agentDisplay="inline-block"
        agentMinWidth="60px"
        terminalWidth="92px"
        terminalDisplay="inline-block"
        terminalMinWidth="92px"
        l9598D4827Height="34px"
        l9598D4827Display="flex"
        l9598D4827AlignItems="center"
        l9598D4827JustifyContent="center"
      />
      <main className="w-[1890px] flex flex-row items-start justify-center py-0 px-5 box-border max-w-full">
        <ContentWrapper />
      </main>
    </div>
  );
};

export default ProductAndServicesWORKING;
