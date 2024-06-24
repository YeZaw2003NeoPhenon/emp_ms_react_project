import { MDBFooter , MDBContainer} from 'mdb-react-ui-kit'

export const EmployeeFooter = ({employees}) => {
    return( 
       <MDBContainer  className='text-center text-lg-left bg-dark d-flex flex-column' style = {{ minHeight : '10vh'}}>
            <MDBFooter className = "text-light text-center" style = {{padding:'1em 0' , position : 'relative' , bottom : '0' , width:'100%'}}>
                <p>
                &copy; {new Date().getFullYear()} Copyright:{' '}
                <b className = "fw-bold fs-5 text-light">{employees.length === 0 ? 'Your Employee List is empty' : employees.length}{employees.length > 1 ? 'Employee Datas' : 'Employee Data'}</b>
                </p>
            </MDBFooter>
        </MDBContainer>
    )
}