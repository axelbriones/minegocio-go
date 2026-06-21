import { useEffect, useState } from 'react';
import { pollData } from '../services/api';

export default function Dashboard() {
  const [data, setData] = useState({ products: [], sales: [], purchases: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Start polling data from the real backend
    const unsubscribe = pollData((newData) => {
        setData(newData);
        setLoading(false);
    });

    return () => {
        // cleanup interval when unmounting
        unsubscribe.then(cleanup => cleanup());
    };
  }, []);

  if (loading) return <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>Cargando datos desde el backend...</div>;

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ color: '#00A859' }}>MI NEGOCIO GO - Web Dashboard</h1>
      <p style={{ color: '#6b7280' }}>Visualizando datos sincronizados en tiempo real desde el Backend.</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '2rem' }}>

        <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '1rem' }}>
            <h2 style={{ color: '#2563EB' }}>Ventas Recientes ({data.sales.length})</h2>
            {data.sales.length === 0 ? <p>No hay ventas sincronizadas aún.</p> : (
                <ul style={{ paddingLeft: '1.5rem' }}>
                    {data.sales.slice(0, 5).map((s: any) => (
                        <li key={s.id}>
                            <strong>Total:</strong> ${s.total} - <strong>Método:</strong> {s.paymentType}
                            <br/><small style={{ color: '#6b7280' }}>Actualizado: {new Date(s.updatedAt).toLocaleString()}</small>
                        </li>
                    ))}
                </ul>
            )}
        </div>

        <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '1rem' }}>
            <h2 style={{ color: '#2563EB' }}>Productos en Inventario ({data.products.length})</h2>
            {data.products.length === 0 ? <p>No hay productos sincronizados aún.</p> : (
                <ul style={{ paddingLeft: '1.5rem' }}>
                    {data.products.slice(0, 5).map((p: any) => (
                        <li key={p.id}>
                            {p.name} - <strong>Stock:</strong> {p.stock}
                        </li>
                    ))}
                </ul>
            )}
        </div>

      </div>
    </div>
  );
}
