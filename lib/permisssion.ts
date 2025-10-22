import { createAccessControl } from "better-auth/plugins/access";
import {
  adminAc,
  defaultStatements,
  userAc,
} from "better-auth/plugins/admin/access";

const statement = {
  ...defaultStatements,
} as const;

export const ac = createAccessControl(statement);

export const user = ac.newRole({
  ...userAc.statements,
  // user has no permissions by default
});

export const moderator = ac.newRole({
  ...userAc.statements,
  // moderator has same permissions as user (no permissions)
});

export const admin = ac.newRole({
  ...adminAc.statements,
});
