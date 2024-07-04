import { Modal, ModalBody , ModalDialog , ModalHeader , ModalTitle , ModalFooter ,
         Button  , Alert, Form ,FormControl,FormGroup , FormLabel, 
         Container , Row , Col, 
         ButtonGroup} 
         from "react-bootstrap"
import * as Yup from 'yup'
import { useFormik } from "formik"
import { useState } from "react"
import managerService from "../services/managerService"

export const CreateManagerModal = ({showManagerModal , handleManagerCloseModal}) => {

    const[manager , setManager ] = useState({
        id : '',
        name : '',
        department : ''
    })
    
    const formik = useFormik({
        initialValues : manager,
        validationSchema : Yup.object({
            id : Yup.number()
            .required('Manager Id is required'),
            name : Yup.string()
            .nonNullable("Name must not be empty!")
            .min(3, 'Name must be at least 3 characters')
            .max(50, 'Name must be 50 characters or less')
            .required('Name is required'),
            department: Yup.string()
            .nonNullable('Department must not be empty')
            .required('Department is required'),
        })
        ,
        onSubmit :  ( values , { setSubmitting , setErrors , setStatus }) => {
            setSubmitting(true)
            managerService.createManager(values).then( response => {
                setStatus({ success : 'Manager Created Vivaciously!'})
                setManager(response.data)
            })
            .catch((error) => {
                setErrors({ submit : 'There is belittiling error while submitting manager datas!'} , error)
                setSubmitting(false)
            })
        }
    })
    return(
       <Container>
         <Row>
            <Col>
         <Modal show = {showManagerModal} onHide={handleManagerCloseModal} >
             <ModalHeader closeButton>
                <ModalTitle>
                    Create Manager
                </ModalTitle>
            </ModalHeader>
            <ModalBody>
            <ModalDialog>
               <Form onSubmit ={formik.handleSubmit} className = "p-4 fw-bold ">
                                    <FormGroup>
                                        <FormLabel htmlFor="id">ID:</FormLabel>
                                        <FormControl
                                            type="number"
                                            name="id"
                                            value={formik.values.id} 
                                            onChange = {formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            isInvalid = {formik.touched.id && formik.errors.id }
                                        />
                                        <FormControl.Feedback type="invalid" variant = "danger">
                                            {formik.errors.id }
                                        </FormControl.Feedback>
                                    </FormGroup>
                                    <FormGroup>
                                    <FormLabel htmlFor="name">Name:</FormLabel>
                                        <FormControl
                                            type="text"
                                            name="name"
                                            value={formik.values.name}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur} 
                                            isInvalid = {formik.touched.name && formik.errors.name }
                                        />
                                    <FormControl.Feedback type="invalid">
                                            {formik.errors.name}
                                        </FormControl.Feedback>
                                    </FormGroup>
                                    <FormGroup>
                                    <FormLabel htmlFor="department">Department:</FormLabel>
                                        <FormControl
                                            type="text"
                                            name="department"
                                            value={formik.values.department}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            isInvalid = {formik.touched.department && formik.errors.department}
                                        />
                                        <FormControl.Feedback type="invalid">
                                            {formik.errors.department}
                                        </FormControl.Feedback>
                                    </FormGroup>
                                    
                                       <ButtonGroup className = "d-flex flex-row justify-content-center align-items-center gap-3 fw-bold">
                                       <Button type = "submit"
                                        variant="primary" 
                                        className = "mt-4"> 
                                            Create Manager
                                        </Button>
                                        <Button 
                                        className="mt-4"
                                        variant="danger" 
                                        type="reset"
                                        onClick={() => formik.handleReset()}>Reset</Button>
                                        </ButtonGroup>
                                </Form>
                            { formik.status && <Alert className = "mt-4" variant = "success">{formik.status.success}</Alert>}
                            { formik.errors.submit && <Alert className = "mt-4" variant = "danger">{formik.errors.submit}</Alert>}
            </ModalDialog>
            <ModalFooter>
                <Button variant="secondary" onClick={handleManagerCloseModal}>Close</Button>
            </ModalFooter>
            </ModalBody>
        </Modal>
        </Col>
            </Row>
       </Container>
    )
}