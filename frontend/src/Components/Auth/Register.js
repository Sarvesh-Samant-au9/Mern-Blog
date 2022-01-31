import React, { useState, useEffect, useContext } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../../Context/Auth/AuthContext";
import alertContext from "../../Context/Alert/AlertContext";
import AlertComponent from "../Layout/Alert";
const Register = () => {
  const history = useHistory();
  const [showpassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const { userName, email, password } = formData;
  const { isAuthenticated, error, registerUser, clearErrors } =
    useContext(AuthContext);
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

  const onChangeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const submitHandler = async (e) => {
    e.preventDefault();
    registerUser(formData);
  };
  return (
    <Container>
      <AlertComponent />
      <h3 className="text-center mt-4">Register</h3>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="userName"
            value={userName}
            onChange={onChangeHandler}
            placeholder="Enter your Name*"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            onChange={onChangeHandler}
            value={email}
            placeholder="Enter email*"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type={showpassword ? "text" : "password"}
            placeholder="Password*"
            onChange={onChangeHandler}
            name="password"
            value={password}
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
          Register
        </Button>
        <br />
        <small>
          Already a user ?{" "}
          <Link
            to="/login"
            style={{
              color: "blue",
              textDecoration: "underline",
            }}
          >
            Click here
          </Link>
        </small>
      </Form>
    </Container>
  );
};

export default Register;
