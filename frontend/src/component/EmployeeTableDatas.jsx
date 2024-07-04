import { useEffect, useState } from "react"
import employeeService from "../services/employeeService"
import { EmployeeDatas } from "./EmployeeDatas"
import {Container, Row , Spinner} from 'react-bootstrap'
 const EmployeeTableDatas = () =>{

    const[employees , setEmployees ] = useState([])

    const[error , setError ] = useState(null)

    const[successMessage , setSuccessMessage ] = useState(null)

    const[showModal , setShowModal ] = useState(null) 

    const[selectedId , setSelectedId ] = useState(null)
    const[selectedEmployee , setSelectedEmployee ] = useState(null)
    const[isLoading , setIsLoading ] = useState(true)

    useEffect(() => {
       fetchEmployees()
    } , [])

    const fetchEmployees = () => {
        setIsLoading(true)
        employeeService.getAllEmployeesWithManager().then((response) => {
            setEmployees(response.data)
            setSuccessMessage(null)
            setError(null)
            setTimeout(() => {
                setIsLoading(false)
            },1000)
        }).catch( error => {
            setError(`There was an error fetching employees data: ${error.message}`);
            setIsLoading(false)
            setSuccessMessage(null)
        })
    }

    
    const handleDelete = () => {
        employeeService.deleteEmployee(selectedId).then( response => {
            fetchEmployees()
            setSuccessMessage('Employee Deleted Successfully!')
            setShowModal(false)
        }).catch(error => {
            setError('there is an maddening error deleting employees datas')
            setShowModal(false)
        }
        )
    }

    const handleShowModal = (id) => {
        setSelectedId(id)
        setShowModal(true)
    }

    const handleCloseModal = () => {
        setSelectedId(null)
        setShowModal(false)
    }
    
    const findEmployeeById = (id) => {
        const employee = employees.find( emp => emp.id === id );
        setSelectedEmployee(employee)
    }
    
    return(
        <>
            {isLoading ? (
                 <Container>
                 <Row className = "justify-content-md-center mt-3">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                 </Row>
               </Container>
            ) : (
                <EmployeeDatas employees  = {employees} 
                error = {error}
                successMessage = {successMessage}
                selectedId = {selectedId}
                showModal = {showModal}
                handleDelete = {handleDelete}
                handleShowModal = {handleShowModal}
                handleCloseModal = {handleCloseModal}
                findEmployeeById = {findEmployeeById}
                selectedEmployee = {selectedEmployee}
                setSelectedEmployee = {setSelectedEmployee}
                />
            )}
        </>
    )
}
export default EmployeeTableDatas;