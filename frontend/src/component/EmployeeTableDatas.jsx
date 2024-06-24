import { useEffect, useState } from "react"
import employeeService from "../services/employeeService"
import { EmployeeDatas } from "./EmployeeDatas"
import { Button } from "react-bootstrap"
 const EmployeeTableDatas = () =>{

    const[employees , setEmployees ] = useState([])

    const[error , setError ] = useState(null)

    const[successMessage , setSuccessMessage ] = useState(null)

    const[showModal , setShowModal ] = useState(null) 

    const[selectedId , setSelectedId ] = useState(null)
    const[selectedEmployee , setSelectedEmployee ] = useState(null)


    useEffect(() => {
       fetchEmployees()
    } , [])

    const fetchEmployees = () => {
        employeeService.getAllEmployeesWithManager().then((response) => {
            setEmployees(response.data)
            setSuccessMessage(null)
            setError(null)
        }).catch( error => {
            setError(`There was an error fetching employees data: ${error.message}`);
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
        </>
    )
}
export default EmployeeTableDatas;