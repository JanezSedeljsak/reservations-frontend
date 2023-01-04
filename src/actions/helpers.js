import { useEffect, useState } from 'react';

export const API = "https://lp0667.pythonanywhere.com/api";

export function asFormData(jsonData) {
    const form_data = new FormData();
    for (const key in jsonData) {
        form_data.append(key, jsonData[key]);
    }

    return form_data;
}

export function handleCourtLocation(court) {
    if (!court?.location?.name) {
        return "";
    }

    let str = court?.location?.city?.name || "";
    if (str.length) {
        str += " - ";
    }

    str += court.location.name;
    return str;
}

export function concatCourtTypes(court) {
    if (!court?.court_types) { 
      return '/';
    }

    const arr = court.court_types.map(x => x.name);
    return arr.join(", ");
  }

export function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay || 500)

        return () => {
            clearTimeout(timer)
        }
    }, [value, delay])

    return debouncedValue
}

export function apiRequest({ url, method, body, okStatus, token }) {
    let requestObject = {
        method, body
    };

    if (token) {
        requestObject = {
            ...requestObject, headers: {
                "Authorization": "Bearer " + token,
            }
        }
    }

    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(`${API}${url}`, requestObject);
            if (okStatus === 204 && response.status === okStatus) {
                resolve(true);
            } else if (response.status === (okStatus ?? 200)) {
                resolve(response.json());
            } else {
                reject(response.status);
            }
        } catch (err) {
            console.err(err);
            reject(-1);
        }
    });
}