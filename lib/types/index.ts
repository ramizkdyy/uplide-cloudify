export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Subscription {
  id: string;
  name: string;
  category: string;
  department: string;
  price: number;
  billingCycle: "monthly" | "yearly";
  status: "active" | "inactive";
  nextBillingDate: string;
  logo?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}