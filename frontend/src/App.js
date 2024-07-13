import EmployeeTableDatas from "./component/EmployeeTableDatas";
import { BrowserRouter as Router , Route , Switch } from "react-router-dom";
import { CreateEmployeeForm } from "./component/CreateEmployeeForm";
import { UpdateEmployeeForm } from "./component/UpdateEmployeeForm";
import { EmployeeHeader } from "./component/EmployeeHeader";
import { ManagerTableDatas } from "./component/ManagerTableDatas";
import { LoginForm } from "./AuthComponent/LoginForm";
import { AccountCreationForm } from "./AuthComponent/AccountCreationForm";
import { useEffect, useState } from "react"
import employeeService from "./services/employeeService";
import { useModal } from "./component/useModal";
import { useAlertMessage } from "./component/useAlertMessage";

function App() {

  const[employees , setEmployees ] = useState([])

  const[error , setError ] = useState(null)

  const[selectedEmployee , setSelectedEmployee ] = useState(null)
  const[isLoading , setIsLoading ] = useState(true)

  const{selectedId , showModal , handleCloseModal , handleShowModal , setShowModal} = useModal()
  const{alertMessage , alertVariant , showAlertMessage} = useAlertMessage()

  useEffect(() => {
    fetchEmployees()
 } , [])

 const fetchEmployees = () => {
     setIsLoading(true)
     employeeService.getAllEmployeesWithManager().then((response) => {
      console.log('Employees with managers:', response.data);
         setEmployees(response.data)
         setError(null)
         setTimeout(() => {
             setIsLoading(false)
         },1000)
     }).catch( error => {
         setError(`There was an error fetching employees data: ${error.message}`);
         console.error('Error fetching employees with managers:', error);
         setIsLoading(false)
     })
 }

    
 const handleDelete = () => {
  employeeService.deleteEmployee(selectedId).then( response => {
      showAlertMessage('Employee Eminently Deleted!','success')
      fetchEmployees()
      setShowModal(false)
  }).catch(error => {
      setError('there is an maddening error deleting employees datas')
      setShowModal(false)
  }
  )
}

const findEmployeeById = (id) => {
  const employee = employees.find( emp => emp.id === id );
  setSelectedEmployee(employee)
}

  return (
    <>
    <Router>
      <EmployeeHeader headerName = "Employee Datas List" alertMessage = {alertMessage} 
       alertVariant = {alertVariant} showAlertMessage = {showAlertMessage}/>
        <Switch>

          <Route path = "/account_creation">
              <AccountCreationForm/>
          </Route>

          <Route path = "/login">
            <LoginForm/>
          </Route>
          <Route path={'/add'}>
            <CreateEmployeeForm/>
          </Route>
          <Route path = "/edit/:id">
             <UpdateEmployeeForm/>
          </Route>
          <Route path = "/" exact>
           <EmployeeTableDatas error = {error} 
                              employees = {employees}
                              findEmployeeById = {findEmployeeById}
                              selectedId = {selectedId}
                              showModal = {showModal}
                              handleDelete = {handleDelete}
                              handleShowModal = {handleShowModal}
                              handleCloseModal = {handleCloseModal}
                              selectedEmployee = {selectedEmployee}
                              setSelectedEmployee = {setSelectedEmployee}
                              alertMessage = {alertMessage}
                              alertVariant = {alertVariant}
                              isLoading = {isLoading}/>
           </Route>
          <Route path = "/managers">
          <ManagerTableDatas alertMessage = {alertMessage}
          alertVariant = {alertVariant} showAlertMessage = {showAlertMessage}/>
          </Route>

        </Switch>
      </Router>
      </>
  );
}

export default App;
