
import employeeService from "../services/employeeService"
import { useHistory , useParams } from "react-router-dom"
import { Button , Card , Container , Row , Col, Form, CardHeader, CardBody, 
        FormGroup , FormLabel , FormControl, Alert, Spinner ,
         Modal , ModalHeader , ModalBody , ModalDialog , ModalTitle , ModalFooter } from "react-bootstrap"

import { useEffect, useState } from "react"
import * as Yup from 'yup'
import { useFormik } from "formik"
export const UpdateEmployeeForm = () => {
    
    const[employees , setEmployees ] = useState({
          name : '',
          age : '',
          role : '',
          manager_id : ''
    })

    const[buttonText , setButtonText] = useState("Update Employee")
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const {id} = useParams()
    const [error , setError ] = useState(null)
    const[isLoading , setIsLoading ] = useState(true)
    const[showModal , setShowModal] = useState(false)
    const history = useHistory()

    useEffect(() => {
        if(id){
            employeeService.getEmployeeById(id).then( response => {
                setEmployees(response.data)
                setTimeout(() => {
                    setIsLoading(false)
                } , 1500)
            })
            .catch( error => {
                setError(`Employee Not Ultimately Trackable: ${error.message}`)
                setIsLoading(false)
            })
        }
    } , [id])

    const formik = useFormik({
        enableReinitialize : true,
        initialValues : employees,
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
            manager_id: Yup.number()
                .required('Manager is required')
            }),
        onSubmit : (values , { setSubmitting , setErrors , setStatus }) => {
            setSubmitting(true)
            setIsButtonDisabled(true)
            setButtonText('Updating...')
              values.manager_id = parseInt(values.manager_id , 10 )
            employeeService.updateEmployee(id, values).then((response) => {
             setStatus({success :  'Employee Updated Successfully'})
                setEmployees(response.data)
                formik.setValues({
                    name: response.data.name,
                    age : response.data.age,
                    role : response.data.role,
                    manager_id : response.data.manager_id
                })
            setTimeout(() => {      
                setButtonText('Updated')
                setSubmitting(false)
                setIsButtonDisabled(true)
            setTimeout(() => {
                    history.push('/')
                } , 1500)
                } , 1500)
            }).catch( error => {
                setButtonText('Update Employee')
                setIsButtonDisabled(false)
                // setErrors({ submit: "There was an error updating employee data!"});
                if( error.response && error.response.data ){
                    setErrors({ submit : error.response.data})
                    history.push('/')
                }
                else{
                    setErrors({ submit : "Unknown Error Occurs" })
                    history.push('/')
                }
                setSubmitting(false);      
            })
        }
    })

   if(isLoading){
       return(
  <Container>
     <Row className = "justify-content-md-center mt-3">
        <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
     </Row>
   </Container>
       )
    }
    const handleShowModal = (e) => {
        e.preventDefault()
        setShowModal(true)
    }
    const handleCloseModal = () => {
        setShowModal(false);
    }


    const handleConfirmUpdate = () => {
        formik.handleSubmit()
        handleCloseModal()
    }

    return(
        <Container>
        <Row className = "justify-content-md-center"> 
            <Col md = "6"> 
            <Card>
                <CardHeader>
                    <h2>Update Employee</h2>
                </CardHeader>
                <CardBody>
                    <Form method = "POST" onSubmit={handleShowModal}> 
                        <FormGroup> 
                            <FormLabel htmlFor="name" >
                                Name:
                            </FormLabel>
                            <FormControl type="text"
                            name = "name" 
                            value = {formik.values.name}
                            onChange = {formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid = {formik.touched.name && formik.errors.name }/>
                                 <FormControl.Feedback type="invalid">
                                            {formik.errors.name}
                                 </FormControl.Feedback>
                                 {formik.touched.name && !formik.errors.name && (
                                    <i className="bi bi-check-circle-fill text-success"></i>
                                 )}
                        </FormGroup>
                        <FormGroup>
                        <FormLabel htmlFor="age">
                                Age:
                            </FormLabel>
                            <FormControl type="text"
                            name = "age" 
                            value = {formik.values.age}
                            onChange = {formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid = {formik.touched.age && formik.errors.age }/>
                                 <FormControl.Feedback type="invalid">
                                            {formik.errors.age}
                                 </FormControl.Feedback>
                        </FormGroup>

                        <FormGroup>
                            <FormLabel htmlFor="role">
                                role:
                            </FormLabel>
                            <FormControl type="text"
                            name = "role" 
                            value={formik.values.role}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid = {formik.touched.role && formik.errors.role }/>
                                <FormControl.Feedback type="invalid">
                                    {formik.errors.role}
                                </FormControl.Feedback>
                         </FormGroup>
                         <FormGroup>
                                    <FormLabel htmlFor="manager_id">Manager ID:</FormLabel>
                                        <FormControl
                                            type="number"
                                            name="manager_id"
                                            id = "manager_id"
                                            value={formik.values.manager_id}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            isInvalid = {formik.touched.manager_id && formik.errors.manager_id }
                                        />
                                        <FormControl.Feedback type="invalid">
                                            {formik.errors.manager_id}
                                        </FormControl.Feedback>
                                    </FormGroup>
             <div className = "d-flex align-items-center justify-content-flex-start gap-3">
             <Button className = "mt-4" variant = "primary" type = "submit" disabled = {formik.isSubmitting || isButtonDisabled }>
                            {formik.isSubmitting ? (
                            <>
                                <Spinner 
                                as="span" 
                                animation="border"
                                size = "sm"
                                aria-label = "Gratifying Spinner Innovations"
                                aria-hidden = "true">
                                    {buttonText}
                                </Spinner>
                            </>
                            ) : (
                                buttonText
                            )}
                        </Button>
                        <Button
                  className="mt-4"
                  variant="secondary"
                  type="reset"
                  onClick={() => formik.resetForm()}
                >
                  Reset Form
                </Button>
             </div>
                    </Form>
                </CardBody>
            </Card>
                    {formik.errors.submit && <Alert className = "mt-4" variant = "danger">{formik.errors.submit}</Alert>}
                    { formik.status && formik.status.success && <Alert className = "mt-4" variant = "success">{formik.status.succeses}</Alert>}
                    {error && 
                     <Alert className="mt-4" variant="danger">
                    {error}
                    </Alert>
                    }
            </Col>
        </Row>
    <Modal show = {showModal} onHide = {handleCloseModal}>
        <ModalHeader closeButton>
        <ModalTitle>Confirm Update</ModalTitle>
        </ModalHeader>
            <ModalBody>
        <ModalDialog>
            Are you sure you want to branch out new updates to this employee?
        </ModalDialog>
        </ModalBody>
        <ModalFooter>
            <Button onClick={handleCloseModal} variant="secondary">Cancel</Button>
            <Button onClick = {handleConfirmUpdate} variant = "primary" >Update</Button>
        </ModalFooter>
     </Modal>
    </Container>
    )
}