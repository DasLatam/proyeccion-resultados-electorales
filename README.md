# ⏱️ PRE – Proyección de Resultados Electorales

Una herramienta de análisis y visualización de datos electorales históricos de Argentina, diseñada para identificar mesas testigo y proyectar resultados con un alto grado de precisión.

## Sobre el Proyecto

PRE nace de la necesidad de obtener proyecciones electorales rápidas y fiables durante la jornada electoral. En lugar de depender de encuestas, este proyecto utiliza datos históricos de elecciones nacionales (2011-2023) para identificar un conjunto de **mesas testigo** en cada distrito.

Estas mesas son aquellas que, a lo largo de más de una década, han demostrado ser un microcosmos del resultado general de su jurisdicción. El sitio permite visualizar y comparar el resultado agregado de estas mesas testigo contra el resultado real de cada elección, mostrando un **porcentaje de error promedio** que cuantifica la efectividad del modelo.

## 📜 Características Principales

* **Análisis por Jurisdicción:** Visualización de datos para las 23 provincias, la Ciudad Autónoma de Buenos Aires y un consolidado de "Total País".
* **Selector Histórico:** Permite navegar entre diferentes años electorales para analizar la evolución de los resultados.
* **Visualización Comparativa:** Gráficos de barras interactivos que enfrentan los "Resultados Reales" contra los "Resultados de Mesas Testigo", expresados en porcentajes para una comparación precisa.
* **Cálculo de Precisión:** Tarjetas de métricas que muestran de forma clara el **error promedio** de la proyección para el año seleccionado.
* **Descarga de Datos Premium (En Desarrollo):** Funcionalidad para que los usuarios puedan comprar y descargar los listados completos de mesas testigo para sus propios análisis.
* **Suscripción a Novedades (En Desarrollo):** Un formulario de registro para que los usuarios reciban la agenda electoral y actualizaciones del sitio.

## 🚀 Stack Tecnológico

Este proyecto fue construido utilizando un enfoque moderno y simplificado.

* **Análisis de Datos:** Python, Pandas, Google Colab.
* **Aplicación Web (Frontend):**
    * Framework: **Next.js (React)**
    * Estilos: **Tailwind CSS**
    * Gráficos: **Chart.js**
* **Entorno de Desarrollo:** GitHub Codespaces
* **Plataforma de Despliegue:** Vercel

## ⚙️ Desarrollo

Para correr este proyecto en un entorno de desarrollo local o en Codespaces:

1.  Clona el repositorio.
2.  Instala las dependencias:
    ```bash
    npm install
    ```
3.  Ejecuta el servidor de desarrollo:
    ```bash
    npm run dev
    ```
4.  Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🌐 Despliegue

El sitio está desplegado en Vercel y se actualiza automáticamente con cada `git push` a la rama `main`.

**URL de Producción:** [https://proyeccion-resultados-electorales.vercel.app/](https://proyeccion-resultados-electorales.vercel.app/)

## 🛣️ Próximos Pasos

El desarrollo de las siguientes funcionalidades está en progreso:
* [ ] Integración de la pasarela de pagos con **Stripe**.
* [ ] Conexión del formulario de suscripción a un servicio de email marketing.
* [ ] Creación de páginas estáticas adicionales ("Metodología", "Servicios").
