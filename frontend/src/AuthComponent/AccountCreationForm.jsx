import axios from "axios";
import {useState} from 'react'
import * as Yup from 'yup'
import { useFormik } from "formik";
import { Alert, Button, ButtonGroup, Card, CardBody, CardHeader, CardSubtitle, CardText, CardTitle, Container, Form, FormCheck, 
    FormControl, FormGroup, FormLabel, FormSelect  } from "react-bootstrap";

import { useHistory } from "react-router-dom";

export const AccountCreationForm = () => {
    const [loading, setLoading] = useState(false);
    const history = useHistory()
    const initialUserDatas =  {
        username: '',
        password: '',
        authority: '',
        enabled: true,
      }

      const formik = useFormik({
        initialValues : initialUserDatas,
        validationSchema : Yup.object({
            username: Yup.string()
            .nonNullable('password must not be hellaciously empty or null')
            .required('Username is required'),
            password: Yup.string()
            .nonNullable('password must not be hellaciously empty or null')
              .required('Password is required')
              .min(6, 'Password must be at least 6 characters long'),
            enabled: Yup.boolean()
            .required('Enabled is required'),
            authority: Yup.string()
            .required('Authority is required')
        }),
        onSubmit : async( values , { setSubmitting , setStatus , setErrors}) => {
            setSubmitting(true)
            setLoading(true)
            try{
                const response = await axios.post('http://localhost:8080/api/accountCreationProcess' ,values )

                if( response.status == '201' ){
                    setStatus({success : 'Account has been triumphanly set up!'})
                    setTimeout(() => {
                        history.push('/')
                    },1000)
                }
                else{
                    setErrors({status : 'Account creation failed. Please try again.' })
                }
               }
               catch(error){
                console.error('Account creation error:', error);
                setErrors({status : 'An error occurred during account creation.' }) 
               }
                finally{
                    setSubmitting(false)
                    setLoading(false)
                }
        }
      })
    return(
    <Container>
      <Card>
        <CardHeader>
            <CardTitle><h2>Create Account</h2></CardTitle>
            <CardSubtitle>
                <CardText>Please Fill out form</CardText>
            </CardSubtitle>
        </CardHeader>
            <CardBody>
    <Form onSubmit={formik.handleSubmit}>
        <FormGroup className="mb-3">
          <FormLabel htmlFor="username">Username:</FormLabel>
          <FormControl
            type="text"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid = {formik.touched.username && formik.errors.username }
            required
          />
            <FormControl.Feedback type="invalid" variant = "danger">
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
            isInvalid = {formik.touched.password && formik.errors.password }
            required
          />
            <FormControl.Feedback type="invalid" variant = "danger">
                 {formik.errors.password}
            </FormControl.Feedback>
        </FormGroup>

        <FormGroup className="mb-3">
          <FormLabel htmlFor="enabled" >Enabled:</FormLabel>
          <FormCheck
            inline
            style={{marginLeft : '5px'}}
            name="enabled"
            value={formik.values.enabled}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid = {formik.touched.enabled && formik.errors.enabled }
            required
          />
            <FormControl.Feedback type="invalid" variant = "danger">
                 {formik.errors.enabled}
            </FormControl.Feedback>
        </FormGroup>

        <FormGroup className="mb-3">
             <FormLabel htmlFor="authority">Authority:</FormLabel>
                   <FormSelect
                     name="authority"
                     value={formik.values.authority}
                     onChange={formik.handleChange}
                     onBlur={formik.handleBlur}
                     isInvalid={formik.touched.authority && formik.errors.authority}
                     required>
                            <option value="" label="Select authority" />
                            <option value="USER" label="User" />
                            <option value="ADMIN" label="Admin" />
                            </FormSelect>
                 <FormControl.Feedback type="invalid" variant="danger">
                                {formik.errors.authority}
                </FormControl.Feedback>
            </FormGroup>
            <ButtonGroup className = "d-flex align-items-center justify-content-center flex-row d-block gap-3 ">
            <Button type="submit" disabled={loading} className="rounded-pill">
                  {loading ? 'Creating Account...' : 'Create Account'}
                </Button>
                <Button onClick={() => formik.resetForm()} type = "reset" 
                className = "btn-secondary rounded-pill"> 
                    Reset
                </Button>
            </ButtonGroup>

      </Form>
            </CardBody>
      </Card>
      { formik.status && <Alert className = "mt-4" variant = "success">{formik.status.success}</Alert>}
    { formik.errors.submit && <Alert className = "mt-4" variant = "danger">{formik.errors.submit}</Alert>}

    </Container>
    )
}