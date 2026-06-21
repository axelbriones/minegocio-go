'use client';

import { useApi } from '@/hooks/useApi';
import { getAlerts } from '@/services/endpoints';
import { Skeleton, ErrorState, EmptyState } from '@/components/ui/States';
import { AlertTriangle, Info, BellRing } from 'lucide-react';

export default function Alerts() {
  const { data: alerts, loading, error, refetch } = useApi(getAlerts);

  if (error) {
    return <ErrorState message={error.message} onRetry={refetch} />;
  }

  const renderIcon = (severity: string) => {
    switch (severity) {
      case 'high': return <AlertTriangle className="h-6 w-6 text-red-500" />;
      case 'medium': return <BellRing className="h-6 w-6 text-yellow-500" />;
      default: return <Info className="h-6 w-6 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-migo-text">Alertas</h1>
      </div>

      <div className="bg-white shadow-sm rounded-xl overflow-hidden p-4">
           {loading ? (
             <div className="space-y-4">
                {[1,2,3].map(i => <Skeleton key={i} className="h-20 w-full" />)}
             </div>
           ) : !alerts || alerts.length === 0 ? (
             <EmptyState title="Todo está bien" description="No tienes alertas pendientes en este momento." />
           ) : (
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div key={alert.id} className={`flex items-start p-4 border rounded-lg ${alert.severity === 'high' ? 'border-red-200 bg-red-50' : alert.severity === 'medium' ? 'border-yellow-200 bg-yellow-50' : 'border-blue-200 bg-blue-50'}`}>
                  <div className="flex-shrink-0 mt-1">
                    {renderIcon(alert.severity)}
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className={`text-lg font-medium ${alert.severity === 'high' ? 'text-red-800' : alert.severity === 'medium' ? 'text-yellow-800' : 'text-blue-800'}`}>
                      {alert.type.replace(/_/g, ' ')}
                    </h3>
                    <p className={`mt-1 text-sm ${alert.severity === 'high' ? 'text-red-600' : alert.severity === 'medium' ? 'text-yellow-600' : 'text-blue-600'}`}>
                      {alert.message}
                    </p>
                    <p className="mt-2 text-xs text-gray-500">
                      {new Date(alert.date).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
           )}
      </div>
    </div>
  );
}
