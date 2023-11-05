import "./App.scss";

import React, { useContext } from "react";
import Container from "react-bootstrap/Container";

import { AppContext } from "../hooks/AppContext";
import NavigationBar from "../shared/component/NavigationBar";
import Dashboard from "./component/Dashboard";
import IndexPage from "./component/IndexPage";

export interface ViewModel {
    title: string
}

const App = () => {
    const context = useContext<AppContext<ViewModel>>(AppContext);
    const {user, model} = context;

    return (
        <>
            <header>
                <NavigationBar/>
            </header>
            <main>
                <Container>
                    { user ? (<Dashboard/>) : (<IndexPage { ...model }/>) }
                </Container>
            </main>
        </>
    );
};

export default App;
