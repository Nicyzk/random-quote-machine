import axios from 'axios';

const instance = axios.create({
    baseURL: "https://front-end-libraries-fcc.firebaseio.com/"
});

export default instance;