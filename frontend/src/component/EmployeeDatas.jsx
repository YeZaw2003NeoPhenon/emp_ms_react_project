import { EmployeeDataMapping } from "./EmployeeDataMapping"
import { Table , Container , Alert } from "react-bootstrap"
import { EmployeeFooter } from "./EmployeeFooter"
import './css/EmployeeDatas.css'
export const EmployeeDatas = ({employees , error , handleDelete , successMessage  , handleShowModal , handleCloseModal , showModal , selectedId  , findEmployeeById , selectedEmployee , setSelectedEmployee}) => {
    return(
        <>
        <Container>
           <h1>Employees Datas</h1>
            {error && <Alert variant = "red">{error}</Alert>}
            {successMessage && < Alert style = {{fontSize : '25px' , fontWeight : 'bold'}} variant = "success">{successMessage}</Alert>}
            <Table striped hover responsive aria-label = "Table Employee complementary datas">
                <thead>
                    <tr className = "p-3 fw-bold text-primary">
                        <th>ID</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Role</th>
                        <th>Manager Name</th>
                        <th className = "ml-5 act-btn">Actions</th>
                    </tr> 
                </thead>
                <tbody>  
                {employees.map( employee => (
                    <EmployeeDataMapping 
                    key = {employee.id}
                    employee = {employee} 
                    showModal = {showModal}
                    selectedId = {selectedId}
                    handleDelete={handleDelete}
                    handleShowModal = {handleShowModal}
                    handleCloseModal = {handleCloseModal}
                    selectedEmployee = {selectedEmployee}
                    setSelectedEmployee = {setSelectedEmployee}
                    findEmployeeById = {findEmployeeById}/>
                ))
                    }
                </tbody>
            </Table>
        </Container>
        <EmployeeFooter employees = {employees}/>
         </>
    )
}
