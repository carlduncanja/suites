const environment = process.env.NODE_ENV;
const suites = { baseUrl: process.env.BASE_URL || 'https://suites.smssoftwarestudio.com' };
const documentGeneration = { baseUrl: process.env.DOCUMENT_GENERATION_BASE_URL || 'https://influx.smssoftwarestudio.com/insight/document-generation-service'};
const documentManagement = { baseUrl: process.env.DOCUMENT_MANAGEMENT_BASE_URL || 'https://influx.smssoftwarestudio.com/insight/document-management-service' };

export {
    environment,
    suites,
    documentGeneration,
    documentManagement
};
