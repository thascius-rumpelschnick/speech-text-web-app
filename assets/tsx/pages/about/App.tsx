import "./App.scss";

import React, { useContext } from "react";
import { Row, Col } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Footer from "../../components/Footer";
import NavigationBar from "../../components/NavigationBar";
import {
    AppContext,
    AppContextData,
} from "../../hooks/AppContext";

export interface ViewModel {
    title: string;
}

const App = () => {
    console.info("ABOUT PAGE");

    const { context } =
        useContext<AppContextData<object>>(AppContext);
    const { user } = context;

    return (
        <Container fluid="md">
            <header>
                <NavigationBar user={ user } />
            </header>

            <main>
                <Container>
                    <Row>
                        <Col>
                            <h1>About</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p>
                               More information here: <a target="_blank" href="https://github.com/thascius-rumpelschnick/speech-text-web-app/blob/main/README.md" rel="noreferrer"></a>
                            </p>
                        </Col>
                    </Row>
                </Container>
            </main>

            <footer>
                <Footer user={ user } />
            </footer>
        </Container>
    );
};

export default App;
