import "@/styles/globals.css";
import { Metadata } from "next";
import type { AppProps } from "next/app";
import Navbar from "./components/navbar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export const metadata: Metadata = {
  title: "Daemons",
  description: "Daemons Application",
  icons: {
    icon: "/favicon.ico",
    apple: "/icons/logo/icon-180.png",
    other: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "72x72",
        url: "/icons/logo/icon-72.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "96x96",
        url: "/icons/logo/icon-96.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "128x128",
        url: "/icons/logo/icon-128.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "192x192",
        url: "/icons/logo/icon-192.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "256x256",
        url: "/icons/logo/icon-256.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "512x512",
        url: "/icons/logo/icon-512.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "1024x1024",
        url: "/icons/logo/icon-1024.png",
      },
      {
        rel: "icon",
        type: "image/svg+xml",
        url: "/icons/logo/icon.svg",
      },
    ],
  },
  manifest: "/manifest.json",
};
