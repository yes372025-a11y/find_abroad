import { useQuery } from "@tanstack/react-query";
import { universitiesApi } from "~/lib/api";

interface UniversityFilters {
  page?: number;
  per_page?: number;
  country?: string;
  featured?: boolean;
  search?: string;
}

export function useUniversities(filters: UniversityFilters = {}) {
  return useQuery({
    queryKey: ["universities", filters],
    queryFn: () => universitiesApi.list(filters).then((r) => r.data),
  });
}

export function useUniversity(slug: string) {
  return useQuery({
    queryKey: ["university", slug],
    queryFn: () => universitiesApi.get(slug).then((r) => r.data),
    enabled: !!slug,
  });
}
