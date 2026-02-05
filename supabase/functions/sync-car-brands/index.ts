 import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
 import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";
 
 const corsHeaders = {
   "Access-Control-Allow-Origin": "*",
   "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
 };
 
 // Seed brands as fallback
 const SEED_BRANDS = [
   "Acura", "Aito/Seres", "Alfa Romeo", "Ambertruck", "Aston Martin", "Audi", "BAIC", "Baojun",
   "BELGEE", "Bentley", "BMW", "Brilliance", "BYD", "Cadillac", "Changan", "Chery", "Chevrolet",
   "Chrysler", "Citroen", "Cupra", "Dacia", "Daihatsu", "Datsun", "Deepal", "Dodge", "DongFeng",
   "DW Hower", "Enovate", "Evolute", "Exeed", "FAW", "Ferrari", "Fiat", "Ford", "Forland",
   "Forthing", "Foton", "GAC", "GAZ", "Geely", "Genesis", "GMC", "Great Wall", "Haval", "Honda",
   "Hongqi", "Huanghai", "Hummer", "Hyundai", "Ineos Grenadier", "Infiniti", "Isuzu", "IVECO",
   "JAC", "Jaecoo", "Jaguar", "Jeep", "Jetour", "JETTA", "Kaiyi", "KGM", "Kia", "Knewstar",
   "Lada (ВАЗ)", "Lamborghini", "Land Rover", "Leapmotor", "LEVC", "Lexus", "Lifan", "Lincoln",
   "Livan", "LiXiang", "Lynk & Co", "Maserati", "Maxus", "Mazda", "McLaren", "Mercedes-Benz",
   "MG", "Mini", "Mitsubishi", "Moskvich", "Nio", "Nissan", "NordCross", "Omoda", "Opel", "ORA",
   "Oting", "Peugeot", "Polestar", "Pontiac", "Porsche", "Ravon", "Renault", "Rolls-Royce",
   "Saab", "Samsung", "Seat", "Skoda", "Skywell", "Smart", "Sollers", "Soueast", "SsangYong",
   "Subaru", "Suzuki", "SWM", "TANK", "Tenet", "Tesla", "Toyota", "UAZ", "VGV", "Volkswagen",
   "Volvo", "Voyah", "WEY", "Xcite", "Xpeng", "Zeekr", "Zotye", "АМБЕРАВТО"
 ];
 
 serve(async (req) => {
   if (req.method === "OPTIONS") {
     return new Response(null, { headers: corsHeaders });
   }
 
   try {
     const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
     const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
     const supabase = createClient(supabaseUrl, supabaseKey);
 
     let brandsToSync: string[] = [];
 
     // Try to fetch from AlarmTrade
     try {
       const response = await fetch("https://loader.alarmtrade.ru/", {
         headers: {
           "User-Agent": "Mozilla/5.0 (compatible; SUNMAXKZN-Bot/1.0)",
         },
       });
 
       if (response.ok) {
         const html = await response.text();
         
         // Parse HTML to extract car brands
         // Looking for links/text that contain brand names
         const brandPattern = /<a[^>]*href="[^"]*\/cars\/([^/"]+)"[^>]*>([^<]+)<\/a>/gi;
         const matches = [...html.matchAll(brandPattern)];
         
         if (matches.length > 0) {
           brandsToSync = matches
             .map((m) => m[2].trim())
             .filter((name) => {
               // Filter out non-brand text
               const blacklist = ["войти", "выйти", "регистрация", "facebook", "vk", "instagram", "telegram", "whatsapp", "youtube"];
               return (
                 name.length > 1 &&
                 name.length < 50 &&
                 !blacklist.some((b) => name.toLowerCase().includes(b)) &&
                 !/^\d+$/.test(name) &&
                 !/^[^\w\u0400-\u04FF]+$/.test(name)
               );
             });
         }
         
         // If parsing didn't work well, try alternative patterns
         if (brandsToSync.length < 20) {
           const altPattern = /class="[^"]*brand[^"]*"[^>]*>([^<]{2,30})<\//gi;
           const altMatches = [...html.matchAll(altPattern)];
           const altBrands = altMatches.map((m) => m[1].trim()).filter((n) => n.length > 1);
           if (altBrands.length > brandsToSync.length) {
             brandsToSync = altBrands;
           }
         }
       }
     } catch (fetchError) {
       console.error("Error fetching from AlarmTrade:", fetchError);
     }
 
     // Fall back to seed brands if fetch failed or didn't get enough
     if (brandsToSync.length < 20) {
       console.log("Using seed brands as fallback");
       brandsToSync = SEED_BRANDS;
     }
 
     // Get existing brands
     const { data: existingBrands } = await supabase
       .from("car_brands_list")
       .select("name");
     
     const existingNames = new Set((existingBrands || []).map((b) => b.name.toLowerCase()));
 
     // Insert new brands
     const newBrands = brandsToSync.filter((name) => !existingNames.has(name.toLowerCase()));
     let added = 0;
 
     if (newBrands.length > 0) {
       const { error: insertError } = await supabase
         .from("car_brands_list")
         .insert(
           newBrands.map((name, index) => ({
             name,
             sort_order: existingNames.size + index + 1,
           }))
         );
 
       if (!insertError) {
         added = newBrands.length;
       }
     }
 
     // Update sync info
     const { data: currentBrands } = await supabase
       .from("car_brands_list")
       .select("id");
 
     await supabase
       .from("site_settings")
       .upsert({
         key: "carBrandsSyncInfo",
         value: {
           lastSyncedAt: new Date().toISOString(),
           syncSourceUrl: "https://loader.alarmtrade.ru/",
           totalBrands: currentBrands?.length || 0,
         },
       });
 
     return new Response(
       JSON.stringify({ success: true, added, total: currentBrands?.length || 0 }),
       {
         headers: { ...corsHeaders, "Content-Type": "application/json" },
       }
     );
   } catch (error) {
     console.error("Sync error:", error);
     return new Response(
       JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
       {
         status: 500,
         headers: { ...corsHeaders, "Content-Type": "application/json" },
       }
     );
   }
 });