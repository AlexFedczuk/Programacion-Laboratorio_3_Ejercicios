import { Vehiculo } from './Vehiculo.js';

export class Aereo extends Vehiculo {
  constructor(id, modelo, anoFab, velMax, altMax, autonomia) {
    super(id, modelo, anoFab, velMax);
    
    if (altMax <= 0) throw new Error("ERROR: La altitud máxima debe ser mayor a 0\n");
    if (autonomia <= 0) throw new Error("ERROR: La autonomía debe ser mayor a 0\n");

    this.altMax = altMax;
    this.autonomia = autonomia;
  }

  toString() {
    return `${super.toString()}, Alt. Máx: ${this.altMax} m, Autonomía: ${this.autonomia} km`;
  }
}