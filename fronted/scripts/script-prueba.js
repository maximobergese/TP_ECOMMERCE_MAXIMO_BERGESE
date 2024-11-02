// script.js

// Variables globales
let productos = []; // Aquí se almacenarán los productos obtenidos de la API
let vistaCuadricula = true; // Variable para controlar la vista (lista o cuadrícula)

// Obtener productos desde la API con filtro opcional por descripción y rubro
async function obtenerProductos(filtroDescripcion = '', filtroRubro = '') {
    try {
        let url = `http://localhost:3002/api/rutas?descripcion=${filtroDescripcion}`;
        
        // Si hay un filtro de rubro específico, lo agregamos a la URL
        if (filtroRubro && filtroRubro !== 'todos') {
            url += `&id_Rubro=${filtroRubro}`;
        }

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        productos = await response.json();
        mostrarProductos(productos);
    } catch (error) {
        console.error('Error al obtener productos:', error);
    }
}

// Obtener rubros desde la API y agregarlos al select
async function obtenerRubros() {
    try {
        const response = await fetch('http://localhost:3002/api/rutas/rubros');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const rubros = await response.json();
        
        const selectRubro = document.getElementById('select-rubro');
        rubros.forEach(rubro => {
            const option = document.createElement('option');
            option.value = rubro.idRubro;
            option.textContent = rubro.descripcion;
            selectRubro.appendChild(option);
        });
    } catch (error) {
        console.error('Error al obtener rubros:', error);
    }
}

// Mostrar productos en el contenedor
function mostrarProductos(productosFiltrados) {
    const contenedor = document.getElementById('contenedor-productos');
    contenedor.innerHTML = '';

    productosFiltrados.forEach(producto => {
        const productoDiv = document.createElement('div');
        productoDiv.classList.add('producto');
        productoDiv.classList.toggle('cuadricula', vistaCuadricula);
        productoDiv.classList.toggle('lista', !vistaCuadricula);

        productoDiv.innerHTML = `
            <img src="${producto.url_Imagen}" alt="${producto.descripcion}" style="width: 100%;">
            <h3>${producto.descripcion}</h3>
            <p>Precio: $${producto.precio.toFixed(2)}</p>
            <p>Rubro: ${producto.rubroDescripcion}</p>
        `;
        contenedor.appendChild(productoDiv);
    });
}

// Filtrar productos por rubro y descripción
function filtrarPorRubroYDescripcion() {
    const rubroSeleccionado = document.getElementById('select-rubro').value;
    const descripcionBuscada = document.getElementById('input-busqueda').value.toLowerCase();

    // Llamada a obtenerProductos con los filtros aplicados
    obtenerProductos(descripcionBuscada, rubroSeleccionado);
}

// Cambiar entre vista de lista y cuadrícula
function alternarVista() {
    vistaCuadricula = !vistaCuadricula;
    mostrarProductos(productos); // Volver a mostrar productos en la nueva vista
}

// Event listeners para el filtro y el cambio de vista
document.getElementById('select-rubro').addEventListener('change', filtrarPorRubroYDescripcion);
document.getElementById('btn-alternar-vista').addEventListener('click', alternarVista);
document.getElementById('input-busqueda').addEventListener('input', filtrarPorRubroYDescripcion);

// Llamada inicial para cargar los productos y rubros al cargar la página
window.onload = () => {
    obtenerProductos(); // Cargar todos los productos inicialmente
    obtenerRubros();    // Cargar rubros para el filtro
};




// Función para mostrar productos en el contenedor
function mostrarProductos(productos) {
    const contenedor = document.getElementById('contenedor-productos');
    contenedor.innerHTML = '';

    productos.forEach(producto => {
        const productoDiv = document.createElement('div');
        productoDiv.classList.add('producto');
        productoDiv.innerHTML = `
            <h2>${producto.descripción}</h2> <!-- Cambié 'descripción' por 'nombre' -->
            <br>
            <p>Precio: $${producto.precio}</p>
            <br>
            <img src="${producto.url_Imagen}" alt="${producto.nombre}" />
        `;
        contenedor.appendChild(productoDiv);
    });
}