-- Function to setup first admin (only works if no admins exist)
CREATE OR REPLACE FUNCTION public.setup_first_admin(user_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Check if any admin already exists
  IF EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin') THEN
    RETURN FALSE;
  END IF;
  
  -- Insert admin role for the user
  INSERT INTO public.user_roles (user_id, role)
  VALUES (user_id, 'admin');
  
  RETURN TRUE;
END;
$$;