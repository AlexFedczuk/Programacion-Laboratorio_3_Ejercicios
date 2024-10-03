export class Persona {
    constructor(id, nombre, apellido, edad){
        if(!Number.isInteger(id) || id <= 0){
            throw new Error("Error: El ID debe ser un numero entero y positivo.");
        }

        if(!nombre || !apellido){
            throw new Error("Error: El nombre y apellido son requeridos.");
        }

        if(!Number.isInteger(edad) || edad <= 15){
            throw new Error("Error: La edad debe ser mayor a 15 años.");
        }

        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;        
    }

    toString() {
        return `ID: ${this.id}, Nombre: ${this.nombre}, ${this.apellido}, Edad: ${this.edad}`;
    }

    toJson() {
        return JSON.stringify({
            id: this.id,
            nombre: this.nombre,
            apellido: this.apellido,
            edad: this.edad
        });
    }
}