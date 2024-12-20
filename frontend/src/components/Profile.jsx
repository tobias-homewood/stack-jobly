import { useState, useContext } from "react";
import CurrentUserContext from "../utils/currentUserContext";
import Form from "./Form";
import JoblyApi from "../utils/api";
import { Alert } from "react-bootstrap";

const Profile = () => {
    const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
    const [successMsg, setSuccessMsg] = useState(null);

    const updateUser = async (formData) => {
        const { username, ...updatedFields } = formData;
        // Update the user in the backend
        const newUserData = await JoblyApi.updateUser(username, updatedFields);

        // Update the user in the context and display a success message
        setCurrentUser(newUserData);
        setSuccessMsg("Profile updated successfully");
    };

    return (
        <>
            {successMsg && (
                <Alert className="mt-3 mx-5" variant="success">
                    {successMsg}
                </Alert>
            )}
            <Form
                title="Profile"
                inputs={[
                    {
                        name: "username",
                        label: "Username",
                        value: currentUser.username,
                        disabled: true,
                    },
                    {
                        name: "firstName",
                        label: "First Name",
                        value: currentUser.firstName,
                    },
                    {
                        name: "lastName",
                        label: "Last Name",
                        value: currentUser.lastName,
                    },
                    {
                        name: "email",
                        label: "Email",
                        value: currentUser.email,
                        type: "email",
                    },
                ]}
                submitButtonText="Save Changes"
                onSubmit={updateUser}
            />
        </>
    );
};

export default Profile;
