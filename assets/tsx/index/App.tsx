import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import "./App.scss";
import { AppContext } from "../hooks/AppContext";

export interface ViewModel {
    title: string
}

const App = () => {
    const appContext = useContext<AppContext<ViewModel>>(AppContext);
    const {name} = appContext.user ?? {name: "No user"};
    const {title} = appContext.model;

    return (
        <Container>
            <h1>
                Hello { name }!
            </h1>
            <Button type="button" className="btn btn-primary">
                { title }
            </Button>
        </Container>
    );
};

export default App;