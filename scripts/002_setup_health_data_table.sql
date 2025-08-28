-- Create health_data table for React Native Health Data Sync
CREATE TABLE IF NOT EXISTS health_data (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL,
    date DATE NOT NULL,
    step_count INTEGER NOT NULL CHECK (step_count >= 0),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create unique constraint to prevent duplicate entries per user per date
ALTER TABLE health_data ADD CONSTRAINT unique_user_date UNIQUE (user_id, date);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_health_data_user_date ON health_data (user_id, date);
CREATE INDEX IF NOT EXISTS idx_health_data_created_at ON health_data (created_at);

-- Enable Row Level Security
ALTER TABLE health_data ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own health data" ON health_data
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own health data" ON health_data
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own health data" ON health_data
    FOR UPDATE USING (auth.uid() = user_id);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_health_data_updated_at 
    BEFORE UPDATE ON health_data 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
