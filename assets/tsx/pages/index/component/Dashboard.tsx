import React from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { FileTypePDF, Pencil, Trash, CloudArrowUp } from "../../../components/icons/Icons";
import { ViewModel } from "../App";

const Dashboard = ({ transcriptions }: ViewModel) => {
    return (
        <Container>
            <Row className="mb-5">
                <Col>
                    <h1>Dashboard</h1>
                </Col>
            </Row>

            <Row xs={1} className="mb-5 gy-4">
                <Col>
                    <h2>Add Transcription</h2>
                </Col>
                <Col>
                    <Button href="/upload"><CloudArrowUp /><span className="ms-2">Add Transcription</span></Button>
                </Col>
            </Row>

            <Row>
                <Col>
                    <h2>Transcriptions</h2>
                </Col>
            </Row>

            <Row xs="auto" lg={4} className="gy-4">
                {transcriptions.map((transcription, index) => (
                    <Col key={index}>
                        <Card>
                            <Card.Body>
                                <Card.Title>Card Title</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                                <Card.Text>{`${transcription.content.substring(0, 150)}...`}</Card.Text>
                                <Card.Link href={`edit/${transcription.id}`}>
                                    <Pencil />
                                </Card.Link>
                                <Card.Link href="#">
                                    <FileTypePDF />
                                </Card.Link>
                                <Card.Link href={`remove/${transcription.id}`}>
                                    <Trash />
                                </Card.Link>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Dashboard;
