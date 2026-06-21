'use client';

import { useApi } from '@/hooks/useApi';
import { getMovements, createMovement, getProducts } from '@/services/endpoints';
import { Skeleton, ErrorState, EmptyState } from '@/components/ui/States';
import { Modal } from '@/components/ui/Modal';
import { ArrowRightLeft, ArrowDownCircle, ArrowUpCircle, Plus } from 'lucide-react';
import { useState } from 'react';
import type { Movement } from '@/types/api';

export default function Movements() {
  const { data: movements, loading, error, refetch } = useApi(getMovements);
  const { data: products } = useApi(getProducts); // needed for the product dropdown

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<Partial<Movement>>({
    type: 'IN',
    quantity: 1,
  });

  if (error) {
    return <ErrorState message={error.message} onRetry={refetch} />;
  }

  const renderIcon = (type: string) => {
    switch (type) {
      case 'IN': return <ArrowDownCircle className="h-5 w-5 text-green-500" />;
      case 'OUT': return <ArrowUpCircle className="h-5 w-5 text-red-500" />;
      default: return <ArrowRightLeft className="h-5 w-5 text-gray-500" />;
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await createMovement(formData as Omit<Movement, 'id' | 'productName' | 'date'>);
      setIsModalOpen(false);
      refetch();
    } catch {
      alert('Error registrando movimiento');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <h1 className="text-3xl font-bold text-migo-text">Movimientos de Inventario</h1>
        <button
          onClick={() => { setFormData({ type: 'IN', quantity: 1 }); setIsModalOpen(true); }}
          className="flex items-center px-4 py-2 bg-migo-green text-white rounded-xl hover:bg-green-700 transition-colors font-medium"
        >
          <Plus className="h-5 w-5 mr-2" />
          Registrar Movimiento
        </button>
      </div>

      <div className="bg-white shadow-sm rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
           {loading ? (
             <div className="p-4 space-y-4">
                {[1,2,3,4,5].map(i => <Skeleton key={i} className="h-12 w-full" />)}
             </div>
           ) : !movements || movements.length === 0 ? (
             <EmptyState title="No hay movimientos" description="No se han registrado entradas o salidas de productos aún." />
           ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-migo-text-muted uppercase tracking-wider">Tipo</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-migo-text-muted uppercase tracking-wider">Fecha</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-migo-text-muted uppercase tracking-wider">Producto</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-migo-text-muted uppercase tracking-wider">Cantidad</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-migo-text-muted uppercase tracking-wider">Motivo</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {movements.map((mov) => (
                  <tr key={mov.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center space-x-2">
                        {renderIcon(mov.type)}
                        <span className={`font-medium ${mov.type === 'IN' ? 'text-green-700' : mov.type === 'OUT' ? 'text-red-700' : 'text-gray-700'}`}>
                          {mov.type === 'IN' ? 'Entrada' : mov.type === 'OUT' ? 'Salida' : 'Ajuste'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-migo-text-muted">
                      {new Date(mov.date).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-migo-text">
                      {mov.productName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-migo-text">
                      {mov.type === 'OUT' ? '-' : '+'}{mov.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-migo-text-muted">
                      {mov.reason || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
           )}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Registrar Movimiento">
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Tipo de Movimiento</label>
            <select name="type" value={formData.type || 'IN'} onChange={handleFormChange} className="mt-1 block w-full border rounded-md p-2">
              <option value="IN">Entrada (+)</option>
              <option value="OUT">Salida (-)</option>
              <option value="ADJUST">Ajuste / Merma</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Producto</label>
            <select required name="productId" value={formData.productId || ''} onChange={handleFormChange} className="mt-1 block w-full border rounded-md p-2">
              <option value="">Seleccione un producto</option>
              {products?.map(p => (
                <option key={p.id} value={p.id}>{p.name} (Stock: {p.stock})</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Cantidad</label>
            <input required type="number" min="1" name="quantity" value={formData.quantity || 1} onChange={handleFormChange} className="mt-1 block w-full border rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Motivo / Notas (Opcional)</label>
            <textarea name="reason" value={formData.reason || ''} onChange={handleFormChange} className="mt-1 block w-full border rounded-md p-2" rows={3}></textarea>
          </div>
          <button disabled={saving} type="submit" className="w-full bg-migo-green text-white rounded-lg p-2 font-medium hover:bg-green-700 mt-4">
            {saving ? 'Registrando...' : 'Registrar Movimiento'}
          </button>
        </form>
      </Modal>
    </div>
  );
}
