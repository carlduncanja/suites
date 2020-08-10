import axios from "axios";

const BASE_URL = "http://fd986899ec5d.ngrok.io/api"; //process.env.SUITES_BASE_URL;
// const BASE_URL = "https://suite-api.azurewebsites.net/api"; //process.env.SUITES_BASE_URL;

const baseInstance = axios.create({
    baseURL: BASE_URL,
    // timeout: 15000,
    headers: {'X-Custom-Header': 'foobar'}
});

export default baseInstance
