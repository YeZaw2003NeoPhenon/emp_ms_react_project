import { Modal,Button , ModalHeader , ModalFooter , ModalTitle , ModalBody } from "react-bootstrap"
export const ManagerTableDatasDetails = ({manager , showModal , handleShowModal , handleCloseModal , handleDelete }) => {
    return(
       <> 
       <tr>
              <td>{manager.id}</td>
              <td>{manager.name}</td>
              <td>{manager.department}</td>
              <td> 
                <Button variant = "danger" className = "btn btn-md" onClick={() => handleShowModal(manager.id)}>Delete Manager</Button>
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