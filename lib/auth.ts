import { prisma } from "./prisma";
import { betterAuth } from "better-auth/minimal";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { Role } from "@/generated/prisma/enums";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: { enabled: true },
  appName: "College Management System",
  user: {
    additionalFields: {
      role: { type: "string", defaultValue: "STUDENT" satisfies Role },
      contact: { type: "string" },
    },
  },
  trustedOrigins: ["http://localhost:3000"],
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
