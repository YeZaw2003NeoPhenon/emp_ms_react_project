
import { Nav , Navbar , NavItem , NavLink , NavbarToggle , NavbarCollapse , NavbarBrand} from "react-bootstrap"
import { NavLink as RounterNavLink } from "react-router-dom"
import './css/EmployeeHeader.css'
import { useState } from "react"
import { CreateManagerModal } from "./CreateManagerModal"
export const EmployeeHeader = ({headerName}) => {
    const[showManagerModal , setShowManagerModal ] = useState(false)

    const handleManagerShowModal = () => {
        setShowManagerModal(true)
    }

    const handleManagerCloseModal = () => {
        setShowManagerModal(false)
    }
    
    return(
        <>
        <Navbar bg="dark" expand="lg" className = " p-4 mb-5">
        <NavbarBrand className = "text-light fw-bold letter-spacing-2 header-title">{headerName}</NavbarBrand>
        <NavbarToggle aria-controls="emp_nav" />
        <NavbarCollapse id="emp_nav" className="d-flex flex-row align-items-center justify-content-end gap-2">
            <Nav className="ml-auto p-2">
                <NavItem>
                    <NavLink as={RounterNavLink} autoFocus  to = "/add" type = "button" className = "rounded-pill bg-primary text-light p-3 me-4 create_btn">
                        Create Employee
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className = "text-light home">Home</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className = "text-light profile">Profile</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className = "text-light settings">Settings</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className = "text-light logout">Logout</NavLink>
                </NavItem>
                <NavItem>
                <NavLink as={RounterNavLink} to="/managers" className = "d-block fw-bold">
                 Manager Table
                </NavLink>
                </NavItem>
                <NavLink autoFocus type = "btn" className = " d-block rounded-pill btn btn-outline-success fw-bold text-light p-3 create_manager_btn" onClick={handleManagerShowModal}>
                        Create Manager
                </NavLink>
            </Nav>
        </NavbarCollapse>
    </Navbar>
        <CreateManagerModal showManagerModal = {showManagerModal} handleManagerCloseModal = {handleManagerCloseModal}/>
        </>
    )
}
