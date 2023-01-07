import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

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

export function getSaturdayOfNextWeek() {
    const today = new Date();
    const first = today.getDate() - today.getDay() + 1;
    const sixth = first + 5;
    const nextSaturday = sixth + 7;

    const saturday = new Date(today.setDate(nextSaturday));

    return saturday.toISOString().split('T')[0];
}

export function formatFromTo(start, end) {
    const startHours = start.getHours();
    let startMinutes = start.getMinutes();
    const endHours = end.getHours();
    let endMinutes = end.getMinutes();

    startMinutes = startMinutes.toString().padStart(2, '0');
    endMinutes = endMinutes.toString().padStart(2, '0');

    const startString = `${startHours}:${startMinutes}`;
    const endString = `${endHours}:${endMinutes}`;

    return `${startString} - ${endString}`;
}

export function toDayjs(timeString) {
    const [hours, minutes, seconds] = timeString.split(':')
    return dayjs().hour(hours).minute(minutes).second(seconds)
}

export function handleCourtTimelineTitle(court) {
    if (!Object.keys(court).length) {
        return "Timeline";
    }

    return `Timeline: ${court?.location?.name ?? 'No location'} - ${court?.name ?? 'No court'}`;
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

export const DAY_OF_WEEK_OPTIONS = [
    { id: '1', name: 'Monday' },
    { id: '2', name: 'Tuesday' },
    { id: '3', name: 'Wednesday' },
    { id: '4', name: 'Thursday' },
    { id: '5', name: 'Friday' },
    { id: '6', name: 'Saturday' },
    { id: '7', name: 'Sunday' },
];