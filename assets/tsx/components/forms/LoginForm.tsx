import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useForm, FieldValues } from "react-hook-form";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import useApiRequest, {
    ApiRequestData,
    redirect,
} from "../../hooks/ApiRequest";

interface LoginFormData extends ApiRequestData {
    username: string;
    password: string;
}

const LoginForm = () => {
    const { post, data } = useApiRequest();
    const {
        register,
        handleSubmit,
        formState: { errors, touchedFields },
        setError,
    } = useForm();
    const [ isValidated, setIsValidated ] = useState(false);

    const onSubmit = (loginData: FieldValues): void => {
        post("login", { ...loginData } as LoginFormData, true);
    };

    useEffect(() => {
        console.log(data);

        if (data.status === 200) {
            return redirect("");
        }
    }, [ data ]);
    
    useEffect(() => {
        console.error(touchedFields);
        setIsValidated(!_.isEmpty(touchedFields));
    }, [ touchedFields ]);

    return (
        <Form noValidate validated={isValidated} onSubmit={handleSubmit(onSubmit)}>
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
                    Please enter your username.
                </Form.Text>
                {errors.username && (
                    <Form.Control.Feedback type="invalid">
                        {errors.username.message as string}
                    </Form.Control.Feedback>
                )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="login-password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Enter Password"
                    {...register("password", {
                        required: "Password is required",
                    })}
                />
                <Form.Text className="text-muted">
                    Please enter your password.
                </Form.Text>
                {errors.password && (
                    <Form.Control.Feedback type="invalid">
                        {errors.password.message as string}
                    </Form.Control.Feedback>
                )}
            </Form.Group>

            <Button variant="primary" type="submit">
                Login
            </Button>
        </Form>
    );
};

export default LoginForm;
