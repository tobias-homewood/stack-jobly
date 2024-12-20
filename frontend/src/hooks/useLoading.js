import { useEffect, useState } from "react";

export default function useLoading(initialValue) {
    const [isLoading, setIsLoading] = useState(true);

    const [state, setState] = useState(null);

    useEffect(() => {
        const setInitialValue = async () => {
            setState(await initialValue);
            setIsLoading(false);
        };
        setInitialValue();
    }, [initialValue]);

    const updateState = async (newValue) => {
        setIsLoading(true);
        setState(await newValue);
        setIsLoading(false);
    };

    return [state, updateState, isLoading];
}