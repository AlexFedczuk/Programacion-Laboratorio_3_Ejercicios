export class Persona {
    constructor(id, nombre, apellido, edad) {
        this.id = this.#validarEntero(id, "ID");
        this.nombre = this.#validarNombreApellido(nombre, "nombre");
        this.apellido = this.#validarNombreApellido(apellido, "apellido");
        this.edad = this.#validarEntero(edad, "edad", 15);
    }

    #validarEntero(valor, campo, min = 1) {
        if (!Number.isInteger(valor) || valor < min) {
            throw new Error(`ERROR: ${campo} debe ser un número entero mayor o igual a ${min}.\n`);
        }
        return valor;
    }

    #validarNombreApellido(campo, tipo) {
        if (typeof campo !== "string" || campo.trim() === "") {
            throw new Error(`ERROR: El ${tipo} no puede estar vacío y debe ser una cadena de texto.\n`);
        }
        return campo;
    }

    toString() {
        return `ID: ${this.id}, Nombre: ${this.nombre}, Apellido: ${this.apellido}, Edad: ${this.edad}\n`;
    }
}