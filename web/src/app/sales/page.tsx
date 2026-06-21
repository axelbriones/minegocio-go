import { Search, Download, Calendar } from 'lucide-react';

const salesHistory = [
  { id: 'V-1045', date: '2023-10-27 14:30', items: 3, total: '$24.50', paymentMethod: 'Efectivo', status: 'Completado' },
  { id: 'V-1044', date: '2023-10-27 13:15', items: 1, total: '$3.00', paymentMethod: 'Tarjeta', status: 'Completado' },
  { id: 'V-1043', date: '2023-10-27 11:45', items: 5, total: '$45.00', paymentMethod: 'Efectivo', status: 'Completado' },
  { id: 'V-1042', date: '2023-10-27 10:20', items: 2, total: '$12.00', paymentMethod: 'Transferencia', status: 'Completado' },
  { id: 'V-1041', date: '2023-10-26 18:30', items: 8, total: '$85.00', paymentMethod: 'Tarjeta', status: 'Completado' },
  { id: 'V-1040', date: '2023-10-26 16:10', items: 1, total: '$1.50', paymentMethod: 'Efectivo', status: 'Completado' },
];

export default function Sales() {
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
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-migo-blue focus:border-migo-blue sm:text-sm"
              placeholder="Buscar por recibo..."
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
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-migo-text-muted uppercase tracking-wider">
                  Recibo
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-migo-text-muted uppercase tracking-wider">
                  Fecha
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-migo-text-muted uppercase tracking-wider">
                  Artículos
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-migo-text-muted uppercase tracking-wider">
                  Total
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-migo-text-muted uppercase tracking-wider">
                  Método
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-migo-text-muted uppercase tracking-wider">
                  Estado
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Detalles</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {salesHistory.map((sale) => (
                <tr key={sale.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-migo-blue">
                    {sale.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-migo-text-muted">
                    {sale.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-migo-text">
                    {sale.items}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-migo-text">
                    {sale.total}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-migo-text-muted">
                    {sale.paymentMethod}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {sale.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-migo-text-muted hover:text-migo-text">Ver detalle</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
