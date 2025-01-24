import { Hex } from "viem";
import { assertBalanceAndAuth } from "@/utils/avalanche";

const TOKEN_VALIDITY = 60 * 60 * 24; // one day

export interface Token {
  body: TokenBody;
  signature: Buffer;
}

export interface TokenBody {
  sub: Hex;
  iat: number;
  exp: number;
}

export function createTokenBody(
  address: Hex,
  now: Date = new Date(),
): TokenBody {
  const iat = Math.floor(now.getTime() / 1000);

  return {
    sub: address,
    iat,
    exp: iat + TOKEN_VALIDITY,
  };
}

export function serializeTokenBody(body: TokenBody): string {
  return Buffer.from(JSON.stringify(body)).toString("base64");
}

export function serializeToken({ body, signature }: Token): string {
  return serializeTokenBody(body) + "." + signature.toString("base64");
}

export function validateTokenTimestamps(
  serializedToken: string,
): { token: Token; error: null } | { token: null; error: string } {
  const [serializedBody, serializedSignature] = serializedToken.split(".", 2);
  const token = {
    body: JSON.parse(Buffer.from(serializedBody, "base64").toString()),
    signature: Buffer.from(serializedSignature, "base64"),
  };

  const now = Math.floor(Date.now() / 1000);
  const { iat, exp } = token.body;
  if (now < iat)
    return {
      token: null,
      error: `token valid from ${iat}, now = ${now}`,
    };
  else if (now > exp)
    return {
      token: null,
      error: `token expired at ${exp}, now = ${now}`,
    };

  return {
    token,
    error: null,
  };
}

export async function validateToken(
  serializedToken: string,
): Promise<{ token: Token; error: null } | { token: null; error: string }> {
  const { token, error } = validateTokenTimestamps(serializedToken);
  if (!token)
    return {
      token: null,
      error,
    };

  const chainError = await assertBalanceAndAuth({
    address: token.body.sub,
    message: serializeTokenBody(token.body),
    signature: `0x${token.signature.toString("hex")}`,
    minimumBalance: "1000",
  });
  if (chainError)
    return {
      token: null,
      error: chainError,
    };

  return {
    token,
    error: null,
  };
}
