export class Vehiculo {
    constructor(id, modelo, anoFab, velMax) {
      if (id <= 0) throw new Error("ERROR: El ID debe ser mayor a 0\n");
      if (modelo.trim() === "") throw new Error("ERROR: El modelo no puede estar vacío\n");
      if (anoFab <= 1885) throw new Error("ERROR: El año de fabricación debe ser mayor a 1885\n");
      if (velMax <= 0) throw new Error("ERROR: La velocidad máxima debe ser mayor a 0\n");
  
      this.id = id;
      this.modelo = modelo;
      this.anoFab = anoFab;
      this.velMax = velMax;
    }
  
    toString() {
      return `ID: ${this.id}, Modelo: ${this.modelo}, Año: ${this.anoFab}, Vel. Máx: ${this.velMax} km/h`;
    }
}