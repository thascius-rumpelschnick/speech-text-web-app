import React from "react";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const ExampleForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    return (
        <Form onSubmit={handleSubmit((data) => console.log(data))}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>First name</Form.Label>
                <Form.Control
                    {...register("firstName")}
                    type="input"
                    placeholder="Enter first name"
                />
                <Form.Text className="text-muted">
                    We&apos;ll never share your first name with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Last name</Form.Label>
                <Form.Control
                    {...register("lastName", { required: true })}
                    type="input"
                    placeholder="Enter last name"
                />
                <Form.Text className="text-muted">
                    We&apos;ll never share your last name with anyone else.
                </Form.Text>
                {errors.lastName && <p>Last name is required.</p>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>First name</Form.Label>
                <Form.Control
                    {...register("age", { pattern: /\d+/ })}
                    type="input"
                    placeholder="Enter age"
                />
                <Form.Text className="text-muted">
                    We&apos;ll never share your age with anyone else.
                </Form.Text>
                {errors.age && <p>Please enter number for age.</p>}
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
};

export default ExampleForm;
