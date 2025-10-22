import { Button } from "@/components/ui/button";
import { ShieldAlert } from "lucide-react";
import Link from "next/link";

export default function Unauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6 p-8">
        <ShieldAlert className="h-24 w-24 text-destructive mx-auto" />
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">Access Denied</h1>
          <p className="text-muted-foreground max-w-md">
            You don&apos;t have permission to access this page. This resource
            requires specific role privileges.
          </p>
        </div>
        <div className="flex gap-4 justify-center">
          <Link href="/">
            <Button variant="outline">Go Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
