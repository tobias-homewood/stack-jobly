import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";
import useLoading from "./useLoading";
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

    const getUser = async () => {
        try {
            const { username } = JoblyApi.decode(token);
            return await JoblyApi.getUser(username);
        } catch (e) {
            return null;
        }
    };

    const [currentUser, setCurrentUser, isLoading] = useLoading(getUser());

    useEffect(() => {
        setCurrentUser(getUser());
    }, [token]);

    return {
        isLoading,
        setToken: saveToken,
        clearToken,
        currentUser,
        setCurrentUser,
    };
}
