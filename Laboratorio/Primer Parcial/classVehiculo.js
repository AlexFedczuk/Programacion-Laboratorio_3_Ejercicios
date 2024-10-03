export class Vehiculo {
    constructor(id, modelo, anoFab, velMax) {
        if (id <= 0) {
            throw new Error("Error: ID debe ser mayor a 0.");
        }
        if (!modelo || modelo.trim() === "") {
            throw new Error("Error: Modelo no puede estar vacío.");
        }
        if (anoFab <= 1885) {
            throw new Error("Error: Año de fabricación debe ser mayor a 1885.");
        }
        if (velMax <= 0) {
            throw new Error("Error: Velocidad máxima debe ser mayor a 0.");
        }

        this.id = id;
        this.modelo = modelo;
        this.anoFab = anoFab;
        this.velMax = velMax;
    }

    toString() {
        return `ID: ${this.id}, Modelo: ${this.modelo}, Año de Fabricación: ${this.anoFab}, Velocidad Máxima: ${this.velMax}`;
    }
}