import { useContext } from "react";
import CurrentUserContext from "../utils/currentUserContext";
import { useNavigate } from "react-router-dom";
import JoblyApi from "../utils/api";
import Form from "./Form";

const Login = () => {
    const { setCurrentUser } = useContext(CurrentUserContext);

    const navigate = useNavigate();

    const login = async (formData) => {
        const token = await JoblyApi.login(formData);
        JoblyApi.token = token;
        const user = await JoblyApi.getUser(formData.username);
        setCurrentUser(user);
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