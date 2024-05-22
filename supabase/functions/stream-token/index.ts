// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
///  <reference types="https://esm.sh/v135/@supabase/functions-js@2.4.1/src/edge-runtime.d.ts" />

import { StreamChat } from "npm:stream-chat";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

console.log("Hello from Functions!");

Deno.serve(async (req) => {
  const authHeader = req.headers.get("Authorization")!;
  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? "",
    { global: { headers: { Authorization: authHeader } } },
  );

  // Get the session or user object
  const authToken = authHeader.replace("Bearer ", "");
  const { data } = await supabaseClient.auth.getUser(authToken);
  const user = data.user;

  if (!user) {
    return new Response(
      JSON.stringify({ error: "User not found" }),
      { headers: { "Content-Type": "application/json" } },
    );
  }

  const serverClient = StreamChat.getInstance(
    Deno.env.get("STREAM_API_KEY"),
    Deno.env.get("STREAM_SECRET"),
  );

  const token = serverClient.createToken(user.id);

  return new Response(
    JSON.stringify({ token }),
    { headers: { "Content-Type": "application/json" } },
  );
});
