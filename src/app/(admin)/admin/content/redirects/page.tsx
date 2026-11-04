import { PageHeader } from "@/app/(admin)/_components/page-header";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { listRedirects } from "@/features/courses/admin-queries";
import {
  AddRedirectForm,
  DeleteRedirectButton,
} from "@/features/courses/components/redirect-controls";
import { getAdminOrRedirect } from "@/server/admin";

export const metadata = { title: "Redirects" };

const dateFormat = new Intl.DateTimeFormat("en-AU", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

export default async function RedirectsPage() {
  await getAdminOrRedirect();
  const redirects = await listRedirects();

  return (
    <div className="container mx-auto space-y-6 px-4 py-8">
      <PageHeader
        title="Redirects"
        description="Permanent (301) redirects for old course and section URLs. Changing a URL in the editor adds one automatically."
      />
      <AddRedirectForm />
      {redirects.length === 0 ? (
        <p className="rounded-lg border border-dashed p-10 text-center text-sm text-muted-foreground">
          No redirects yet.
        </p>
      ) : (
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Old path</TableHead>
                <TableHead>Redirects to</TableHead>
                <TableHead>Added</TableHead>
                <TableHead className="w-12" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {redirects.map((redirect) => (
                <TableRow key={redirect.id}>
                  <TableCell className="font-mono text-xs">{redirect.fromPath}</TableCell>
                  <TableCell className="font-mono text-xs">{redirect.toPath}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {dateFormat.format(redirect.createdAt)}
                  </TableCell>
                  <TableCell>
                    <DeleteRedirectButton id={redirect.id} fromPath={redirect.fromPath} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
