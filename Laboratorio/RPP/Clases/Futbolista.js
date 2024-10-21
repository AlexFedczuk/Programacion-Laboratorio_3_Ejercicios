import { Persona } from './Persona.js';

export class Futbolista extends Persona {
    constructor(id, nombre, apellido, edad, equipo, posicion, cantidadGoles) {
      super(id, nombre, apellido, edad);
  
      if (!equipo || equipo.trim() === '') {
        throw new Error("ERROR: El equipo no puede estar vacío");
      }
      if (!posicion || posicion.trim() === '') {
        throw new Error("ERROR: La posición no puede estar vacía");
      }
      if (cantidadGoles < 0) {
        throw new Error("ERROR: La cantidad de goles debe ser un número mayor o igual a 0");
      }
  
      this.equipo = equipo;
      this.posicion = posicion;
      this.cantidadGoles = cantidadGoles;
    }
  
    toString() {
      return `${super.toString()}, Equipo: ${this.equipo}, Posición: ${this.posicion}, Goles: ${this.cantidadGoles}`;
    }
}  