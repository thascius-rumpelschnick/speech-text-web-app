import React from "react";
import { Row, Col } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import LoginForm from "../../../components/forms/LoginForm";
import RegisterForm from "../../../components/forms/RegisterForm";

type ViewModel = {
    title: string;
};

const IndexPage = ({ title }: ViewModel) => {
    return (
        <Container>
            <Row className="mb-3">
                <Col>
                    <h1>Index Page</h1>
                    <p>Already registered? Login:</p>
                    <LoginForm />
                </Col>
            </Row>

            <Row className="mb-3">
                <Col>
                    <p>Else register:</p>
                    <RegisterForm />
                </Col>
            </Row>
        </Container>
    );
};

export default IndexPage;
