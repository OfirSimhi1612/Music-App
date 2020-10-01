import axios from 'axios';
import { useUpdateUser } from '../../UserContext';
import cookie from 'react-cookies';


const network = axios.create({});

network.interceptors.response.use(

    config => {
        return config.data;
    },
    (error) => {
        if (error.response.status === 401 && window.location.pathname !== '/LogIn') {
            cookie.remove('music_jwt')
            window.location.pathname = '/LogIn'
            return
        } else {
            return error
        }
    }
);

export default network