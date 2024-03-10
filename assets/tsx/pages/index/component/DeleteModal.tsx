import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

type DeleteModalProps = {
    transcriptionId?: number;
    show: boolean;
    setShow: (show: boolean) => void
};
const DeleteModal = ({ transcriptionId, show, setShow }: DeleteModalProps) => {
    const handleClose = () => setShow(false);

    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Delete Transcription</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>Do you really want to delete transcription no. {transcriptionId}?</p>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button variant="danger" href={`delete/${transcriptionId}`}>
                        Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteModal;
