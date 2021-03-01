const environment = process.env.NODE_ENV;
const suites = { baseUrl: process.env.BASE_URL };
const documentGeneration = { baseUrl: process.env.DOCUMENT_GENERATION_BASE_URL };
const documentManagement = { baseUrl: process.env.DOCUMENT_MANAGEMENT_BASE_URL };

export {
    environment,
    suites,
    documentGeneration,
    documentManagement
};
