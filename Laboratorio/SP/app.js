import { 
    cargarPersonasDesdeJSON, 
    mostrarPersonasEnTabla, 
    mostrarFormulario, 
    ocultarFormulario, 
    mostrarSpinner, 
    mostrarSpinnerConRetraso, 
    ocultarSpinner 
} from "./funciones.js";

document.addEventListener('DOMContentLoaded', function () {
    let personas = [];

    // Ocultar el formulario al cargar la página
    ocultarFormulario();

    // Mostrar spinner al comenzar a cargar datos
    mostrarSpinnerConRetraso().then(() => {
        // Cargar datos desde JSON y luego mostrar en la tabla
        cargarPersonasDesdeJSON(personas).then(() => {        
            console.log(personas); // Ver lista de personas en la consola
            ocultarSpinner(); // Ocultar spinner cuando la carga termina
            mostrarPersonasEnTabla(personas);
        });
    });

    // Configurar los eventos para los botones del formulario ABM
    configurarBotonesABM();

    // Mostrar formulario de "Agregar" al hacer clic en "Agregar Elemento"
    document.getElementById("btnAgregar").addEventListener("click", function () {
        mostrarFormulario("Alta");
    });

    // Event listeners para Modificar y Eliminar
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
            console.log(`Acción: ${document.getElementById("formularioTitulo").innerText}`);
            ocultarFormulario();
        });

        btnCancelar.addEventListener("click", ocultarFormulario);
    }
});