import { useState } from "react";

export default function useLocalStorage(key, defaultValue = null) {
    const getInitialValue = () => {
        const value = localStorage.getItem(key);
        if (value === null) return defaultValue;
        return value;
    };

    const [storedValue, setStoredValue] = useState(getInitialValue);

    const setValue = (value) => {
        if (value === null) {
            localStorage.removeItem(key);
            setStoredValue(null);
            return;
        }
        setStoredValue(value);
        localStorage.setItem(key, value);
    };

    return [storedValue, setValue];
}