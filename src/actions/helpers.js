export const API = "https://django-rezervacije.azurewebsites.net/api";

export function asFormData(jsonData) {
    const form_data = new FormData();
    for (const key in jsonData) {
        form_data.append(key, jsonData[key]);
    }

    return form_data;
}

export function apiRequest({ url, method, body, okStatus, token }) {
    let requestObject = {
        method, body
    };

    if (token) {
        requestObject = { ...requestObject, headers: { 
            "Authorization": "Bearer " + token,
        }}
    }

    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(`${API}${url}`, requestObject);
            if (response.status === (okStatus ?? 200)) {
                resolve(response.json());
            } else {
                reject(response.status);
            }
        } catch (err) {
            console.log(err);
            reject(-1);
        }
    });
}