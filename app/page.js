'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [distritos, setDistritos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Hacemos un fetch a la ruta estática de nuestros datos
    fetch('/data/resultados_reales.json')
      .then(res => res.json())
      .then(data => {
        const listaDistritos = Object.keys(data).sort();
        setDistritos(listaDistritos);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Error cargando los datos:", error);
        setIsLoading(false);
      });
  }, []);

  return (
    <main className="p-8 bg-slate-50 min-h-screen">
       <header className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4 text-slate-900">⏱️ PRE</h1>
        <h2 className="text-3xl font-semibold text-slate-700">Proyección de Resultados Electorales</h2>
        <p className="text-lg text-slate-600 mt-4 max-w-3xl mx-auto">
          Selecciona un distrito para ver el análisis histórico de mesas testigo.
        </p>
      </header>

      <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
        <h3 className="text-2xl font-bold mb-4 text-center text-slate-800">Distritos Disponibles</h3>
        {isLoading ? (
          <p className="text-center">Cargando distritos...</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {distritos.map(distrito => (
              <Link 
                key={distrito} 
                href={`/distrito/${encodeURIComponent(distrito)}`} 
                className="p-4 bg-slate-100 rounded text-center font-semibold hover:bg-blue-600 hover:text-white transition-colors duration-200"
              >
                {distrito}
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}