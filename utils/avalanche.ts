import { Address, Hex, ByteArray, Signature, createPublicClient, formatUnits, http, verifyMessage } from "viem";
import { avalanche } from "viem/chains";

export const client = createPublicClient({
  chain: avalanche,
  transport: http(),
});

export const AI9000_CONTRACT_ADDRESS =
  "0x79ea4e536f598dcd67c76ee3829f84ab9e72a558";
export const AI9000_DECIMALS = 18;

export const ERC_20_ABI = [{
  type: "function",
  name: "balanceOf",
  stateMutability: "view",
  inputs: [{ type: "address" }],
  outputs: [{ type: "uint256" }],
}] as const;

export interface AssertBalanceAndAuthArgs {
  address: Address;
  message: string;
  signature: Hex | ByteArray | Signature;
  minimumBalance: string;
}
export async function assertBalanceAndAuth({
  address,
  message,
  signature,
  minimumBalance,
}: AssertBalanceAndAuthArgs): Promise<string | null> {
  const valid = await verifyMessage({
    address,
    message,
    signature,
  });
  if (!valid) return `could not verify signature for ${address}`;

  const balanceResult = await client.readContract({
    address: AI9000_CONTRACT_ADDRESS,
    abi: ERC_20_ABI,
    functionName: "balanceOf",
    args: [address],
  });

  const balance = formatUnits(balanceResult, AI9000_DECIMALS);
  if (parseFloat(balance) < parseFloat(minimumBalance))
    return `insufficient ai9000 balance for ${address}: requires ${minimumBalance}, has ${balance}`;

  return null;
}
