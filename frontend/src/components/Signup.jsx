import { useContext } from "react";
import CurrentUserContext from "../utils/currentUserContext";
import { useNavigate } from "react-router-dom";
import JoblyApi from "../utils/api";
import Form from "./Form";

const Signup = () => {
    const { setCurrentUser } = useContext(CurrentUserContext);

    const navigate = useNavigate();

    const signup = async (formData) => {
        const token = await JoblyApi.register(formData);
        JoblyApi.token = token;
        const user = await JoblyApi.getUser(formData.username);
        setCurrentUser(user);
        navigate("/");
    }

    return (
        <div>
            <Form
                title="Sign Up"
                inputs={[
                    { name: "username", label: "Username" },
                    { name: "firstName", label: "First Name" },
                    { name: "lastName", label: "Last Name" },
                    { name: "email", label: "Email", type: "email" },
                    { name: "password", label: "Password", type: "password" },
                ]}
                onSubmit={signup}
                submitButtonText="Sign up"
            />
        </div>
    );
};

export default Signup;