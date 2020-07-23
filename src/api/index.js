import axios from "axios";

//const BASE_URL = " http://08e753a76546.ngrok.io/api"; //process.env.SUITES_BASE_URL;
const BASE_URL = "https://suite-api.azurewebsites.net/api"; //process.env.SUITES_BASE_URL;

const baseInstance = axios.create({
    baseURL: BASE_URL,
    // timeout: 15000,
    headers: {'X-Custom-Header': 'foobar'}
});

export default baseInstance
