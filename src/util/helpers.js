import { useEffect, useState, useRef } from 'react';
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

// date utils (should be moved to diff util file)
export const DAY_OF_WEEK_OPTIONS = [
    { id: '1', name: 'Monday' },
    { id: '2', name: 'Tuesday' },
    { id: '3', name: 'Wednesday' },
    { id: '4', name: 'Thursday' },
    { id: '5', name: 'Friday' },
    { id: '6', name: 'Saturday' },
    { id: '7', name: 'Sunday' },
];

export function getWeekString(date) {
    const dayOfWeek = date.getDay();
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - (dayOfWeek === 1 ? 0 : dayOfWeek - 1));

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);
    return `${startOfWeek.toISOString().slice(0, 10)} - ${endOfWeek.toISOString().slice(0, 10)}`;
}

export function getDateWithOffset(date, offset) {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + offset);
    return newDate;
}

export function getNearestPastMonday(date) {
    const dayOfWeek = date.getDay();
    const nearestPastMonday = new Date(date);
    nearestPastMonday.setDate(date.getDate() - (dayOfWeek === 1 ? 0 : dayOfWeek - 1));
    return nearestPastMonday;
}

export function dateStr(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
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

export function cmpDates(d1, d2) {
    return d2.getTime() < d1.getTime();
}

export function addTimeToDate(date, time) {
    const [hours, minutes, seconds] = time.split(':');
    const newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    newDate.setHours(hours);
    newDate.setMinutes(minutes);
    newDate.setSeconds(seconds);
    return newDate;
}

export function handleWeekDay(date) {
    // get previous week if sunday
    date = date ?? new Date();
    if (date.getDay() === 0) {
        return getDateWithOffset(date, -1);
    }

    return date;
}

export const useEffectOnce = (effect) => {

    const destroyFunc = useRef();
    const effectCalled = useRef(false);
    const renderAfterCalled = useRef(false);
    const [val, setVal] = useState(0);

    if (effectCalled.current) {
        renderAfterCalled.current = true;
    }

    useEffect(() => {

        // only execute the effect first time around
        if (!effectCalled.current) {
            destroyFunc.current = effect();
            effectCalled.current = true;
        }

        // this forces one render after the effect is run
        setVal(val => val + 1);

        return () => {
            // if the comp didn't render since the useEffect was called,
            // we know it's the dummy React cycle
            if (!renderAfterCalled.current) { return; }
            if (destroyFunc.current) { destroyFunc.current(); }
        };
    }, []);
};