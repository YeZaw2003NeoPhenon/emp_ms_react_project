
import { EmployeeDatas } from "./EmployeeDatas"
import {Container, Row , Spinner} from 'react-bootstrap'
 const EmployeeTableDatas = ({ employees , error , findEmployeeById , selectedId , showModal , handleDelete 
                            ,handleShowModal,handleCloseModal,selectedEmployee,setSelectedEmployee,isLoading , 
                             alertMessage , alertVariant}) =>{

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
                selectedId = {selectedId}
                showModal = {showModal}
                handleDelete = {handleDelete}
                handleShowModal = {handleShowModal}
                handleCloseModal = {handleCloseModal}
                findEmployeeById = {findEmployeeById}
                selectedEmployee = {selectedEmployee}
                setSelectedEmployee = {setSelectedEmployee}
                alertMessage = {alertMessage}
                alertVariant = {alertVariant}
                />
            )}
        </>
    )
}
export default EmployeeTableDatas;