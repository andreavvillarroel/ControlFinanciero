
import React from 'react';
import { useAppContext } from '../context/AppContext';
import { TransactionType } from '../types';
import { ArrowUpIcon, ArrowDownIcon, BalanceIcon } from './Icons';

const formatCurrency = (amount: number, rate: number) => {
    const amountInBs = amount * rate;
    return `$${amount.toFixed(2)} / Bs. ${amountInBs.toFixed(2)}`;
};

const DashboardCard: React.FC<{ title: string; amount: number; rate: number; icon: React.ReactNode; colorClass: string }> = ({ title, amount, rate, icon, colorClass }) => (
    <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4">
        <div className={`p-3 rounded-full ${colorClass}`}>
            {icon}
        </div>
        <div>
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-xl font-semibold text-gray-800">{formatCurrency(amount, rate)}</p>
        </div>
    </div>
);

export const Dashboard: React.FC = () => {
    const { state } = useAppContext();
    const { transactions, bcvRate } = state;

    const totalIncome = transactions
        .filter(t => t.type === TransactionType.Income)
        .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = transactions
        .filter(t => t.type === TransactionType.Expense)
        .reduce((sum, t) => sum + t.amount, 0);

    const netBalance = totalIncome - totalExpenses;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <DashboardCard 
                title="Ingresos Totales" 
                amount={totalIncome} 
                rate={bcvRate}
                icon={<ArrowUpIcon className="h-6 w-6 text-white" />}
                colorClass="bg-green-500"
            />
            <DashboardCard 
                title="Egresos Totales" 
                amount={totalExpenses} 
                rate={bcvRate}
                icon={<ArrowDownIcon className="h-6 w-6 text-white" />}
                colorClass="bg-red-500"
            />
            <DashboardCard 
                title="Saldo a Favor" 
                amount={netBalance} 
                rate={bcvRate}
                icon={<BalanceIcon className="h-6 w-6 text-white" />}
                colorClass="bg-blue-500"
            />
        </div>
    );
};
