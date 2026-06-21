import { Plus, Search, AlertTriangle } from 'lucide-react';

const inventory = [
  { id: 1, name: 'Coca Cola 3L', category: 'Bebidas', stock: 15, price: '$3.00', status: 'normal' },
  { id: 2, name: 'Leche Deslactosada 1L', category: 'Lácteos', stock: 2, price: '$1.50', status: 'low' },
  { id: 3, name: 'Pan Integral', category: 'Panadería', stock: 8, price: '$2.00', status: 'normal' },
  { id: 4, name: 'Huevos (Docena)', category: 'Despensa', stock: 1, price: '$2.50', status: 'low' },
  { id: 5, name: 'Atún en Agua', category: 'Enlatados', stock: 24, price: '$1.20', status: 'normal' },
];

export default function Inventory() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <h1 className="text-3xl font-bold text-migo-text">Inventario</h1>
        <button className="flex items-center px-4 py-2 bg-migo-green text-white rounded-xl hover:bg-green-700 transition-colors font-medium">
          <Plus className="h-5 w-5 mr-2" />
          Nuevo Producto
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
              placeholder="Buscar producto..."
            />
          </div>
          <div className="flex space-x-2 w-full sm:w-auto">
             <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-migo-text bg-white hover:bg-gray-50">
               Filtros
             </button>
             <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-migo-text bg-white hover:bg-gray-50">
               Bajo Stock
             </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-migo-text-muted uppercase tracking-wider">
                  Producto
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-migo-text-muted uppercase tracking-wider">
                  Categoría
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-migo-text-muted uppercase tracking-wider">
                  Stock
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-migo-text-muted uppercase tracking-wider">
                  Precio
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Acciones</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {inventory.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-migo-text">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-migo-text-muted">
                    {item.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-migo-text">
                    <div className="flex items-center">
                      {item.stock}
                      {item.status === 'low' && (
                        <AlertTriangle className="h-4 w-4 text-migo-red ml-2" />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-migo-text">
                    {item.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-migo-blue hover:text-blue-700">Editar</button>
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
