import { useState, useEffect } from "react";
import JoblyApi from "../utils/api";

export default function useAuthentication() {
    // Get token from local storage
    const getToken = () => {
        return localStorage.getItem("token");
    };

    const [token, setToken] = useState(getToken());

    const saveToken = (userToken) => {
        JoblyApi.token = userToken;
        localStorage.setItem("token", userToken);
        setToken(userToken);
    };

    const clearToken = () => {
        JoblyApi.token = null;
        localStorage.removeItem("token");
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
