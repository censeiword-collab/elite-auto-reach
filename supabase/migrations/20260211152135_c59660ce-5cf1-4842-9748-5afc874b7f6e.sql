
-- Allow admins to read all leads
CREATE POLICY "Admins can view all leads"
ON public.leads FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Allow admins to update leads (status changes)
CREATE POLICY "Admins can update leads"
ON public.leads FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));
