import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useForm, FieldValues } from "react-hook-form";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import useApiRequest, {
    ApiRequestData,
    redirect,
} from "../../hooks/ApiRequest";

interface RegisterFormData extends ApiRequestData {
    username: string;
    email: string;
    password: string;
    passwordRepeat: string;
}

const RegisterForm = () => {
    const { post, data } = useApiRequest();
    const {
        register,
        handleSubmit,
        formState: { errors, isValidating },
        setError,
    } = useForm();
    const [ isValidated, setIsValidated ] = useState(false);

    const onSubmit = (registerData: FieldValues): void => {
        // setIsValidated(true);

        if (registerData.password !== registerData.passwordRepeat) {
            setError("password", { message: "Passwords are not identical" });
            setError("passwordRepeat", { message: "Passwords are not identical" });
            
            return;
        }

        post("register", { ...registerData } as RegisterFormData, true);
    };

    useEffect(() => {
        // console.log(data);

        if (data?.status === 200) {
            return redirect("/");
        }
    }, [ data ]);
    
    useEffect(() => {
        setIsValidated(!_.isEmpty(errors));
    }, [ isValidating ]);

    return (
        <Form noValidate validated={isValidated} onSubmit={handleSubmit(onSubmit)}>
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
                    Please enter a username.
                </Form.Text>
                {errors.username && (
                    <Form.Control.Feedback type="invalid">
                        {errors.username.message as string}
                    </Form.Control.Feedback>
                )}
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
                            message: "Invalid email address",
                        },
                    })}
                />
                <Form.Text className="text-muted">
                    Please enter your email.
                </Form.Text>
                {errors.email && (
                    <Form.Control.Feedback type="invalid">
                        {errors.email.message as string}
                    </Form.Control.Feedback>
                )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="register-password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Enter Password"
                    {...register("password", {
                        required: "Password is required",
                        minLength: 8,
                    })}
                />
                <Form.Text className="text-muted">
                    Please enter a password.
                </Form.Text>
                {errors.password && (
                    <Form.Control.Feedback type="invalid">
                        {errors.password.message 
                            ? errors.password.message as string
                            : "Password minimum length is 8"
                        }
                    </Form.Control.Feedback>
                )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="register-password-repeat">
                <Form.Label>Repeat Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Repeat Password"
                    {...register("passwordRepeat", {
                        required: "Repeated password is required",
                        minLength: 8,
                    })}
                />
                <Form.Text className="text-muted">
                    Please repeat password.
                </Form.Text>
                {errors.passwordRepeat && (
                    <Form.Control.Feedback type="invalid">
                        {errors.passwordRepeat.message 
                            ? errors.passwordRepeat.message as string
                            : "Password minimum length is 8"
                        }
                    </Form.Control.Feedback>
                )}
            </Form.Group>

            <Button variant="primary" type="submit">
                Register
            </Button>
        </Form>
    );
};

export default RegisterForm;
