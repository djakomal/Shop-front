export type UserRole = 'admin' | 'agent';

// ─── User ─────────────────────────────────────────────────────────────────────
export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  is_active: boolean;
  last_login?: string;
  createdAt?: string;
  created_at?: string;
  total_sales?: number;
  total_revenue?: number;
}

// ─── Product ──────────────────────────────────────────────────────────────────
export interface Product {
  id: number;
  name: string;
  category: string;
  unit: string;
  purchase_price: number;
  selling_price: number;
  stock: number;
  min_stock: number;
  expiry_date?: string;
  barcode?: string;
  description?: string;
  is_active: boolean;
  is_low_stock?: boolean;
  createdAt?: string;
  created_at?: string;
  updatedAt?: string;
  updated_at?: string;
}

// ─── SaleItem ─────────────────────────────────────────────────────────────────
export interface SaleItem {
  id: number;
  sale_id: number;
  product_id: number;
  product_name: string;
  quantity: number;
  unit: string;
  unit_price: number;
  total: number;
}

// ─── Sale ─────────────────────────────────────────────────────────────────────
export interface Sale {
  id: number;
  agent_id: number;
  agent_name: string;
  agent?: { id: number; name: string; email: string };
  items: SaleItem[];
  total_amount: number;
  payment_method: 'cash' | 'mobile_money' | 'credit';
  status: 'completed' | 'pending' | 'cancelled';
  note?: string;
  notes?: string;
  createdAt?: string;
  created_at?: string;
}

// ─── StockMovement ────────────────────────────────────────────────────────────
export interface StockMovement {
  id: number;
  product_id: number;
  product_name: string;
  agent_id: number;
  agent_name: string;
  type: 'in' | 'out' | 'adjustment' | 'loss';
  quantity: number;
  unit: string;
  stock_before: number;
  stock_after: number;
  reason: string;
  createdAt?: string;
  created_at?: string;
}

// ─── Low Stock Product ───────────────────────────────────────────────────────
export interface LowStockProduct {
  id: number;
  name: string;
  stock: number;
  min_stock: number;
  unit: string;
}

// ─── Dashboard Stats ──────────────────────────────────────────────────────────
export interface DashboardStats {
  total_revenue: number;
  total_sales: number;
  low_stock_count: number;
  low_stock_products: LowStockProduct[];
  total_products: number;
  revenue_today: number;
  sales_today: number;
  agents_count: number;
  revenue_by_day: { date: string; revenue: number; sales: number }[];
  top_products: { name: string; quantity: number; revenue: number }[];
}

export interface AgentDashboardStats {
  total_revenue: number;
  total_sales: number;
  revenue_today: number;
  sales_today: number;
  total_products: number;
  revenue_by_day: { date: string; revenue: number; sales: number }[];
}
