import React from "react";
import { Modal } from "react-bootstrap";
import OK from "../assets/ok.gif";
import Wrong from "../assets/wrong.gif";
const SuccessModal = (props) => {
  return (
    <div>
      <Modal show={props.show} onHide={props.handleClose} animation={false}>
        <Modal.Header closeButton>
          {props.result ? (
            <Modal.Title>Congratulations</Modal.Title>
          ) : (
            <Modal.Title>Ops Sorry, Try Again</Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>
          <div className="container justify-center">
            {props.result ? (
              <div>
                {" "}
                <h1 style={{ textAlign: "center" }}>Verified</h1>{" "}
                <img src={OK} alt=""></img>
              </div>
            ) : (
              <img src={Wrong} width={250} alt=""></img>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default SuccessModal;
