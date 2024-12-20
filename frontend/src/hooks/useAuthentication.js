import { useState, useEffect } from "react";
import useLocalStorage from "./useLocalStorage";
import JoblyApi from "../utils/api";

export default function useAuthentication() {
    const [token, setToken] = useLocalStorage("token");

    const saveToken = (userToken) => {
        JoblyApi.token = userToken;
        setToken(userToken);
    };

    const clearToken = () => {
        JoblyApi.token = null;
        setToken(null);
    };

    const [isLoading, setIsLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            if (!token) {
                setCurrentUser(null);
            } else {
                const { username } = JoblyApi.decode(token);
                setCurrentUser(await JoblyApi.getUser(username));
            }
            setIsLoading(false);
        };
        fetchUser();
    }, [token]);

    return {
        isLoading,
        setToken: saveToken,
        clearToken,
        currentUser,
        setCurrentUser,
    };
}
