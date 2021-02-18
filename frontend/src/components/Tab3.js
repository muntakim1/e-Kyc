import React from "react";

const Tab3 = (props) => {
  return (
    <div>
      {props.state.map((file) => {
        return (
          <div key={file[0]}>
            <img height={150} src={URL.createObjectURL(file[0])} alt=""></img>
            <p>{file[0].name}</p>
          </div>
        );
      })}
      <button type="submit" className="btn btn-primary">
        {" "}
        Submit
      </button>
    </div>
  );
};

export default Tab3;
