import { Empleado } from './classEmpleado.js';
import { Cliente } from './classCliente.js';

export function generarArrayObjetos(data) {
    const resultado = [];

    data.forEach(obj => {
        const { id, nombre, apellido, edad, sueldo, ventas, compras, telefono } = obj;

        if (sueldo !== undefined && ventas !== undefined) {
            resultado.push(new Empleado(id, nombre, apellido, edad, sueldo, ventas));
        } else if (compras !== undefined && telefono !== undefined) {
            resultado.push(new Cliente(id, nombre, apellido, edad, compras, telefono));
        } else {
            console.error(`Error: El objeto con ID ${id} no coincide con Empleado ni Cliente.`);
        }
    });

    return resultado;
}

export function crearTabla(datos) {
    const tabla = document.getElementById("tablaPersonas").querySelector("tbody");

    // Limpiar el contenido existente del tbody antes de agregar nuevas filas
    tabla.innerHTML = "";

    datos.forEach(persona => {
        const fila = document.createElement("tr");

        // Crear las celdas en función de las propiedades de cada objeto
        let celdaId = document.createElement("td");
        celdaId.textContent = persona.id;
        fila.appendChild(celdaId);

        let celdaNombre = document.createElement("td");
        celdaNombre.textContent = persona.nombre;
        fila.appendChild(celdaNombre);

        let celdaApellido = document.createElement("td");
        celdaApellido.textContent = persona.apellido;
        fila.appendChild(celdaApellido);

        let celdaEdad = document.createElement("td");
        celdaEdad.textContent = persona.edad;
        fila.appendChild(celdaEdad);

        // Verificar si la persona es un Empleado o Cliente y añadir los campos correspondientes
        if (persona.sueldo !== undefined) { // Empleado
            let celdaSueldo = document.createElement("td");
            celdaSueldo.textContent = persona.sueldo;
            fila.appendChild(celdaSueldo);

            let celdaVentas = document.createElement("td");
            celdaVentas.textContent = persona.ventas;
            fila.appendChild(celdaVentas);

            // Dejar las columnas de compras y teléfono vacías
            fila.appendChild(document.createElement("td"));
            fila.appendChild(document.createElement("td"));
        } else if (persona.compras !== undefined) { // Cliente
            // Dejar las columnas de sueldo y ventas vacías
            fila.appendChild(document.createElement("td"));
            fila.appendChild(document.createElement("td"));

            let celdaCompras = document.createElement("td");
            celdaCompras.textContent = persona.compras;
            fila.appendChild(celdaCompras);

            let celdaTelefono = document.createElement("td");
            celdaTelefono.textContent = persona.telefono;
            fila.appendChild(celdaTelefono);
        }

        // Añadir la fila a la tabla
        tabla.appendChild(fila);
    });
}