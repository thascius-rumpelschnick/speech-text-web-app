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
                    <h1>Speech-To-Text</h1>
                    <p>
                        This is a simple web application that allows you to record audio with your web browser and let it
                        be transcribed as text. The transcribed text can then be edited. All your transcriptions are stored and can
                        be viewed, edited or deleted at any time. You can also download the transcriptions as a PDF file (However, not yet implemented!).
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
                <Col md={ 6 }>
                    <h2>Else register:</h2>
                    <RegisterForm />
                    <p className="mt-3">
                        Your username has to be unique and has to have a length of at least 3 up to 12 characters.
                        Your password has to have a length of at least 8 characters.
                    </p>
                </Col>
            </Row>
        </Container>
    );
};

export default IndexPage;
