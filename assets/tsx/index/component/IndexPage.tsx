import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

type ViewModel = {
    title: string,
};

const IndexPage = ({ title }: ViewModel) => {
    return (
        <Container>
            <h1>Index Page</h1>
            <Button type="button" className="btn btn-primary">{ title }</Button>
        </Container>
    );
};

export default IndexPage;