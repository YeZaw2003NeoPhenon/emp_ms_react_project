import { Link, useHistory } from "react-router-dom"
import { Button , Modal , ModalHeader , ModalBody , ModalDialog , ModalTitle , ModalFooter } from "react-bootstrap"
import { EmployeeProfile } from "./EmployeeProfile"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faEye } from '@fortawesome/free-solid-svg-icons';

export const EmployeeDataMapping = ({ employee, handleDelete , showModal , handleShowModal ,handleCloseModal , findEmployeeById  , selectedEmployee , setSelectedEmployee }) => {
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
        <Button as={Link}  onClick={updatedHistoryPath} variant = "success" target="_parent">
        <FontAwesomeIcon icon={faEdit} /> Edit
        </Button>
        <Button onClick={() => handleShowModal(employee.id)} variant = "danger" calssName = "fw-bold">
        <FontAwesomeIcon icon={faTrash} /> Delete
        </Button>
        <Button variant = "info" onClick={() => findEmployeeById(employee.id)}>
        <FontAwesomeIcon icon={faEye} /> View
        </Button>
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
        <EmployeeProfile selectedEmployee = {selectedEmployee}
                        setSelectedEmployee = {setSelectedEmployee}/>
       </aside>
      </>

    )
}