import { CreateButton } from "@/components/button";
import ContactTable from "@/components/contactTable";
import Search from "@/components/search";
import { getContactsPages } from "@/lib/data";
import Pagination from "@/components/pagination";
import { TableSkeleton } from "@/components/skeleton";
import { Suspense } from "react";
const Contacs = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) => {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await getContactsPages(query);
  return (
    <div className="max-w-screen-md mx-auto mt-5">
      <div className="flex items-center justify-between gap-1 mb-5">
        <Search />
        <CreateButton />
      </div>
      <Suspense key={query + currentPage} fallback={<TableSkeleton />}>
        <ContactTable query={query} currentPage={currentPage} />
      </Suspense>

      <div className="flex justify-center mt-4 ">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
};

export default Contacs;
