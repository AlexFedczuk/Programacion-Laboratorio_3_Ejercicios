export class Vehiculo {
    constructor(id, modelo, anoFabricacion, velMax) {
        this.id = this.#validarEntero(id, "ID");
        this.modelo = this.#validarNombreApellido(modelo, "modelo");
        this.anoFabricacion = this.#validarEntero(anoFabricacion, "anoFabricacion", 1985);
        this.velMax = this.#validarFlotante(velMax, "velMax");
    }

    #validarEntero(valor, campo, min = 1) {
        if (!Number.isInteger(valor) || valor < min) {
            throw new Error(`ERROR: ${campo} debe ser un número entero mayor o igual a ${min}.\n`);
        }
        return valor;
    }

    #validarFlotante(valor, campo) {
        if (typeof valor !== "number" || isNaN(valor) || valor < 0) {
            throw new Error(`ERROR: ${campo} debe ser un número flotante mayor o igual a 0.\n`);
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
        return `ID: ${this.id}, modelo: ${this.modelo}, anoFabricacion: ${this.anoFabricacion}, velMax: ${this.velMax}\n`;
    }
}