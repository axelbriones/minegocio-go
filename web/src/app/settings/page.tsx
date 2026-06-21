'use client';

import { useApi } from '@/hooks/useApi';
import { getConfig, updateConfig } from '@/services/endpoints';
import { Skeleton, ErrorState } from '@/components/ui/States';
import { Save } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { Config } from '@/types/api';

export default function Settings() {
  const { data: config, loading, error, refetch } = useApi(getConfig);
  const [formData, setFormData] = useState<Partial<Config>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (config) {
      setTimeout(() => setFormData(config), 0);
    }
  }, [config]);

  if (error) {
    return <ErrorState message={error.message} onRetry={refetch} />;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateConfig(formData);
      alert('Configuración guardada correctamente.');
      refetch();
    } catch {
      alert('Error guardando la configuración.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-migo-text">Configuración</h1>
      </div>

      <div className="bg-white shadow-sm rounded-xl p-6">
         {loading ? (
           <div className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
           </div>
         ) : (
           <form onSubmit={handleSubmit} className="space-y-6">

             <div>
               <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">Nombre de la Empresa</label>
               <input
                 type="text"
                 name="companyName"
                 id="companyName"
                 value={formData.companyName || ''}
                 onChange={handleChange}
                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-migo-green focus:border-migo-green sm:text-sm"
               />
             </div>

             <div>
               <label htmlFor="branch" className="block text-sm font-medium text-gray-700">Sucursal</label>
               <input
                 type="text"
                 name="branch"
                 id="branch"
                 value={formData.branch || ''}
                 onChange={handleChange}
                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-migo-green focus:border-migo-green sm:text-sm"
               />
             </div>

             <div>
               <label htmlFor="currency" className="block text-sm font-medium text-gray-700">Moneda</label>
               <select
                 name="currency"
                 id="currency"
                 value={formData.currency || 'USD'}
                 onChange={handleChange}
                 className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-migo-green focus:border-migo-green sm:text-sm"
               >
                 <option value="USD">USD ($)</option>
                 <option value="EUR">EUR (€)</option>
                 <option value="MXN">MXN ($)</option>
               </select>
             </div>

             <div>
               <label htmlFor="theme" className="block text-sm font-medium text-gray-700">Tema</label>
               <select
                 name="theme"
                 id="theme"
                 value={formData.theme || 'system'}
                 onChange={handleChange}
                 className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-migo-green focus:border-migo-green sm:text-sm"
               >
                 <option value="light">Claro</option>
                 <option value="dark">Oscuro</option>
                 <option value="system">Sistema</option>
               </select>
             </div>

             <div className="pt-4">
               <button
                 type="submit"
                 disabled={saving}
                 className="flex justify-center items-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-migo-green hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-migo-green"
               >
                 {saving ? 'Guardando...' : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Guardar Cambios
                    </>
                 )}
               </button>
             </div>
           </form>
         )}
      </div>
    </div>
  );
}
