import axios from "axios";


const apiUser = axios.create({
    baseURL: 'https://api-laravel-yi7k.onrender.com/api/user/'
});
export default apiUser;