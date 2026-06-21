'use client';

import { DollarSign, Package, AlertTriangle, ArrowRightLeft } from 'lucide-react';
import { useApi } from '@/hooks/useApi';
import { getDashboardStats } from '@/services/endpoints';
import { Skeleton, ErrorState } from '@/components/ui/States';

export default function Dashboard() {
  const { data: stats, loading, error, refetch } = useApi(getDashboardStats);

  if (error) {
    return <ErrorState message={error.message} onRetry={refetch} />;
  }

  const formatCurrency = (val: number | undefined) =>
    val !== undefined ? `$${val.toFixed(2)}` : '...';

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-migo-text">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Products */}
        <div className="bg-white overflow-hidden shadow-sm rounded-xl">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Package className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-migo-text-muted truncate">
                    Total Productos
                  </dt>
                  <dd>
                    {loading ? <Skeleton className="h-8 w-20 mt-1" /> : (
                      <div className="text-2xl font-semibold text-migo-text">
                        {stats?.totalProducts || 0}
                      </div>
                    )}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Low Stock */}
        <div className="bg-white overflow-hidden shadow-sm rounded-xl">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <AlertTriangle className={`h-6 w-6 ${stats?.lowStockProducts ? 'text-yellow-500' : 'text-gray-400'}`} />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-migo-text-muted truncate">
                    Stock Bajo
                  </dt>
                  <dd>
                    {loading ? <Skeleton className="h-8 w-20 mt-1" /> : (
                      <div className={`text-2xl font-semibold ${stats?.lowStockProducts ? 'text-yellow-600' : 'text-migo-text'}`}>
                        {stats?.lowStockProducts || 0}
                      </div>
                    )}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Out of Stock */}
        <div className="bg-white overflow-hidden shadow-sm rounded-xl">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Package className={`h-6 w-6 ${stats?.outOfStockProducts ? 'text-red-500' : 'text-gray-400'}`} />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-migo-text-muted truncate">
                    Agotados
                  </dt>
                  <dd>
                    {loading ? <Skeleton className="h-8 w-20 mt-1" /> : (
                      <div className={`text-2xl font-semibold ${stats?.outOfStockProducts ? 'text-red-600' : 'text-migo-text'}`}>
                        {stats?.outOfStockProducts || 0}
                      </div>
                    )}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Inventory Value */}
        <div className="bg-white overflow-hidden shadow-sm rounded-xl">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <DollarSign className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-migo-text-muted truncate">
                    Valor Inventario
                  </dt>
                  <dd>
                    {loading ? <Skeleton className="h-8 w-24 mt-1" /> : (
                      <div className="text-2xl font-semibold text-migo-text">
                        {formatCurrency(stats?.inventoryValue)}
                      </div>
                    )}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Movements Summary */}
      <div className="bg-white shadow-sm rounded-xl p-6">
        <h2 className="text-lg font-medium text-migo-text mb-4 flex items-center">
          <ArrowRightLeft className="h-5 w-5 mr-2 text-migo-blue" />
          Resumen de Movimientos
        </h2>

        {loading ? (
           <div className="grid grid-cols-3 gap-4">
              <Skeleton className="h-20" />
              <Skeleton className="h-20" />
              <Skeleton className="h-20" />
           </div>
        ) : (
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-migo-text-muted">Total Movimientos</p>
              <p className="text-xl font-bold text-migo-text">{stats?.totalMovements || 0}</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-green-600">Entradas</p>
              <p className="text-xl font-bold text-green-700">{stats?.inputs || 0}</p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg">
              <p className="text-sm text-red-600">Salidas</p>
              <p className="text-xl font-bold text-red-700">{stats?.outputs || 0}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
