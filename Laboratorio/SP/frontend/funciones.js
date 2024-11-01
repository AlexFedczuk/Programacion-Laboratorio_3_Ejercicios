import { Persona } from "./Clases/Persona.js";
import { Empleado } from "./Clases/Empleado.js";
import { Cliente } from "./Clases/Cliente.js";

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

export function mostrarFormulario(titulo) {
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

export function ocultarFormulario() {
    const formularioABM = document.getElementById("formularioABM");
    const formularioLista = document.getElementById("formularioLista");

    formularioABM.classList.add("oculto");
    formularioABM.style.display = "none";

    // Mostrar el formulario lista de manera forzada
    formularioLista.style.display = "block";
}

export function mostrarSpinner() {
    document.getElementById("spinner").style.display = "block";
    console.log("Se mostró spinner...");
}

export function mostrarSpinnerConRetraso() {
    console.log("Se mostró spinner...");
    const spinner = document.getElementById("spinner");
    spinner.style.display = "block";

    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, 2000); // 2000 milisegundos = 2 segundos
    });
}

export function ocultarSpinner() {
    document.getElementById("spinner").style.display = "none";
    console.log("Se ocultó spinner...");
}