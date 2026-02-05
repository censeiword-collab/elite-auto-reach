 import { useQuery } from "@tanstack/react-query";
 import { supabase } from "@/integrations/supabase/client";
 
 export interface CarBrandItem {
   id: string;
   name: string;
   is_active: boolean;
   sort_order: number;
 }
 
 export const useCarBrandsList = () => {
   return useQuery({
     queryKey: ["car-brands-list"],
     queryFn: async () => {
       const { data, error } = await supabase
         .from("car_brands_list")
         .select("*")
         .eq("is_active", true)
         .order("name", { ascending: true });
       
       if (error) throw error;
       return data as CarBrandItem[];
     },
     staleTime: 1000 * 60 * 30, // Cache for 30 minutes
   });
 };