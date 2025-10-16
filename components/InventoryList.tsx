
import React from 'react';
import { useAppContext } from '../context/AppContext';

export const InventoryList: React.FC = () => {
    const { state } = useAppContext();
    const { inventory, bcvRate } = state;

    const sortedInventory = [...inventory].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
        <div className="bg-slate-100 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Inventario de Materiales (Inversiones)</h3>
            {sortedInventory.length > 0 ? (
                <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Material</th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Costo</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {sortedInventory.map(item => (
                                <tr key={item.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(item.date).toLocaleDateString('es-VE')}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-700">
                                        <div>${item.amountSpent.toFixed(2)}</div>
                                        <div className="text-xs text-gray-500">Bs. {(item.amountSpent * bcvRate).toFixed(2)}</div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="text-center py-10 px-6 bg-white rounded-lg">
                    <p className="text-gray-500">No hay materiales en el inventario.</p>
                    <p className="text-sm text-gray-400 mt-1">Registra un egreso con un material para verlo aquí.</p>
                </div>
            )}
        </div>
    );
};
