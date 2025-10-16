
import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { PaymentMethod, TransactionType } from '../types';

export const TransactionForm: React.FC = () => {
    const { dispatch } = useAppContext();
    const [type, setType] = useState<TransactionType>(TransactionType.Income);
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(PaymentMethod.Pagomovil);
    const [material, setMaterial] = useState('');
    const [isUsd, setIsUsd] = useState(true);

    const { state } = useAppContext();
    const { bcvRate } = state;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        let amountInUsd = parseFloat(amount);
        if (isNaN(amountInUsd) || amountInUsd <= 0) {
            alert("Por favor, ingrese un monto válido.");
            return;
        }

        if (!isUsd) {
            if (bcvRate === 0) {
                alert("Por favor, establezca la tasa del dólar antes de registrar en Bolívares.");
                return;
            }
            amountInUsd /= bcvRate;
        }

        dispatch({
            type: 'ADD_TRANSACTION',
            payload: {
                type,
                amount: amountInUsd,
                description,
                paymentMethod,
                material: type === TransactionType.Expense ? material : undefined,
            },
        });

        // Reset form
        setAmount('');
        setDescription('');
        setMaterial('');
        setType(TransactionType.Income);
        setPaymentMethod(PaymentMethod.Pagomovil);
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Registrar Movimiento</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Tipo de Movimiento</label>
                    <div className="mt-1 grid grid-cols-2 gap-2">
                        <button type="button" onClick={() => setType(TransactionType.Income)} className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${type === TransactionType.Income ? 'bg-green-500 text-white shadow' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>Ingreso</button>
                        <button type="button" onClick={() => setType(TransactionType.Expense)} className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${type === TransactionType.Expense ? 'bg-red-500 text-white shadow' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>Egreso</button>
                    </div>
                </div>

                <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Monto</label>
                    <div className="mt-1 flex">
                        <input
                            id="amount"
                            type="number"
                            step="0.01"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full border-gray-300 rounded-l-lg focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="0.00"
                            required
                        />
                         <button type="button" onClick={() => setIsUsd(true)} className={`px-3 py-2 text-sm transition ${isUsd ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}>$</button>
                         <button type="button" onClick={() => setIsUsd(false)} className={`px-3 py-2 text-sm transition rounded-r-lg ${!isUsd ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}>Bs</button>
                    </div>
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción</label>
                    <input
                        id="description"
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Método de Pago</label>
                    <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)} className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2">
                        {Object.values(PaymentMethod).map(method => (
                            <option key={method} value={method}>{method}</option>
                        ))}
                    </select>
                </div>

                {type === TransactionType.Expense && (
                    <div>
                        <label htmlFor="material" className="block text-sm font-medium text-gray-700">Material Comprado (Opcional)</label>
                        <input
                            id="material"
                            type="text"
                            value={material}
                            onChange={(e) => setMaterial(e.target.value)}
                            placeholder="Ej: Hilo rojo, dijes de corazón"
                            className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                        />
                    </div>
                )}
                
                <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition">
                    Añadir Movimiento
                </button>
            </form>
        </div>
    );
};
