import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { FileTypePDF, Pencil, Trash, CloudArrowUp } from "../../../components/icons/Icons";
import { formatDateTime } from "../../../utils/Utils";
import { ViewModel } from "../App";
import DeleteModal from "./DeleteModal";

const Dashboard = ({ transcriptions }: ViewModel) => {
    const [ transcriptionId, setTranscriptionId ] = useState<number|undefined>(undefined);
    const [ show, setShow ] = React.useState(false);

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

            <Row className="mb-3">
                <Col>
                    <h2>Transcriptions</h2>
                </Col>
            </Row>

            <Row xs="auto" lg={4} className="gy-4">
                {transcriptions.map((transcription, index) => (
                    <Col key={index}>
                        <Card className="h-100">
                            <Card.Header>Transcription No. {transcription.id}</Card.Header>

                            <Card.Body>
                                <Card.Subtitle className="mb-3 text-muted">Updated: {formatDateTime(transcription.updatedAt)}</Card.Subtitle>
                                <Card.Text>{`${transcription.content.substring(0, 150)}...`}</Card.Text>
                            </Card.Body>

                            <Card.Footer>
                                <Card.Link href={`edit/${transcription.id}`}>
                                    <Pencil />
                                </Card.Link>
                                <Card.Link href={`download/${transcription.id}`}>
                                    <FileTypePDF />
                                </Card.Link>
                                <Card.Link
                                    onClick={
                                        ()=> {
                                            setTranscriptionId(transcription.id);
                                            setShow(true);
                                        }}
                                >
                                    <Trash />
                                </Card.Link>
                            </Card.Footer>
                        </Card>
                    </Col>
                ))}
            </Row>

            <DeleteModal
                transcriptionId={transcriptionId}
                show={show}
                setShow={setShow}
            />
        </Container>
    );
};

export default Dashboard;
