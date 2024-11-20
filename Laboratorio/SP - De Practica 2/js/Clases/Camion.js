import Vehiculo from './Vehiculo.js';

export default class Camion extends Vehiculo {
    constructor(id, modelo, anoFabricacion, velMax, carga, autonomia) {
        super(id, modelo, anoFabricacion, velMax);
        this.carga = carga;
        this.autonomia = autonomia;
    }
}