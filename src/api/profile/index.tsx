import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../providers/AuthContextProvider";

export const useGetProfiles = () => {
  const profile = useAuth();
  return useQuery({
    queryKey: ["profiles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .neq("id", profile.user.id);

      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};
