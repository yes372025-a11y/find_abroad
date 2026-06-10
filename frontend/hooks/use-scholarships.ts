import { useQuery } from "@tanstack/react-query";
import { scholarshipsApi } from "~/lib/api";

interface ScholarshipFilters {
  page?: number;
  per_page?: number;
  country?: string;
  level?: string;
  fully_funded?: boolean;
  search?: string;
}

export function useScholarships(filters: ScholarshipFilters = {}) {
  return useQuery({
    queryKey: ["scholarships", filters],
    queryFn: () => scholarshipsApi.list(filters as Record<string, unknown>).then((r) => r.data),
  });
}
