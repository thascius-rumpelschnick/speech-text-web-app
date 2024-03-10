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
    console.info("OVERVIEW PAGE");

    const { context, setContext } =
        useContext<AppContextData<object>>(AppContext);
    const { user } = context;

    const handleClick = () => {
        setContext((context) => ({
            ...context,
            user: { id: 1, name: "Bar" },
        }));
    };

    return (
        <Container fluid="md">
            <header>
                <NavigationBar user={ user } />
            </header>

            <main onClick={ handleClick }>
                <Container>
                    <Row>
                        <Col>
                            <h1>About</h1>
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
