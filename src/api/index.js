import axios from "axios";

// const BASE_URL = "http://f8fe8641664c.ngrok.io"; //process.env.SUITES_BASE_URL;
const BASE_URL = "https://suite-api.azurewebsites.net"; //process.env.SUITES_BASE_URL;

const baseInstance = axios.create({
    baseURL: `${BASE_URL}/api`,
    // timeout: 15000,
});


export const setBearerToken = (token) => {
    console.log('setting token', token);
    baseInstance.defaults.headers.common = {'Authorization': `bearer ${token}`}
}

export default baseInstance
