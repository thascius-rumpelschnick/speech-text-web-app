import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { User } from "../interfaces/ContainerProps";
import Logger from "../utils/Logger";

type NavigationBarProps = { user: User | null };

const NavigationBar = ({ user }: NavigationBarProps) => {
    Logger.info("User", user);

    return (
        <Navbar expand="lg">
            <Container fluid>
                <Navbar.Brand href="#">Speech-To-Text</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">Link</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavigationBar;