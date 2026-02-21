import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

function json(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return json({ ok: false, error: "Method not allowed" }, 405);
  }

  try {
    const body = await req.json();

    // --- validate phone ---
    const phoneDigits = (body.phone ?? "").replace(/\D/g, "");
    if (phoneDigits.length < 10) {
      return json({ ok: false, error: "Phone must have at least 10 digits" }, 400);
    }

    // --- build extra info for message field ---
    const extras: string[] = [];
    if (body.service) extras.push(`Услуга: ${body.service}`);
    if (body.car_make_model) extras.push(`Авто: ${body.car_make_model}`);
    if (body.car_year) extras.push(`Год: ${body.car_year}`);
    if (body.condition) extras.push(`Состояние: ${body.condition}`);
    if (body.timeframe) extras.push(`Срок: ${body.timeframe}`);
    if (body.messenger) extras.push(`Мессенджер: ${body.messenger}`);
    if (body.comment) extras.push(`Комментарий: ${body.comment}`);
    if (body.utm_content) extras.push(`utm_content: ${body.utm_content}`);
    if (body.utm_term) extras.push(`utm_term: ${body.utm_term}`);
    if (body.yclid) extras.push(`yclid: ${body.yclid}`);
    if (body.page_url) extras.push(`URL: ${body.page_url}`);
    if (body.user_agent) extras.push(`UA: ${body.user_agent}`);

    const baseMessage = body.message ?? "";
    const message = [baseMessage, ...extras].filter(Boolean).join("\n");

    // --- map to leads table schema ---
    const row = {
      name: body.name || "Без имени",
      phone: phoneDigits,
      email: body.email || null,
      car_brand: body.car_brand || null,
      car_model: body.car_model || null,
      message: message || null,
      service_slug: body.service_slug || null,
      source_page: body.source_page || null,
      utm_source: body.utm_source || null,
      utm_medium: body.utm_medium || null,
      utm_campaign: body.utm_campaign || null,
    };

    // --- insert into DB ---
    const url = Deno.env.get("SUPABASE_URL")!;
    const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? Deno.env.get("SUPABASE_ANON_KEY")!;
    const supabase = createClient(url, key);

    const { error: dbError } = await supabase.from("leads").insert(row);
    if (dbError) {
      console.error("DB insert error:", dbError);
      return json({ ok: false, error: "Database error" }, 500);
    }

    // --- telegram notification (best-effort) ---
    const tgToken = Deno.env.get("TELEGRAM_BOT_TOKEN");
    const tgChat = Deno.env.get("TELEGRAM_CHAT_ID");
    if (tgToken && tgChat) {
      try {
        const text = `🔔 Новая заявка\n👤 ${row.name}\n📞 ${row.phone}${extras.length ? "\n" + extras.join("\n") : ""}`;
        await fetch(`https://api.telegram.org/bot${tgToken}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: tgChat, text, parse_mode: "HTML" }),
        });
      } catch (e) {
        console.warn("Telegram send failed:", e);
      }
    } else {
      console.warn("TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set, skipping notification");
    }

    return json({ ok: true });
  } catch (e) {
    console.error("lead-submit error:", e);
    return json({ ok: false, error: e instanceof Error ? e.message : "Unknown error" }, 500);
  }
});
