import { Persona } from "./Persona.js";

export class Cliente extends Persona {
  constructor(id, nombre, apellido, edad, email, telefono) {
    super(id, nombre, apellido, edad);
    if (!email || !telefono) {
      throw new Error("ERROR: Datos inválidos para Cliente");
    }
    this.email = email;
    this.telefono = telefono;
  }

  toString() {
    return `${super.toString()}, Email: ${this.email}, Teléfono: ${this.telefono}`;
  }
}
