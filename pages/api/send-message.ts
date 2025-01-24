import type { NextApiRequest, NextApiResponse } from "next";
import { validateToken } from "@/utils/auth";

type SendMessageResponse =
  | {
      messages: string[];
    }
  | { error: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SendMessageResponse>,
) {
  if (req.method != "POST") {
    res.status(405).json({ error: "only POST accepted" });
    return;
  }

  // auth
  const authentication = req.headers["authentication"] ?? "";
  const authHeader = Array.isArray(authentication)
    ? authentication[0]
    : authentication;
  const [authScheme, serializedToken] = authHeader.split(" ", 2) ?? [];
  if (authScheme != "Bearer") {
    res.status(400).json({
      error: `expected authentication scheme to be "Bearer", got: ${authScheme}`,
    });
    return;
  }
  const { error } = await validateToken(serializedToken);
  if (error) {
    res.status(401).json({
      error: `authentication error: ${error}`,
    });
    return;
  }

  const { message } = req.body ?? {};
  if (typeof message != "string" || message === "") {
    res.status(400).json({
      error: `expected "message" to be non-empty string, got: ${message}`,
    });
    return;
  }

  // TODO: call AI endpoint
  const messages = [`response to: ${message}`];
  res.status(200).json({ messages });
}
