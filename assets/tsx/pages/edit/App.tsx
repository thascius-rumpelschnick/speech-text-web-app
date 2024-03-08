import "./App.scss";

import React, { useContext } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Editor from "../../components/editor/Editor";
import Footer from "../../components/Footer";
import NavigationBar from "../../components/NavigationBar";
import { AppContext, AppContextData } from "../../hooks/AppContext";
import { Transcription } from "../../interfaces/ContainerProps";

export interface ViewModel {
    title: string;
}

const App = () => {
    console.info("EDIT PAGE");

    const { context, setContext } = useContext<AppContextData<Transcription>>(AppContext);
    const { user } = context;

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
                            <Editor />
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
