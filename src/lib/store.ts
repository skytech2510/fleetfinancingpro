import { create } from 'zustand';
import { User, LoanApplication, FinancialHealth } from '../types';

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
}

interface ApplicationState {
  applications: LoanApplication[];
  setApplications: (applications: LoanApplication[]) => void;
  addApplication: (application: LoanApplication) => void;
}

interface FinancialState {
  financialHealth: FinancialHealth | null;
  setFinancialHealth: (health: FinancialHealth) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

export const useApplicationStore = create<ApplicationState>((set) => ({
  applications: [],
  setApplications: (applications) => set({ applications }),
  addApplication: (application) =>
    set((state) => ({ applications: [...state.applications, application] })),
}));

export const useFinancialStore = create<FinancialState>((set) => ({
  financialHealth: null,
  setFinancialHealth: (financialHealth) => set({ financialHealth }),
}));