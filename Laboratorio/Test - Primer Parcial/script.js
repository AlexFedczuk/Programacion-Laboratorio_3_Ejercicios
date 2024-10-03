const data = [
    {"id": 1, "nombre": "Marcelo", "apellido": "Luque", "edad": 45, "ventas": 15000, "sueldo": 2000},
    {"id": 2, "nombre": "Ramiro", "apellido": "Escobar", "edad": 35, "ventas": 6000, "sueldo": 1000},
    {"id": 3, "nombre": "Facundo", "apellido": "Cairo", "edad": 30, "ventas": 500, "sueldo": 15000},
    {"id": 4, "nombre": "Fernando", "apellido": "Nieto", "edad": 18, "compras": 8000, "telefono": "152111131"},
    {"id": 5, "nombre": "Manuel", "apellido": "Loza", "edad": 20, "compras": 50000, "telefono": "42040077"},
    {"id": 666, "nombre": "Nicolas", "apellido": "Serrano", "edad": 23, "compras": 7000, "telefono": "1813181563"}
];

function filtrarDatos() {
    const filterValue = document.getElementById("filter").value;
    const tableBody = document.getElementById("data-table-body");
    tableBody.innerHTML = ""; // Limpiar la tabla antes de llenarla

    const filteredData = data.filter(item => {
        if (filterValue === "Todos") return true;
        if (filterValue === "Empleados") return item.sueldo !== undefined; // Cambia la condición según tus datos
        if (filterValue === "Clientes") return item.telefono !== undefined; // Cambia la condición según tus datos
    });

    filteredData.forEach(item => {
        const row = document.createElement("tr");
        if (item.sueldo !== undefined) {
            row.innerHTML = `
                <td data-column="id">${item.id}</td>
                <td data-column="nombre">${item.nombre}</td>
                <td data-column="apellido">${item.apellido}</td>
                <td data-column="edad">${item.edad}</td>
                <td data-column="sueldo">${item.sueldo}</td>
                <td data-column="ventas">${item.ventas}</td>
            `;
        } else {
            row.innerHTML = `
                <td data-column="id">${item.id}</td>
                <td data-column="nombre">${item.nombre}</td>
                <td data-column="apellido">${item.apellido}</td>
                <td data-column="edad">${item.edad}</td>
                <td data-column="compras">${item.compras}</td>
                <td data-column="telefono">${item.telefono}</td>
            `;
        }
        
        tableBody.appendChild(row);
    });
}

// Función para filtrar columnas según los checkboxes
function filtrarColumnas() {
    // Obtenemos los estados de los checkboxes
    const mostrarId = document.querySelector('#checkbox-id').checked;
    const mostrarNombre = document.querySelector('#checkbox-nombre').checked;
    const mostrarApellido = document.querySelector('#checkbox-apellido').checked;
    const mostrarEdad = document.querySelector('#checkbox-edad').checked;
    const mostrarSueldo = document.querySelector('#checkbox-sueldo').checked;
    const mostrarVentas = document.querySelector('#checkbox-ventas').checked;
    const mostrarCompras = document.querySelector('#checkbox-compras').checked;
    const mostrarTelefono = document.querySelector('#checkbox-telefono').checked;

    // Obtener todas las celdas del encabezado (th) y las filas (td)
    const ths = document.querySelectorAll('th');
    const tds = document.querySelectorAll('td');

    // Mostrar u ocultar según el checkbox
    ths.forEach(th => {
        switch (th.getAttribute('data-column')) {
            case 'id':
                th.style.display = mostrarId ? '' : 'none';
                break;
            case 'nombre':
                th.style.display = mostrarNombre ? '' : 'none';
                break;
            case 'apellido':
                th.style.display = mostrarApellido ? '' : 'none';
                break;
            case 'edad':
                th.style.display = mostrarEdad ? '' : 'none';
                break;
            case 'sueldo':
                th.style.display = mostrarSueldo ? '' : 'none';
                break;
            case 'ventas':
                th.style.display = mostrarVentas ? '' : 'none';
                break;
            case 'compras':
                th.style.display = mostrarCompras ? '' : 'none';
                break;
            case 'telefono':
                th.style.display = mostrarTelefono ? '' : 'none';
                break;
        }
    });

    // Lo mismo para las celdas de las filas (td)
    tds.forEach(td => {
        switch (td.getAttribute('data-column')) {
            case 'id':
                td.style.display = mostrarId ? '' : 'none';
                break;
            case 'nombre':
                td.style.display = mostrarNombre ? '' : 'none';
                break;
            case 'apellido':
                td.style.display = mostrarApellido ? '' : 'none';
                break;
            case 'edad':
                td.style.display = mostrarEdad ? '' : 'none';
                break;
            case 'sueldo':
                td.style.display = mostrarSueldo ? '' : 'none';
                break;
            case 'ventas':
                td.style.display = mostrarVentas ? '' : 'none';
                break;
            case 'compras':
                td.style.display = mostrarCompras ? '' : 'none';
                break;
            case 'telefono':
                td.style.display = mostrarTelefono ? '' : 'none';
                break;
        }
    });
}

function calcularEdadPromedio() {
    // Obtén las filas de la tabla
    const rows = document.querySelectorAll("#data-table-body tr");
    let totalEdad = 0;
    let count = 0;

    // Recorre las filas para calcular la edad promedio
    rows.forEach(row => {
        const edad = parseInt(row.cells[3].innerText); // Asumiendo que la edad está en la cuarta columna (índice 3)
        if (!isNaN(edad)) {
            totalEdad += edad;
            count++;
        }
    });

    // Calcula la edad promedio
    const promedio = count > 0 ? (totalEdad / count).toFixed(2) : 0;

    // Muestra el resultado en el input correspondiente
    document.getElementById("promedio").value = promedio;
}

// Función para cargar la tabla con los datos
function loadTableData() {
    const tableBody = document.getElementById("data-table-body");
    tableBody.innerHTML = ""; // Limpiar la tabla antes de llenarla
    
    data.forEach(item => {
        let ventas = item.ventas !== undefined ? item.ventas : "--";
        let compras = item.compras !== undefined ? item.compras : "--";
        let sueldo = item.sueldo !== undefined ? item.sueldo : "--";
        let telefono = item.telefono !== undefined ? item.telefono : "--";

        // Crear una fila
        const row = document.createElement("tr");
        row.innerHTML = `
            <td data-column="id">${item.id}</td>
            <td data-column="nombre">${item.nombre}</td>
            <td data-column="apellido">${item.apellido}</td>
            <td data-column="edad">${item.edad}</td>
            <td data-column="sueldo">${sueldo}</td>
            <td data-column="ventas">${ventas}</td>
            <td data-column="compras">${compras}</td>
            <td data-column="telefono">${telefono}</td>
        `;
        tableBody.appendChild(row);
    });

    filtrarDatos();
    filtrarColumnas(); // Aseguramos que las columnas se filtren al cargar los datos    
}

window.onload = function() {
    loadTableData();
};

document.addEventListener("DOMContentLoaded", function() {
    const dataTableBody = document.getElementById('data-table-body');
    const formDatos = document.querySelector('.form-datos');
    const formABM = document.querySelector('.form-abm');
    const aceptarBtn = formABM.querySelector('input[value="Aceptar"]');
    const cancelarBtn = formABM.querySelector('input[value="Cancelar"]');

    // Evento para cada fila de la tabla
    dataTableBody.addEventListener('dblclick', function(e) {
        const row = e.target.closest('tr');
        if (row) {
            const cells = row.querySelectorAll('td');
            const data = Array.from(cells).map(cell => cell.textContent);

            // Rellenar el formulario ABM con los datos de la fila
            document.getElementById('id').value = data[0]; // ID
            document.getElementById('atributo1').value = data[1]; // Nombre
            document.getElementById('atributo2').value = data[2]; // Apellido
            document.getElementById('atributo3').value = data[3]; // Edad (u otro)

            // Ocultar el Form Datos y mostrar el Formulario ABM
            formDatos.style.display = 'none';
            formABM.style.display = 'block';

            // Ocultar botones (puedes personalizar cuál ocultar)
            aceptarBtn.style.display = 'inline';
            cancelarBtn.style.display = 'inline';
        }
    });

    // Evento para el botón "Agregar"
    document.querySelector('input[value="Agregar"]').addEventListener('click', function() {
        // Limpiar el formulario ABM
        document.getElementById('id').value = '';
        document.getElementById('atributo1').value = '';
        document.getElementById('atributo2').value = '';
        document.getElementById('atributo3').value = '';

        // Ocultar el Form Datos y mostrar el Formulario ABM
        formDatos.style.display = 'none';
        formABM.style.display = 'block';

        // Mostrar botones para agregar
        aceptarBtn.style.display = 'inline';
        cancelarBtn.style.display = 'inline';
    });

    // Evento para el botón "Cancelar"
    cancelarBtn.addEventListener('click', function() {
        formABM.style.display = 'none';
        formDatos.style.display = 'block';
    });
});

function mostrarABM() {
    document.querySelector('.form-datos').style.display = 'none';
    document.querySelector('.form-abm').style.display = 'block';
}

function ocultarABM() {
    document.querySelector('.form-abm').style.display = 'none';
    document.querySelector('.form-datos').style.display = 'block';
    cargarDatos(); // Actualiza los datos en la tabla
}

function generarNuevoID() {
    // Usamos reduce para encontrar el ID máximo y generar el siguiente
    return datos.reduce((maxId, item) => Math.max(maxId, item.id), 0) + 1;
}

function guardarDatos() {
    // Obtener los valores del formulario
    let nuevoRegistro = {
        id: generarNuevoID(),
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        edad: parseInt(document.getElementById('edad').value),
        tipo: document.getElementById('tipo').value
    };
    
    // Agregar el nuevo registro a la lista de datos
    datos.push(nuevoRegistro);
    
    // Ocultar el formulario ABM y mostrar el de datos
    ocultarABM();
}

function cargarDatos() {
    const tbody = document.getElementById('data-table-body');
    tbody.innerHTML = ''; // Limpiar contenido previo

    datos.forEach(dato => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${dato.id}</td>
            <td>${dato.nombre}</td>
            <td>${dato.apellido}</td>
            <td>${dato.edad}</td>
            <td>${dato.tipo}</td>
        `;
        tbody.appendChild(fila);
    });
}

// Cargar los datos al inicio
cargarDatos();