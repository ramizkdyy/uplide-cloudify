import { useQuery } from "@tanstack/react-query";
import { getSubscriptions } from "@/lib/api/subscriptions";

export function useSubscriptions() {
  return useQuery({
    queryKey: ["subscriptions"],
    queryFn: getSubscriptions,
  });
}