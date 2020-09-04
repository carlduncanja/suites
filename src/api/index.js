import axios from "axios";

const BASE_URL = "http://376e60d7a64b.ngrok.io"; //process.env.SUITES_BASE_URL;
// const BASE_URL = "https://suites-api.azurewebsites.net"; //process.env.SUITES_BASE_URL;
const DOCUMENT_GENERATION_BASE_URL = 'https://sms-document-generation-service.azurewebsites.net';

const baseInstance = axios.create({
    baseURL: `${BASE_URL}/api`,
    // timeout: 15000,
});

export const documentGenerationInstance = axios.create({
    baseURL: `${DOCUMENT_GENERATION_BASE_URL}/api`
});

export const setBearerToken = (token) => {
    console.log('setting token', token);
    baseInstance.defaults.headers.common = {'Authorization': `bearer ${token}`}
}

export default baseInstance
