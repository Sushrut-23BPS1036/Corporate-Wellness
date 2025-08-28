import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
import { corsHeaders } from "../_shared/cors.ts"
import { Deno } from "https://deno.land/std@0.166.0/runtime.ts"

interface HealthDataRequest {
  date: string
  stepCount: number
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  try {
    // Create Supabase client
    const supabaseClient = createClient(Deno.env.get("SUPABASE_URL") ?? "", Deno.env.get("SUPABASE_ANON_KEY") ?? "", {
      global: {
        headers: { Authorization: req.headers.get("Authorization")! },
      },
    })

    // Get the user from the JWT token
    const {
      data: { user },
      error: userError,
    } = await supabaseClient.auth.getUser()

    if (userError || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      })
    }

    // Parse request body
    const { date, stepCount }: HealthDataRequest = await req.json()

    // Validate input
    if (!date || stepCount === undefined || stepCount < 0) {
      return new Response(JSON.stringify({ error: "Invalid date or step count" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      })
    }

    // Upsert health data (insert or update if exists)
    const { data, error } = await supabaseClient
      .from("health_data")
      .upsert(
        {
          user_id: user.id,
          date,
          step_count: stepCount,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: "user_id,date",
        },
      )
      .select()

    if (error) {
      console.error("Database error:", error)
      return new Response(JSON.stringify({ error: "Failed to sync health data" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      })
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Health data synced successfully",
        data: data[0],
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    )
  } catch (error) {
    console.error("Function error:", error)
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  }
})
