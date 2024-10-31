import { Persona } from "./Clases/Persona.js";
import { Empleado } from "./Clases/Empleado.js";
import { Cliente } from "./Clases/Cliente.js";

document.addEventListener('DOMContentLoaded', function () {
    let personas = [];

    // Función para cargar el JSON y generar instancias
    function cargarPersonasDesdeJSON() {
        fetch('./Registros/datos.json')
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
                console.log(personas); // Ver lista de personas en la consola
                mostrarPersonasEnTabla(); // Llenamos la tabla después de cargar los datos
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

    // Llamar a la función para cargar los datos desde JSON al cargar la página
    cargarPersonasDesdeJSON();

    // Event listeners para los botones de la tabla (Modificar y Eliminar)
    document.querySelector("#tablaPersonas").addEventListener("click", function (e) {
        if (e.target.classList.contains("btnModificar")) {
            // Acción de modificar
            console.log("Modificar:", e.target.closest("tr").children[0].innerText);
        } else if (e.target.classList.contains("btnEliminar")) {
            // Acción de eliminar
            console.log("Eliminar:", e.target.closest("tr").children[0].innerText);
        }
    });

    // Botón para agregar elemento
    document.querySelector("#btnAgregar").addEventListener("click", function () {
        console.log("Agregar nuevo elemento");
        // Lógica para mostrar el formulario de alta
    });
});