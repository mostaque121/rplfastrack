import ResponseCard from "./response-card";
import { getAllResponses } from "../../action/response";
import PaginationControl from "../common/pagination";

export default async function ResponseControl({ page, search }: { page: number; search: string }) {
  const pageSize = 12;

  const { responses, pagination } = await getAllResponses(search, page, pageSize);

  if (responses.length === 0) {
    return (
      <div className="py-10 text-center">
        <h2 className="mb-2 text-xl font-semibold">No responses found</h2>
        <p className="text-muted-foreground">
          Try adjusting your search or filter to find what you&apos;re looking for.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {responses.map((response) => (
          <ResponseCard key={response.id} response={response} />
        ))}
      </div>

      <div>
        <PaginationControl
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
        />
      </div>
    </div>
  );
}
