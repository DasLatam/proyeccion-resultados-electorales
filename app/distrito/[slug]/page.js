import { promises as fs } from 'fs';
import path from 'path';
import DistritoDashboard from '@/components/DistritoDashboard'; // <-- Importamos nuestro nuevo componente

// Esta función le dice a Next.js qué páginas de distrito debe pre-construir.
export async function generateStaticParams() {
  const filePath = path.join(process.cwd(), 'public/data/resultados_reales.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  const data = JSON.parse(fileContents);
  return Object.keys(data).map((distrito) => ({ slug: distrito }));
}

// Esta función busca los datos para un distrito específico.
async function getData(distrito) {
  const dataPath = path.join(process.cwd(), 'public/data');
  const realesFile = await fs.readFile(dataPath + '/resultados_reales.json', 'utf8');
  const testigoFile = await fs.readFile(dataPath + '/resultados_testigo.json', 'utf8');
  const coloresFile = await fs.readFile(dataPath + '/colores.json', 'utf8');
  const reales = JSON.parse(realesFile);
  const testigo = JSON.parse(testigoFile);
  const colores = JSON.parse(coloresFile);
  return {
    datos: {
      real: reales[distrito],
      testigo: testigo[distrito],
    },
    colores,
  };
}

// Este es nuestro componente de servidor.
export default async function DistritoPage({ params }) {
  const distrito = decodeURIComponent(params.slug);
  const datosIniciales = await getData(distrito);
  
  // Renderiza el componente de cliente y le pasa los datos.
  return <DistritoDashboard datosIniciales={datosIniciales} distrito={distrito} />;
}