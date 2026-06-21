'use client';

import { useApi } from '@/hooks/useApi';
import { getCustomers, createCustomer, updateCustomer, deleteCustomer } from '@/services/endpoints';
import { Skeleton, ErrorState, EmptyState } from '@/components/ui/States';
import { Modal } from '@/components/ui/Modal';
import { Plus, Search, Trash2, Edit } from 'lucide-react';
import { useState } from 'react';
import type { Customer } from '@/types/api';

export default function Customers() {
  const { data: customers, loading, error, refetch } = useApi(getCustomers);
  const [searchTerm, setSearchTerm] = useState('');

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Customer>>({});
  const [saving, setSaving] = useState(false);

  if (error) {
    return <ErrorState message={error.message} onRetry={refetch} />;
  }

  const handleDelete = async (id: string) => {
    if (confirm('¿Estás seguro de eliminar este cliente?')) {
      try {
        await deleteCustomer(id);
        refetch();
      } catch {
        alert('Error eliminando cliente');
      }
    }
  };

  const openCreateModal = () => {
    setEditingId(null);
    setFormData({ name: '', email: '', phone: '' });
    setIsModalOpen(true);
  };

  const openEditModal = (customer: Customer) => {
    setEditingId(customer.id);
    setFormData(customer);
    setIsModalOpen(true);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingId) {
        await updateCustomer(editingId, formData);
      } else {
        await createCustomer(formData as Omit<Customer, 'id' | 'totalPurchases'>);
      }
      setIsModalOpen(false);
      refetch();
    } catch {
      alert('Error guardando cliente');
    } finally {
      setSaving(false);
    }
  };

  const filteredCustomers = customers?.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <h1 className="text-3xl font-bold text-migo-text">Clientes</h1>
        <button onClick={openCreateModal} className="flex items-center px-4 py-2 bg-migo-green text-white rounded-xl hover:bg-green-700 transition-colors font-medium">
          <Plus className="h-5 w-5 mr-2" />
          Nuevo Cliente
        </button>
      </div>

      <div className="bg-white shadow-sm rounded-xl overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="relative w-full sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-migo-blue focus:border-migo-blue sm:text-sm"
              placeholder="Buscar cliente..."
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
             <div className="p-4 space-y-4">
                {[1,2,3].map(i => <Skeleton key={i} className="h-12 w-full" />)}
             </div>
          ) : !filteredCustomers || filteredCustomers.length === 0 ? (
             <EmptyState title="No hay clientes" description="No se encontraron clientes que coincidan con la búsqueda." />
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-migo-text-muted uppercase tracking-wider">Nombre</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-migo-text-muted uppercase tracking-wider">Email</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-migo-text-muted uppercase tracking-wider">Teléfono</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-migo-text-muted uppercase tracking-wider">Total Compras</th>
                  <th scope="col" className="relative px-6 py-3"><span className="sr-only">Acciones</span></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCustomers.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-migo-text">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-migo-text-muted">
                      {item.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-migo-text">
                      {item.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-migo-text">
                      ${item.totalPurchases?.toFixed(2) || '0.00'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingId ? 'Editar Cliente' : 'Nuevo Cliente'}>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre</label>
            <input required type="text" name="name" value={formData.name || ''} onChange={handleFormChange} className="mt-1 block w-full border rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input required type="email" name="email" value={formData.email || ''} onChange={handleFormChange} className="mt-1 block w-full border rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Teléfono</label>
            <input required type="tel" name="phone" value={formData.phone || ''} onChange={handleFormChange} className="mt-1 block w-full border rounded-md p-2" />
          </div>
          <button disabled={saving} type="submit" className="w-full bg-migo-green text-white rounded-lg p-2 font-medium hover:bg-green-700">
            {saving ? 'Guardando...' : 'Guardar'}
          </button>
        </form>
      </Modal>
    </div>
  );
}
