import "./App.scss";

import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import NavigationBar from "../../components/NavigationBar";
import { AppContextData, AppContext } from "../../hooks/AppContext";
import Dashboard from "./component/Dashboard";
import IndexPage from "./component/IndexPage";


export interface ViewModel {
    title: string;
}

const App = () => {
    console.info("INDEX PAGE");

    const { context } = useContext<AppContextData<ViewModel>>(AppContext);
    const { user, model } = context;

    return (
        <Container fluid="md">
            <header>
                <NavigationBar user={user} />
            </header>
            <main>{user != null ? <Dashboard /> : <IndexPage {...model} />}</main>
        </Container>
    );
};

export default App;
