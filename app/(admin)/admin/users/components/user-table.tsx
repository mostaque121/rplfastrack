import {
  deleteUser,
  getAllUsersBySearch,
  updateUserRole,
} from "@/app/(admin)/action/user";
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
  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "Admin":
        return "default";
      case "Editor":
        return "outline";
      default:
        return "secondary";
    }
  };

  const { users, pagination } = await getAllUsersBySearch(
    search,
    page,
    pageSize
  );

  if (users.length === 0) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-semibold mb-2">No users found</h2>
        <p className="text-muted-foreground">
          Try adjusting your search or filter to find what you&apos;re looking
          for.
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
              className={` rounded-md overflow-hidden ${
                loggedInUser.id === user.id && "bg-green-300 hover:bg-green-400"
              }`}
            >
              <TableCell>
                <Avatar>
                  <AvatarImage
                    src={user.image || "/placeholder.svg"}
                    alt={user.name}
                  />
                  <AvatarFallback>
                    {user.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell className="hidden md:table-cell font-medium">
                {user.name}
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Badge variant={getRoleBadgeVariant(user.role)}>
                  {user.role}
                </Badge>
              </TableCell>
              {isAdmin && (
                <TableCell className="text-right">
                  {loggedInUser.id !== user.id && (
                    <UserActions
                      userId={user.id}
                      currentRole={user.role}
                      isAdmin={isAdmin}
                      onRoleChange={updateUserRole}
                      onDelete={deleteUser}
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
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          searchParams={search ? { q: search } : {}}
        />
      </div>
    </div>
  );
}
