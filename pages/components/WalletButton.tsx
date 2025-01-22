import { ConnectKitButton } from "connectkit";

export default function WalletButton() {
  return (
    <ConnectKitButton
      customTheme={{
        "--ck-connectbutton-background": "transparent",
        "--ck-connectbutton-hover-background": "transparent",
        "--ck-connectbutton-active-background": "transparent",
      }}
    />
  );
}
