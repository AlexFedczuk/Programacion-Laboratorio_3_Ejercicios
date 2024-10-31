import Persona from './Clases/Persona.js';
import Empleado from './Clases/Empleado.js';
import Cliente from './Clases/Cliente.js';

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
                switch (item.tipo) {
                    case "Persona":
                        persona = new Persona(item.nombre, item.edad, item.dni);
                        break;
                    case "Empleado":
                        persona = new Empleado(item.nombre, item.edad, item.dni, item.rol, item.salario);
                        break;
                    case "Cliente":
                        persona = new Cliente(item.nombre, item.edad, item.dni, item.numeroCliente, item.historialCompras);
                        break;
                    default:
                        throw new Error("ERROR: Tipo de persona desconocido\n");
                }
                personas.push(persona);
            });
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

        // Columna para cada atributo
        fila.innerHTML = `
            <td>${persona.nombre}</td>
            <td>${persona.edad}</td>
            <td>${persona.dni}</td>
            <td>${persona.rol || "N/A"}</td>
            <td>${persona.salario || "N/A"}</td>
            <td>${persona.numeroCliente || "N/A"}</td>
            <td>${persona.historialCompras ? persona.historialCompras.join(", ") : "N/A"}</td>
            <td><button class="btnModificar">Modificar</button></td>
            <td><button class="btnEliminar">Eliminar</button></td>
        `;

        // Agregar fila al cuerpo de la tabla
        tablaBody.appendChild(fila);
    });
}

// Llamar a la función para mostrar las personas al cargar la página
document.addEventListener("DOMContentLoaded", cargarPersonasDesdeJSON);