import { Persona } from "./Persona.js";

export class Empleado extends Persona {
  constructor(id, nombre, apellido, edad, puesto, salario) {
    super(id, nombre, apellido, edad);
    if (!puesto || salario < 0) {
      throw new Error("ERROR: Datos inválidos para Empleado");
    }
    this.puesto = puesto;
    this.salario = salario;
  }

  toString() {
    return `${super.toString()}, Puesto: ${this.puesto}, Salario: ${this.salario}`;
  }
}