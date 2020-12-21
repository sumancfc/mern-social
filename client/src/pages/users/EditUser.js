import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import { getUserById, updateUser } from "../../api/user";
import { Redirect } from "react-router-dom";
import auth from "../../helpers/auth";

const EditUser = ({ match }) => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    redirectToProfile: false,
  });

  const { name, email, password, error, redirectToProfile } = values;

  const jwt = auth.isAuthenticated();
  const { userId } = match.params;

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    getUserById(userId, { t: jwt.token }, signal).then((data) => {
      if (data && data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, name: data.name, email: data.email });
      }
    });

    return function cleanup() {
      abortController.abort();
    };
    //eslint-disable-next-line
  }, [userId]);

  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      name,
      email,
      password,
    };

    updateUser(userId, { t: jwt.token }, user).then((data) => {
      if (data && data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, userId: data._id, redirectToProfile: true });
      }
    });
  };

  if (redirectToProfile) {
    return <Redirect to={`/user/${userId}`} />;
  }

  return (
    <div className='container'>
      <Jumbotron>
        <h1>Edit User</h1>
        <p>This is a User edit page.</p>
      </Jumbotron>

      <p>{error && error}</p>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter name'
            name='name'
            value={name}
            onChange={handleChange("name")}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            name='email'
            value={email}
            onChange={handleChange("email")}
            required
          />
          <Form.Text className='text-muted'>
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={handleChange("password")}
            required
          />
        </Form.Group>

        <Button variant='primary' type='submit'>
          Edit
        </Button>
      </Form>
    </div>
  );
};

export default EditUser;
