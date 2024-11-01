import { Persona } from "./Clases/Persona.js";
import { Empleado } from "./Clases/Empleado.js";
import { Cliente } from "./Clases/Cliente.js";

/**
 * Carga los datos desde un archivo JSON y crea instancias de las clases Persona, Empleado, o Cliente.
 * Los datos cargados se almacenan en el array `personas`.
 *
 * @param {Array} personas - Array donde se almacenarán las instancias de personas cargadas desde el JSON.
 * @returns {Promise<void>} - Una promesa que se resuelve cuando los datos se han cargado y procesado.
 * 
 * @throws {Error} - Lanza un error si no se puede cargar el archivo JSON.
 */
export function cargarPersonasDesdeJSON(personas) {
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

/**
 * Muestra la lista de personas en una tabla HTML. Para cada persona, muestra los atributos
 * correspondientes y completa con "N/A" aquellos atributos que no aplican.
 *
 * @param {Array} personas - Array de instancias de Persona, Empleado o Cliente que serán mostradas en la tabla.
 */
export function mostrarPersonasEnTabla(personas) {
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

/**
 * Muestra el formulario ABM con el título correspondiente y elimina la clase "oculto".
 *
 * @param {string} titulo - El título que debe mostrarse en el formulario ("Alta", "Modificación" o "Baja").
 */
export function mostrarFormulario(titulo) {
    console.log(`Mostrando formulario para: ${titulo}`);
    const formularioABM = document.getElementById("formularioABM");
    const formularioTitulo = document.getElementById("formularioTitulo");
    formularioTitulo.innerText = titulo;
    formularioABM.classList.remove("oculto");
}

/**
 * Oculta el formulario ABM aplicando la clase "oculto".
 */
export function ocultarFormulario() {
    const formularioABM = document.getElementById("formularioABM");
    formularioABM.classList.add("oculto");
    formularioABM.style.display = "none"; // Fuerza el ocultamiento
}

/**
 * Configura los eventos de los botones Aceptar y Cancelar en el formulario ABM.
 * El botón Aceptar imprimirá la acción actual en consola y luego ocultará el formulario.
 */
export function configurarBotonesABM() {
    const btnAceptar = document.getElementById("btnAceptar");
    const btnCancelar = document.getElementById("btnCancelar");

    btnAceptar.addEventListener("click", () => {
        console.log(`Acción: ${document.getElementById("formularioTitulo").innerText}`);
        ocultarFormulario();
    });

    btnCancelar.addEventListener("click", ocultarFormulario);
}