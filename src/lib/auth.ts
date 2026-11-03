import { env } from "@/env";
import { ac, adminRole, user } from "@/lib/permissions";
import { Redis } from "@upstash/redis";
import { betterAuth } from "better-auth";
import { APIError } from "better-auth/api";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { admin } from "better-auth/plugins";
import { prisma } from "./prisma";

const redis = new Redis({
  url: env.UPSTASH_REDIS_REST_URL,
  token: env.UPSTASH_REDIS_REST_TOKEN,
});

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  plugins: [
    admin({
      ac,
      roles: {
        user,
        admin: adminRole,
      },
    }),
    nextCookies(),
  ],
  socialProviders: {
    google: {
      prompt: "select_account",
      // Invite-only: a Google account that isn't already a user is rejected.
      // New team members are created by an admin first (admin plugin).
      disableSignUp: true,
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },
  emailAndPassword: {
    enabled: false,
  },
  account: {
    accountLinking: {
      // Link Google to a user an admin created, on their first sign-in.
      trustedProviders: ["google"],
    },
  },
  databaseHooks: {
    session: {
      create: {
        // Only admins may hold a session. (Bans are checked by the admin plugin.)
        async before(session, ctx) {
          if (!ctx) return;
          const user = await ctx.context.internalAdapter.findUserById(
            session.userId,
          );
          if ((user as { role?: string } | null)?.role !== "admin") {
            throw APIError.from("FORBIDDEN", {
              message: "This account isn't authorised.",
              code: "NOT_AUTHORISED",
            });
          }
        },
      },
    },
  },
  rateLimit: {
    enabled: true,
    // Shared across serverless instances (in-memory would be per instance).
    storage: "secondary-storage",
    window: 60,
    max: 100,
    customRules: {
      "/sign-in/*": { window: 60, max: 5 },
      "/callback/*": { window: 60, max: 10 },
    },
  },

  secondaryStorage: {
    get: async (key) => {
      const data = await redis.get<string>(key);
      return data;
    },
    set: async (key, value, ttl) => {
      if (ttl) {
        await redis.set(key, value, { ex: ttl }); // ttl in seconds
      } else {
        await redis.set(key, value);
      }
    },
    delete: async (key) => {
      await redis.del(key);
    },
    getAndDelete: async (key) => {
      return redis.getdel<string>(key);
    },
    // INCR, and set the TTL only when the key is created (one atomic call).
    increment: async (key, ttl) => {
      return redis.eval<[number], number>(
        "local n = redis.call('INCR', KEYS[1]) if n == 1 then redis.call('EXPIRE', KEYS[1], ARGV[1]) end return n",
        [key],
        [ttl],
      );
    },
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
  },
});
