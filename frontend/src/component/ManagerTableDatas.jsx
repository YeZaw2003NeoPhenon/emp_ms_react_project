import { useEffect, useState } from "react"
import {Table , Container , Row , Col , Spinner, Alert} from "react-bootstrap"
import managerService from "../services/managerService"
import { ManagerTableDatasDetails } from "./ManagerTableDatasDetails"
export const ManagerTableDatas = () => {
    const[managers , setManagers ] = useState([])
    const[isLoading , setIsLoading ] = useState(true)
    const[error , setError ] = useState(null)
    const[successMessage , setSuccessMessage ] = useState(null)
    const[showModal , setShowModal ] = useState(false)
    const[selectedId , setSelectedId ] = useState(null)

    const handleShowModal = (id) => {
      setSelectedId(id)
      setShowModal(true)
    }

    const handleCloseModal = () => {
      setSelectedId(null)
      setShowModal(false)
    }

    useEffect(() => {
        fetchManagerDatas()
    })

    const fetchManagerDatas = () => {
        managerService.getAllManagers().then((response) => {
            setManagers(response.data)
            setIsLoading(false)
            setError(null)
            setSuccessMessage(null)
        })
        .catch((error) => {
        setIsLoading(false)
        setSuccessMessage(null)
        setError(`There was an error fetching manager data: ${error.message}`);
      })
    }

    const handleDelete = () => {
      managerService.deleteManager(selectedId).then( response => {
          // fetchManagerDatas()
          setSuccessMessage('Manager Deleted Successfully!')
          setShowModal(false)
      }).catch(error => {
          setError(`there is an maddening error deleting employees datas: ${error.message}`)
          setShowModal(false)
      }
      )
  }

    if(isLoading){
        return(
   <Container>
     <Row className = "justify-content-md-center mt-3">
             <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
     </Row>
    </Container>
        )
     }

    return(
    <Container>
        <Row>
           <Col>
           <h2>Manager Table</h2>
     <Table striped bordered hover responsive>
         <thead className="table-dark">
          <tr className = "text-center">
            <th>ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
           {managers.map( manager => (
             <ManagerTableDatasDetails
              key={manager.id}
              manager = {manager}
              showModal = {showModal}
              handleShowModal = {handleShowModal}
              handleCloseModal = {handleCloseModal}
              handleDelete = {handleDelete}
              />
           ))}
        </tbody>
        </Table> 
        {successMessage && <Alert variant="success" className = "fw-bold mt-3 ">{successMessage}</Alert>}
        {error && <Alert variant="danger" className = "fw-bold mt-3 ">{error}</Alert>}
                </Col>
            </Row>
        </Container>
    )
}