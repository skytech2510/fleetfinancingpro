/*
  # Fix Users Table RLS Policies

  1. Changes
    - Update RLS policies for users table to allow new user creation
    - Add policy for service role to have full access
    - Ensure authenticated users can only read/update their own data
    
  2. Security
    - Enable RLS on users table
    - Add policies for:
      - Full access for service role
      - Reading own user data (authenticated users)
      - Updating own user data (authenticated users)
*/

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Service role can create users" ON users;
DROP POLICY IF EXISTS "Service role has full access" ON users;
DROP POLICY IF EXISTS "Users can read own data" ON users;
DROP POLICY IF EXISTS "Users can update own data" ON users;

-- Create new policies
CREATE POLICY "Service role has full access"
  ON users
  FOR ALL
  TO service_role
  USING (true)
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