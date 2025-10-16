
export enum PaymentMethod {
  Cash = 'Efectivo',
  Pagomovil = 'Pagomovil',
}

export enum TransactionType {
  Income = 'income',
  Expense = 'expense',
}

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number; // Stored in USD
  paymentMethod: PaymentMethod;
  description: string;
  date: string; // ISO string
  material?: string; // Optional, only for expenses
}

export interface InventoryItem {
  id: string;
  name: string;
  transactionId: string; // Link back to the expense transaction
  amountSpent: number; // in USD
  date: string;
}

export interface AppState {
  bcvRate: number;
  transactions: Transaction[];
  inventory: InventoryItem[];
}

export type Action =
  | { type: 'SET_STATE'; payload: AppState }
  | { type: 'UPDATE_RATE'; payload: number }
  | { type: 'ADD_TRANSACTION'; payload: Omit<Transaction, 'id' | 'date'> };
