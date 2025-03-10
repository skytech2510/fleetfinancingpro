/*
  # Initial Schema Setup for FleetFinancingPro

  1. New Tables
    - users: Stores user profile information
    - loan_applications: Tracks loan application details
    - lenders: Stores lender information
    - loan_offers: Tracks offers from lenders
    - financial_health: Stores user financial metrics

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT auth.uid(),
  email text UNIQUE NOT NULL,
  full_name text,
  company_name text,
  subscription_tier text DEFAULT 'free',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Loan Applications table
CREATE TABLE IF NOT EXISTS loan_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
  status text DEFAULT 'draft',
  equipment_type text NOT NULL,
  amount decimal NOT NULL,
  term_months integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Lenders table
CREATE TABLE IF NOT EXISTS lenders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  min_credit_score integer NOT NULL,
  max_loan_amount decimal NOT NULL,
  min_loan_amount decimal NOT NULL,
  interest_rate_min decimal NOT NULL,
  interest_rate_max decimal NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Loan Offers table
CREATE TABLE IF NOT EXISTS loan_offers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id uuid REFERENCES loan_applications(id),
  lender_id uuid REFERENCES lenders(id),
  interest_rate decimal NOT NULL,
  term_months integer NOT NULL,
  monthly_payment decimal NOT NULL,
  total_cost decimal NOT NULL,
  expires_at timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Financial Health table
CREATE TABLE IF NOT EXISTS financial_health (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
  credit_score integer,
  debt_to_income_ratio decimal,
  credit_utilization decimal,
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE loan_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE lenders ENABLE ROW LEVEL SECURITY;
ALTER TABLE loan_offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE financial_health ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can read own applications"
  ON loan_applications
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create own applications"
  ON loan_applications
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own applications"
  ON loan_applications
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can read lenders"
  ON lenders
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can read own offers"
  ON loan_offers
  FOR SELECT
  TO authenticated
  USING (
    application_id IN (
      SELECT id FROM loan_applications WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can read own financial health"
  ON financial_health
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_loan_applications_user_id ON loan_applications(user_id);
CREATE INDEX IF NOT EXISTS idx_loan_offers_application_id ON loan_offers(application_id);
CREATE INDEX IF NOT EXISTS idx_financial_health_user_id ON financial_health(user_id);