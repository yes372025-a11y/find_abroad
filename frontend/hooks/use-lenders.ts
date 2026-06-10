import { useQuery } from "@tanstack/react-query";
import { lendersApi } from "~/lib/api";

export function useLenders(filters?: { featured?: boolean }) {
  return useQuery({
    queryKey: ["lenders", filters],
    queryFn: () => lendersApi.list(filters as Record<string, unknown>).then((r) => r.data),
  });
}
