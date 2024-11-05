import { Vehiculo } from "./Vehiculo.js";

export class Auto extends Vehiculo {
    constructor(id, modelo, anoFabricacion, velMax, cantidadPuertas, asientos) {
        super(id, modelo, anoFabricacion, velMax);
        this.cantidadPuertas = cantidadPuertas; //this.#validarEntero(cantidadPuertas, "cantidadPuertas", 2);
        this.asientos = asientos; //this.#validarEntero(asientos, "asientos", 2);
    }

    /*#validarEntero(valor, campo, min = 1) {
        if (!Number.isInteger(valor) || valor < min) {
            throw new Error(`ERROR: ${campo} debe ser un número entero mayor o igual a ${min}.\n`);
        }
        return valor;
    }*/

    toString() {
        return `ID: ${this.id}, modelo: ${this.modelo}, anoFabricacion: ${this.anoFabricacion}, velMax: ${this.velMax}, cantidadPuertas: ${this.cantidadPuertas}, asientos: ${this.asientos}\n`;
    }
}