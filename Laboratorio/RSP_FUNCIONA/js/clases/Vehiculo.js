export default class Vehiculo { 
    constructor(id, modelo, anoFabricacion, velMax) {
        this.id = id;
        this.modelo = modelo;
        this.anoFabricacion = anoFabricacion;
        this.velMax = velMax;
    }

    toString() {
        return `ID: ${this.id}, Modelo: ${this.modelo}, Anio de Fabricacion: ${this.anoFabricacion}, Velocidad Maxima: ${this.velMax}`;
    }

    toJson() {
        return JSON.stringify({
            id: this.id,
            modelo: this.modelo,
            anoFabricacion: this.anoFabricacion,
            velMax: this.velMax
        });
    }
}

