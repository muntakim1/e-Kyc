import React from "react";

const Index = (props) => {
  console.log(props.Storage);
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <a className="navbar-brand" href="/">
        E-KyC
      </a>
      <button
        className="navbar-toggler d-lg-none"
        type="button"
        data-toggle="collapse"
        data-target="#collapsibleNavId"
        aria-controls="collapsibleNavId"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="collapsibleNavId">
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0"></ul>
        <div className=" my-2 my-lg-0">
          {props.Storage == null ? (
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Register
                </a>
              </li>
            </ul>
          ) : (
            <a
              className="btn btn-outline-success my-2 my-sm-0"
              href="/logout"
              type="button"
            >
              Logout
            </a>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Index;
