import "@/styles/globals.css";
import { Metadata } from "next";
import type { AppProps } from "next/app";
import Web3Provider from "./components/Web3Provider";



export const metadata: Metadata = {
  title: "aigg",
  description: "aigg application",
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
    <Web3Provider>
      <Component {...pageProps} />
      </ Web3Provider>
    </>
  );
}
