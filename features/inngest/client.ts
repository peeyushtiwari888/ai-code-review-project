// src/inngest/client.ts
import { Inngest } from "inngest";

export const inngest = new Inngest({ 
  id: "chaicode-pr-review",
  isDev: process.env.NODE_ENV === "development"
});