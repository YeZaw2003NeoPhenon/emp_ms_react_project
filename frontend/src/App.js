import EmployeeTableDatas from "./component/EmployeeTableDatas";
import { BrowserRouter as Router , Route , Switch } from "react-router-dom";
import { CreateEmployeeForm } from "./component/CreateEmployeeForm";
import { UpdateEmployeeForm } from "./component/UpdateEmployeeForm";
import { EmployeeHeader } from "./component/EmployeeHeader";
import { ManagerTableDatas } from "./component/ManagerTableDatas";

function App() {
  return (
    <>
    <Router>
      <EmployeeHeader headerName = "Employee Datas List"/>
        <Switch>
          <Route path={'/add'} component={CreateEmployeeForm}/>
          <Route path = "/edit/:id" component={UpdateEmployeeForm} />
          <Route path = "/" component={EmployeeTableDatas} exact/>
          <Route path = "/managers" component={ManagerTableDatas} />
        </Switch>
      </Router>
      </>
  );
}

export default App;
