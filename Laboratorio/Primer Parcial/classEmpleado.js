class Empleado extends Persona {
    constructor(id, nombre, apellido, edad, sueldo, ventas){
        super(id, nombre, apellido, edad)

        if(typeof sueldo !== "number" || sueldo <= 0){
            throw new Error("Error: El sueldo debe ser mayor a $0.");
        }

        if(typeof ventas !== "number" || ventas <= 0){
            throw new Error("Error: Las ventas deben ser debe ser un numero mayor a 0.");
        }

        this.sueldo = sueldo;
        this.ventas = ventas;        
    }

    toString() {
        return `${super.toString()}, Sueldo: ${this.sueldo}, Ventas: ${this.ventas}`;
    }

    toJson() {
        const personaJson = JSON.parse(super.toJson());
        personaJson.sueldo = this.sueldo;
        personaJson.ventas = this.ventas;
        return JSON.stringify(personaJson);
    }
}