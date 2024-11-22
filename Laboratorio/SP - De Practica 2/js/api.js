
const apiUrl = "https://examenesutn.vercel.app/api/VehiculoAutoCamion";

// Obtener lista inicial desde la API
export const fetchVehiclesList = async () => {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`Error ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error("Error al obtener los datos:", error);
        throw error;
    }
};

// Enviar datos a la API para creación o modificación
export const sendVehicleToApi = async (method, data) => {
    try {
        const response = await fetch(apiUrl, {
            method: method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error(`Error ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error("Error al enviar los datos:", error);
        throw error;
    }
};
