import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { User } from "../interfaces/ContainerProps";

type NavigationBarProps = { user: User | null };

const NavigationBar = ({ user }: NavigationBarProps) => {
    return (
        <Navbar expand="lg">
            <Container fluid>
                <Navbar.Brand href="/">Speech-To-Text</Navbar.Brand>

                {user ? (
                    <>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />

                        <Navbar.Collapse id="basic-navbar-nav">
                            <span className="w-100 me-3 text-end">{`Hello ${user.name}!`}</span>
                            <Nav className="ms-auto">
                                <Nav.Link href="/">Dashboard</Nav.Link>
                                <Nav.Link href="/upload">Add</Nav.Link>
                                <Nav.Link href="/settings">Settings</Nav.Link>
                                <Nav.Link href="/logout">Logout</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </>
                ) : (
                    <span className="text-end">Welcome!</span>
                )}
            </Container>
        </Navbar>
    );
};

export default NavigationBar;
