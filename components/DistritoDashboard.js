'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import BarChart from '@/components/BarChart';

export default function DistritoDashboard({ datosIniciales, distrito }) {
    const [añoSeleccionado, setAñoSeleccionado] = useState('2023');
    const añosDisponibles = ['2023', '2021', '2019', '2017', '2015', '2013', '2011'];
    const { datos, colores } = datosIniciales;

    const calcularPorcentajes = (datosVotos) => {
        if (!datosVotos) return {};
        const totalVotos = Object.values(datosVotos).reduce((sum, val) => sum + val, 0);
        if (totalVotos === 0) return {};
        const porcentajes = {};
        for (const partido in datosVotos) {
            porcentajes[partido] = (datosVotos[partido] / totalVotos) * 100;
        }
        return porcentajes;
    };

    const datosProcesados = useMemo(() => {
        if (!datos) return null;

        // --- CORRECCIÓN CLAVE AQUÍ ---
        // Verificamos que datos.real y datos.testigo existan antes de acceder a ellos.
        const datosRealesAño = (datos.real && datos.real[añoSeleccionado]) ? datos.real[añoSeleccionado] : {};
        const datosTestigoAño = (datos.testigo && datos.testigo[añoSeleccionado]) ? datos.testigo[añoSeleccionado] : {};

        const pctReales = calcularPorcentajes(datosRealesAño);
        const pctTestigo = calcularPorcentajes(datosTestigoAño);
        
        const todosLosPartidos = [...new Set([...Object.keys(pctReales), ...Object.keys(pctTestigo)])].sort();
        
        let errorAcumulado = 0;
        todosLosPartidos.forEach(partido => {
            errorAcumulado += Math.abs((pctReales[partido] || 0) - (pctTestigo[partido] || 0));
        });
        const errorPromedio = todosLosPartidos.length > 0 ? errorAcumulado / todosLosPartidos.length : 0;
        
        const prepararDatosGrafico = (porcentajes) => ({
            labels: todosLosPartidos,
            datasets: [{
                label: 'Porcentaje de Votos (%)',
                data: todosLosPartidos.map(p => porcentajes[p] || 0),
                backgroundColor: todosLosPartidos.map(p => (colores[p.trim()] || '#cccccc')),
            }]
        });

        return {
            errorPromedio,
            chartDataReal: prepararDatosGrafico(pctReales),
            chartDataTestigo: prepararDatosGrafico(pctTestigo)
        };
    }, [datos, añoSeleccionado, colores]);

    if (!datosProcesados) {
        return <main className="p-8 bg-slate-100"><p className="text-center p-10">No hay datos procesados para mostrar.</p></main>;
    }

    return (
        <main className="p-4 md:p-8 bg-slate-100 font-sans min-h-screen">
            <nav className="mb-8">
                <Link href="/" className="text-blue-600 hover:underline">&larr; Volver a la selección de distritos</Link>
            </nav>
            <header className="text-center mb-10">
                <h1 className="text-5xl font-bold mb-2 text-slate-900">{distrito}</h1>
                <div className="inline-block">
                    <label htmlFor="year-select" className="mr-2 text-lg text-slate-600">Año Electoral:</label>
                    <select id="year-select" value={añoSeleccionado} onChange={(e) => setAñoSeleccionado(e.target.value)} className="p-2 rounded-md border border-slate-300 text-lg">
                        {añosDisponibles.map(año => <option key={año} value={año}>{año}</option>)}
                    </select>
                </div>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-6xl mx-auto">
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <h3 className="text-slate-500 font-bold uppercase">Error Promedio</h3>
                    <p className="text-4xl font-bold text-blue-600">{datosProcesados.errorPromedio.toFixed(2)}%</p>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 max-w-6xl mx-auto">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-4 text-center">Resultados Reales (%)</h3>
                    <BarChart chartData={datosProcesados.chartDataReal} />
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-4 text-center">Resultados Mesas Testigo (%)</h3>
                    {/* Verificamos si hay datos antes de renderizar el gráfico */}
                    {Object.keys(datos.testigo || {}).length > 0 ?
                      <BarChart chartData={datosProcesados.chartDataTestigo} /> :
                      <p className="text-center text-slate-500 mt-10">No hay datos de mesas testigo para este distrito.</p>
                    }
                </div>
            </div>
            <div className="text-center my-10">
                <button className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors text-xl">
                    Descargar Lista Completa de Mesas (USD 100)
                </button>
            </div>
        </main>
    );
}