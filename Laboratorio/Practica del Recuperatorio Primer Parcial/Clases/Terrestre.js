import { Vehiculo } from './Vehiculo.js';

export class Terrestre extends Vehiculo {
  constructor(id, modelo, anoFab, velMax, cantPue, cantRue) {
    super(id, modelo, anoFab, velMax);
    
    if (cantPue < 0) throw new Error("ERROR: La cantidad de puertas debe ser mayor o igual a 0\n");
    if (cantRue <= 0) throw new Error("ERROR: La cantidad de ruedas debe ser mayor a 0\n");

    this.cantPue = cantPue;
    this.cantRue = cantRue;
  }

  toString() {
    return `${super.toString()}, Puertas: ${this.cantPue}, Ruedas: ${this.cantRue}`;
  }
}