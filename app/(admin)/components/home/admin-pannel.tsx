"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { User2 } from "lucide-react";
interface Admin {
  name: string;
  email: string;
  image: string | null;
}
interface AdminListProps {
  data?: Admin[];
  isLoading: boolean;
  error: Error | null;
}

export function AdminListCard({ data, isLoading, error }: AdminListProps) {
  return (
    <Card className="border-0 shadow-sm bg-gradient-to-br from-gray-50 to-gray-100">
      <CardContent className="py-6 px-4">
        <div className="flex flex-col items-center text-center gap-3">
          <div className="h-10 w-10 bg-gray-200 rounded-lg flex items-center justify-center">
            <User2 className="h-5 w-5 text-gray-700" />
          </div>
          <h3 className="text-sm font-semibold text-gray-800">Admin Panel</h3>

          {isLoading ? (
            <Skeleton className="h-6 w-24 mx-auto mt-2" />
          ) : error ? (
            <p className="text-sm text-red-600">Failed to load admins</p>
          ) : data && data.length > 0 ? (
            <ul className="max-w-md w-full mx-auto bg-white px-4 py-3 rounded-xl mt-4 space-y-3">
              {data.map((admin, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 border border-gray-100  p-2  transition"
                >
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={admin.image || ""} alt={admin.name} />
                    <AvatarFallback>
                      {admin.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-800">
                      {admin.name}
                    </p>
                    <p className="text-xs text-gray-500">{admin.email}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500 mt-2">No admins found.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
