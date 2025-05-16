import { getAllResponses } from "../../action/response";
import PaginationControl from "../common/pagination";
import ResponseCard from "./response-card";

export default async function ResponseControl({
  page,
  search,
}: {
  page: number;
  search: string;
}) {
  const pageSize = 12;

  const { responses, pagination } = await getAllResponses(
    search,
    page,
    pageSize
  );

  if (responses.length === 0) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-semibold mb-2">No responses found</h2>
        <p className="text-muted-foreground">
          Try adjusting your search or filter to find what you&apos;re looking
          for.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl ">
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
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
