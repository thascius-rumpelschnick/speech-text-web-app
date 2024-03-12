import "./App.scss";

import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Footer from "../../components/Footer";
import NavigationBar from "../../components/NavigationBar";
import { AppContextData, AppContext } from "../../hooks/AppContext";
import { Transcription } from "../../interfaces/ContainerProps";
import Dashboard from "./component/Dashboard";
import IndexPage from "./component/IndexPage";

export interface ViewModel {
    transcriptions: Transcription[];
}

const App = () => {
    // console.info("INDEX PAGE");

    const { context } = useContext<AppContextData<ViewModel>>(AppContext);
    const { user, model } = context;

    return (
        <Container fluid="md">
            <header>
                <NavigationBar user={ user } />
            </header>

            <main>
                { user != null ? <Dashboard { ...model } /> : <IndexPage /> }
            </main>

            <footer>
                <Footer user={ user } />
            </footer>
        </Container>
    );
};

export default App;
