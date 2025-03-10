/*
  # Fix Users Table RLS Policies

  1. Changes
    - Update RLS policies for users table to allow new user creation
    - Add policy for inserting new users during signup
    - Ensure authenticated users can only read/update their own data
    
  2. Security
    - Enable RLS on users table
    - Add policies for:
      - Inserting new users (service role)
      - Reading own user data (authenticated users)
      - Updating own user data (authenticated users)
*/

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Users can create own applications" ON users;
DROP POLICY IF EXISTS "Users can read own data" ON users;
DROP POLICY IF EXISTS "Users can update own data" ON users;

-- Create new policies
CREATE POLICY "Service role can create users"
  ON users
  FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);