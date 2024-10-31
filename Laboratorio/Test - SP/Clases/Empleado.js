import Persona from './Persona.js';

export class Empleado extends Persona {
    constructor(id, nombre, apellido, edad, sueldo, ventas) {
        super(id, nombre, apellido, edad);
        this.sueldo = this.#validarFlotante(sueldo, "sueldo");
        this.ventas = this.#validarEntero(ventas, "ventas", 1);
    }

    #validarFlotante(valor, campo) {
        if (typeof valor !== "number" || isNaN(valor) || valor < 0) {
            throw new Error(`ERROR: ${campo} debe ser un número flotante mayor o igual a 0.`);
        }
        return valor;
    }

    #validarEntero(valor, campo, min = 1) {
        if (!Number.isInteger(valor) || valor < min) {
            throw new Error(`ERROR: ${campo} debe ser un número entero mayor o igual a ${min}.`);
        }
        return valor;
    }

    toString() {
        return `ID: ${this.id}, Nombre: ${this.nombre}, Apellido: ${this.apellido}, Edad: ${this.edad}, Sueldo: ${this.sueldo}, Ventas: ${this.ventas}`;
    }
}