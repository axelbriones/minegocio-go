import { DollarSign, Package, ShoppingCart, TrendingUp } from 'lucide-react';

const stats = [
  { name: 'Ventas de hoy', value: '$450.00', icon: DollarSign, change: '+12%', changeType: 'positive' },
  { name: 'Productos en Stock', value: '245', icon: Package, change: '-2%', changeType: 'negative' },
  { name: 'Nuevos Clientes', value: '12', icon: ShoppingCart, change: '+4.5%', changeType: 'positive' },
  { name: 'Ganancias', value: '$120.00', icon: TrendingUp, change: '+18%', changeType: 'positive' },
];

const recentSales = [
  { id: 1, product: 'Coca Cola 3L', amount: '$15.00', date: 'Hace 5 min', status: 'Completado' },
  { id: 2, product: 'Pan Bimbo Blanco', amount: '$4.50', date: 'Hace 15 min', status: 'Completado' },
  { id: 3, product: 'Leche Alpura 1L', amount: '$24.00', date: 'Hace 1 hora', status: 'Completado' },
  { id: 4, product: 'Huevos San Juan', amount: '$45.00', date: 'Hace 2 horas', status: 'Completado' },
  { id: 5, product: 'Galletas Oreo', amount: '$18.00', date: 'Hace 3 horas', status: 'Completado' },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-migo-text">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.name}
            className="bg-white overflow-hidden shadow-sm rounded-xl"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <item.icon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-migo-text-muted truncate">
                      {item.name}
                    </dt>
                    <dd>
                      <div className="text-2xl font-semibold text-migo-text">
                        {item.value}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <span
                  className={`font-medium ${
                    item.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {item.change}
                </span>{' '}
                <span className="text-migo-text-muted">vs semana pasada</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Sales Table */}
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-migo-text">Ventas Recientes</h2>
          <button className="text-sm font-medium text-migo-blue hover:text-blue-700">
            Ver todas
          </button>
        </div>
        <div className="mt-4 flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow-sm overflow-hidden border-b border-gray-200 sm:rounded-xl bg-white">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-migo-text-muted uppercase tracking-wider"
                      >
                        Producto
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-migo-text-muted uppercase tracking-wider"
                      >
                        Monto
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-migo-text-muted uppercase tracking-wider"
                      >
                        Fecha
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-migo-text-muted uppercase tracking-wider"
                      >
                        Estado
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentSales.map((sale) => (
                      <tr key={sale.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-migo-text">
                          {sale.product}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-migo-text">
                          {sale.amount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-migo-text-muted">
                          {sale.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {sale.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
