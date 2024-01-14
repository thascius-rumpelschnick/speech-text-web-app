import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import LoginForm from "../../../components/forms/LoginForm";

type ViewModel = {
    title: string,
};

const IndexPage = ({ title }: ViewModel) => {
    return (
        <Container>
            <h1>Index Page</h1>
            <Button type="button" className="btn btn-primary">{ title }</Button>

            <LoginForm />
        </Container>
    );
};

export default IndexPage;