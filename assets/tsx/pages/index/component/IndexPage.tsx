import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import LoginForm from "../../../components/forms/LoginForm";
import RegisterForm from "../../../components/forms/RegisterForm";

const IndexPage = () => {
    return (
        <Container>
            <Row className="mb-3 justify-content-center">
                <Col md={6}>
                    <h1>Index Page</h1>
                    <p>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
                        ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
                        dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
                        sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                        invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et
                        justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
                        ipsum dolor sit amet.
                    </p>
                </Col>
            </Row>

            <Row className="mb-5 justify-content-center">
                <Col md={6}>
                    <h2>Already registered? Login:</h2>
                    <LoginForm />
                </Col>
            </Row>

            <Row className="mb-3 justify-content-center">
                <Col md={6}>
                    <h2>Else register:</h2>
                    <RegisterForm />
                </Col>
            </Row>
        </Container>
    );
};

export default IndexPage;
