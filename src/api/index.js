import axios from "axios";

// const BASE_URL = "http://2d90f82c30ef.ngrok.io/api"; //process.env.SUITES_BASE_URL;
const BASE_URL = "https://suite-api.azurewebsites.net/api"; //process.env.SUITES_BASE_URL;

const baseInstance = axios.create({
    baseURL: BASE_URL,
    // timeout: 15000,
});


export const setBearerToken = (token) => {
    console.log('setting token', token);
    baseInstance.defaults.headers.common = {'Authorization': `bearer ${token}`}
}


export default baseInstance
