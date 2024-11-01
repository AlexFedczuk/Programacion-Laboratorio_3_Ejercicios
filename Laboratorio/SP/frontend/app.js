import { Persona } from "./Clases/Persona.js";
import { Empleado } from "./Clases/Empleado.js";
import { Cliente } from "./Clases/Cliente.js";
import { mostrarPersonasEnTabla, mostrarFormulario, ocultarFormulario, mostrarSpinner, ocultarSpinner } from "./funciones.js";

document.addEventListener('DOMContentLoaded', function () {
    let personas = [];

    function cargarDatosConXMLHttpRequest() {
        const xhr = new XMLHttpRequest();
        
        // Configuramos la solicitud para realizar un GET al endpoint
        xhr.open("GET", "../backend/PersonasEmpleadosClientes.php", true);

        // Definimos la función que se ejecutará cuando cambie el estado de la solicitud
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) { // La solicitud ha completado
                if (xhr.status === 200) {
                    // Parseamos la respuesta JSON y generamos la lista en memoria
                    const data = JSON.parse(xhr.responseText);
                    data.forEach(item => {
                        let persona;
                        if ("sueldo" in item && "ventas" in item) {
                            persona = new Empleado(item.id, item.nombre, item.apellido, item.edad, item.sueldo, item.ventas);
                        } else if ("compras" in item && "telefono" in item) {
                            persona = new Cliente(item.id, item.nombre, item.apellido, item.edad, item.compras, item.telefono);
                        } else {
                            persona = new Persona(item.id, item.nombre, item.apellido, item.edad);
                        }
                        personas.push(persona);
                    });

                    // Ocultar el spinner y mostrar la lista en la tabla
                    ocultarSpinner();
                    mostrarPersonasEnTabla(personas);

                } else {
                    // En caso de error, ocultamos el spinner y mostramos una advertencia
                    ocultarSpinner();
                    alert("Error al cargar los datos. Por favor, intente nuevamente.");
                }
            }
        };

        // Mostrar spinner antes de enviar la solicitud
        mostrarSpinner();

        // Enviamos la solicitud
        xhr.send();
    }

    // Llamamos a la función para cargar los datos cuando la página termina de cargar
    cargarDatosConXMLHttpRequest();

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