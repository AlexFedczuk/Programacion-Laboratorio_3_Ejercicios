import { Empleado } from './classEmpleado.js';
import { Cliente } from './classCliente.js';

export function generarArrayDeObjetos(data) {
    const dataArray = JSON.parse(cadenaJson);
    const resultado = [];

    dataArray.forEach(obj => {
        const {id, nombre, apellido, edad, sueldo, ventas, compras, telefono} = obj;

        if (sueldo !== undefined && ventas !== undefined) {
            resultado.push(new Empleado(id, nombre, apellido, edad, sueldo, ventas));
        }else if (compras !== undefined && telefono !== undefined) {
            resultado.push(new Cliente(id, nombre, apellido, edad, compras, telefono));
        } else {
            console.error(`Error: El objeto con ID ${id} no coincide con Empleado ni Cliente.`)
        }
    });

    return resultado;
}

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