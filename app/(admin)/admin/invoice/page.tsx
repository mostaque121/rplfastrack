import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { prisma } from "@/lib/prisma";
import { Plus, Search } from "lucide-react";
import Link from "next/link";

import PaginationControl from "../../components/common/pagination";
import { getUserOrRedirect } from "../../lib/get-user";
import InvoiceDeleteButton from "./components/invoice-delete-button";
import InvoiceSearchForm from "./components/invoice-search-form";

const PAGE_SIZE = 20;

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  await getUserOrRedirect();

  const params = await searchParams;
  const search = params.q?.trim() ?? "";
  const currentPage = Math.max(1, Number(params.page) || 1);
  const offset = (currentPage - 1) * PAGE_SIZE;

  const where = search
    ? {
        OR: [
          {
            billToName: {
              contains: search,
              mode: "insensitive" as const,
            },
          },
          {
            billToEmail: {
              contains: search,
              mode: "insensitive" as const,
            },
          },
          {
            invoiceNumber: {
              contains: search,
              mode: "insensitive" as const,
            },
          },
        ],
      }
    : undefined;

  const [invoices, total] = await Promise.all([
    prisma.invoice.findMany({
      where,
      orderBy: [{ invoiceDate: "desc" }, { invoiceNumber: "desc" }],
      skip: offset,
      take: PAGE_SIZE,
      select: {
        id: true,
        billToName: true,
        billToEmail: true,
        invoiceNumber: true,
        pdfLink: true,
      },
    }),
    prisma.invoice.count({ where }),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="container mx-auto max-w-7xl px-4 py-10">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Invoices</h1>
            <p className="text-sm text-muted-foreground">
              Search by name, email, or invoice number, preview the PDF, or
              download, edit, and delete records from one place.
            </p>
          </div>

          <Button
            asChild
            className="w-full lg:w-auto bg-[#2e7d32] hover:bg-[#1b5e20] text-white"
          >
            <Link href="/admin/invoice/create">
              <Plus className="h-4 w-4" />
              Create Invoice
            </Link>
          </Button>
        </div>

        <div className="flex flex-col gap-3 rounded-xl border bg-background p-4 shadow-sm lg:flex-row lg:items-center lg:justify-between">
          <InvoiceSearchForm initialValue={search} />
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Search className="h-4 w-4" />
            <span>
              {total} invoice{total === 1 ? "" : "s"} found
            </span>
          </div>
        </div>

        <div className="rounded-xl border bg-background shadow-sm overflow-hidden">
          {invoices.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-2 px-6 py-16 text-center">
              <h2 className="text-lg font-semibold">No invoices found</h2>
              <p className="text-sm text-muted-foreground">
                Try a different search or create a new invoice.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Invoice Number</TableHead>
                    <TableHead className="text-center">Preview</TableHead>
                    <TableHead className="text-center">Edit</TableHead>
                    <TableHead className="text-right">Delete</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">
                        {invoice.billToName}
                      </TableCell>
                      <TableCell>{invoice.billToEmail}</TableCell>
                      <TableCell>{invoice.invoiceNumber}</TableCell>

                      <TableCell className="text-center">
                        <Button asChild variant="outline" size="sm">
                          <a
                            href={invoice.pdfLink}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Preview
                          </a>
                        </Button>
                      </TableCell>

                      <TableCell className="text-center">
                        <Button asChild variant="outline" size="sm">
                          <Link href={`/admin/invoice/${invoice.id}/edit`}>
                            Edit
                          </Link>
                        </Button>
                      </TableCell>

                      <TableCell className="text-right">
                        <InvoiceDeleteButton
                          invoiceId={invoice.id}
                          invoiceNumber={invoice.invoiceNumber}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>

        <PaginationControl
          currentPage={currentPage}
          totalPages={totalPages}
          searchParams={search ? { q: search } : {}}
        />
      </div>
    </div>
  );
}
