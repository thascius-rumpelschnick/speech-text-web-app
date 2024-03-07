import "./App.scss";

import React, { useContext, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import NavigationBar from "../../components/NavigationBar";
import Recorder from "../../components/recorder/Recorder";
import useApiRequest, { redirect } from "../../hooks/ApiRequest";
import { AppContext, AppContextData } from "../../hooks/AppContext";

export interface ViewModel {
    title: string;
}

const App = () => {
    console.info("ADD PAGE");

    const { context, setContext } = useContext<AppContextData<object>>(AppContext);
    const { user } = context;

    const { post, data, isLoading } = useApiRequest();

    useEffect(() => {
        console.error("DATA:", data);

        if (data.status === 201) {
            const body = data.body as { redirectTo: string };
            redirect(body.redirectTo);
        }
    }, [ data ]);

    return (
        <Container fluid="md">
            <header>
                <NavigationBar user={user} />
            </header>

            <main>
                <Container>
                    <Row className="mb-3">
                        <Col>
                            <h1>Add Transcription</h1>
                        </Col>
                    </Row>

                    {isLoading && (
                        <Row>
                            <Col>
                                <h2>IS LOADING!</h2>
                            </Col>
                        </Row>
                    )}

                    <Row>
                        <Col>
                            <Recorder post={post} />
                        </Col>
                    </Row>
                </Container>
            </main>

            <footer className="py-3 my-4">
                <ul className="nav justify-content-center border-bottom pb-3 mb-3">
                    <li className="nav-item">
                        <a href="#" className="nav-link px-2 text-body-secondary">
                            Home
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link px-2 text-body-secondary">
                            Features
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link px-2 text-body-secondary">
                            Pricing
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link px-2 text-body-secondary">
                            FAQs
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link px-2 text-body-secondary">
                            About
                        </a>
                    </li>
                </ul>
                <p className="text-center text-body-secondary">© 2024 Florian Zapf</p>
            </footer>
        </Container>
    );
};

export default App;
