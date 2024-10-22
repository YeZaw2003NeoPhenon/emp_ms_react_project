import { useState } from "react"
import { useParams , useHistory} from "react-router-dom"
import managerService from "../services/managerService"
import { useEffect } from "react"
import { Card, CardBody, CardHeader, CardTitle, Col, Container, Form, FormControl, FormGroup, FormLabel, Row, Spinner } from "react-bootstrap"
import { Alert } from "react-bootstrap"
import { Button } from "react-bootstrap"
import { useAlertMessage } from "./useAlertMessage"

export const UpdateManager = () => {

    const[manager, setManager] = useState({
        name : '',
        department : ''
    })

    const history = useHistory() 

    const [error , setError ] = useState(null)
    const{id} = useParams()
    const{alertMessage , alertVariant , showAlertMessage} = useAlertMessage()
    const[loading , setLoading] = useState(true)
    const [btnText, setBtnText] = useState("Update");
    const [btnDisabled, setBtnDisabled] = useState(false);

    useEffect(() => {
        managerService.getManagerById(id).then((response) => {
            setManager(response.data)
           setTimeout(() => {
                setLoading(false)
           },1000)
        }).catch(error => {
            setError(`There is an error while trying to patch up manager object: ${error.message}`)
            setLoading(false)
        })
    },[id])

    const handleSubmit = (e) => {
        e.preventDefault()
        setBtnText('Updating...')
        setBtnDisabled(true)
        managerService.updateManager(id , manager).then(() => {
            showAlertMessage('Manager is updated triumphantly', 'success')
            setTimeout(() => {
                setBtnText("Updated")
                setBtnDisabled(false)
                history.push('/managers')
            }, 1000)
           
        }).catch(error => {
            showAlertMessage('Error popped up while updating manager', 'danger')
            setError(`Error updating manager: ${error.message}`);
            setBtnText("Update")
            setBtnDisabled(false)
        }).finally(() => {
            setLoading(false)
        })
    }

    const handleChange = (e) => {
        const {name , value} = e.target;
        setManager({...manager , [name] : value})
    }

    if(loading){
        return (
            <Container>
                <Row className = "justify-content-md-center mt-3">
                    <Spinner animation="border" role = "status">
                        <span className = "visually-hidden">Loading...</span>
                    </Spinner>
                </Row>
            </Container>
        )
    }

    return(
        <Container> 
          {error && <Alert variant={alertVariant}>{alertMessage}</Alert>}
         {alertMessage && <Alert variant={alertVariant}>{alertMessage}</Alert>}
            <Row className = "justify-content-md-center">
                <Col md = '6'>
                <Card>
                    <CardHeader>
                        <CardTitle>
                            <h2>Update Manager</h2>
                        </CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Form method = "POST" onSubmit={handleSubmit}>
                            <FormGroup>
                                <FormLabel>Name</FormLabel>
                                <FormControl 
                                name = "name"
                                value={manager.name}
                                onChange={handleChange}
                                required
                                />
                            </FormGroup>
                            <FormGroup>
                                <FormLabel>Department</FormLabel>
                                <FormControl 
                                name = "department"
                                value={manager.department}
                                onChange={handleChange}
                                required
                                />
                            </FormGroup>
                            <Button type = "submit" className = "mt-4" variant = "primary" disabled = {btnDisabled}>{btnText}</Button>
                        </Form>
                    </CardBody>
                </Card>
                </Col>
            </Row>
        </Container>
    )
}