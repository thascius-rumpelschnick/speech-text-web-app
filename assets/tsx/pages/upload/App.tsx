import "./App.scss";

import React, { useContext, useEffect } from "react";
import { Alert } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Footer from "../../components/Footer";
import NavigationBar from "../../components/NavigationBar";
import Recorder from "../../components/recorder/Recorder";
import useApiRequest, { redirect } from "../../hooks/ApiRequest";
import { AppContext, AppContextData } from "../../hooks/AppContext";
import LoadingModal from "./component/LoadingModal";


const App = () => {
    console.info("UPLOAD PAGE");

    const { context } = useContext<AppContextData<object>>(AppContext);
    const { user } = context;

    const { post, data, isLoading } = useApiRequest();

    const [ isError, setIsError ] = React.useState(false);

    useEffect(() => {
        if (data.status === 201) {
            const body = data.body as { redirectTo: string };

            redirect(body.redirectTo);
        }

        if (data.status && data.status >= 400) {
            console.error("DATA:", data);

            setIsError(true);
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

                    { isError && (
                        <Row className="mt-5">
                            <Col>
                                <Alert variant="danger" onClose={() => setIsError(false)} dismissible>
                                    <Alert.Heading>Oops! Something went wrong!</Alert.Heading>
                                    <p>Please try again another time...</p>
                                </Alert>
                            </Col>
                        </Row>
                    )}

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

            <LoadingModal show={ isLoading } />
        </Container>
    );
};

export default App;
