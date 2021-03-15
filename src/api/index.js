import axios from 'axios';
import * as config from '../config';

const BASE_URL = config.suites.baseUrl;
const DOCUMENT_GENERATION_BASE_URL = config.documentGeneration.baseUrl;
const DOCUMENT_MANAGEMENT_BASE_URL = config.documentManagement.baseUrl;

console.log('Base url is:', BASE_URL);
const baseInstance = axios.create({
    baseURL: `${BASE_URL}/api`,
    // timeout: 15000,
});

export const documentGenerationInstance = axios.create({ baseURL: `${DOCUMENT_GENERATION_BASE_URL}/api` });

export const documentManagementInstance = axios.create({ baseURL: `${DOCUMENT_MANAGEMENT_BASE_URL}/api` });

export const setBearerToken = token => {
    // eslint-disable-next-line no-console
    console.info('set.bearer.token', token);
    baseInstance.defaults.headers.common = { Authorization: `bearer ${token}` };
};

export default baseInstance;
