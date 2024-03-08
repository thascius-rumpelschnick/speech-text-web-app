import "./App.scss";

import React, { useContext, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Footer from "../../components/Footer";
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
                <NavigationBar user={ user } />
            </header>

            <main>
                <Container>
                    <Row className="mb-3">
                        <Col>
                            <h1>Add Transcription</h1>
                        </Col>
                    </Row>

                    { isLoading && (
                        <Row>
                            <Col>
                                <h2>IS LOADING!</h2>
                            </Col>
                        </Row>
                    ) }

                    <Row>
                        <Col>
                            <Recorder post={ post } />
                        </Col>
                    </Row>
                </Container>
            </main>

            <footer>
                <Footer />
            </footer>
        </Container>
    );
};

export default App;
