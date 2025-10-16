
import React, { createContext, useReducer, useContext, useEffect, ReactNode } from 'react';
import { AppState, Action, Transaction, InventoryItem, TransactionType } from '../types';

const initialState: AppState = {
  bcvRate: 0,
  transactions: [],
  inventory: [],
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

const appReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'SET_STATE':
        return action.payload;
    case 'UPDATE_RATE':
      return { ...state, bcvRate: action.payload };
    case 'ADD_TRANSACTION': {
      const newTransaction: Transaction = {
        ...action.payload,
        id: new Date().toISOString() + Math.random(),
        date: new Date().toISOString(),
      };

      const updatedTransactions = [...state.transactions, newTransaction];
      let updatedInventory = [...state.inventory];

      if (newTransaction.type === TransactionType.Expense && newTransaction.material) {
        const newInventoryItem: InventoryItem = {
          id: new Date().toISOString() + Math.random(),
          name: newTransaction.material,
          transactionId: newTransaction.id,
          amountSpent: newTransaction.amount,
          date: newTransaction.date,
        };
        updatedInventory = [...updatedInventory, newInventoryItem];
      }

      return {
        ...state,
        transactions: updatedTransactions,
        inventory: updatedInventory,
      };
    }
    default:
      return state;
  }
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, initialState);

    useEffect(() => {
        try {
            const storedState = localStorage.getItem('financeTrackerState');
            if (storedState) {
                dispatch({ type: 'SET_STATE', payload: JSON.parse(storedState) });
            }
        } catch (error) {
            console.error("Failed to load state from localStorage", error);
        }
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem('financeTrackerState', JSON.stringify(state));
        } catch (error) {
            console.error("Failed to save state to localStorage", error);
        }
    }, [state]);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);
