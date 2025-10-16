
import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { DollarIcon } from './Icons';

export const RateUpdater: React.FC = () => {
    const { state, dispatch } = useAppContext();
    const [rate, setRate] = useState(state.bcvRate.toString());

    useEffect(() => {
        setRate(state.bcvRate.toString());
    }, [state.bcvRate]);

    const handleUpdate = () => {
        const newRate = parseFloat(rate);
        if (!isNaN(newRate) && newRate > 0) {
            dispatch({ type: 'UPDATE_RATE', payload: newRate });
        } else {
            alert('Por favor, ingrese una tasa válida.');
        }
    };
    
    return (
        <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Actualizar Tasa del Dólar (BCV)</h3>
            <div className="flex items-center space-x-2">
                <div className="relative flex-grow">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <DollarIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="number"
                        step="0.01"
                        value={rate}
                        onChange={(e) => setRate(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                        placeholder="0.00"
                    />
                </div>
                <button
                    onClick={handleUpdate}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
                >
                    Actualizar
                </button>
            </div>
        </div>
    );
};
