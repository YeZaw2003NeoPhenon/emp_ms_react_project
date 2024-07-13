import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Alert, Button, Card, CardBody, CardHeader, CardSubtitle, CardText, CardTitle, Col, Container, Form, FormControl, FormGroup, FormLabel, Row } from 'react-bootstrap';
import './LoginForm.css';

export const LoginForm = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: async (values, { setSubmitting, setStatus, setErrors }) => {
      setSubmitting(true);
      setLoading(true);
      console.log('Form Values:', values); // Debugging: Print form values
      try {
        const response = await axios.post('http://localhost:8080/api/authenticate', values);
        console.log('Response:', response); // Debugging: Print response
        if (response.status === 200) {
          setStatus({ success: 'Login successful!' });
          localStorage.setItem('token', response.data.token);
          setTimeout(() => {
            history.push('/');
          } , 1000)
        } else {
          setErrors({ submit: 'Login failed. Please try again.' });
        }
      } catch (error) {
        console.error('Login error:', error);
        if (error.response && error.response.status === 401) {
          setErrors({ submit: 'Unauthorized. Please check your credentials.' });
        } else {
          setErrors({ submit: 'Login failed. Please try again.' });
        }
    
      } finally {
        setSubmitting(false);
        setLoading(false);
      }
    },
  });

  return (
    <>
      <Container className="login-container">
        <Row>
          <Card className="login-card mt-5">
        <CardHeader className="login-card-header">
          <CardTitle><h2>Login</h2></CardTitle>
          <CardSubtitle>
            <CardText>Please enter your login details</CardText>
          </CardSubtitle>
        </CardHeader>
        <CardBody className="login-card-body">
          <Form onSubmit={formik.handleSubmit}>
            <FormGroup className="mb-3">
              <FormLabel htmlFor="username">Username:</FormLabel>
              <FormControl
                type="text"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.username && formik.errors.username}
                required
              />
              <FormControl.Feedback type="invalid" variant="danger">
                {formik.errors.username}
              </FormControl.Feedback>
            </FormGroup>

            <FormGroup className="mb-3">
              <FormLabel htmlFor="password">Password:</FormLabel>
              <FormControl
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.password && formik.errors.password}
                required
              />
              <FormControl.Feedback type="invalid" variant="danger">
                {formik.errors.password}
              </FormControl.Feedback>
            </FormGroup>

            <Button type="submit" disabled={loading} className="w-100 login-button">
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </Form>
        </CardBody>
      </Card> 
      {formik.status && <Alert className="mt-4" variant="success">{formik.status.success}</Alert>}
      {formik.errors.submit && <Alert className="mt-4" variant="danger">{formik.errors.submit}</Alert>} 
        </Row>
        </Container>
    </>
  );
};