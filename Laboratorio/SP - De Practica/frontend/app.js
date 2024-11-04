import { 
    mostrarPersonasEnTabla, 
    mostrarFormulario, 
    ocultarFormulario, 
    mostrarSpinner, 
    ocultarSpinner, 
    fetchData, 
    crearPersonaDesdeJSON,
    configurarFormularioAlta,
    configurarFormularioModificacion,
    configurarBotonesABM,
    configurarFormularioEliminacion 
} from "./funciones.js";

document.addEventListener('DOMContentLoaded', function () {
    let personas = [];

    // Cargar los datos iniciales al cargar la página para la lista.
    mostrarSpinner();
    fetchData("../backend/PersonasEmpleadosClientes.php", (data) => {
        personas = data.map(item => crearPersonaDesdeJSON(item));
        ocultarSpinner();
        mostrarPersonasEnTabla(personas);
    }, (error) => {
        ocultarSpinner();
        alert("Error al cargar los datos. Por favor, intente nuevamente.");
    });

    // Configuración de botones
    configurarBotonesABM();

    document.getElementById("btnAgregar").addEventListener("click", function () {
        mostrarFormulario("Alta");
        configurarFormularioAlta(personas);
    });

    document.querySelector("#tablaPersonas").addEventListener("click", function (e) {
        if (e.target.classList.contains("btnModificar")) {
            const fila = e.target.closest("tr"); // Encuentra la fila correspondiente
            const id = fila.cells[0].textContent; // Asumiendo que el ID está en la primera celda
            const nombre = fila.cells[1].textContent;
            const apellido = fila.cells[2].textContent;
            const edad = fila.cells[3].textContent;
            const sueldo = fila.cells[4].textContent;
            const ventas = fila.cells[5].textContent;
            const compras = fila.cells[6].textContent;
            const telefono = fila.cells[7].textContent;
    
            // Mostrar el formulario de modificación
            mostrarFormulario("Modificación");

            console.log(nombre);
            console.log(apellido);
            console.log(edad);
            console.log(sueldo);
            console.log(ventas);
            console.log(compras);
            console.log(telefono);
    
            // Cargar datos en el formulario
            document.getElementById("campoID").value = id; // Asignar el ID y deshabilitarlo
            document.getElementById("campoID").disabled = true;

            document.getElementById("nombre").value = nombre;

            document.getElementById("apellido").value = apellido;

            document.getElementById("edad").value = edad;

            document.getElementById("sueldo").value = sueldo;

            document.getElementById("ventas").value = ventas;

            document.getElementById("compras").value = compras;

            document.getElementById("telefono").value = telefono;
            
            // Aquí puedes llamar a la función para configurar el formulario de modificación
            configurarFormularioModificacion(id, personas);
        }
    });

    // app.js
    document.querySelector("#tablaPersonas").addEventListener("click", function (e) {
        if (e.target.classList.contains("btnEliminar")) {
            const fila = e.target.closest("tr"); // Encuentra la fila correspondiente
            const id = fila.cells[0].textContent;
            const nombre = fila.cells[1].textContent;
            const apellido = fila.cells[2].textContent;
            const edad = fila.cells[3].textContent;
            const sueldo = fila.cells[4].textContent;
            const ventas = fila.cells[5].textContent;
            const compras = fila.cells[6].textContent;
            const telefono = fila.cells[7].textContent;

            console.log(nombre);
            console.log(apellido);
            console.log(edad);
            console.log(sueldo);
            console.log(ventas);
            console.log(compras);
            console.log(telefono);
            
            mostrarFormulario("Eliminación");
            // Cargar datos en el formulario
            document.getElementById("campoID").value = id;
            document.getElementById("campoID").disabled = true;

            document.getElementById("nombre").value = nombre;
            document.getElementById("nombre").disabled = true;

            document.getElementById("apellido").value = apellido;
            document.getElementById("apellido").disabled = true;

            document.getElementById("edad").value = edad;
            document.getElementById("edad").disabled = true;

            document.getElementById("sueldo").value = sueldo;
            document.getElementById("sueldo").disabled = true;

            document.getElementById("ventas").value = ventas;
            document.getElementById("ventas").disabled = true;

            document.getElementById("compras").value = compras;
            document.getElementById("compras").disabled = true;

            document.getElementById("telefono").value = telefono;
            document.getElementById("telefono").disabled = true;

            configurarFormularioEliminacion(id, personas); // Llama a la función para configurar el formulario
        }
    });
});
