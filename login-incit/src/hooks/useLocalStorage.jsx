import { useState, useEffect } from "react";

const getLocalValue = (key, initialValue) => {
    // for next.js or SSR
    if (typeof window === 'undefined') return initialValue;

    // if value is already stored in localStorage
    const localValue = localStorage.getItem(key);

    if (localValue !== null) {
        try {
            return JSON.parse(localValue);
        } catch (error) {
            console.error(`Error parsing localStorage key "${key}":`, error);
            return initialValue;
        }
    }

    // return the result of a function if initialValue is a function
    if (initialValue instanceof Function) return initialValue();

    // return initialValue if nothing is stored in localStorage
    return initialValue;
}

const useLocalStorage = (key, initValue) => {
    const [value, setValue] = useState(() => {
        return getLocalValue(key, initValue);
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}

export default useLocalStorage;
