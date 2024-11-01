import { Persona } from "./Clases/Persona.js";
import { Empleado } from "./Clases/Empleado.js";
import { Cliente } from "./Clases/Cliente.js";

document.addEventListener('DOMContentLoaded', function () {
    let personas = [];

    // Función para cargar el JSON y generar instancias
    function cargarPersonasDesdeJSON() {
        return fetch('./Registros/datos.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error("ERROR: Error al cargar el archivo JSON\n");
                }
                return response.json();
            })
            .then(data => {
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
            })
            .catch(error => console.error(error.message));
    }

    // Función para mostrar la lista de personas en la tabla
    function mostrarPersonasEnTabla() {
        const tablaBody = document.querySelector("#tablaPersonas tbody");
        tablaBody.innerHTML = ""; // Limpiamos la tabla antes de poblarla

        personas.forEach((persona) => {
            const fila = document.createElement("tr");

            // Columna para cada atributo, rellena con "N/A" si no aplica
            fila.innerHTML = `
                <td>${persona.id}</td>
                <td>${persona.nombre}</td>
                <td>${persona.apellido}</td>
                <td>${persona.edad}</td>
                <td>${persona.sueldo || "N/A"}</td>
                <td>${persona.ventas || "N/A"}</td>
                <td>${persona.compras || "N/A"}</td>
                <td>${persona.telefono || "N/A"}</td>
                <td><button class="btnModificar">Modificar</button></td>
                <td><button class="btnEliminar">Eliminar</button></td>
            `;

            // Agregar fila al cuerpo de la tabla
            tablaBody.appendChild(fila);
        });
    }

    // Función para mostrar el formulario ABM y ocultar el formulario lista
    function mostrarFormulario(titulo) {
        console.log(`Mostrando formulario para: ${titulo}`);
        const formularioABM = document.getElementById("formularioABM");
        const formularioTitulo = document.getElementById("formularioTitulo");
        const formularioLista = document.getElementById("formularioLista");

        formularioTitulo.innerText = titulo;
        formularioABM.classList.remove("oculto");
        formularioABM.style.display = "block";

        // Ocultar el formulario lista de manera forzada
        formularioLista.style.display = "none";
    }

    // Función para ocultar el formulario ABM y mostrar el formulario lista
    function ocultarFormulario() {
        const formularioABM = document.getElementById("formularioABM");
        const formularioLista = document.getElementById("formularioLista");

        formularioABM.classList.add("oculto");
        formularioABM.style.display = "none";

        // Mostrar el formulario lista de manera forzada
        formularioLista.style.display = "block";
    }

    // Configurar los botones Aceptar y Cancelar en el formulario ABM
    function configurarBotonesABM() {
        const btnAceptar = document.getElementById("btnAceptar");
        const btnCancelar = document.getElementById("btnCancelar");

        btnAceptar.addEventListener("click", () => {
            console.log(`Acción: ${document.getElementById("formularioTitulo").innerText}`);
            ocultarFormulario();
        });

        btnCancelar.addEventListener("click", ocultarFormulario);
    }

    // Ocultar el formulario al cargar la página
    ocultarFormulario();
    
    // Mostrar spinner al comenzar a cargar datos
    mostrarSpinnerConRetraso().then(() => {
        // Cargar datos desde JSON y luego mostrar en la tabla
        cargarPersonasDesdeJSON().then(() => {        
            console.log(personas); // Ver lista de personas en la consola
            ocultarSpinner(); // Ocultar spinner cuando la carga termina
            mostrarPersonasEnTabla();
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

    function mostrarSpinner() {
        document.getElementById("spinner").style.display = "block";
        console.log("Se mostró spinner...");
    }

    function mostrarSpinnerConRetraso() {
        // Mostrar el spinner
        console.log("Se mostró spinner...");
        const spinner = document.getElementById("spinner");
        spinner.style.display = "block";
    
        // Retornar una promesa que se resuelve después de 1 segundo
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, 2000); // 1000 milisegundos = 1 segundo
        });
    }
    
    function ocultarSpinner() {
        document.getElementById("spinner").style.display = "none";
        console.log("Se ocultó spinner...");
    }
});