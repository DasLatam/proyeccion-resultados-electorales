'use client';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Registramos los componentes que usará Chart.js para construir el gráfico
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function BarChart({ chartData }) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    // Hacemos que la escala empiece en 0 y sugerimos un máximo de 100 para porcentajes
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax: 100,
      },
    },
  };

  return <Bar data={chartData} options={options} />;
}