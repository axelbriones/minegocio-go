'use client';

import { useApi } from '@/hooks/useApi';
import { getInventoryAIPredictions, getAISuggestions, getAIHistory, analyzeInventoryAI } from '@/services/endpoints';
import { Skeleton, ErrorState } from '@/components/ui/States';
import { Sparkles, TrendingUp, AlertCircle, ShoppingCart, History, Play } from 'lucide-react';
import { useState } from 'react';

export default function MigoIA() {
  const { data: prediction, loading: loadPred, error: errPred, refetch: refetchPred } = useApi(getInventoryAIPredictions);
  const { data: suggestions, loading: loadSugg, error: errSugg, refetch: refetchSugg } = useApi(getAISuggestions);
  const { data: history, loading: loadHist } = useApi(getAIHistory);

  const [analyzing, setAnalyzing] = useState(false);

  const handleManualAnalysis = async () => {
    setAnalyzing(true);
    try {
      await analyzeInventoryAI({ scope: 'full' });
      await Promise.all([refetchPred(), refetchSugg()]);
      alert('Análisis completado exitosamente.');
    } catch {
      alert('Error ejecutando análisis manual.');
    } finally {
      setAnalyzing(false);
    }
  };

  if (errPred || errSugg) {
    return <ErrorState message={(errPred || errSugg)?.message || 'Error'} onRetry={() => { refetchPred(); refetchSugg(); }} />;
  }

  const renderActionIcon = (action: string) => {
    switch (action) {
      case 'BUY': return <ShoppingCart className="h-5 w-5 text-blue-500" />;
      case 'SELL_FIRST': return <TrendingUp className="h-5 w-5 text-green-500" />;
      case 'DISCOUNT': return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      default: return <Sparkles className="h-5 w-5 text-purple-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-3">
          <Sparkles className="h-8 w-8 text-migo-green" />
          <h1 className="text-3xl font-bold text-migo-text">MIGO IA</h1>
        </div>
        <button
          onClick={handleManualAnalysis}
          disabled={analyzing}
          className="flex items-center px-4 py-2 bg-migo-blue text-white rounded-xl hover:bg-blue-700 transition-colors font-medium disabled:opacity-50"
        >
          {analyzing ? <Skeleton className="h-5 w-5 mr-2 rounded-full" /> : <Play className="h-5 w-5 mr-2" />}
          {analyzing ? 'Analizando...' : 'Ejecutar Análisis Manual'}
        </button>
      </div>
      <p className="text-migo-text-muted">Tu asistente inteligente para optimizar el inventario y las ventas.</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Analysis Overview */}
        <div className="col-span-1 lg:col-span-3 bg-gradient-to-r from-migo-green/10 to-migo-blue/10 border border-migo-green/20 rounded-xl p-6">
          <h2 className="text-xl font-bold text-migo-text mb-4 flex items-center">
            <Sparkles className="h-5 w-5 mr-2 text-migo-green" />
            Análisis de Inventario
          </h2>
          {loadPred ? <Skeleton className="h-16 w-full" /> : (
            <div>
              <p className="text-lg text-gray-800 italic">&quot;{prediction?.insight || 'Análisis no disponible.'}&quot;</p>
              <p className="text-sm mt-4 text-gray-500">Nivel de Confianza: <span className="font-bold">{prediction?.confidence || 0}%</span></p>
            </div>
          )}
        </div>

        {/* Suggestions */}
        <div className="col-span-1 lg:col-span-2">
          <h2 className="text-xl font-bold text-migo-text mb-4">Recomendaciones Activas</h2>
          {loadSugg ? (
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <Skeleton className="h-32" />
               <Skeleton className="h-32" />
             </div>
          ) : suggestions?.length ? (
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               {suggestions.map((sugg, idx) => (
                 <div key={idx} className="bg-white border border-gray-200 shadow-sm rounded-xl p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-2 mb-3">
                      {renderActionIcon(sugg.action)}
                      <span className="font-bold text-gray-700">{sugg.action.replace('_', ' ')}</span>
                    </div>
                    <h3 className="text-lg font-bold text-migo-text mb-2">{sugg.productName}</h3>
                    <p className="text-sm text-migo-text-muted">{sugg.reason}</p>
                 </div>
               ))}
             </div>
          ) : (
            <div className="p-8 text-center text-gray-500 bg-white rounded-xl border border-dashed">
              No hay recomendaciones pendientes. Todo se ve bien.
            </div>
          )}
        </div>

        {/* History */}
        <div className="col-span-1 bg-white shadow-sm rounded-xl p-6 border border-gray-200">
           <h2 className="text-xl font-bold text-migo-text mb-4 flex items-center">
             <History className="h-5 w-5 mr-2 text-gray-400" />
             Historial de Análisis
           </h2>
           {loadHist ? (
             <div className="space-y-3">
               <Skeleton className="h-12 w-full" />
               <Skeleton className="h-12 w-full" />
             </div>
           ) : history?.length ? (
             <div className="space-y-4">
               {history.slice(0, 5).map(item => (
                 <div key={item.id} className="border-b pb-3 last:border-0 last:pb-0">
                   <p className="text-sm font-medium text-migo-text truncate" title={item.query}>{item.query}</p>
                   <p className="text-xs text-migo-text-muted mt-1">{new Date(item.date).toLocaleString()}</p>
                 </div>
               ))}
             </div>
           ) : (
             <p className="text-sm text-gray-500">No hay historial disponible.</p>
           )}
        </div>

      </div>
    </div>
  );
}
