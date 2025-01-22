import { WagmiConfig, createConfig } from "wagmi";
import { avalanche, avalancheFuji } from "wagmi/chains";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

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
  return (
    <WagmiConfig config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>
          {children}
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiConfig>
  );
};