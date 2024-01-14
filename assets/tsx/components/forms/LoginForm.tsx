import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import useApiRequest, { ApiRequestData, redirect } from "../../hooks/ApiRequest";

interface LoginFormData extends ApiRequestData {
    username: string;
    password: string;
}

const LoginForm = () => {
    const { post, data } = useApiRequest();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        console.log(data);

        if (data.status === 200) {
            return redirect("/overview");
        }
    }, [ data ]);
    
    return (
        <Form 
            onSubmit={
                handleSubmit(
                    (loginData) => {
                        post("login", { ...loginData } as LoginFormData, true);
                    }
                )}
        >
            <Form.Group className="mb-3" controlId="login-username">
                <Form.Label>Email</Form.Label>
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
                Login
            </Button>
        </Form>
    );
};

export default LoginForm;
