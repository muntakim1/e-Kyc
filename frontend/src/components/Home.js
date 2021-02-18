import axios from "axios";
import React, { useState, useReducer } from "react";
import { Tab, Nav, Col, Row } from "react-bootstrap";
import SuccessModal from "./SuccessModal";
import reducer from "../store/reducer";
import { useHistory } from "react-router-dom";

import Tab1 from "./NidPhoto";
import Tab2 from "./PhotoUser";
import Tab3 from "./Tab3";
const Home = () => {
  const history = useHistory();

  const fd = new FormData();

  const [state, dispatch] = useReducer(reducer, []);
  const [activeTab, setActiveTab] = useState("0");
  const [result, setResult] = useState(false);
  const [show, setShow] = useState(false);

  function toNextTab() {
    handleTabChange();
  }
  function handleClose() {
    setShow(!show);
    history.push("/");
  }
  function handleTabChange() {
    if (activeTab === "0") {
      setActiveTab("1");
    }
    if (activeTab === "1") {
      setActiveTab("2");
    }
  }
  function PrevClick() {
    if (activeTab === "1") {
      setActiveTab("0");
    }
    if (activeTab === "2") {
      setActiveTab("1");
    }
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const token = localStorage.getItem("access_token");
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };

    state.map((file) => fd.append("files", file[0]));
    console.log(fd);
    const url = "http://127.0.0.1:8000/kyc/";
    await axios.post(`${url}files/`, fd, config).then((res) => {
      setResult(res.data.result);
      setShow(!show);
    });
  }
  return (
    <div>
      <Tab.Container
        id="left-tabs-example"
        activeKey={activeTab}
        onSelect={(k) => handleTabChange}
      >
        <Row>
          <Col sm={3} className="bg-dark text-white">
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="0">NID</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link disabled eventKey="1">
                  Your Picture
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link disabled eventKey="2">
                  Result
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <form onSubmit={handleSubmit}>
              <Tab.Content>
                <Tab.Pane eventKey="0">
                  <Tab1 dispatch={dispatch} toNextTab={toNextTab} />
                </Tab.Pane>
                <Tab.Pane eventKey="1">
                  <Tab2
                    dispatch={dispatch}
                    PrevClick={PrevClick}
                    toNextTab={toNextTab}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey="2">
                  {" "}
                  <Tab3 state={state} PrevClick={PrevClick} />
                </Tab.Pane>
              </Tab.Content>
            </form>
          </Col>
        </Row>
      </Tab.Container>

      <SuccessModal show={show} result={result} handleClose={handleClose} />
    </div>
  );
};

export default Home;
