import { Vehiculo } from './classVehiculo.js';

export class Aereo extends Vehiculo {
    constructor(id, modelo, anoFab, velMax, altMax, autonomia) {
        super(id, modelo, anoFab, velMax);

        if (altMax <= 0) {
            throw new Error("Error: Altura máxima debe ser mayor a 0.");
        }
        if (autonomia <= 0) {
            throw new Error("Error: Autonomía debe ser mayor a 0.");
        }

        this.altMax = altMax;
        this.autonomia = autonomia;
    }

    toString() {
        return `${super.toString()}, Altura Máxima: ${this.altMax}, Autonomía: ${this.autonomia}`;
    }
}