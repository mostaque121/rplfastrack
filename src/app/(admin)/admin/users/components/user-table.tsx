import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

import PaginationControl from "@/app/(admin)/components/common/pagination";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { auth } from "@/server/auth";

import UserActions from "./user-action";

export default async function UserTable({
  search,
  page,
  loggedInUser,
}: {
  search: string;
  page: number;
  loggedInUser: { id?: string; role?: string | null };
}) {
  const isAdmin = loggedInUser.role === "admin";
  const pageSize = 10;
  const offset = (page - 1) * pageSize;
  const getRoleBadgeVariant = (role?: string) => {
    switch (role) {
      case "admin":
        return "default";
      case "moderator":
        return "outline";
      default:
        return "secondary";
    }
  };

  const { users, total } = await auth.api.listUsers({
    query: {
      searchValue: search,
      searchField: "name",
      searchOperator: "contains",
      limit: pageSize,
      offset: offset,
    },
    // This endpoint requires session cookies.
    headers: await headers(),
  });

  async function revalidate() {
    "use server";
    revalidatePath("/admin/users");
  }

  if (users.length === 0) {
    return (
      <div className="py-10 text-center">
        <h2 className="mb-2 text-xl font-semibold">No users found</h2>
        <p className="text-muted-foreground">
          Try adjusting your search or filter to find what you&apos;re looking for.
        </p>
      </div>
    );
  }

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">User</TableHead>
            <TableHead className="hidden md:table-cell">Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            {isAdmin && <TableHead className="text-right">Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.id}
              className={`overflow-hidden rounded-md ${
                user.banned
                  ? "bg-destructive/20 hover:bg-destructive/30"
                  : loggedInUser.id === user.id && "bg-green-300 hover:bg-green-400"
              }`}
            >
              <TableCell>
                <Avatar>
                  <AvatarImage src={user.image || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell className="hidden font-medium md:table-cell">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Badge variant={getRoleBadgeVariant(user.role)}>{user.role}</Badge>
              </TableCell>
              {isAdmin && (
                <TableCell className="text-right">
                  {loggedInUser.id !== user.id && (
                    <UserActions
                      revalidate={revalidate}
                      userId={user.id}
                      currentRole={user.role}
                      isAdmin={isAdmin}
                      isBanned={user.banned}
                    />
                  )}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div>
        <PaginationControl
          currentPage={Math.floor(offset / pageSize) + 1}
          totalPages={Math.ceil(total / pageSize)}
          searchParams={search ? { q: search } : {}}
        />
      </div>
    </div>
  );
}
