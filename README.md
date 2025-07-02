# 🌿 Mediplant

Buscador inteligente de plantas medicinales, orientado a usuarios de habla hispana.

Permite consultar información validada sobre especies, usos tradicionales, partes de la planta empleadas, y referencias oficiales, utilizando tecnologías modernas.



## 🚀 Demo local rápida

1. **Clona el repositorio:**
```bash
git clone https://github.com/tu_usuario/mediplant.git
cd mediplant
````

2. **Instala las dependencias:**

```bash
npm install
```

3. **Levanta el servidor Typesense (requiere Docker en ejecución):**

```bash
npm run typesenseServer
```

   Si ocurre un error con los datos, elimina la carpeta `typesense-server-data-1c` y vuelve a ejecutar el comando.

4. **Indexa los datos en Typesense:**

```bash
npm run populateTypesenseIndex
```

5. **Inicia la aplicación en modo desarrollo:**

```bash
npm start
```

   Accede a la app en [http://localhost:3000](http://localhost:3000)



## 🗂️ Estructura del proyecto

```bash
MEDIPLANT/
│
├── dist/
├── node_modules/                  # Dependencias instaladas vía npm/yarn
│
├── public/
│   ├── data/
│   │   └── plantas_medicinales.json     # Dataset principal de plantas medicinales en formato JSON
│   ├── favicon.ico                      
│   ├── favicon.png                      
│   ├── manifest.webmanifest             
│   └── scripts/
│       └── populateTypesenseIndex.js    # Script para poblar el índice de Typesense con los datos de plantas
│
├── src/
│   ├── components/
│   │   ├── CollapsibleSection.jsx           # Componente de sección colapsable para los filtros
│   │   ├── FiltersSidebar.jsx               # Barra lateral izquierda de filtros (parte fija de la UI)
│   │   ├── Footer.jsx                       # Pie de página
│   │   ├── Header.jsx                       # Encabezado con título, búsqueda y botón de simbología
│   │   ├── HitCard.jsx                      # Tarjeta visual de cada resultado de búsqueda
│   │   ├── InfoModal.jsx                    # Modal de información/simbología general
│   │   ├── PlantModal.jsx                   # Modal flotante de detalle de una planta (abrir al hacer click en "ver detalles")
│   │   └── SearchBoxWithSuggestions.jsx     # Caja de búsqueda principal con sugerencias rápidas
│   ├── js/
│   │   └── app.jsx                          # Archivo principal de React que inicializa y compone toda la app
│   └── styles/
│       ├── app.scss                         
│       └── index.css                        # Estilos globales y para compatibilidad 
│
├── typesense-server-data/            # Carpeta donde Typesense almacena los datos del índice (Dockerizado)
│
├── .gitignore                        
├── index.html                        # Archivo HTML principal (entry point de Parcel)
├── LICENSE                           
├── package.json                      # Configuración de npm (scripts, dependencias, metadata)
├── package-lock.json                 
├── pasos.txt                         # Instrucciones para correr el proyecto (versión antigua)
└── README.md                         # Documentación principal del proyecto (explica cómo instalar, correr y contribuir)

```



## ⚙️ Tecnologías principales

* **React** — UI moderna y componentes reutilizables.
* **Typesense** — Motor de búsqueda rápido y open source.
* **Typesense InstantSearch Adapter** — Integración plug-and-play con React InstantSearch.
* **Parcel** — Bundler para desarrollo rápido.
* **Docker** — Facilita el despliegue de Typesense Server.



## 📒 Datos incluidos

* `plantas_medicinales.json`: Dataset curado, estructurado con nombre común, nombre científico, usos tradicionales, partes utilizadas, imágenes y referencias.



## 📦 Scripts útiles

* `npm run typesenseServer`
  Levanta el servidor de Typesense usando Docker.
* `npm run populateTypesenseIndex`
  Indexa los datos de plantas en Typesense.
* `npm start`
  Inicia la app en modo desarrollo ([http://localhost:3000](http://localhost:3000)).
* `npm run build`
  Genera la versión de producción.

