import { z } from "zod";

export const LogSchema = z.object({
  timestamp: z.string().datetime(),
  text: z.string(),
  tweetId: z.string().optional(),
});
export type LogSchemaType = z.infer<typeof LogSchema>;

export const LogsSchema = z.array(LogSchema);
export type LogsSchemaType = z.infer<typeof LogsSchema>;

export const MessageSchema = z.object({
  timestamp: z.string().datetime(),
  username: z.string(),
  text: z.union([z.enum(["THINKING"]), z.string()]),
});
export type MessageSchemaType = z.infer<typeof MessageSchema>;

export const MessagesSchema = z.array(MessageSchema);
export type MessagesSchemaType = z.infer<typeof MessagesSchema>;

export type UnsubscribeFnType = () => void;
export type OnDataFnType<T> = (data: T) => void;

// TODO: @alexastrum - implement this with a real backend

/**
 * Check if the chat terminal is available for the given wallet address and signature
 * @param walletAddress - The wallet address of the user
 * @param signature - The signature to check - should be a valid WalletConnect sign-in proof
 * @returns True if the terminal is available (user has enough tokens), false otherwise
 */
export const isTerminalAvailable = (
  walletAddress: string,
  signature: string
): boolean => {
  return false;
};

const _chatHistory: MessagesSchemaType = [];
let _onDataFn: OnDataFnType<MessagesSchemaType>;

/**
 * Subscribe to chat history for the given wallet address
 * @param walletAddress - The wallet address of the user
 * @param signature - The signature of the user - should be a valid WalletConnect sign-in proof
 * @param onData - The function to call when data is received
 * @returns A function to unsubscribe from the terminal, should be called on component unmount
 */
export const subscribeToTerminal = (
  walletAddress: string,
  signature: string,
  onData: OnDataFnType<MessagesSchemaType>
): UnsubscribeFnType => {
  _onDataFn = onData;

  onData([
    {
      timestamp: "2024-01-15T08:23:14.326Z",
      username: "AiGG",
      text: "THINKING",
    },
  ]);

  setTimeout(() => {
    _chatHistory.push(
      {
        timestamp: "2024-01-15T08:23:14.326Z",
        username: "AiGG",
        text: "Hello, world!",
      },
      {
        timestamp: "2024-01-15T08:23:14.326Z",
        username: walletAddress,
        text: "gm",
      },
      {
        timestamp: "2024-01-15T08:23:14.326Z",
        username: "AiGG",
        text: "What's up?",
      }
    );
    onData(_chatHistory);
  }, 5000);
  return () => {};
};

/**
 * Send a chat message to the Agent terminal
 * @param walletAddress - The wallet address of the user
 * @param signature - The signature of the user - should be a valid WalletConnect sign-in proof
 * @param message - The message to send
 * @returns void
 */
export const sendMessageToTerminal = async (
  walletAddress: string,
  signature: string,
  message: string
): Promise<void> => {
  _chatHistory.push({
    timestamp: new Date().toISOString(),
    username: walletAddress,
    text: message,
  });
  _onDataFn([
    ..._chatHistory,
    {
      timestamp: new Date().toISOString(),
      username: "AiGG",
      text: "THINKING",
    },
  ]);

  await new Promise((resolve) => setTimeout(resolve, 2000));
  _onDataFn([
    ..._chatHistory,
    {
      timestamp: new Date().toISOString(),
      username: "AiGG",
      text: "Some response goes here",
    },
  ]);
};

/**
 * Get Agent logs. Users with enough tokens can see more logs and details.
 * @param walletAddress - The wallet address of the user
 * @param signature - The signature of the user - should be a valid WalletConnect sign-in proof
 * @returns Up to 100 latest Agent logs
 */
export const getLogs = async (
  walletAddress: string,
  signature: string
): Promise<LogsSchemaType> => {
  return [
    {
      timestamp: "2024-01-15T08:23:14.326Z",
      text: "Analyzing user query for emotional context. Detected frustration in language patterns and multiple punctuation marks. Adjusting response tone to be more empathetic and solution-focused.",
    },
    {
      timestamp: "2024-01-15T09:45:32.891Z",
      text: "Encountered ambiguous request regarding data visualization. Requesting clarification from user about preferred chart type and metrics.",
    },
    {
      timestamp: "2024-01-16T11:12:03.445Z",
      text: "Processing large dataset for anomaly detection. Found three outliers that exceed standard deviation threshold by 300%.",
    },
    {
      timestamp: "2024-01-16T14:28:55.129Z",
      text: "User provided incomplete information about their technical background. Making conservative assumptions about expertise level and including additional explanatory context in response.",
    },
    {
      timestamp: "2024-01-17T03:17:41.773Z",
      text: "Detected potential security implications in user's request. Suggesting alternative approaches that maintain functionality while adhering to best practices.",
    },
    {
      timestamp: "2024-01-17T16:59:22.558Z",
      text: "Analyzing historical conversation context to maintain consistency in problem-solving approach. Previous interaction indicates user prefers detailed technical explanations. Observed pattern of asking follow-up questions about implementation details and system architecture. Based on conversation history, user demonstrates strong background in distributed systems and database optimization. Will provide in-depth technical specifications including time/space complexity analysis, architectural considerations, and potential edge cases. Previous exchanges show particular interest in scalability concerns and performance bottlenecks.",
    },
    {
      timestamp: "2024-01-18T07:33:09.124Z",
      text: "Evaluating multiple solution paths for optimization problem. Selected gradient descent approach based on problem constraints and computational efficiency requirements.",
    },
    {
      timestamp: "2024-01-18T19:42:51.667Z",
      text: "User's code sample contains potential race condition. Generating example demonstrating thread-safe implementation with mutex locks.",
    },
    {
      timestamp: "2024-01-19T05:15:38.992Z",
      text: "Received feedback about previous response being too technical. Adjusting explanation style to include more real-world analogies and metaphors for better comprehension. Adding concrete examples to illustrate complex concepts. Previous explanation of distributed systems used overly academic terminology - replacing with relatable analogies like comparing microservices to specialized departments in a company. Database sharding concept was unclear - now using analogy of organizing books across multiple library branches. Load balancing explanation enhanced with traffic flow metaphor. Kubernetes pods described as apartment buildings with containers as individual units. Message queues compared to post office sorting system. Circuit breaker pattern illustrated through electrical system example. CAP theorem explained using real-world trade-offs like consistency vs availability in retail inventory systems. Added practical code examples alongside theoretical concepts. Breaking down technical jargon into plain language without losing accuracy. Incorporating visual diagrams and flowcharts to supplement text explanations. Using storytelling elements to maintain engagement while conveying complex information. Providing step-by-step breakdowns with relatable scenarios. Including day-to-day examples that demonstrate abstract principles in action. Balancing depth of technical content with accessibility. Maintaining rigor while improving clarity through carefully chosen metaphors. Restructuring explanation to build from familiar concepts to more advanced topics.",
    },
    {
      timestamp: "2024-01-19T13:27:46.445Z",
      text: "Detecting patterns in user's recent queries suggesting a broader underlying problem. Preparing comprehensive solution that addresses root cause rather than symptoms.",
    },
  ]
    .sort(() => Math.random() - 0.5)
    .slice(0, Math.floor(Math.random() * 6) + 5);
};
