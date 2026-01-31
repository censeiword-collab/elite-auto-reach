import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface CarBrand {
  id: string;
  name: string;
  slug: string;
  logo_url: string | null;
  is_premium: boolean;
  sort_order: number;
}

export interface CarModel {
  id: string;
  brand_id: string;
  name: string;
  slug: string;
  body_type: string | null;
  size_class: string;
  sort_order: number;
}

export interface CalculatorOption {
  id: string;
  service_slug: string;
  option_key: string;
  option_name: string;
  description: string | null;
  sort_order: number;
}

export interface CalculatorPrice {
  id: string;
  service_slug: string;
  option_key: string;
  size_class: string;
  base_price: number;
  premium_multiplier: number;
  duration_days: number;
}

export interface CalculatorSelection {
  brandId: string | null;
  modelId: string | null;
  services: string[];
  options: Record<string, string[]>;
}

export interface CalculatorResult {
  totalPrice: number;
  totalDuration: number;
  breakdown: {
    serviceName: string;
    optionName: string;
    price: number;
    duration: number;
  }[];
}

const SERVICE_NAMES: Record<string, string> = {
  'okleyka-avto-poliuretanovoy-plenkoy-kazan': 'Защита PPF',
  'aktivnyy-vyhlop-kazan': 'Активный выхлоп',
  'shumoizolyaciya-avto-kazan': 'Шумоизоляция',
  'udalenie-vmyatin-bez-pokraski-kazan': 'Удаление вмятин PDR',
  'ustanovka-signalizacii-pandora-kazan': 'Сигнализация Pandora',
};

export const useCalculator = () => {
  const [selection, setSelection] = useState<CalculatorSelection>({
    brandId: null,
    modelId: null,
    services: [],
    options: {},
  });

  // Fetch car brands
  const { data: brands = [], isLoading: brandsLoading } = useQuery({
    queryKey: ["car-brands"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("car_brands")
        .select("*")
        .order("sort_order");
      if (error) throw error;
      return data as CarBrand[];
    },
  });

  // Fetch car models for selected brand
  const { data: models = [], isLoading: modelsLoading } = useQuery({
    queryKey: ["car-models", selection.brandId],
    queryFn: async () => {
      if (!selection.brandId) return [];
      const { data, error } = await supabase
        .from("car_models")
        .select("*")
        .eq("brand_id", selection.brandId)
        .order("sort_order");
      if (error) throw error;
      return data as CarModel[];
    },
    enabled: !!selection.brandId,
  });

  // Fetch calculator options
  const { data: options = [], isLoading: optionsLoading } = useQuery({
    queryKey: ["calculator-options"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("calculator_options")
        .select("*")
        .order("sort_order");
      if (error) throw error;
      return data as CalculatorOption[];
    },
  });

  // Fetch calculator prices
  const { data: prices = [], isLoading: pricesLoading } = useQuery({
    queryKey: ["calculator-prices"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("calculator_prices")
        .select("*");
      if (error) throw error;
      return data as CalculatorPrice[];
    },
  });

  const selectedBrand = brands.find((b) => b.id === selection.brandId);
  const selectedModel = models.find((m) => m.id === selection.modelId);

  const getOptionsForService = (serviceSlug: string) => {
    return options.filter((o) => o.service_slug === serviceSlug);
  };

  const calculateResult = (): CalculatorResult | null => {
    if (!selectedModel || selection.services.length === 0) return null;

    const sizeClass = selectedModel.size_class || "medium";
    const isPremium = selectedBrand?.is_premium || false;
    const breakdown: CalculatorResult["breakdown"] = [];

    selection.services.forEach((serviceSlug) => {
      const serviceOptions = selection.options[serviceSlug] || [];
      serviceOptions.forEach((optionKey) => {
        const price = prices.find(
          (p) =>
            p.service_slug === serviceSlug &&
            p.option_key === optionKey &&
            p.size_class === sizeClass
        );

        if (price) {
          const optionData = options.find(
            (o) => o.service_slug === serviceSlug && o.option_key === optionKey
          );
          
          const finalPrice = isPremium
            ? Math.round(price.base_price * price.premium_multiplier)
            : price.base_price;

          breakdown.push({
            serviceName: SERVICE_NAMES[serviceSlug] || serviceSlug,
            optionName: optionData?.option_name || optionKey,
            price: finalPrice,
            duration: price.duration_days,
          });
        }
      });
    });

    const totalPrice = breakdown.reduce((sum, item) => sum + item.price, 0);
    const totalDuration = Math.max(...breakdown.map((item) => item.duration), 0);

    return { totalPrice, totalDuration, breakdown };
  };

  const setBrand = (brandId: string) => {
    setSelection((prev) => ({
      ...prev,
      brandId,
      modelId: null,
    }));
  };

  const setModel = (modelId: string) => {
    setSelection((prev) => ({
      ...prev,
      modelId,
    }));
  };

  const toggleService = (serviceSlug: string) => {
    setSelection((prev) => {
      const services = prev.services.includes(serviceSlug)
        ? prev.services.filter((s) => s !== serviceSlug)
        : [...prev.services, serviceSlug];

      const options = { ...prev.options };
      if (!services.includes(serviceSlug)) {
        delete options[serviceSlug];
      }

      return { ...prev, services, options };
    });
  };

  const toggleOption = (serviceSlug: string, optionKey: string) => {
    setSelection((prev) => {
      const serviceOptions = prev.options[serviceSlug] || [];
      const newOptions = serviceOptions.includes(optionKey)
        ? serviceOptions.filter((o) => o !== optionKey)
        : [...serviceOptions, optionKey];

      return {
        ...prev,
        options: {
          ...prev.options,
          [serviceSlug]: newOptions,
        },
      };
    });
  };

  const reset = () => {
    setSelection({
      brandId: null,
      modelId: null,
      services: [],
      options: {},
    });
  };

  return {
    selection,
    brands,
    models,
    options,
    prices,
    selectedBrand,
    selectedModel,
    isLoading: brandsLoading || modelsLoading || optionsLoading || pricesLoading,
    getOptionsForService,
    calculateResult,
    setBrand,
    setModel,
    toggleService,
    toggleOption,
    reset,
    SERVICE_NAMES,
  };
};
