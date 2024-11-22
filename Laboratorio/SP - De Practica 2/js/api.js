
//const apiUrl = "https://examenesutn.vercel.app/api/VehiculoAutoCamion";
const apiUrl = "http://localhost/api/VehiculoAutoCamion";

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
    // Filtrar campos vacíos o nulos
    const filteredData = Object.fromEntries(
        Object.entries(data).filter(([_, value]) => value !== null && value !== "")
    );

    console.log("Datos enviados a la API (post-filtrado):", filteredData);

    try {
        const response = await fetch(apiUrl, {
            method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(filteredData),
        });

        console.log("Estado de la respuesta:", response.status);
        const responseData = await response.json();

        if (!response.ok) {
            console.error("Error en la respuesta de la API:", responseData);
            throw new Error(`Error de la API: ${responseData.message || "Respuesta inválida"}`);
        }

        console.log("Respuesta de la API:", responseData);
        return responseData;
    } catch (error) {
        console.error("Error en el envío a la API o en la respuesta:", error.message);
        throw new Error(`Error en la solicitud: ${error.message}`);
    }
};

