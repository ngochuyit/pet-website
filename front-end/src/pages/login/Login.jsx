import React, { useContext, useRef, useState } from "react";
import { Button, Container, Row, Col, Form, InputGroup } from "react-bootstrap";
import { FaEyeSlash, FaEye, FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./login.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@mui/material";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const username = useRef();
  const password = useRef();
  const { user, dispatch, isFetching } = useContext(AuthContext);
  const hideOrShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userInfo = {
      username: username.current.value,
      password: password.current.value,
    };
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(
        "http://localhost:8800/api/auth/login",
        userInfo
      );
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      // console.log(userInfo);
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err });
    }
  };
  return (
    <div style={{ position: "relative" }}>
      <Container
        fluid
        className="rm-pd l-all-fsz s-all-fsz"
        style={{ height: "100vh" }}
      >
        <img
          className="login-page__images--tl"
          src="./assets/images/dog-6.jpg"
          alt="login background tablet"
        />
        <img
          className="login-page__images--mb"
          src="./assets/images/dog-3.jpg"
          alt="login background mobile"
        />
        <img
          className="login-page__images"
          src="./assets/images/background-signin-signup.jpg"
          alt="login background pc"
        />
        <Row className="login-page rm-margin">
          <Col className="rm-pd rm-col"></Col>
          <Col className="d-flex justify-content-center align-items-center rm-pd rm-margin">
            <Form
              onSubmit={handleSubmit}
              className="login-page__register-form rm-br"
            >
              <div className="login-page__register-form--padding">
                <h4 className="fw-b m-fsz">Welcome back!</h4>
                <h3 className="fw-b m-fsz">Sign in to</h3>
                <p className="fw-b m-fsz">Enjoy the moment.</p>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label className="fw-b m-all-fsz">Username</Form.Label>
                  <Form.Control
                    className="br-6 m-all-fsz s-all-fsz"
                    type="text"
                    placeholder="Enter your username"
                    required
                    ref={username}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label className="fw-b m-all-fsz">Password</Form.Label>
                  <InputGroup className="position-relative">
                    <Form.Control
                      type={`${showPassword ? "text" : "password"}`}
                      placeholder="Enter your password"
                      className="br-6 m-all-fsz s-all-fsz"
                      required
                      ref={password}
                    />
                    <div
                      className="position-absolute"
                      style={{ right: "10px", zIndex: 10, padding: "11px" }}
                    >
                      {showPassword ? (
                        <FaEyeSlash
                          className="eyes-btn"
                          onClick={() => hideOrShowPassword()}
                        />
                      ) : (
                        <FaEye
                          className="eyes-btn"
                          onClick={() => hideOrShowPassword()}
                        />
                      )}
                    </div>
                  </InputGroup>
                </Form.Group>
                <Button
                  variant="dark"
                  type="submit"
                  className="br-6 btn m-all-fsz s-all-fsz"
                  style={{
                    width: "100%",
                    padding: "12px",
                    margin: "12px 0 6px 0",
                    backgroundColor: '#c38161',
                    border: 'none'
                  }}
                >
                  Login
                </Button>
                <p className="text-center m-fsz-22">
                  Don't have an Account?{" "}
                  <span className="fw-b">
                    <Link to="/register" className="link-default m-fsz s-fsz" style={{color: '#c38161'}}>
                      Register!
                    </Link>
                  </span>
                </p>
                <p className="text-center m-fsz-22 m-all-fsz"> or -</p>
                <Button
                  type="submit"
                  className="br-6 btn m-all-fsz s-all-fsz"
                  style={{
                    width: "100%",
                    padding: "11px",
                    backgroundColor: "#435994",
                  }}
                >
                  <FaFacebook
                    className="m-fsz s-fsz"
                    style={{
                      lineHeight: "50px",
                      fontSize: "25px",
                      marginRight: "6px",
                    }}
                  />
                  Login with Facebook
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
        <div className={isFetching ? 'openModal': ''}>
          {isFetching && `Wait a second...`}
          {isFetching &&
            <CircularProgress style={{ color: 'white', marginLeft: 5 }} />}
        </div>
      </div>
  );
}
