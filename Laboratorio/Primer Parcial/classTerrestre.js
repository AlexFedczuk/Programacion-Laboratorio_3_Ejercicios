import { Vehiculo } from './classVehiculo.js';

export class Terrestre extends Vehiculo {
    constructor(id, modelo, anoFab, velMax, cantPue, cantRue) {
        super(id, modelo, anoFab, velMax);

        if (cantPue <= -1) {
            throw new Error("Error: Cantidad de Puertas debe ser mayor a -1.");
        }
        if (cantRue <= 0) {
            throw new Error("Error: Cantidad de Ruedas debe ser mayor a 0.");
        }

        this.cantPue = cantPue;
        this.cantRue = cantRue;
    }

    toString() {
        return `${super.toString()}, Cantidad de Puertas: ${this.cantPue}, Cantidad de Ruedas: ${this.cantRue}`;
    }
}