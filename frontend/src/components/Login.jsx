import { useContext } from "react";
import CurrentUserContext from "../utils/currentUserContext";
import { useNavigate } from "react-router-dom";
import JoblyApi from "../utils/api";
import Form from "./Form";

const Login = () => {
    const { setToken } = useContext(CurrentUserContext);

    const navigate = useNavigate();

    const login = async (formData) => {
        const token = await JoblyApi.login(formData);
        setToken(token);
        navigate("/");
    };

    return (
        <Form
            title="Log In"
            inputs={[
                { name: "username", label: "Username" },
                { name: "password", label: "Password", type: "password" },
            ]}
            onSubmit={login}
            submitButtonText="Log in"
        />
    );
};

export default Login;