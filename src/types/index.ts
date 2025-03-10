// User Types
export interface User {
  id: string;
  email: string;
  full_name: string;
  company_name?: string;
  created_at: string;
  subscription_tier: 'free' | 'premium' | 'enterprise';
}

// Loan Application Types
export interface LoanApplication {
  id: string;
  user_id: string;
  status: 'draft' | 'submitted' | 'in_review' | 'approved' | 'rejected';
  equipment_type: string;
  amount: number;
  term_months: number;
  created_at: string;
  updated_at: string;
}

// Lender Types
export interface Lender {
  id: string;
  name: string;
  min_credit_score: number;
  max_loan_amount: number;
  min_loan_amount: number;
  interest_rate_range: {
    min: number;
    max: number;
  };
}

// Loan Offer Types
export interface LoanOffer {
  id: string;
  application_id: string;
  lender_id: string;
  interest_rate: number;
  term_months: number;
  monthly_payment: number;
  total_cost: number;
  expires_at: string;
}

// Financial Health Types
export interface FinancialHealth {
  user_id: string;
  credit_score: number;
  debt_to_income_ratio: number;
  credit_utilization: number;
  updated_at: string;
}