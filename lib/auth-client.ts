import { ac, admin as adminRole, moderator, user } from "@/lib/permisssion";
import { adminClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  plugins: [
    adminClient({
      ac,
      roles: {
        user,
        moderator,
        admin: adminRole,
      },
    }),
  ],
});
