import { supabase } from "../lib/supabase";

export const fetchStreamToken = async () => {
  const { data, error } = await supabase.functions.invoke("stream-token");
  if (error) {
    throw new Error(error);
  }
  return data.token;
};
