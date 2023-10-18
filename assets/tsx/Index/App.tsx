import React from "react";
import Button from 'react-bootstrap/Button';
import Container from "react-bootstrap/Container";
import './App.scss';

export interface ViewModel {
    name: string
}

const App = ({name}: ViewModel) => {
    return (
        <Container>
            <h1>
                Hello { name }!
            </h1>
            <Button type="button" className="btn btn-primary">
                This is a bootstrap button
            </Button>
        </Container>
    );
};

export default App;