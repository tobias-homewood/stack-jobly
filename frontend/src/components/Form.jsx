import React, { useState } from "react";
import PropTypes from "prop-types";
import { Container, Card, Alert, Form as BootstrapForm, Button } from "react-bootstrap";

const Form = ({ title, inputs, onSubmit, submitButtonText = "Submit" }) => {
    const [formData, setFormData] = useState(
        inputs.reduce((acc, input) => {
            acc[input.name] = input.value || "";
            return acc;
        }, {})
    );
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prevent submission if any disabled inputs have changed
        for (const input of inputs) {
            if (input.disabled && input.value !== formData[input.name]) {
                setErrors(prevErrors => [...prevErrors, `${input.label} cannot be changed`,
                    `${input.value} !== ${formData[input.name]}`
                ]);
                return;
            }
        }

        try {
            await onSubmit(formData);
        } catch (e) {
            console.error(e);
            setErrors(Array.isArray(e) ? e : [e.message || "An error occurred"]);
        }
    };

    const handleChange = (e) => {
        const htmlInput = e.target;
        setFormData({ ...formData, [htmlInput.name]: htmlInput.value });
    };

    return (
        <Container className="mt-3">
            <h1 className="text-light">{title}</h1>
            <Card className="p-3 mt-3">
                {errors.length > 0 && (
                    <Alert variant="danger">
                        {errors.map((error, idx) => (
                            <p key={idx} className="mb-0">
                                {error}
                            </p>
                        ))}
                    </Alert>
                )}
                <BootstrapForm onSubmit={handleSubmit}>
                    {inputs.map((input) => (
                        <BootstrapForm.Group key={input.name}>
                            <BootstrapForm.Label>{input.label}</BootstrapForm.Label>
                            <BootstrapForm.Control
                                type={input.type || "text"}
                                value={formData[input.name]}
                                name={input.name}
                                onChange={handleChange}
                                disabled={input.disabled}
                            />
                        </BootstrapForm.Group>
                    ))}
                    <Button className="mt-3" type="submit">{submitButtonText}</Button>
                </BootstrapForm>
            </Card>
        </Container>
    );
};

// Properties structure
// types of each property and if it's required or not
Form.propTypes = {
    title: PropTypes.string.isRequired,
    inputs: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            type: PropTypes.string,
            value: PropTypes.string,
            disabled: PropTypes.bool,
        })
    ).isRequired,
    onSubmit: PropTypes.func.isRequired,
    submitButtonText: PropTypes.string,
};

export default Form;

// example usage
/* 
<Form title="Login" inputs={[ { name: "username", label: "Username" }, { name: "password", label: "Password", type: "password" } ]} onSubmit={handleSubmit} submitButtonText="Login" />

<Form title="Create a new company" inputs={[ { name: "name", label: "Company Name" }, { name: "handle", label: "Company Handle" } ]} onSubmit={handleSubmit} submitButtonText="Create Company" /> 
*/
