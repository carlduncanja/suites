import axios from 'axios';
import * as config from '../config';

// const BASE_URL = "http://26ef92ce9036.ngrok.io"; //process.env.SUITES_BASE_URL;
const BASE_URL = "https://suites-api.azurewebsites.net"; //process.env.SUITES_BASE_URL;
const DOCUMENT_GENERATION_BASE_URL = 'https://sms-document-generation-service.azurewebsites.net';

const baseInstance = axios.create({
    baseURL: `${BASE_URL}/api`,
    // timeout: 15000,
});

export const documentGenerationInstance = axios.create({baseURL: `${DOCUMENT_GENERATION_BASE_URL}/api`});

export const setBearerToken = token => {
    // eslint-disable-next-line no-console
    console.info('set.bearer.token', token);
    baseInstance.defaults.headers.common = {Authorization: `bearer ${token}`};
};

export default baseInstance;
