import "./App.scss";

import React, { useContext, useEffect } from "react";
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
    console.info("EDIT PAGE");

    const { data, post } = useApiRequest();
    const { context, setContext } = useContext<AppContextData<ViewModel>>(AppContext);
    const { user, model } = context;
    const { transcription } = model;

    const updateTranscription = (transcription: Transcription) => {
        post(`/edit/${transcription.id}`, transcription, true);
    };

    useEffect(() => {
        if (data?.status === 200) {
            const body = data.body as ViewModel;

            setContext((prevContext) => ({
                ...prevContext,
                model: {
                    transcription: body.transcription as Transcription,
                },
            }));
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
