export const API = "https://django-rezervacije.azurewebsites.net/api";

export function asFormData(jsonData) {
    const form_data = new FormData();
    for (const key in jsonData) {
        form_data.append(key, jsonData[key]);
    }

    return form_data;
}

export function apiRequest({ url, method, body, okStatus }) {
    return new Promise(async (resolve, reject) => {
        const response = await fetch(`${API}${url}`, {
            method, body
        });

        if (response.status === (okStatus ?? 200)) {
            resolve(response.json());
        } else {
            reject(response.status);
        }
    });
}