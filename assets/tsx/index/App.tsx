import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import "./App.scss";
import { AppContext } from "../hooks/AppContext";
import Dashboard from "./component/Dashboard";
import NavigationBar from "../shared/component/NavigationBar";
import IndexPage from "./component/IndexPage";

export interface ViewModel {
    title: string
}

const App = () => {
    const context = useContext<AppContext<ViewModel>>(AppContext);
    const {user, model} = context;

    return (
        <>
            <NavigationBar/>
            <Container>
                { user ? (<Dashboard/>) : (<IndexPage { ...model }/>) }
            </Container>
        </>
    );
};

export default App;