-- Таблица марок автомобилей
CREATE TABLE public.car_brands (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  logo_url TEXT,
  is_premium BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Таблица моделей автомобилей
CREATE TABLE public.car_models (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  brand_id UUID NOT NULL REFERENCES public.car_brands(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  body_type TEXT, -- sedan, suv, coupe, hatchback, wagon, convertible
  size_class TEXT DEFAULT 'medium', -- compact, medium, large, xl
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(brand_id, slug)
);

-- Таблица опций услуг для калькулятора
CREATE TABLE public.calculator_options (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  service_slug TEXT NOT NULL,
  option_key TEXT NOT NULL,
  option_name TEXT NOT NULL,
  description TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(service_slug, option_key)
);

-- Таблица цен калькулятора
CREATE TABLE public.calculator_prices (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  service_slug TEXT NOT NULL,
  option_key TEXT NOT NULL,
  size_class TEXT NOT NULL DEFAULT 'medium', -- compact, medium, large, xl
  base_price INTEGER NOT NULL,
  premium_multiplier NUMERIC(3,2) DEFAULT 1.0, -- для премиум марок
  duration_days INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(service_slug, option_key, size_class)
);

-- Enable RLS
ALTER TABLE public.car_brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.car_models ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.calculator_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.calculator_prices ENABLE ROW LEVEL SECURITY;

-- Публичный доступ на чтение для активных записей
CREATE POLICY "Car brands are publicly readable" ON public.car_brands
  FOR SELECT USING (is_active = true);

CREATE POLICY "Car models are publicly readable" ON public.car_models
  FOR SELECT USING (is_active = true);

CREATE POLICY "Calculator options are publicly readable" ON public.calculator_options
  FOR SELECT USING (is_active = true);

CREATE POLICY "Calculator prices are publicly readable" ON public.calculator_prices
  FOR SELECT USING (true);

-- Админ доступ на все операции
CREATE POLICY "Admins can manage car brands" ON public.car_brands
  FOR ALL USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage car models" ON public.car_models
  FOR ALL USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage calculator options" ON public.calculator_options
  FOR ALL USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage calculator prices" ON public.calculator_prices
  FOR ALL USING (has_role(auth.uid(), 'admin'));

-- Trigger для updated_at
CREATE TRIGGER update_calculator_prices_updated_at
  BEFORE UPDATE ON public.calculator_prices
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Начальные данные: марки автомобилей
INSERT INTO public.car_brands (name, slug, is_premium, sort_order) VALUES
  ('BMW', 'bmw', true, 1),
  ('Mercedes-Benz', 'mercedes', true, 2),
  ('Audi', 'audi', true, 3),
  ('Porsche', 'porsche', true, 4),
  ('Lexus', 'lexus', true, 5),
  ('Land Rover', 'land-rover', true, 6),
  ('Bentley', 'bentley', true, 7),
  ('Maserati', 'maserati', true, 8),
  ('Volkswagen', 'volkswagen', false, 10),
  ('Toyota', 'toyota', false, 11),
  ('Kia', 'kia', false, 12),
  ('Hyundai', 'hyundai', false, 13),
  ('Mazda', 'mazda', false, 14),
  ('Skoda', 'skoda', false, 15);

-- Начальные данные: модели
INSERT INTO public.car_models (brand_id, name, slug, body_type, size_class, sort_order) 
SELECT id, '3 Series', '3-series', 'sedan', 'medium', 1 FROM public.car_brands WHERE slug = 'bmw'
UNION ALL
SELECT id, '5 Series', '5-series', 'sedan', 'large', 2 FROM public.car_brands WHERE slug = 'bmw'
UNION ALL
SELECT id, 'X5', 'x5', 'suv', 'large', 3 FROM public.car_brands WHERE slug = 'bmw'
UNION ALL
SELECT id, 'X7', 'x7', 'suv', 'xl', 4 FROM public.car_brands WHERE slug = 'bmw'
UNION ALL
SELECT id, 'E-Class', 'e-class', 'sedan', 'large', 1 FROM public.car_brands WHERE slug = 'mercedes'
UNION ALL
SELECT id, 'S-Class', 's-class', 'sedan', 'xl', 2 FROM public.car_brands WHERE slug = 'mercedes'
UNION ALL
SELECT id, 'GLE', 'gle', 'suv', 'large', 3 FROM public.car_brands WHERE slug = 'mercedes'
UNION ALL
SELECT id, 'GLS', 'gls', 'suv', 'xl', 4 FROM public.car_brands WHERE slug = 'mercedes'
UNION ALL
SELECT id, 'A6', 'a6', 'sedan', 'large', 1 FROM public.car_brands WHERE slug = 'audi'
UNION ALL
SELECT id, 'Q7', 'q7', 'suv', 'large', 2 FROM public.car_brands WHERE slug = 'audi'
UNION ALL
SELECT id, 'Q8', 'q8', 'suv', 'xl', 3 FROM public.car_brands WHERE slug = 'audi'
UNION ALL
SELECT id, 'Cayenne', 'cayenne', 'suv', 'large', 1 FROM public.car_brands WHERE slug = 'porsche'
UNION ALL
SELECT id, 'Panamera', 'panamera', 'sedan', 'large', 2 FROM public.car_brands WHERE slug = 'porsche';

-- Опции для PPF
INSERT INTO public.calculator_options (service_slug, option_key, option_name, description, sort_order) VALUES
  ('okleyka-avto-poliuretanovoy-plenkoy-kazan', 'full', 'Полная оклейка', 'Защита всего кузова автомобиля', 1),
  ('okleyka-avto-poliuretanovoy-plenkoy-kazan', 'front', 'Передняя часть', 'Капот, бампер, крылья, фары', 2),
  ('okleyka-avto-poliuretanovoy-plenkoy-kazan', 'hood', 'Капот', 'Только капот', 3),
  ('okleyka-avto-poliuretanovoy-plenkoy-kazan', 'headlights', 'Фары', 'Защита оптики', 4),
  ('okleyka-avto-poliuretanovoy-plenkoy-kazan', 'risk-zones', 'Зоны риска', 'Пороги, арки, зеркала', 5);

-- Опции для активного выхлопа
INSERT INTO public.calculator_options (service_slug, option_key, option_name, description, sort_order) VALUES
  ('aktivnyy-vyhlop-kazan', 'valves', 'Электронные заслонки', 'Установка заслонок с пультом', 1),
  ('aktivnyy-vyhlop-kazan', 'downpipe', 'Даунпайп', 'Спортивный даунпайп', 2),
  ('aktivnyy-vyhlop-kazan', 'catback', 'Cat-back система', 'Полная выхлопная система', 3);

-- Опции для шумоизоляции
INSERT INTO public.calculator_options (service_slug, option_key, option_name, description, sort_order) VALUES
  ('shumoizolyaciya-avto-kazan', 'full', 'Полная шумоизоляция', 'Весь автомобиль', 1),
  ('shumoizolyaciya-avto-kazan', 'doors', 'Двери', '4 двери', 2),
  ('shumoizolyaciya-avto-kazan', 'floor', 'Пол', 'Пол салона', 3),
  ('shumoizolyaciya-avto-kazan', 'roof', 'Крыша', 'Потолок', 4),
  ('shumoizolyaciya-avto-kazan', 'trunk', 'Багажник', 'Багажный отсек', 5),
  ('shumoizolyaciya-avto-kazan', 'arches', 'Арки', 'Колёсные арки', 6);

-- Опции для PDR
INSERT INTO public.calculator_options (service_slug, option_key, option_name, description, sort_order) VALUES
  ('udalenie-vmyatin-bez-pokraski-kazan', 'small', 'Малая вмятина', 'До 3 см', 1),
  ('udalenie-vmyatin-bez-pokraski-kazan', 'medium', 'Средняя вмятина', '3-10 см', 2),
  ('udalenie-vmyatin-bez-pokraski-kazan', 'large', 'Большая вмятина', 'От 10 см', 3),
  ('udalenie-vmyatin-bez-pokraski-kazan', 'hail', 'Градовые повреждения', 'Комплекс', 4);

-- Опции для Pandora
INSERT INTO public.calculator_options (service_slug, option_key, option_name, description, sort_order) VALUES
  ('ustanovka-signalizacii-pandora-kazan', 'dx', 'Pandora DX', 'Базовая защита', 1),
  ('ustanovka-signalizacii-pandora-kazan', 'dxl', 'Pandora DXL', 'Расширенная защита с GPS', 2),
  ('ustanovka-signalizacii-pandora-kazan', 'smart', 'Pandora Smart', 'Премиум с автозапуском', 3);

-- Цены для PPF
INSERT INTO public.calculator_prices (service_slug, option_key, size_class, base_price, premium_multiplier, duration_days) VALUES
  ('okleyka-avto-poliuretanovoy-plenkoy-kazan', 'full', 'compact', 180000, 1.15, 5),
  ('okleyka-avto-poliuretanovoy-plenkoy-kazan', 'full', 'medium', 220000, 1.15, 6),
  ('okleyka-avto-poliuretanovoy-plenkoy-kazan', 'full', 'large', 280000, 1.15, 7),
  ('okleyka-avto-poliuretanovoy-plenkoy-kazan', 'full', 'xl', 350000, 1.20, 8),
  ('okleyka-avto-poliuretanovoy-plenkoy-kazan', 'front', 'compact', 80000, 1.10, 2),
  ('okleyka-avto-poliuretanovoy-plenkoy-kazan', 'front', 'medium', 95000, 1.10, 2),
  ('okleyka-avto-poliuretanovoy-plenkoy-kazan', 'front', 'large', 120000, 1.15, 3),
  ('okleyka-avto-poliuretanovoy-plenkoy-kazan', 'front', 'xl', 150000, 1.15, 3),
  ('okleyka-avto-poliuretanovoy-plenkoy-kazan', 'hood', 'compact', 25000, 1.10, 1),
  ('okleyka-avto-poliuretanovoy-plenkoy-kazan', 'hood', 'medium', 30000, 1.10, 1),
  ('okleyka-avto-poliuretanovoy-plenkoy-kazan', 'hood', 'large', 40000, 1.10, 1),
  ('okleyka-avto-poliuretanovoy-plenkoy-kazan', 'hood', 'xl', 50000, 1.15, 1),
  ('okleyka-avto-poliuretanovoy-plenkoy-kazan', 'headlights', 'compact', 8000, 1.00, 1),
  ('okleyka-avto-poliuretanovoy-plenkoy-kazan', 'headlights', 'medium', 10000, 1.00, 1),
  ('okleyka-avto-poliuretanovoy-plenkoy-kazan', 'headlights', 'large', 12000, 1.00, 1),
  ('okleyka-avto-poliuretanovoy-plenkoy-kazan', 'headlights', 'xl', 15000, 1.00, 1),
  ('okleyka-avto-poliuretanovoy-plenkoy-kazan', 'risk-zones', 'compact', 35000, 1.10, 1),
  ('okleyka-avto-poliuretanovoy-plenkoy-kazan', 'risk-zones', 'medium', 45000, 1.10, 2),
  ('okleyka-avto-poliuretanovoy-plenkoy-kazan', 'risk-zones', 'large', 55000, 1.10, 2),
  ('okleyka-avto-poliuretanovoy-plenkoy-kazan', 'risk-zones', 'xl', 70000, 1.15, 2);

-- Цены для активного выхлопа
INSERT INTO public.calculator_prices (service_slug, option_key, size_class, base_price, premium_multiplier, duration_days) VALUES
  ('aktivnyy-vyhlop-kazan', 'valves', 'compact', 45000, 1.20, 1),
  ('aktivnyy-vyhlop-kazan', 'valves', 'medium', 55000, 1.20, 1),
  ('aktivnyy-vyhlop-kazan', 'valves', 'large', 65000, 1.25, 2),
  ('aktivnyy-vyhlop-kazan', 'valves', 'xl', 80000, 1.25, 2),
  ('aktivnyy-vyhlop-kazan', 'downpipe', 'compact', 35000, 1.15, 1),
  ('aktivnyy-vyhlop-kazan', 'downpipe', 'medium', 45000, 1.15, 1),
  ('aktivnyy-vyhlop-kazan', 'downpipe', 'large', 55000, 1.20, 1),
  ('aktivnyy-vyhlop-kazan', 'downpipe', 'xl', 70000, 1.20, 1),
  ('aktivnyy-vyhlop-kazan', 'catback', 'compact', 80000, 1.20, 2),
  ('aktivnyy-vyhlop-kazan', 'catback', 'medium', 100000, 1.20, 2),
  ('aktivnyy-vyhlop-kazan', 'catback', 'large', 130000, 1.25, 3),
  ('aktivnyy-vyhlop-kazan', 'catback', 'xl', 160000, 1.25, 3);

-- Цены для шумоизоляции
INSERT INTO public.calculator_prices (service_slug, option_key, size_class, base_price, premium_multiplier, duration_days) VALUES
  ('shumoizolyaciya-avto-kazan', 'full', 'compact', 80000, 1.10, 3),
  ('shumoizolyaciya-avto-kazan', 'full', 'medium', 100000, 1.10, 4),
  ('shumoizolyaciya-avto-kazan', 'full', 'large', 130000, 1.15, 5),
  ('shumoizolyaciya-avto-kazan', 'full', 'xl', 160000, 1.15, 6),
  ('shumoizolyaciya-avto-kazan', 'doors', 'compact', 20000, 1.00, 1),
  ('shumoizolyaciya-avto-kazan', 'doors', 'medium', 25000, 1.00, 1),
  ('shumoizolyaciya-avto-kazan', 'doors', 'large', 30000, 1.00, 1),
  ('shumoizolyaciya-avto-kazan', 'doors', 'xl', 35000, 1.00, 1),
  ('shumoizolyaciya-avto-kazan', 'floor', 'compact', 25000, 1.00, 1),
  ('shumoizolyaciya-avto-kazan', 'floor', 'medium', 30000, 1.00, 1),
  ('shumoizolyaciya-avto-kazan', 'floor', 'large', 40000, 1.00, 2),
  ('shumoizolyaciya-avto-kazan', 'floor', 'xl', 50000, 1.00, 2),
  ('shumoizolyaciya-avto-kazan', 'roof', 'compact', 12000, 1.00, 1),
  ('shumoizolyaciya-avto-kazan', 'roof', 'medium', 15000, 1.00, 1),
  ('shumoizolyaciya-avto-kazan', 'roof', 'large', 18000, 1.00, 1),
  ('shumoizolyaciya-avto-kazan', 'roof', 'xl', 22000, 1.00, 1),
  ('shumoizolyaciya-avto-kazan', 'trunk', 'compact', 15000, 1.00, 1),
  ('shumoizolyaciya-avto-kazan', 'trunk', 'medium', 18000, 1.00, 1),
  ('shumoizolyaciya-avto-kazan', 'trunk', 'large', 22000, 1.00, 1),
  ('shumoizolyaciya-avto-kazan', 'trunk', 'xl', 28000, 1.00, 1),
  ('shumoizolyaciya-avto-kazan', 'arches', 'compact', 10000, 1.00, 1),
  ('shumoizolyaciya-avto-kazan', 'arches', 'medium', 12000, 1.00, 1),
  ('shumoizolyaciya-avto-kazan', 'arches', 'large', 15000, 1.00, 1),
  ('shumoizolyaciya-avto-kazan', 'arches', 'xl', 18000, 1.00, 1);

-- Цены для PDR
INSERT INTO public.calculator_prices (service_slug, option_key, size_class, base_price, premium_multiplier, duration_days) VALUES
  ('udalenie-vmyatin-bez-pokraski-kazan', 'small', 'compact', 3000, 1.00, 1),
  ('udalenie-vmyatin-bez-pokraski-kazan', 'small', 'medium', 3500, 1.00, 1),
  ('udalenie-vmyatin-bez-pokraski-kazan', 'small', 'large', 4000, 1.00, 1),
  ('udalenie-vmyatin-bez-pokraski-kazan', 'small', 'xl', 4500, 1.00, 1),
  ('udalenie-vmyatin-bez-pokraski-kazan', 'medium', 'compact', 6000, 1.00, 1),
  ('udalenie-vmyatin-bez-pokraski-kazan', 'medium', 'medium', 7000, 1.00, 1),
  ('udalenie-vmyatin-bez-pokraski-kazan', 'medium', 'large', 8000, 1.00, 1),
  ('udalenie-vmyatin-bez-pokraski-kazan', 'medium', 'xl', 9000, 1.00, 1),
  ('udalenie-vmyatin-bez-pokraski-kazan', 'large', 'compact', 10000, 1.00, 1),
  ('udalenie-vmyatin-bez-pokraski-kazan', 'large', 'medium', 12000, 1.00, 1),
  ('udalenie-vmyatin-bez-pokraski-kazan', 'large', 'large', 15000, 1.00, 1),
  ('udalenie-vmyatin-bez-pokraski-kazan', 'large', 'xl', 18000, 1.00, 1),
  ('udalenie-vmyatin-bez-pokraski-kazan', 'hail', 'compact', 40000, 1.00, 3),
  ('udalenie-vmyatin-bez-pokraski-kazan', 'hail', 'medium', 55000, 1.00, 4),
  ('udalenie-vmyatin-bez-pokraski-kazan', 'hail', 'large', 70000, 1.00, 5),
  ('udalenie-vmyatin-bez-pokraski-kazan', 'hail', 'xl', 90000, 1.00, 6);

-- Цены для Pandora
INSERT INTO public.calculator_prices (service_slug, option_key, size_class, base_price, premium_multiplier, duration_days) VALUES
  ('ustanovka-signalizacii-pandora-kazan', 'dx', 'compact', 25000, 1.00, 1),
  ('ustanovka-signalizacii-pandora-kazan', 'dx', 'medium', 28000, 1.00, 1),
  ('ustanovka-signalizacii-pandora-kazan', 'dx', 'large', 32000, 1.00, 1),
  ('ustanovka-signalizacii-pandora-kazan', 'dx', 'xl', 35000, 1.00, 1),
  ('ustanovka-signalizacii-pandora-kazan', 'dxl', 'compact', 45000, 1.10, 1),
  ('ustanovka-signalizacii-pandora-kazan', 'dxl', 'medium', 50000, 1.10, 1),
  ('ustanovka-signalizacii-pandora-kazan', 'dxl', 'large', 55000, 1.10, 2),
  ('ustanovka-signalizacii-pandora-kazan', 'dxl', 'xl', 60000, 1.10, 2),
  ('ustanovka-signalizacii-pandora-kazan', 'smart', 'compact', 70000, 1.15, 2),
  ('ustanovka-signalizacii-pandora-kazan', 'smart', 'medium', 80000, 1.15, 2),
  ('ustanovka-signalizacii-pandora-kazan', 'smart', 'large', 90000, 1.15, 2),
  ('ustanovka-signalizacii-pandora-kazan', 'smart', 'xl', 100000, 1.15, 2);