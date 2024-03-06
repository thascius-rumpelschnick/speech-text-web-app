import "./App.scss";

import React, { useContext } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import NavigationBar from "../../components/NavigationBar";
import { AppContext, AppContextData } from "../../hooks/AppContext";

export interface ViewModel {
    title: string;
}

const App = () => {
    console.info("EDIT PAGE");

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
                <NavigationBar user={user} />
            </header>

            <main onClick={handleClick}>
                <Row>
                    <Col>Edit</Col>
                </Row>
            </main>

            <footer className="py-3 my-4">
                <ul className="nav justify-content-center border-bottom pb-3 mb-3">
                    <li className="nav-item">
                        <a
                            href="#"
                            className="nav-link px-2 text-body-secondary"
                        >
                            Home
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            href="#"
                            className="nav-link px-2 text-body-secondary"
                        >
                            Features
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            href="#"
                            className="nav-link px-2 text-body-secondary"
                        >
                            Pricing
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            href="#"
                            className="nav-link px-2 text-body-secondary"
                        >
                            FAQs
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            href="#"
                            className="nav-link px-2 text-body-secondary"
                        >
                            About
                        </a>
                    </li>
                </ul>
                <p className="text-center text-body-secondary">
                    © 2024 Florian Zapf
                </p>
            </footer>
        </Container>
    );
};

export default App;
