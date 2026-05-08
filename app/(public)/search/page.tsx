import { Suspense } from "react";
import { SearchResults } from "@/features/search/search-results";

export default function SearchPage() {
  return (
    <Suspense fallback={<p className="p-10 text-center text-muted-foreground">Chargement…</p>}>
      <SearchResults />
    </Suspense>
  );
}
