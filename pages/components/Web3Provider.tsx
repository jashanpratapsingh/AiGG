import { createConfig, WagmiConfig } from "wagmi";
import { avalanche, avalancheFuji } from "wagmi/chains";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useEffect, useState } from "react";

const queryClient = new QueryClient();

const config = createConfig(
  getDefaultConfig({
    chains: [avalanche, avalancheFuji],
    appName: "AiGG",
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID!,
  })
);

interface Web3ProviderProps {
  children: ReactNode;
}

export default function Web3Provider({ children }: { children: ReactNode }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensures rendering happens only on the client
  }, []);

  if (!isClient) return null; // Avoid rendering on the server side

  return (
    <WagmiConfig config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiConfig>
  );
};