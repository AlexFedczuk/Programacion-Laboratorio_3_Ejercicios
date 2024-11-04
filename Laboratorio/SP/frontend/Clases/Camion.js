import { Vehiculo } from "./Vehiculo.js";

export class Camion extends Vehiculo {
    constructor(id, modelo, anoFabricacion, velMax, carga, autonomia) {
        super(id, modelo, anoFabricacion, velMax);
        this.carga = this.#validarEntero(carga, "carga", 1);
        this.autonomia = this.#validarEntero(autonomia, "autonomia", 1);
    }

    #validarEntero(valor, campo, min = 1) {
        if (!Number.isInteger(valor) || valor < min) {
            throw new Error(`ERROR: ${campo} debe ser un número entero mayor o igual a ${min}.\n`);
        }
        return valor;
    }

    toString() {
        return `ID: ${this.id}, modelo: ${this.modelo}, anoFabricacion: ${this.anoFabricacion}, velMax: ${this.velMax}, carga: ${this.carga}, autonomia: ${this.autonomia}\n`;
    }
}