import { useCallback, useEffect, useState } from "react";
import { useAccount, useConfig } from "wagmi";
import { signMessage } from "@wagmi/core";
import {
  Token,
  createTokenBody,
  serializeToken,
  serializeTokenBody,
  validateTokenTimestamps,
} from "@/utils/auth";

export function useToken(force: boolean = false) {
  const { address, isConnected } = useAccount();
  const config = useConfig();
  const [token, setToken] = useState<Token | null>(null);
  const [tokenError, setTokenError] = useState<string | null>(null);
  const [isSinging, setIsSigning] = useState<boolean>(false);
  const [checkedLocalToken, setCheckedLocalToken] = useState<boolean>(false);

  useEffect(() => {
    if (!address) return;

    if (typeof localStorage === "undefined") return;
    const savedToken = localStorage[`token-${address}`];
    if (typeof savedToken !== "string") return;

    try {
      const { token, error } = validateTokenTimestamps(savedToken);
      if (error) setTokenError(error);
      else setToken(token);
    } catch (e: any) {
      setTokenError(`could not parse token from local storage: ${e?.message}`);
    } finally {
      setCheckedLocalToken(true);
    }
  }, [force, isConnected]);

  const signToken = useCallback(async () => {
    if (token || !isConnected || !address || isSinging) return;

    const body = createTokenBody(address);
    setIsSigning(true);
    signMessage(config, {
      message: serializeTokenBody(body),
    })
      .then((signatureHex) => {
        const token = {
          body,
          signature: Buffer.from(signatureHex.substring(2), "hex"),
        };
        setToken(token);
        localStorage[`token-${address}`] = serializeToken(token);
      })
      .catch((e: any) =>
        setTokenError(
          `error signing message: ${e?.message ?? JSON.stringify(e)}`,
        ),
      )
      .finally(() => setIsSigning(false));
  }, [config, token, isConnected, address, isSinging]);

  useEffect(() => {
    if (!force || !checkedLocalToken) return;
    signToken();
  }, [force, checkedLocalToken, tokenError]);

  return { token, tokenError, signToken };
}
