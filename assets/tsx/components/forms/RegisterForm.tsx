import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import useApiRequest, { ApiRequestData } from "../../hooks/ApiRequest";

interface RegisterFormData extends ApiRequestData {
    username: string;
    email: string;
    password: string;
}

const RegisterForm = () => {
    const { post, isLoading, data } = useApiRequest();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    
    useEffect(() => {
        console.log(data);
    }, [ isLoading ]);
    
    return (
        <Form 
            onSubmit={
                handleSubmit(
                    (registerData) => {
                        post("register", { ...registerData } as RegisterFormData, true);
                    }
                )}
        >
            <Form.Group className="mb-3" controlId="register-username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="input"
                    placeholder="Enter Username"
                    {...register("username", {
                        required: "Username is required",
                        pattern: {
                            value: /^\w{4,12}$/i,
                            message: "Invalid Username",
                        },
                    })}
                />
                <Form.Text className="text-muted">
                    We&apos;ll never share your age with anyone else.
                </Form.Text>
                {errors.username && <p>{errors.username.message as string}</p>}
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="register-email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="input"
                    placeholder="Enter Email"
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message: "Invalid email address" 
                        },
                    })}
                />
                <Form.Text className="text-muted">
                    We&apos;ll never share your age with anyone else.
                </Form.Text>
                {errors.email && <p>{errors.email.message as string}</p>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="login-password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Enter Password"
                    {...register(
                        "password", 
                        { required: "Password is required" }
                    )}
                />
                <Form.Text className="text-muted">
                    We&apos;ll never share your age with anyone else.
                </Form.Text>
                {errors.password && <p>{errors.password.message as string}</p>}
            </Form.Group>

            <Button variant="primary" type="submit">
                Register
            </Button>
        </Form>
    );
};

export default RegisterForm;
