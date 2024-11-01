import { mostrarPersonasEnTabla, 
    mostrarFormulario, 
    ocultarFormulario, 
    mostrarSpinner, 
    ocultarSpinner, 
    fetchData,
    crearPersonaDesdeJSON } from "./funciones.js";

document.addEventListener('DOMContentLoaded', function () {
    let personas = [];

    // Llamada a la función para cargar los datos al cargar la página
    mostrarSpinner();
    fetchData("../backend/PersonasEmpleadosClientes.php", (data) => {
        personas = data.map(item => crearPersonaDesdeJSON(item));
        ocultarSpinner();
        mostrarPersonasEnTabla(personas);
    }, (error) => {
        ocultarSpinner();
        alert("Error al cargar los datos. Por favor, intente nuevamente.");
    });

    // Configuración adicional para el formulario ABM y los botones
    configurarBotonesABM();

    document.getElementById("btnAgregar").addEventListener("click", function () {
        mostrarFormulario("Alta");
    });

    document.querySelector("#tablaPersonas").addEventListener("click", function (e) {
        if (e.target.classList.contains("btnModificar")) {
            mostrarFormulario("Modificación");
        } else if (e.target.classList.contains("btnEliminar")) {
            mostrarFormulario("Baja");
        }
    });

    function configurarBotonesABM() {
        const btnAceptar = document.getElementById("btnAceptar");
        const btnCancelar = document.getElementById("btnCancelar");

        btnAceptar.addEventListener("click", () => {
            ocultarFormulario();
        });

        btnCancelar.addEventListener("click", ocultarFormulario);
    }
});