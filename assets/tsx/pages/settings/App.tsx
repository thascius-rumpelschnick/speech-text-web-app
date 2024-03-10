import "./App.scss";

import React, { useContext } from "react";
import { Row, Col } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Footer from "../../components/Footer";
import SettingForm from "../../components/forms/SettingForm";
import NavigationBar from "../../components/NavigationBar";
import { AppContext, AppContextData } from "../../hooks/AppContext";
import { Setting } from "../../interfaces/ContainerProps";

export interface ViewModel {
    setting: Setting;
}

const App = () => {
    console.info("SETTINGS PAGE");

    const { context } = useContext<AppContextData<ViewModel>>(AppContext);
    const { user, model } = context;
    const { setting } = model;

    return (
        <Container fluid="md">
            <header>
                <NavigationBar user={user} />
            </header>

            <main>
                <Container>
                    <Row className="mb-5">
                        <Col>
                            <h1>Settings</h1>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col>
                            <h2>Set Language and Model</h2>
                        </Col>
                    </Row>

                    <Row className="mb-5">
                        <Col>
                            <SettingForm {...setting} />
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={12}>
                            <h2 className="mb-3">Important Notices</h2>
                        </Col>
                        <Col xs={12}>
                            <p>
                                Whisper is the default model and works locally. You can either transcribe in German or
                                English.
                            </p>
                            <p>Vosk also works locally but the model only supports German.</p>
                            <p>
                                Google works via remote call and supports given languages. However, as there is no API
                                key set at the moment, it only works with the default key and may not produce results as
                                expected.
                            </p>
                        </Col>
                    </Row>
                </Container>
            </main>

            <footer>
                <Footer user={user} />
            </footer>
        </Container>
    );
};

export default App;
