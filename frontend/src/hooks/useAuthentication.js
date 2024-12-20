import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";
import useLoading from "./useLoading";
import JoblyApi from "../utils/api";

export default function useAuthentication() {
    // Get the token from local storage
    const [token, setToken] = useLocalStorage("token");
    // Set the token in the JoblyApi
    JoblyApi.token = token;

    // Every time the token changes, update the token in the JoblyApi
    const saveToken = (userToken) => {
        JoblyApi.token = userToken;
        setToken(userToken);
    };

    // Clear the token from local storage and the JoblyApi
    const clearToken = () => {
        JoblyApi.token = null;
        setToken(null);
    };

    // Get the user from the JoblyApi
    const getUser = async () => {
        try {
            const { username } = JoblyApi.decode(token);
            return await JoblyApi.getUser(username);
        } catch (e) {
            return null;
        }
    };

    // Get the user from the JoblyApi and set it in state
    const [currentUser, setCurrentUser, isLoading] = useLoading(getUser());

    // Get the user from the JoblyApi when the token changes
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
