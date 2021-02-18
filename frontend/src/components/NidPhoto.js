import React, { useState } from "react";
import "../assets/css/style.css";
import DropZoneInput from "./DropZoneInput";
const Tab1 = (props) => {
  const [file, setFile] = useState(null);
  const [select, setSelect] = useState(false);

  const handleClick = () => {
    props.dispatch({ type: "Add", payload: file });

    props.toNextTab();
  };
  return (
    <div className="container content d-flex">
      <div className=" justify-content-center align-self-center">
        <div className="card ">
          <div className="card-body">
            <DropZoneInput
              setFile={setFile}
              setSelect={setSelect}
              select={select}
            />
            {select ? (
              <button
                type="button"
                onClick={handleClick}
                className="btn btn-primary"
              >
                {" "}
                Next
              </button>
            ) : (
              <button
                type="button"
                disabled
                onClick={handleClick}
                className="btn btn-primary"
              >
                {" "}
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tab1;
