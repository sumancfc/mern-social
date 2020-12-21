import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { signin } from "../../api/auth";
import auth from "../../helpers/auth";

const SignIn = ({ history }) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
  });

  const { email, password, error } = values;

  const handleChange = (name) => (e) => {
    console.log(e.target.value);
    setValues({ ...values, [name]: e.target.value, error: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };

    signin(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        auth.authenticate(data, () => {
          setValues({ ...values, error: "" });
          history.push("/");
        });
      }
    });
  };

  return (
    <div className='container'>
      <div className='row'>
        <h2 className='tet-center mt-3'>Sign Up</h2>

        <div>
          {error && <p className='alert alert-danger'>{error}</p>}
          <Form onSubmit={handleSubmit}>
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
              Login
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
