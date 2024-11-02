document.addEventListener('DOMContentLoaded', () => {
    cargarRubros();
    cargarProductos(); // Carga todos los productos al inicio

    // Eventos para alternar vistas
    document.getElementById('btn-ver-lista').addEventListener('click', () => {
        const contenedor = document.getElementById('contenedor-productos');
        contenedor.classList.remove('grid-view');
        contenedor.classList.add('list-view'); // Agrega la clase para vista de lista
    });

    document.getElementById('btn-ver-cuadricula').addEventListener('click', () => {
        const contenedor = document.getElementById('contenedor-productos');
        contenedor.classList.remove('list-view');
        contenedor.classList.add('grid-view'); // Agrega la clase para vista de cuadrícula
    });

    // Evento para filtrar productos por rubro
    document.getElementById('select-rubro').addEventListener('change', (event) => {
        const rubroSeleccionado = event.target.value; // Obtener el ID del rubro seleccionado
        cargarProductos(rubroSeleccionado); // Cargar productos filtrados
    });

    // Evento para buscar productos por descripción
    document.getElementById('input-busqueda').addEventListener('input', (event) => {
        const busqueda = event.target.value.toLowerCase();
        filtrarProductosPorBusqueda(busqueda);
    });
});


// Función para cargar rubros en el select
function cargarRubros() {
    fetch('http://localhost:3000/api/rubros')
        .then(response => response.json())
        .then(rubros => {
            const selectRubro = document.getElementById('select-rubro');
            rubros.forEach(rubro => {
                const option = document.createElement('option');
                option.value = rubro.idRubro; 
                option.textContent = rubro.descripcion; 
                selectRubro.appendChild(option);
            });
        })
        .catch(error => console.error('Error al cargar rubros:', error));
}


// Función para cargar productos
function cargarProductos(rubro = 'todos') {
    let url = 'http://localhost:3000/api/productos';
    if (rubro !== 'todos') {
        url += `?rubro=${rubro}`; // Añadir el ID del rubro a la consulta
    }
    fetch(url)
        .then(response => response.json())
        .then(productos => {
            mostrarProductos(productos);
        })
        .catch(error => console.error('Error al cargar productos:', error));
}

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


// Función para filtrar productos por búsqueda
function filtrarProductosPorBusqueda(busqueda) {
    const productos = document.querySelectorAll('.producto');
    productos.forEach(producto => {
        const nombre = producto.querySelector('h2').textContent.toLowerCase();
        if (nombre.includes(busqueda)) {
            producto.style.display = ''; // Mostrar
        } else {
            producto.style.display = 'none'; // Ocultar
        }
    });
}

