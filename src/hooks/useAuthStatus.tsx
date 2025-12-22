import { GetStatus } from "@/api/auth";
import { useQuery } from "@tanstack/react-query";

export const useAuthStatus = () => {
  return useQuery({
    queryKey: ["auth-status"],
    queryFn: async () => {
      const res = GetStatus();
      return res || undefined;
    },
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });
};
