import Link from 'next/link';
import { promises as fs } from 'fs';
import path from 'path';
import DistritoDashboard from '@/components/DistritoDashboard';

// Función para normalizar texto: quita tildes y lo pone en minúsculas
const normalizeString = (str) => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
};

// Esta función le dice a Next.js qué páginas construir
export async function generateStaticParams() {
  const filePath = path.join(process.cwd(), 'public/data/resultados_reales.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  const data = JSON.parse(fileContents);
  return Object.keys(data).map((distrito) => ({
    slug: encodeURIComponent(distrito),
  }));
}

// Esta función busca los datos de forma robusta
async function getData(distrito) {
  const dataPath = path.join(process.cwd(), 'public/data');
  
  const [realesFile, testigoFile, coloresFile] = await Promise.all([
    fs.readFile(dataPath + '/resultados_reales.json', 'utf8'),
    fs.readFile(dataPath + '/resultados_testigo.json', 'utf8'),
    fs.readFile(dataPath + '/colores.json', 'utf8')
  ]);

  const reales = JSON.parse(realesFile);
  const testigo = JSON.parse(testigoFile);
  const colores = JSON.parse(coloresFile);

  // Búsqueda normalizada para evitar errores de tildes/mayúsculas
  const distritoNormalizado = normalizeString(distrito);
  
  const encontrarKeyCorrecta = (objeto) => {
    return Object.keys(objeto).find(key => normalizeString(key) === distritoNormalizado);
  };

  const keyReal = encontrarKeyCorrecta(reales);
  const keyTestigo = encontrarKeyCorrecta(testigo);

  return {
    datos: {
      real: keyReal ? reales[keyReal] : null,
      testigo: keyTestigo ? testigo[keyTestigo] : null,
    },
    colores,
  };
}

// Componente de Servidor principal
export default async function DistritoPage({ params }) {
  const distrito = decodeURIComponent(params.slug);
  const datosIniciales = await getData(distrito);
  
  if (!datosIniciales.datos.real) {
     return <main className="p-8 bg-slate-100 min-h-screen text-center"><p>No se encontraron datos para el distrito: {distrito}</p></main>;
  }

  return <DistritoDashboard datosIniciales={datosIniciales} distrito={distrito} />;
}