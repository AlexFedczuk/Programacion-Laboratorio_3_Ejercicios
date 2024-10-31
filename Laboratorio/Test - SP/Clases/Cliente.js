import Persona from './Persona.js';

export class Cliente extends Persona {
    constructor(id, nombre, apellido, edad, compras, telefono) {
        super(id, nombre, apellido, edad);
        if (!compras || compras < 0) {
            throw new Error("ERROR: El valor de compras es invalido, debe ser  mayor a un numero negativo.");
        }
        if (!telefono || telefono <= 9999999) {
            throw new Error("ERROR: El numero de telefono es invalido, debe ser mayor a 999.999,00.");
        }

        this.compras = compras;
        this.telefono = telefono;
    }

    toString() {
        return `ID: ${this.id}, Nombre: ${this.nombre}, Apellido: ${this.apellido}, Edad: ${this.edad}, Compras: ${this.compras}, Telefono: ${this.telefono}`;
    }
}