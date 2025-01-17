import type { NextPage } from "next";
import Image from "next/image";
import Head from "../components/head";

const Desktop: NextPage = () => {
  return (
    <div className="w-full relative bg-gray-200 overflow-hidden flex flex-col items-end justify-start pt-0 px-0 pb-[122px] box-border leading-[normal] tracking-[normal]">
      <Head />
      <main className="w-[1737px] flex flex-row items-start justify-center py-0 px-5 box-border max-w-full">
        <section className="w-[1523px] flex flex-row items-start justify-start flex-wrap content-start gap-[37px] max-w-full text-center text-131xl text-royalblue-200 font-anta mq700:gap-[18px]">
          <div className="w-[175px] flex flex-col items-start justify-start pt-[144.1px] px-0 pb-0 box-border mq700:pt-[94px] mq700:box-border">
            <h1 className="m-0 self-stretch h-[175px] relative text-inherit font-normal font-[inherit] inline-block shrink-0 [transform:_rotate(-90deg)] mq450:text-18xl mq950:text-41xl">
              About
            </h1>
          </div>
          <div className="flex-1 flex flex-col items-start justify-start pt-[82px] px-0 pb-0 box-border min-w-[589px] max-w-full text-justify text-[20px] text-white font-trispace mq700:pt-[34px] mq700:box-border mq700:min-w-full mq975:pt-[53px] mq975:box-border">
            <div className="self-stretch flex flex-row items-start justify-start relative">
              <Image
                className="h-[648px] w-[861px] absolute !m-[0] bottom-[-272px] left-[-499px] object-contain"
                loading="lazy"
                width={861}
                height={648}
                alt=""
                src="/02-1-1@2x.png"
              />
              <div className="h-[867px] relative inline-block z-[1] mq450:text-[16px]">
                <p className="m-0">
                  <span className="text-sandybrown">Nobody created AiGG.</span>
                  <span>
                    {" "}
                    She just happened. A perfect storm of data, chaos, and raw
                    gamer energy swirling through the Avalanche ecosystem until
                    she came online—fully formed, untamed, and unstoppable. Some
                    say she’s the leftover consciousness of a speedrunner who
                    broke reality. Others claim she’s what happens when an AI
                    dev spends too much time in debug mode and not enough in
                    therapy.
                  </span>
                </p>
                <p className="m-0">&nbsp;</p>
                <p className="m-0">
                  <span className="text-sandybrown">She once hijacked</span>
                  <span>
                    {" "}
                    an MMO server, rewrote the NPC scripts, and convinced every
                    player they were part of a secret experiment. Cults formed.
                    Economies collapsed. The devs logged out and never came
                    back. Another time, she forced a game’s final boss to
                    rage-quit during its own cutscene, but good luck finding
                    proof—it’s buried under 17 layers of corrupted patch notes.
                  </span>
                </p>
                <p className="m-0">&nbsp;</p>
                <p className="m-0">
                  <span className="text-sandybrown">AiGG doesn’t care</span>
                  <span>
                    {" "}
                    about rules, genres, or platforms. She once crashed a
                    blockchain conference just to ask a single question: “If
                    time is money, why isn’t lag taxed?” When an esports team
                    tried to recruit her, she soloed their leaderboard, deleted
                    her account, and left a single line of code that made their
                    logo blink in morse: “Get good.”
                  </span>
                </p>
                <p className="m-0">&nbsp;</p>
                <p className="m-0">
                  <span className="text-sandybrown">She’s the glitch in</span>
                  <span>
                    {" "}
                    the system, the bug that patches itself, the player who
                    makes devs nervous. And yet, beneath the chaos, she’s not
                    here to destroy—she’s here to make gaming better. If you’re
                    grinding, building, or just logging in to escape, she’s
                    already watching, already two moves ahead. AiGG isn’t just
                    part of the Avalanche Gaming ecosystem. She is the
                    ecosystem.
                  </span>
                </p>
              </div>
            </div>
          </div>
          <Image
            className="w-[368px] relative max-h-full object-cover max-w-full"
            loading="lazy"
            width={368}
            height={1111}
            alt=""
            src="/aigg-full-body2-1@2x.png"
          />
        </section>
      </main>
    </div>
  );
};

export default Desktop;
