import { Modal , ModalHeader , ModalTitle , ModalBody , Card , CardBody , ModalFooter , Button} from "react-bootstrap"


export const EmployeeProfile = ({selectedEmployee , setSelectedEmployee}) => {
    return(
  <Modal 
        show={!!selectedEmployee}
        onHide={() => setSelectedEmployee(null)}
        size="lg"
        centered>
    <ModalHeader closeButton>
        <ModalTitle>Employee Profile</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <section className="shadow" style={{ backgroundColor: "whitesmoke" }}>
          <div className="container py-5">
            <div className="row">
              <div className="col-lg-3">
                <Card className="mb-4">
                  <CardBody className="text-center">
                    <img
                      src="https://via.placeholder.com/150"
                      alt="avatar"
                      className="rounded-circle img-fluid"
                      style={{ width: 150 }}
                    />
                    <h5 className="my-3">{`${selectedEmployee?.name}`}</h5>
                    <div className="d-flex justify-content-center mb-2">
                      <Button type="button" className="btn btn-outline-primary">
                        Call
                      </Button>
                      <Button type="button" className="btn btn-outline-warning ms-1">
                        Message
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              </div>

              <div className="col-lg-9">
                <Card className="mb-4">
                  <CardBody>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <h5 className="mb-0">ID</h5>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{selectedEmployee?.id}</p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <h5 className="mb-0">Name</h5>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{selectedEmployee?.name}</p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <h5 className="mb-0">Age</h5>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{selectedEmployee?.age}</p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <h5 className="mb-0">Role</h5>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{selectedEmployee?.role}</p>
                      </div>
                    </div>
                    {selectedEmployee?.manager && (
                      <>
                        <hr />
                        <div className="row">
                          <div className="col-sm-3">
                            <h5 className="mb-0">Manager ID</h5>
                          </div>
                          <div className="col-sm-9">
                            <p className="text-muted mb-0">{selectedEmployee.manager.id}</p>
                          </div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-sm-3">
                            <h5 className="mb-0">Manager Name</h5>
                          </div>
                          <div className="col-sm-9">
                            <p className="text-muted mb-0">{selectedEmployee.manager.name}</p>
                          </div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-sm-3">
                            <h5 className="mb-0">Manager Department</h5>
                          </div>
                          <div className="col-sm-9">
                            <p className="text-muted mb-0">{selectedEmployee.manager.department}</p>
                          </div>
                        </div>
                      </>
                    )}
                  </CardBody>
                  <ModalFooter>
                    <Button variant="secondary" onClick={() => setSelectedEmployee(null)}>
                        Close
                        </Button>
                    </ModalFooter>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </ModalBody>

        </Modal>
    )
}