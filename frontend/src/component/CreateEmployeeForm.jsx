import employeeService from "../services/employeeService"
import {useHistory} from 'react-router-dom'
import { useState } from "react"
import { useFormik } from "formik"
import * as Yup from 'yup'
import { Button , Card , Container , Form , Row , Col, CardHeader, CardBody, Alert , FormGroup ,FormControl , FormLabel , Spinner } from "react-bootstrap"
export const CreateEmployeeForm = () => {

    const[ buttonText , setButtonText ] = useState('Create Employee')
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [employees , setEmployees ] = useState({
        name : '',
        age : '',
        role : '',
        manager_id : ''
    }) 

    const history = useHistory()

    const formik = useFormik({
        initialValues : employees,
        // validatiion Schema will dexterously handle any delirious and patronyzing invalidated messages throughtout name , age ,role
        validationSchema : Yup.object({
        name: Yup.string()
            .nonNullable("Name must not be empty!")
            .min(3, 'Name must be at least 3 characters')
            .max(50, 'Name must be 50 characters or less')
            .required('Name is required'),
        age: Yup.number()
            .min(18, 'Age must be at least 18')
            .max(60 , 'Age must not be above 60')
            .required('Age is required'),
        role: Yup.string()
            .required('Role is required'),
        manager_id : Yup.number()
                    .required('Manager Id is Required')
        })
         ,
          onSubmit : ( values, { setSubmitting , setErrors , setStatus }) => {
            setSubmitting(true)
            setIsButtonDisabled(true)
            setButtonText('Creating...')
            employeeService.createEmployee(values)
                .then(response => {
                    setStatus({ success : 'Employee Created Vivaciously!'})
                    setEmployees(response.data)
                    // formik.setValues(response.data)
                    setTimeout(() => {
                        setButtonText('Created')
                        setIsButtonDisabled(true)
                        setSubmitting(false)
                        setTimeout(() => {
                            history.push('/');
                        } , 2000 )
                    }, 2000 )
                })
                .catch(error => {
                    setButtonText('Create Employee');
                    setIsButtonDisabled(false);
                    setErrors({ submit : 'There is unfathomable error while submitting employee datas!'})
                    setSubmitting(false);
                });
        }
    })

    return(
        <Container>
        <Row className="justify-content-md-center">
            <Col md="6">
                <Card>
                    <CardHeader>
                        <h2>Create Employee</h2>
                    </CardHeader>
                    <CardBody>
                                <Form onSubmit={formik.handleSubmit}>
                                    <FormGroup>
                                        <FormLabel htmlFor="name">Name:</FormLabel>
                                        <FormControl
                                            type="text"
                                            name="name"
                                            value={formik.values.name} 
                                            onChange = {formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            isInvalid = {formik.touched.name && formik.errors.name }
                                        />
                                        <FormControl.Feedback type="invalid" variant = "danger">
                                            {formik.errors.name}
                                        </FormControl.Feedback>
                                    </FormGroup>
                                    <FormGroup>
                                    <FormLabel htmlFor="age">Age:</FormLabel>
                                        <FormControl
                                            type="number"
                                            name="age"
                                            value={formik.values.age}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur} 
                                            isInvalid = {formik.touched.age && formik.errors.age }
                                        />
                                    <FormControl.Feedback type="invalid">
                                            {formik.errors.age}
                                        </FormControl.Feedback>
                                    </FormGroup>
                                    <FormGroup>
                                    <FormLabel htmlFor="role">Role:</FormLabel>
                                        <FormControl
                                            type="text"
                                            name="role"
                                            value={formik.values.role}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            isInvalid = {formik.touched.role && formik.errors.role }
                                        />
                                        <FormControl.Feedback type="invalid">
                                            {formik.errors.role}
                                        </FormControl.Feedback>
                                    </FormGroup>
                                    <FormGroup>
                                    <FormLabel htmlFor="manager_id">Manager ID:</FormLabel>
                                        <FormControl
                                            type="text"
                                            name="manager_id"
                                            value={formik.values.manager_id}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            isInvalid = {formik.touched.manager_id && formik.errors.manager_id }
                                        />
                                        <FormControl.Feedback type="invalid">
                                            {formik.errors.manager_id}
                                        </FormControl.Feedback>
                                    </FormGroup>
                                    <Button
                                        className="mt-4"
                                        variant="primary"
                                        type="submit"
                                        disabled={ isButtonDisabled ||  formik.isSubmitting}
                                    >
                                        {formik.isSubmitting ? (
                                            <>
                                              <Spinner as="span" 
                                              animation="border"
                                              size = "sm"
                                                role = "status"
                                                aria-label = "speactular Spinner Cultivation"
                                                aria-hidden = "true"/>

                                               {buttonText}
                                            </>
                                        ) : (
                                            buttonText
                                        )}
                                    </Button>
                                </Form>
                            { formik.status && <Alert className = "mt-4" variant = "success">{formik.status.success}</Alert>}
                            { formik.errors.submit && <Alert className = "mt-4" variant = "danger">{formik.errors.submit}</Alert>}
                    </CardBody>
                </Card>
            </Col>
        </Row>
    </Container>

    )
}
