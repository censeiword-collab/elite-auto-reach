-- Create table for storing synced car brands list
CREATE TABLE IF NOT EXISTS public.car_brands_list (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.car_brands_list ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Car brands are publicly readable"
  ON public.car_brands_list
  FOR SELECT
  USING (true);

-- Allow admins to manage
CREATE POLICY "Admins can manage car brands list"
  ON public.car_brands_list
  FOR ALL
  USING (
    EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin')
  );

-- Create site_settings entry for car brands sync info
INSERT INTO public.site_settings (key, value)
VALUES ('carBrandsSyncInfo', '{"lastSyncedAt": null, "syncSourceUrl": "https://loader.alarmtrade.ru/", "totalBrands": 0}')
ON CONFLICT (key) DO NOTHING;

-- Insert seed car brands data
INSERT INTO public.car_brands_list (name, sort_order) VALUES
  ('Acura', 1), ('Aito/Seres', 2), ('Alfa Romeo', 3), ('Ambertruck', 4), ('Aston Martin', 5),
  ('Audi', 6), ('BAIC', 7), ('Baojun', 8), ('BELGEE', 9), ('Bentley', 10),
  ('BMW', 11), ('Brilliance', 12), ('BYD', 13), ('Cadillac', 14), ('Changan', 15),
  ('Chery', 16), ('Chevrolet', 17), ('Chrysler', 18), ('Citroen', 19), ('Cupra', 20),
  ('Dacia', 21), ('Daihatsu', 22), ('Datsun', 23), ('Deepal', 24), ('Dodge', 25),
  ('DongFeng', 26), ('DW Hower', 27), ('Enovate', 28), ('Evolute', 29), ('Exeed', 30),
  ('FAW', 31), ('Ferrari', 32), ('Fiat', 33), ('Ford', 34), ('Forland', 35),
  ('Forthing', 36), ('Foton', 37), ('GAC', 38), ('GAZ', 39), ('Geely', 40),
  ('Genesis', 41), ('GMC', 42), ('Great Wall', 43), ('Haval', 44), ('Honda', 45),
  ('Hongqi', 46), ('Huanghai', 47), ('Hummer', 48), ('Hyundai', 49), ('Ineos Grenadier', 50),
  ('Infiniti', 51), ('Isuzu', 52), ('IVECO', 53), ('JAC', 54), ('Jaecoo', 55),
  ('Jaguar', 56), ('Jeep', 57), ('Jetour', 58), ('JETTA', 59), ('Kaiyi', 60),
  ('KGM', 61), ('Kia', 62), ('Knewstar', 63), ('Lada (ВАЗ)', 64), ('Lamborghini', 65),
  ('Land Rover', 66), ('Leapmotor', 67), ('LEVC', 68), ('Lexus', 69), ('Lifan', 70),
  ('Lincoln', 71), ('Livan', 72), ('LiXiang', 73), ('Lynk & Co', 74), ('Maserati', 75),
  ('Maxus', 76), ('Mazda', 77), ('McLaren', 78), ('Mercedes-Benz', 79), ('MG', 80),
  ('Mini', 81), ('Mitsubishi', 82), ('Moskvich', 83), ('Nio', 84), ('Nissan', 85),
  ('NordCross', 86), ('Omoda', 87), ('Opel', 88), ('ORA', 89), ('Oting', 90),
  ('Peugeot', 91), ('Polestar', 92), ('Pontiac', 93), ('Porsche', 94), ('Ravon', 95),
  ('Renault', 96), ('Rolls-Royce', 97), ('Saab', 98), ('Samsung', 99), ('Seat', 100),
  ('Skoda', 101), ('Skywell', 102), ('Smart', 103), ('Sollers', 104), ('Soueast', 105),
  ('SsangYong', 106), ('Subaru', 107), ('Suzuki', 108), ('SWM', 109), ('TANK', 110),
  ('Tenet', 111), ('Tesla', 112), ('Toyota', 113), ('UAZ', 114), ('VGV', 115),
  ('Volkswagen', 116), ('Volvo', 117), ('Voyah', 118), ('WEY', 119), ('Xcite', 120),
  ('Xpeng', 121), ('Zeekr', 122), ('Zotye', 123), ('АМБЕРАВТО', 124)
ON CONFLICT (name) DO NOTHING;