import "./App.scss";

import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import NavigationBar from "../../components/NavigationBar";
import { AppContext } from "../../hooks/AppContext";

export interface ViewModel {
    title: string;
}

const App = () => {
    console.info("OVERVIEW PAGE");

    const { context, setContext } = useContext(AppContext);
    const { user } = context;

    const handleClick = () => {
        setContext({
            ...context,
            user: { id: 1, name: "Bar" },
        });
    };

    return (
        <Container fluid="md">
            <header>
                <NavigationBar user={user} />
            </header>
            <main onClick={handleClick}>Overview</main>
        </Container>
    );
};

export default App;
