import "./App.scss";

import React, { useContext } from "react";
import Container from "react-bootstrap/Container";

import NavigationBar from "../components/NavigationBar";
import { AppContext } from "../hooks/AppContext";
import Dashboard from "./component/Dashboard";
import IndexPage from "./component/IndexPage";

export interface ViewModel {
    title: string;
}

const App = () => {
    const context = useContext<AppContext<ViewModel>>(AppContext);
    const { user, model } = context;

    return (
        <Container fluid="md">
            <header>
                <NavigationBar user={user} />
            </header>
            <main>
                {user ? (<Dashboard />) : (<IndexPage {...model} />)}
            </main>
        </Container>
    );
};

export default App;
