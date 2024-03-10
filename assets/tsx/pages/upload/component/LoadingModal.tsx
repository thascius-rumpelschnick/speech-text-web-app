import React from "react";
import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";

type LoadingModalProps = {
    show: boolean;
};

const LoadingModal = ({ show }: LoadingModalProps) => {
    return (
        <Modal
            show={show}
            backdrop="static"
            keyboard={false}
            centered
        >
            <Modal.Header>
                <Modal.Title>Uploading Audio...</Modal.Title>
            </Modal.Header>

            <Modal.Body className="text-center">
                <p>Please wait while we upload and process your audio.</p>
                <p>This might take a while.</p>

                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Modal.Body>
        </Modal>
    );
};

export default LoadingModal;