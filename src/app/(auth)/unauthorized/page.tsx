import { ShieldAlert } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function Unauthorized() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="space-y-6 p-8 text-center">
        <ShieldAlert className="mx-auto h-24 w-24 text-destructive" />
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">Access Denied</h1>
          <p className="max-w-md text-muted-foreground">
            You don&apos;t have permission to access this page. This resource requires specific role
            privileges.
          </p>
        </div>
        <div className="flex justify-center gap-4">
          <Link href="/">
            <Button variant="outline">Go Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
