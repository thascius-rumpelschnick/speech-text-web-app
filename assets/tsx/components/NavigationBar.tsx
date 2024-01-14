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
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">Link</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <span>{user?.name ? `Hallo ${user.name}` : "Hallo Du da"}</span>
            </Container>
        </Navbar>
    );
};

export default NavigationBar;
