class Empleado extends Persona {
    constructor(id, nombre, apellido, edad, compras, telefono){
        super(id, nombre, apellido, edad)

        if(typeof compras !== "number" || compras <= 0){
            throw new Error("Error: Las compras debe ser mayor a $0.");
        }

        if(!telefono){
            throw new Error("Error: El telefono es requerido.");
        }

        this.compras = compras;
        this.telefono = telefono;        
    }

    toString() {
        return `${super.toString()}, Compras: ${this.compras}, Telefono: ${this.telefono}`;
    }

    toJson() {
        const personaJson = JSON.parse(super.toJson());
        personaJson.compras = this.compras;
        personaJson.telefono = this.telefono;
        return JSON.stringify(personaJson);
    }
}