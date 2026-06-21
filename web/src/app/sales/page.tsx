'use client';

import { Search, Download, Calendar, Eye, FileText } from 'lucide-react';
import { useApi } from '@/hooks/useApi';
import { getSales } from '@/services/endpoints';
import { Skeleton, ErrorState, EmptyState } from '@/components/ui/States';
import { Modal } from '@/components/ui/Modal';
import { useState } from 'react';
import type { Sale } from '@/types/api';

export default function Sales() {
  const { data: salesHistory, loading, error, refetch } = useApi(getSales);
  const [searchTerm, setSearchTerm] = useState('');

  const [selectedSale, setSelectedSale] = useState<Sale | null>(null);

  if (error) {
    return <ErrorState message={error.message} onRetry={refetch} />;
  }

  const filteredSales = salesHistory?.filter(sale =>
    sale.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (sale.customerName && sale.customerName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <h1 className="text-3xl font-bold text-migo-text">Historial de Ventas</h1>
        <button className="flex items-center px-4 py-2 border border-gray-300 rounded-xl text-migo-text bg-white hover:bg-gray-50 transition-colors font-medium">
          <Download className="h-4 w-4 mr-2" />
          Exportar
        </button>
      </div>

      <div className="bg-white shadow-sm rounded-xl overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
          <div className="relative w-full sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-migo-blue focus:border-migo-blue sm:text-sm"
              placeholder="Buscar por recibo o cliente..."
            />
          </div>
          <div className="flex space-x-2 w-full sm:w-auto">
             <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-migo-text bg-white hover:bg-gray-50">
               <Calendar className="h-4 w-4 mr-2 text-gray-500"/>
               Últimos 7 días
             </button>
          </div>
        </div>

        <div className="overflow-x-auto">
           {loading ? (
             <div className="p-4 space-y-4">
                {[1,2,3,4,5].map(i => <Skeleton key={i} className="h-12 w-full" />)}
             </div>
           ) : !filteredSales || filteredSales.length === 0 ? (
             <EmptyState title="No hay ventas registradas" description="Intenta cambiar los filtros o realizar una nueva venta." />
           ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-migo-text-muted uppercase tracking-wider">Recibo</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-migo-text-muted uppercase tracking-wider">Fecha</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-migo-text-muted uppercase tracking-wider">Cliente</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-migo-text-muted uppercase tracking-wider">Artículos</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-migo-text-muted uppercase tracking-wider">Total</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-migo-text-muted uppercase tracking-wider">Método</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-migo-text-muted uppercase tracking-wider">Estado</th>
                  <th scope="col" className="relative px-6 py-3"><span className="sr-only">Detalles</span></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSales.map((sale) => (
                  <tr key={sale.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-migo-blue">
                      {sale.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-migo-text-muted">
                      {new Date(sale.date).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-migo-text">
                      {sale.customerName || 'Consumidor Final'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-migo-text">
                      {sale.items.reduce((acc, item) => acc + item.quantity, 0)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-migo-text">
                      ${sale.total.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-migo-text-muted">
                      {sale.paymentMethod}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${sale.status === 'COMPLETED' ? 'bg-green-100 text-green-800' : sale.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                        {sale.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button onClick={() => setSelectedSale(sale)} className="text-gray-400 hover:text-migo-blue" title="Ver detalle"><Eye className="h-5 w-5 inline" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
           )}
        </div>
      </div>

      <Modal isOpen={!!selectedSale} onClose={() => setSelectedSale(null)} title="Detalle de Venta">
        {selectedSale && (
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b pb-4">
              <div>
                <p className="text-sm text-gray-500">Recibo</p>
                <p className="text-lg font-bold text-migo-blue">{selectedSale.id}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Fecha</p>
                <p className="font-medium">{new Date(selectedSale.date).toLocaleString()}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Cliente</p>
                <p className="font-medium mt-1">{selectedSale.customerName || 'Consumidor Final'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Método de Pago</p>
                <p className="font-medium mt-1">{selectedSale.paymentMethod}</p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-gray-700 mb-2 border-b pb-1">Artículos</h3>
              <ul className="space-y-2">
                {selectedSale.items.map((item, idx) => (
                  <li key={idx} className="flex justify-between text-sm">
                    <span>{item.quantity}x {item.productName}</span>
                    <span className="font-medium">${item.total.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t pt-4 mt-4 flex justify-between items-center text-lg">
              <span className="font-bold text-gray-700">Total</span>
              <span className="font-bold text-migo-text">${selectedSale.total.toFixed(2)}</span>
            </div>

            <button className="w-full mt-6 flex justify-center items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-migo-text bg-white hover:bg-gray-50">
               <FileText className="h-4 w-4 mr-2" />
               Imprimir Recibo
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
}
