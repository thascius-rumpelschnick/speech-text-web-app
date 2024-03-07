import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { User } from "../interfaces/ContainerProps";
import Logger from "../utils/Logger";

type NavigationBarProps = { user: User | null };

const NavigationBar = ({ user }: NavigationBarProps) => {
    return (
        <Navbar expand="lg">
            <Container fluid>
                <Navbar.Brand href="/">Speech-To-Text</Navbar.Brand>

                <span className="w-100 text-end me-3">{ user?.name ? `Hello ${ user.name }!` : "Welcome!" }</span>

                { user ? (
                    <>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />

                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ms-auto">
                                <Nav.Link href="/">Dashboard</Nav.Link>
                                <Nav.Link href="/overview">Overview</Nav.Link>
                                <Nav.Link href="/logout">Logout</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </>
                ) : null }
            </Container>
        </Navbar>
    );
};

export default NavigationBar;
