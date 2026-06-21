'use client';

import { useApi } from '@/hooks/useApi';
import { getProducts, deleteProduct, createProduct, updateProduct } from '@/services/endpoints';
import { Skeleton, ErrorState, EmptyState } from '@/components/ui/States';
import { Modal } from '@/components/ui/Modal';
import { Plus, Search, AlertTriangle, Eye, Trash2, Edit } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import type { Product, CreateProductInput } from '@/types/api';

export default function Inventory() {
  const { data: products, loading, error, refetch } = useApi(getProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'ALL' | 'LOW_STOCK'>('ALL');

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<CreateProductInput>>({});
  const [saving, setSaving] = useState(false);

  if (error) {
    return <ErrorState message={error.message} onRetry={refetch} />;
  }

  const handleDelete = async (id: string) => {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      try {
        await deleteProduct(id);
        refetch();
      } catch {
        alert('Error eliminando producto');
      }
    }
  };

  const openCreateModal = () => {
    setEditingId(null);
    setFormData({ name: '', category: '', price: 0, cost: 0, stock: 0, minStock: 0, status: 'active' });
    setIsModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditingId(product.id);
    setFormData(product);
    setIsModalOpen(true);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
      if (editingId) {
        await updateProduct(editingId, formData);
      } else {
        await createProduct(formData as CreateProductInput);
      }
      setIsModalOpen(false);
      refetch();
    } catch {
      alert('Error guardando producto');
    } finally {
      setSaving(false);
    }
  };

  const filteredProducts = products?.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'LOW_STOCK' ? p.stock <= p.minStock : true;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <h1 className="text-3xl font-bold text-migo-text">Inventario</h1>
        <button onClick={openCreateModal} className="flex items-center px-4 py-2 bg-migo-green text-white rounded-xl hover:bg-green-700 transition-colors font-medium">
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-migo-blue focus:border-migo-blue sm:text-sm"
              placeholder="Buscar producto..."
            />
          </div>
          <div className="flex space-x-2 w-full sm:w-auto">
             <button
                onClick={() => setFilter('ALL')}
                className={`px-4 py-2 border rounded-lg text-sm font-medium ${filter === 'ALL' ? 'bg-gray-100 border-gray-400 text-gray-800' : 'border-gray-300 text-migo-text bg-white hover:bg-gray-50'}`}>
               Todos
             </button>
             <button
                onClick={() => setFilter('LOW_STOCK')}
                className={`px-4 py-2 border rounded-lg text-sm font-medium ${filter === 'LOW_STOCK' ? 'bg-yellow-50 border-yellow-400 text-yellow-800' : 'border-gray-300 text-migo-text bg-white hover:bg-gray-50'}`}>
               Bajo Stock
             </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
             <div className="p-4 space-y-4">
                {[1,2,3,4,5].map(i => <Skeleton key={i} className="h-12 w-full" />)}
             </div>
          ) : !filteredProducts || filteredProducts.length === 0 ? (
             <EmptyState title="No hay productos" description="No se encontraron productos con los filtros actuales." />
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-migo-text-muted uppercase tracking-wider">Producto</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-migo-text-muted uppercase tracking-wider">Categoría</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-migo-text-muted uppercase tracking-wider">Stock</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-migo-text-muted uppercase tracking-wider">Precio</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-migo-text-muted uppercase tracking-wider">Estado</th>
                  <th scope="col" className="relative px-6 py-3"><span className="sr-only">Acciones</span></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-migo-text">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-migo-text-muted">
                      {item.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-migo-text">
                      <div className="flex items-center">
                        <span className={item.stock <= item.minStock ? 'text-red-600 font-bold' : ''}>{item.stock}</span>
                        {item.stock <= item.minStock && (
                          <AlertTriangle className="h-4 w-4 text-migo-red ml-2" />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-migo-text">
                      ${item.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                       <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                         {item.status === 'active' ? 'Activo' : 'Inactivo'}
                       </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                      <Link href={`/inventory/${item.id}`} className="text-gray-400 hover:text-migo-blue" title="Ver detalle"><Eye className="h-5 w-5 inline" /></Link>
                      <button onClick={() => openEditModal(item)} className="text-gray-400 hover:text-migo-blue" title="Editar"><Edit className="h-5 w-5 inline" /></button>
                      <button onClick={() => handleDelete(item.id)} className="text-gray-400 hover:text-red-600" title="Eliminar"><Trash2 className="h-5 w-5 inline" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingId ? 'Editar Producto' : 'Nuevo Producto'}>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre</label>
            <input required type="text" name="name" value={formData.name || ''} onChange={handleFormChange} className="mt-1 block w-full border rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Categoría</label>
            <input required type="text" name="category" value={formData.category || ''} onChange={handleFormChange} className="mt-1 block w-full border rounded-md p-2" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Precio</label>
              <input required type="number" step="0.01" name="price" value={formData.price || 0} onChange={handleFormChange} className="mt-1 block w-full border rounded-md p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Costo</label>
              <input required type="number" step="0.01" name="cost" value={formData.cost || 0} onChange={handleFormChange} className="mt-1 block w-full border rounded-md p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Stock</label>
              <input required type="number" name="stock" value={formData.stock || 0} onChange={handleFormChange} className="mt-1 block w-full border rounded-md p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Stock Mínimo</label>
              <input required type="number" name="minStock" value={formData.minStock || 0} onChange={handleFormChange} className="mt-1 block w-full border rounded-md p-2" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Estado</label>
            <select name="status" value={formData.status || 'active'} onChange={handleFormChange} className="mt-1 block w-full border rounded-md p-2">
              <option value="active">Activo</option>
              <option value="inactive">Inactivo</option>
            </select>
          </div>
          <button disabled={saving} type="submit" className="w-full bg-migo-green text-white rounded-lg p-2 font-medium hover:bg-green-700">
            {saving ? 'Guardando...' : 'Guardar'}
          </button>
        </form>
      </Modal>
    </div>
  );
}
