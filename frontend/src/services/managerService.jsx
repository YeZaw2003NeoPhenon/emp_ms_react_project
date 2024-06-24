import { api } from "../api/dataResources"


const createManager = (manager) => {
    return api.post('/managers/create' , manager)
}

const getAllManagers = () => {
    return api.get('/managers')
}

const deleteManager = (id) => {
    return api.delete(`/managers/delete/${id}`)
}

export default {
    createManager,
    getAllManagers,
    deleteManager
}