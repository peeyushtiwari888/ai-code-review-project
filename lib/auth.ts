import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./db";
import { nextCookies } from "better-auth/next-js";

const authUrl = process.env.BETTER_AUTH_URL?.replace(/\/$/, "");

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
  baseURL: authUrl,
  trustedOrigins: authUrl ? [authUrl] : undefined,
    socialProviders: { 
    github: { 
      clientId: process.env.GITHUB_CLIENT_ID as string, 
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string, 

      mapProfileToUser:async(profile)=>({
        email:profile.email ?? `${profile.id}@users.noreply.github.com`,
        name:profile.name ?? profile.login,
      })
    }, 
  }, 
   plugins: [nextCookies()] // make sure this is the last plugin in the array
});