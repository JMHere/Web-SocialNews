import { useState } from "react";
import { Form, Link, useNavigate } from "react-router-dom";
import Button from "./Button";

function Navbar() {
  const [show, setShow] = useState("");
  const navigate = useNavigate();

  const toggleMenu = () => {
    show == "" ? setShow("show") : setShow("");
  };

  const logOut = () => {
    sessionStorage.removeItem("UserCred");
    navigate("/");
  };

  const update = () => {
    navigate("/updatePage");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Social News
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={toggleMenu}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={"collapse navbar-collapse " + show} id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/yourPage">
                My Page
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/search">
                Search
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/fyp">
                For You
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/createPost">
              Create Post <i className="bi bi-plus-circle"></i>
              </Link>
            </li>
          </ul>
          <Button
            classString="btn btn-outline-danger mx-auto"
            clicked={logOut}
            buttonText="Log Out"
          />
          <button className="btn btn-secondary" onClick={update}>Update <i className="bi bi-gear"></i></button >
          
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

{
  /* <nav>
            <h1>Social News</h1>
            <div>
                <Link to="/"> Home </Link>
                <Link to="/signup" > Sign Up</Link>
            </div>
        </nav> */
}
