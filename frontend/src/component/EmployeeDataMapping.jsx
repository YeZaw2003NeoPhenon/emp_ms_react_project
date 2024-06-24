import { Link, useHistory, useParams } from "react-router-dom"
import { Button , Modal , ModalHeader , ModalBody , ModalDialog , ModalTitle , ModalFooter , Row , Col } from "react-bootstrap"
export const EmployeeDataMapping = ({ employee, handleDelete , showModal , selectedId , handleShowModal ,handleCloseModal , findEmployeeById  , selectedEmployee , setSelectedEmployee }) => {
    const history = useHistory()

    const updatedHistoryPath = () => {
        history.push(`/edit/${employee.id}`)
    }
    return(
        <>
    <tr>
        <td>{employee.id}</td>
        <td>{employee.name}</td>
        <td>{employee.age}</td>
        <td>{employee.role}</td>
        <td>{ employee.manager ? employee.manager.name : 'No Manager Data Found'}</td>
        {/* <td typeof="hidden">{employee.manager_id}</td> */}
        <td className = "d-flex align-items-center justify-content-center flex-row gap-3"> 
        <Button as={Link}  to={`/edit/${employee.id}`} onClick={updatedHistoryPath} variant = "success">Update</Button>
        <Button onClick={() => handleShowModal(employee.id)} variant = "danger" calssName = "fw-bold">Delete</Button>
        <Button variant = "info" onClick={() => findEmployeeById(employee.id)}>View</Button>
        </td>
    </tr>
       <Modal show = {showModal} onHide = {handleCloseModal}>
        <ModalHeader>
            <ModalTitle>Confirm Delete</ModalTitle>
        </ModalHeader>
        <ModalBody>
        <ModalDialog>
        Are you sure you want to delete this employee?
        </ModalDialog> 
        </ModalBody>
        <ModalFooter>
            <Button onClick={handleCloseModal} variant="secondary">Cancel</Button>
            <Button onClick = {handleDelete} >Delete</Button>
        </ModalFooter>
       </Modal>
       <aside>
        { selectedEmployee && (
            <Modal show = {true} onHide={() => setSelectedEmployee(null)}>
                  <Modal.Header closeButton>
                        <Modal.Title>Employee Details With Corresponding Managers</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>ID: {selectedEmployee.id}</p>
                        <p>Name: {selectedEmployee.name}</p>
                        <p>Age: {selectedEmployee.age}</p>
                        <p>Role: {selectedEmployee.role}</p>
                        { selectedEmployee.manager && (
                                <>
                                    <p>Manager ID: {selectedEmployee.manager.id}</p>
                                    <p>Manager Name: {selectedEmployee.manager.name}</p>
                                    <p>Manager Department Name : {selectedEmployee.manager.department}</p>
                                </>
                            )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setSelectedEmployee(null)}>Close</Button>
                    </Modal.Footer>
            </Modal>
        )}
       </aside>
      </>

    )
}