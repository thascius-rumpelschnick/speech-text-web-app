import "./App.scss";
import { isError } from "lodash";

import React, { useContext, useEffect } from "react";
import { Alert } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Editor from "../../components/editor/Editor";
import Footer from "../../components/Footer";
import NavigationBar from "../../components/NavigationBar";
import useApiRequest from "../../hooks/ApiRequest";
import { AppContext, AppContextData } from "../../hooks/AppContext";
import { Transcription } from "../../interfaces/ContainerProps";

interface ViewModel {
    transcription: Transcription;
}

const App = () => {
    // console.info("EDIT PAGE");

    const { data, post } = useApiRequest();
    const { context, setContext } = useContext<AppContextData<ViewModel>>(AppContext);
    const { user, model } = context;
    const { transcription } = model;

    const [ isError, setIsError ] = React.useState(false);
    const [ isSuccess, setIsSuccess ] = React.useState(false);

    const updateTranscription = (transcription: Transcription) => {
        post(`/edit/${transcription.id}`, transcription, true);
    };

    useEffect(() => {
        if (data.status === 200) {
            setIsSuccess(true);

            const body = data.body as ViewModel;
            setContext((prevContext) => ({
                ...prevContext,
                model: {
                    transcription: body.transcription as Transcription,
                },
            }));
        }
        
        if (data.status && data.status >= 400) {
            // console.error("ERROR:", data.status, data.statusText);

            setIsError(true);
        }
    }, [ data ]);

    return (
        <Container fluid="md">
            <header>
                <NavigationBar user={user} />
            </header>

            <main>
                <Container>
                    <Row>
                        <Col>
                            <h1>Edit</h1>
                        </Col>
                    </Row>

                    { isSuccess && (
                        <Row className="mt-5">
                            <Col>
                                <Alert variant="success" onClose={() => setIsSuccess(false)} dismissible>
                                    <Alert.Heading>Woohoo! Transcription updated!</Alert.Heading>
                                    <p>Transcription was updated...</p>
                                </Alert>
                            </Col>
                        </Row>
                    )}

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
                            <Editor transcription={transcription} updateTranscription={updateTranscription} />
                        </Col>
                    </Row>
                </Container>
            </main>

            <footer>
                <Footer user={user} />
            </footer>
        </Container>
    );
};

export default App;
