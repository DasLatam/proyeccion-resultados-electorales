import { promises as fs } from 'fs';
import path from 'path';
import DistritoDashboard from '@/components/DistritoDashboard';

// Esta función se ejecuta en el build y le dice a Vercel qué páginas crear.
export async function generateStaticParams() {
  const filePath = path.join(process.cwd(), 'public/data/resultados_reales.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  const data = JSON.parse(fileContents);
  const districtNames = Object.keys(data);

  // CORRECCIÓN CLAVE: Codificamos los nombres para que sean seguros en una URL
  // (ej. "Tierra del Fuego" se convierte en "Tierra%20del%20Fuego")
  return districtNames.map((distrito) => ({
    slug: encodeURIComponent(distrito),
  }));
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

// Este es el componente de Servidor para esta página.
// Su único trabajo es obtener el distrito de la URL y buscar los datos.
export default async function DistritoPage({ params }) {
  // Decodificamos el slug de la URL para obtener el nombre original con espacios/tildes
  const distrito = decodeURIComponent(params.slug);
  const datosIniciales = await getData(distrito);
  
  // Renderizamos el Componente de Cliente y le pasamos los datos listos.
  return <DistritoDashboard datosIniciales={datosIniciales} distrito={distrito} />;
}