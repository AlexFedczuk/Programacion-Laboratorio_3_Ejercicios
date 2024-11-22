import Vehiculo from './Vehiculo.js';

export default class Auto extends Vehiculo {
    constructor(id, modelo, anoFabricacion, velMax, cantidadPuertas, asientos) {
        super(id, modelo, anoFabricacion, velMax);
        this.cantidadPuertas = cantidadPuertas;
        this.asientos = asientos;
    }

    toString() {
        return `${super.toString()}, Cantidad de puertas: ${this.P_cantidadPuertas}, Asientos: ${this.asientos}`;
    }

    toJson() {
        const vehiculoAJson = super.toJson();
        const AutoAJson = {
            cantidadPuertas: this.cantidadPuertas,
            asientos: this.asientos
        };
        return JSON.stringify({ ...JSON.parse(vehiculoAJson), ...AutoAJson });
    }
}