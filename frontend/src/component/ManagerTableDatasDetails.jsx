import { Modal, Button , ModalHeader , ModalFooter , ModalTitle , ModalBody } from "react-bootstrap"
import {Link, useHistory } from "react-router-dom"
export const ManagerTableDatasDetails = ({manager , showModal , handleShowModal , handleCloseModal , handleDelete }) => {
  const history = useHistory()

  const managerUpdatePath = () => {
    history.push(`/manager/edit/${manager.id}`)
  }

    return(
       <> 
       <tr>
              <td>{manager.id}</td>
              <td>{manager.name}</td>
              <td>{manager.department}</td>
              <td  className = " btn-group d-flex align-items-center justify-content-center gap-3 "> 
                <Button variant = "danger" className = "btn btn-md w-50 rounded-pill" onClick={() => handleShowModal(manager.id)} >Delete Manager</Button>
                <Button variant = "secondary" as= {Link} to={`/manager/edit/${manager.id}`} className = "btn btn-md mr-3 w-50 rounded-pill" onClick={managerUpdatePath} target = "_parent">Update</Button>
              </td>
        </tr>
            <Modal
              show={showModal}
              onHide={handleCloseModal}
              backdrop="static"
            >  
            <ModalHeader closeButton>
                <ModalTitle>Delete Manager Data</ModalTitle>
              </ModalHeader>
              <ModalBody aria-label="modal text infos">
                Are you sure you wanna filter out this manager data
              </ModalBody>
              <ModalFooter>
                <Button variant="secondary" onClick={handleCloseModal}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleDelete}>Confirm</Button>
              </ModalFooter>
            </Modal>
            </>
    )
}