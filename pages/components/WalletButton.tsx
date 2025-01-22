import { ConnectKitButton } from "connectkit";

export const WalletButton = () => {
  return (
    <ConnectKitButton 
      customTheme={{
        "--ck-connectbutton-background": "transparent",
        "--ck-connectbutton-hover-background": "transparent",
        "--ck-connectbutton-active-background": "transparent",
      }}
    />
  );
};