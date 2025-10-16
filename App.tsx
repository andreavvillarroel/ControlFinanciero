
import React from 'react';
import { AppProvider } from './context/AppContext';
import { Dashboard } from './components/Dashboard';
import { RateUpdater } from './components/RateUpdater';
import { TransactionForm } from './components/TransactionForm';
import { TransactionList } from './components/TransactionList';
import { InventoryList } from './components/InventoryList';

const Header: React.FC = () => (
    <header className="bg-white shadow-sm mb-8">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight text-gray-900 text-center sm:text-left">
                Control Financiero - Emprendimiento de Pulseras
            </h1>
        </div>
    </header>
);


function App() {
  return (
    <AppProvider>
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
            <div className="space-y-8">
                <Dashboard />
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    <div className="lg:col-span-1 space-y-8">
                        <RateUpdater />
                        <TransactionForm />
                    </div>
                    <div className="lg:col-span-2 space-y-8">
                        <TransactionList />
                        <InventoryList />
                    </div>
                </div>
            </div>
        </main>
    </AppProvider>
  );
}

export default App;
