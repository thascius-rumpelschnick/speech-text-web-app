import "./App.scss";

import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import NavigationBar from "components/NavigationBar";
import { AppContext, AppContextData } from "hooks/AppContext";
import Dashboard from "pages/index/component/Dashboard";
import IndexPage from "pages/index/component/IndexPage";


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
            <main>{user ? <Dashboard /> : <IndexPage {...model} />}</main>
        </Container>
    );
};

export default App;
