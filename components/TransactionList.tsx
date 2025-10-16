
import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Transaction, TransactionType } from '../types';
import { ArrowUpIcon, ArrowDownIcon } from './Icons';

const TransactionItem: React.FC<{ transaction: Transaction; rate: number }> = ({ transaction, rate }) => {
    const isIncome = transaction.type === TransactionType.Income;
    const amountInBs = transaction.amount * rate;
    return (
        <li className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-full ${isIncome ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                    {isIncome ? <ArrowUpIcon className="h-5 w-5" /> : <ArrowDownIcon className="h-5 w-5" />}
                </div>
                <div>
                    <p className="font-semibold text-gray-800">{transaction.description}</p>
                    <p className="text-sm text-gray-500">
                        {new Date(transaction.date).toLocaleDateString('es-VE')} - {transaction.paymentMethod}
                        {transaction.material && <span className="ml-2 px-2 py-0.5 bg-gray-200 text-gray-600 rounded-full text-xs">{transaction.material}</span>}
                    </p>
                </div>
            </div>
            <div className="text-right">
                <p className={`font-semibold ${isIncome ? 'text-green-600' : 'text-red-600'}`}>
                    {isIncome ? '+' : '-'} ${transaction.amount.toFixed(2)}
                </p>
                <p className="text-sm text-gray-500">
                    Bs. {amountInBs.toFixed(2)}
                </p>
            </div>
        </li>
    );
};

export const TransactionList: React.FC = () => {
    const { state } = useAppContext();
    const { transactions, bcvRate } = state;

    const sortedTransactions = [...transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
        <div className="bg-slate-100 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Historial de Movimientos</h3>
            {sortedTransactions.length > 0 ? (
                <ul className="space-y-3">
                    {sortedTransactions.map(tx => (
                        <TransactionItem key={tx.id} transaction={tx} rate={bcvRate} />
                    ))}
                </ul>
            ) : (
                <div className="text-center py-10 px-6 bg-white rounded-lg">
                    <p className="text-gray-500">No hay movimientos registrados.</p>
                    <p className="text-sm text-gray-400 mt-1">Añade tu primer ingreso o egreso para empezar.</p>
                </div>
            )}
        </div>
    );
};
