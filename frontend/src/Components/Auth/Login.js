import React, { useContext, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";
import { Link, useHistory } from "react-router-dom";
import authContext from "../../Context/Auth/AuthContext";
import alertContext from "../../Context/Alert/AlertContext";
import AlertComponent from "../Layout/Alert";
const Login = () => {
  const [showpassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = userData;
  const history = useHistory();
  const onChangeHandler = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };
  const { isAuthenticated, error, loginUser, clearErrors } =
    useContext(authContext);
  const { setAlert } = useContext(alertContext);

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }
    if (error) {
      setAlert(error, "danger");
      clearErrors();
    }
  }, [isAuthenticated, error]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    loginUser(userData);
  };

  return (
    <Container>
      <AlertComponent />
      <h3 className="text-center mt-4">Login</h3>
      <Form onSubmit={onSubmitHandler}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            name="email"
            value={email}
            onChange={onChangeHandler}
            type="email"
            placeholder="Enter email *"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type={showpassword ? "text" : "password"}
            placeholder="Password *"
            value={password}
            name="password"
            onChange={onChangeHandler}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            label="Show Password"
            onChange={() => setShowPassword(!showpassword)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
        <br />
        <small>
          New User ?{" "}
          <Link
            style={{
              color: "red",
              textDecoration: "none",
            }}
            to="/register"
          >
            Click here
          </Link>
        </small>
      </Form>
    </Container>
  );
};

export default Login;
