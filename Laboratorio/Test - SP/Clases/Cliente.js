import Persona from './Persona.js';

export class Cliente extends Persona {
    constructor(id, nombre, apellido, edad, compras, telefono) {
        super(id, nombre, apellido, edad);
        this.compras = this.#validarFlotante(compras, "compras");
        this.telefono = this.#validarEntero(telefono, "telefono", 10000000);
    }

    #validarFlotante(valor, campo) {
        if (typeof valor !== "number" || isNaN(valor) || valor < 0) {
            throw new Error(`ERROR: ${campo} debe ser un número flotante mayor o igual a 0.\n`);
        }
        return valor;
    }

    #validarEntero(valor, campo, min = 1) {
        if (!Number.isInteger(valor) || valor < min) {
            throw new Error(`ERROR: ${campo} debe ser un número entero mayor o igual a ${min}.\n`);
        }
        return valor;
    }

    toString() {
        return `ID: ${this.id}, Nombre: ${this.nombre}, Apellido: ${this.apellido}, Edad: ${this.edad}, Compras: ${this.compras}, Teléfono: ${this.telefono}\n`;
    }
}
