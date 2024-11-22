
// Generar un ID único basado en la lista en memoria
export const generateUniqueId = (vehiclesList) => {
    const ids = vehiclesList.map(vehicle => vehicle.id);
    return ids.length > 0 ? Math.max(...ids) + 1 : 1;
};
