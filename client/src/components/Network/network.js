import axios from 'axios';
import { useUpdateUser } from '../../UserContext';
import cookie from 'react-cookies';
import swal from 'sweetalert'

const network = axios.create({});

network.interceptors.response.use(

    config => {
        return config;
    },
    (error) => {
        if (error.response.status === 401 && window.location.pathname !== '/LogIn') {
            cookie.remove('music_jwt')
            swal({
                text: 'You must login first',
                icon: "error",
                button: "ok",
            }).then(res => window.location = '/LogIn')
        } else {
            throw error
        }
    }
);

export default network