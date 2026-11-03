"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function InvoiceSearchForm({
  initialValue = "",
}: {
  initialValue?: string;
}) {
  const [searchQuery, setSearchQuery] = useState(initialValue);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const params = new URLSearchParams(searchParams.toString());

    if (searchQuery) {
      params.set("q", searchQuery);
    } else {
      params.delete("q");
    }

    params.delete("page");
    router.push(`?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full items-center gap-2">
      <Input
        type="search"
        placeholder="Search by name or invoice number"
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        className="flex-1"
      />
      <Button type="submit">
        <Search className="h-4 w-4" />
        Search
      </Button>
    </form>
  );
}
