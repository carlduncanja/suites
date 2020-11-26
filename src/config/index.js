import { SUITES_BASE_URL, DOCUMENT_GENERATION_BASE_URL } from '@env';

const environment = process.env.NODE_ENV;
const suites = { baseUrl: SUITES_BASE_URL };
const documentGeneration = { baseUrl: DOCUMENT_GENERATION_BASE_URL };

export {
    environment,
    suites,
    documentGeneration
};
