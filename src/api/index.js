import axios from 'axios'

const BASE_URL = "localhost:4001"; //process.env.SUITES_BASE_URL;

const baseInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
});

export default baseInstance
