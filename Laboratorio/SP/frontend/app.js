import { 
    mostrarPersonasEnTabla, 
    mostrarFormulario, 
    ocultarFormulario, 
    mostrarSpinner, 
    ocultarSpinner, 
    fetchData, 
    crearPersonaDesdeJSON,
    configurarFormularioAlta,
    configurarBotonesABM
} from "./funciones.js";

document.addEventListener('DOMContentLoaded', function () {
    let personas = [];

    // Cargar los datos iniciales al cargar la página
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
            mostrarFormulario("Modificación");
        } else if (e.target.classList.contains("btnEliminar")) {
            mostrarFormulario("Baja");
        }
    });
});
