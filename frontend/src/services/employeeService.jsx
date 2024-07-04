import { api } from "../api/dataResources"

    const getEmployeeById = (id) => {
        return api.get(`/employees/select/${id}`)
    }

    const createEmployee = (employee) => {
        return api.post('/employees/create', employee)
    }

    const updateEmployee = ( id , employee ) => {
        return api.put(`/employees/update/${id}` , employee)
    }

    const deleteEmployee = (id) => {
        return api.delete(`/employees/delete/${id}`)
    }

    const getAllEmployeesWithManager = () => {
        return api.get('/employees/with-managers')
    }

   export default {
    createEmployee,
     deleteEmployee,
     updateEmployee,
     getEmployeeById,
     getAllEmployeesWithManager
   }
