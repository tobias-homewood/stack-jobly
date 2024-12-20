import { useState } from "react";

export default function useLoading(initialValue) {
    const [isLoading, setIsLoading] = useState(true);

    const getInitialValue = async () => {
        const value = await initialValue;
        setIsLoading(false);
        return value;
    }

    const [state, setState] = useState(getInitialValue);

    const updateState = async (newValue) => {
        setIsLoading(true);
        setState(await newValue);
        setIsLoading(false);
    };

    return [state, updateState, isLoading];
}