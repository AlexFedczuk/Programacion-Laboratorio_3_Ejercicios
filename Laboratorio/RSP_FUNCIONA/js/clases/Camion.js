import Vehiculo from "./Vehiculo.js";

export default class Camion extends Vehiculo {
    constructor(id, modelo, anoFabricacion, velMax, carga, autonomia) {
        super(id, modelo, anoFabricacion, velMax);
        this.carga = carga;
        this.autonomia = autonomia;
    }

    toString() {
        return `${super.toString()}, Carga: ${this.carga}, Autonomia: ${this.autonomia}`;
    }

    toJson() {
        const vehiculoAJson = super.toJson();
        const camionAJson = {
            carga: this.carga,
            autonomia: this.autonomia
        };
        return JSON.stringify({ ...JSON.parse(vehiculoAJson), ...camionAJson });
    }
}