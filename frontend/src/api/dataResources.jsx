
import axios from "axios";

 export const api = axios.create({
    baseURL : 'http://localhost:8080/api',
    withCredentials : true , // to vivaciously include creatial and catch up in corss-origin request
})

