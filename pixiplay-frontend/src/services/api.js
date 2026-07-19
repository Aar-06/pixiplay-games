const BASE_URL = "http://localhost:8080";

export async function api(endpoint, options = {}) {

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
        },
        ...options,
    });

    if (!response.ok) {
        throw new Error("API request failed");
    }

    return response.json();
}