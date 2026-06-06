import axios from 'axios';

const axiosApi = axios.create({
    baseURL: 'https://your-db-name-default-rtdb.europe-west1.firebasedatabase.app/'
});

export default axiosApi;