-- Create health_data table for storing daily step counts
CREATE TABLE IF NOT EXISTS public.health_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  step_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Ensure one record per user per date
  UNIQUE(user_id, date)
);

-- Enable Row Level Security
ALTER TABLE public.health_data ENABLE ROW LEVEL SECURITY;

-- RLS Policies for health_data table
CREATE POLICY "Users can view their own health data" 
  ON public.health_data FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own health data" 
  ON public.health_data FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own health data" 
  ON public.health_data FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own health data" 
  ON public.health_data FOR DELETE 
  USING (auth.uid() = user_id);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_health_data_user_date 
  ON public.health_data(user_id, date DESC);
