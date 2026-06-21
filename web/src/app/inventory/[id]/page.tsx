'use client';

import { useApi } from '@/hooks/useApi';
import { getProduct } from '@/services/endpoints';
import { Skeleton, ErrorState } from '@/components/ui/States';
import { useParams, useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { ArrowLeft, Package, Clock, Activity } from 'lucide-react';

export default function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const fetchProduct = useCallback(() => getProduct(id), [id]);
  const { data: product, loading, error, refetch } = useApi(fetchProduct);

  if (error) {
    return <ErrorState message={error.message} onRetry={refetch} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft className="h-6 w-6 text-migo-text" />
        </button>
        <h1 className="text-3xl font-bold text-migo-text">Detalle del Producto</h1>
      </div>

      {loading ? (
        <div className="bg-white shadow-sm rounded-xl p-6 space-y-4">
           <Skeleton className="h-8 w-1/3" />
           <Skeleton className="h-4 w-1/4" />
           <Skeleton className="h-32 w-full mt-4" />
        </div>
      ) : product ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

           <div className="col-span-1 md:col-span-2 bg-white shadow-sm rounded-xl p-6">
              <div className="flex items-center justify-between border-b pb-4 mb-4">
                 <div>
                    <h2 className="text-2xl font-bold text-migo-text">{product.name}</h2>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-2">
                       {product.category}
                    </span>
                 </div>
                 <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${product.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {product.status === 'active' ? 'Activo' : 'Inactivo'}
                 </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                 <div>
                    <p className="text-sm text-gray-500">Precio de Venta</p>
                    <p className="text-xl font-bold text-migo-text">${product.price.toFixed(2)}</p>
                 </div>
                 <div>
                    <p className="text-sm text-gray-500">Costo</p>
                    <p className="text-xl font-bold text-migo-text">${product.cost?.toFixed(2) || '0.00'}</p>
                 </div>
                 <div className="mt-4">
                    <p className="text-sm text-gray-500 flex items-center"><Package className="h-4 w-4 mr-1"/> Stock Actual</p>
                    <p className={`text-2xl font-bold ${product.stock <= product.minStock ? 'text-red-600' : 'text-green-600'}`}>
                       {product.stock}
                    </p>
                 </div>
                 <div className="mt-4">
                    <p className="text-sm text-gray-500 flex items-center"><Activity className="h-4 w-4 mr-1"/> Stock Mínimo</p>
                    <p className="text-xl font-bold text-migo-text">{product.minStock}</p>
                 </div>
              </div>
           </div>

           <div className="col-span-1 bg-white shadow-sm rounded-xl p-6">
              <h3 className="text-lg font-medium border-b pb-2 mb-4 flex items-center">
                <Clock className="h-5 w-5 mr-2 text-gray-400" /> Historial
              </h3>
              <div className="space-y-4">
                 <div>
                    <p className="text-sm text-gray-500">Última Modificación</p>
                    <p className="text-sm font-medium text-migo-text">{new Date(product.lastModified || new Date()).toLocaleString()}</p>
                 </div>
                 {/* Here we would map over product.history or fetch movements specific to this product */}
                 <div className="pt-4 mt-4 border-t text-sm text-gray-500 italic text-center">
                    El historial de movimientos detallado se muestra en la sección Movimientos.
                 </div>
              </div>
           </div>
        </div>
      ) : (
         <ErrorState message="Producto no encontrado" onRetry={refetch} />
      )}
    </div>
  );
}
