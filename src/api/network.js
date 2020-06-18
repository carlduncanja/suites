import suitesAxiosInstance from "./index"
import {handleError, handleResponse} from "./apiUtils";

import {
    inventoriesEndpoint,
    inventoryEndpoint,
    theatresEndpoint,
    theatreEndpoint,
    physiciansEndpoint,
    physicianEndpoint,
    proceduresEndpoint,
    procedureEndpoint,
    caseFilesEndpoint,
    caseFileEndpoint,
    updateChargeSheetEndpoint,
    createInvoice,
    equipmentsEndpoint,
    equipmentEndpoint,
    equipmentTypesEndpoint,
    storageLocationsEndpoint,
    suppliersEndpoint,
    supplierEndpoint,
    supplierProductsEndpoint,
    updateProductsEndpoint,
    purchaseOrdersEndpoint,
    purchaseOrderEndpoint,
    createOrderInvoice,
    storageLocationEndpoint,
    categoriesEndpoint,
    loginEndpoint,
    appointmentsEndpoint,
    appointmentEndpoint,
    validateCaseProcedureEndpoint, suggestedStartTimeEndpoint
} from "../const/suitesEndpoints";

// ################# Mock Data
import {appointments} from "../../data/Appointments"
import caseFiles from "../../data/CaseFiles";
import procedures from "../../data/Procedures";
import physicians from "../../data/Physicians";
import storage from "../../data/Storage";
import equipment from "../../data/Equipment";

// ################# Auth Endpoints
export const login = async (email, password) => {
    return suitesAxiosInstance.post(loginEndpoint, {email, password})
        .then(handleResponse)
        .catch(handleError)
}

// ################# Appointments Endpoints
export const getAppointments = async () => {
    await new Promise(r => setTimeout(r, 2000));
    return suitesAxiosInstance.get(appointmentsEndpoint)
        .then(handleResponse)
        .catch(handleError);
};

export const getAppointmentById = async (id) => {
    await new Promise(r => setTimeout(r, 2000));
    return suitesAxiosInstance.get(appointmentEndpoint(id))
        .then(handleResponse)
        .catch(handleError);
};

export const searchSchedule = async (query) => {
    if (!query) return []; //  don't search for empty string;

    // mocking endpoint calls
    query = query.toLowerCase();
    // return appointments.filter(item => item.title.toLowerCase().includes(query))

    // TODO implement search api with cancellation.

    return suitesAxiosInstance.get('/appointments', {
        params: {
            query
        }
    }).then(handleResponse).catch(handleError)
};

// ################# Theatres Endpoints
export const getTheatres = async (query, max) => {
    return suitesAxiosInstance.get(theatresEndpoint, {params: {query, max}})
        .then(handleResponse)
        .catch(handleError);
};

export const getTheatreById = async (id) => {
    return suitesAxiosInstance.get(theatreEndpoint(id))
        .then(handleResponse)
        .catch(handleError);
};

export const createTheatre = async (theatreForCreation) => {
    return suitesAxiosInstance.post(theatresEndpoint, theatreForCreation)
        .then(handleResponse)
        .catch(handleError)
};


// ################# Inventory Endpoints
export const getInventories = async (query, max) => {
    return suitesAxiosInstance.get(inventoriesEndpoint, {params: {query}})
        .then(handleResponse)
        .catch(handleError);
};

export const getInventoryById = async (id) => {
    return suitesAxiosInstance.get(inventoryEndpoint(id))
        .then(handleResponse)
        .catch(handleError);
};

export const createInventories = async (inventoryForCreation) => {
    return suitesAxiosInstance.post(inventoriesEndpoint, inventoryForCreation)
        .then(handleResponse)
        .catch(handleError);
};


// ################# Case Files Endpoints
export const getCaseFiles = async () => {
    return suitesAxiosInstance.get(caseFilesEndpoint)
        .then(handleResponse)
        .catch(handleError)
};

export const getCaseFileById = async (id) => {
    return suitesAxiosInstance.get(caseFileEndpoint(id))
        .then(handleResponse)
        .catch(handleError)
};

export const createCaseFile = async (caseFileForCreation) => {
    return suitesAxiosInstance.post(caseFilesEndpoint, caseFileForCreation)
        .then(handleResponse)
        .catch(handleError);
}

export const isValidCaseProcedureAppointment = async (procedure, location, startTime, duration) => {
    return suitesAxiosInstance.get(validateCaseProcedureEndpoint, {params: {procedure, location, duration, startTime}})
        .then(handleResponse)
        .catch(handleError);
}

export const getSuggestedStartTimes = async (procedure, location, date, duration, numSuggestions) => {
    return suitesAxiosInstance.get(suggestedStartTimeEndpoint, {
        params: {
            procedure,
            location,
            duration,
            date,
            numSuggestions,
        }
    })
        .then(handleResponse)
        .catch(handleError);
}

export const updateChargeSheet = async (id, data) => {
    return suitesAxiosInstance.put(updateChargeSheetEndpoint(id), data)
        .then(handleResponse)
        .catch(handleError)
}

export const createInvoiceViaQuotation = async (caseId, quotationId) => {
    return suitesAxiosInstance.post(createInvoice(caseId)(quotationId))
        .then(handleResponse)
        .catch(handleError)
}

// ################# Procedures Endpoints
export const getProcedures = async (query, max) => {
    return suitesAxiosInstance.get(proceduresEndpoint, {params: {query, max}})
        .then(handleResponse)
        .catch(handleError)
};

export const getProcedureById = async (id) => {
    return suitesAxiosInstance.get(procedureEndpoint(id))
        .then(handleResponse)
        .catch(handleError)
};

export const createNewProcedure = async (procedureToCreate) => {
    return suitesAxiosInstance
        .post(proceduresEndpoint, procedureToCreate)
        .then(handleResponse)
        .catch(handleError);
};

// ################# Physicians Endpoints
export const getPhysicians = async (query, max) => {
    return suitesAxiosInstance.get(physiciansEndpoint, {params: {query}})
        .then(handleResponse)
        .catch(handleError)
};

export const getPhysicianById = async (id) => {
    return suitesAxiosInstance.get(physicianEndpoint(id))
        .then(handleResponse)
        .catch(handleError)
};

export const createPhysician = async (physicianToCreate) => {
    return suitesAxiosInstance.post(physiciansEndpoint, physicianToCreate)
        .then(handleResponse)
        .catch(handleError);
};

export const updatePhysician = async (id, data) => {
    return suitesAxiosInstance.put(physicianEndpoint(id), data)
        .then(handleResponse)
        .catch(handleError)
}

// ################# Storage Endpoints
export const getStorage = async () => {
    return suitesAxiosInstance.get(storageLocationsEndpoint)
        .then(handleResponse)
        .catch(handleError)
};

export const getStorageById = async (id) => {
    return suitesAxiosInstance.get(storageLocationEndpoint(id))
        .then(handleResponse)
        .catch(handleError)
};

export const createStorageLocation = async (storageForCreation) => {
    return suitesAxiosInstance
        .post(storageLocationsEndpoint, storageForCreation)
        .then(handleResponse)
        .catch(handleError);
};

// ################# Equipment Endpoint
export const getEquipment = async (query) => {
    return suitesAxiosInstance.get(equipmentsEndpoint, {params: {query}})
        .then(handleResponse)
        .catch(handleError)
};

export const getEquipmentById = async (id) => {
    return suitesAxiosInstance.get(equipmentEndpoint(id))
        .then(handleResponse)
        .catch(handleError)
};

export const getEquipmentTypes = async (query) => {
    return suitesAxiosInstance.get(equipmentTypesEndpoint, {params: {query}})
        .then(handleResponse)
        .catch(handleError)
};

export const createEquipment = async (equipmentToCreate) => {
    return suitesAxiosInstance.post(equipmentsEndpoint, equipmentToCreate)
        .then(handleResponse)
        .catch(handleError);
};

export const createEquipmentType = async (equipmentTypeToCreate) => {
    return suitesAxiosInstance.post(equipmentTypesEndpoint, equipmentTypeToCreate)
        .then(handleResponse)
        .catch(handleError);
};

// ################# Categories Endpoint

export const getCategories = async (query, max) => {
    return suitesAxiosInstance.get(categoriesEndpoint, {params: {query}})
        .then(handleResponse)
        .catch(handleError)
}


// ################# Suppliers Endpoints
export const getSuppliers = async (query, max) => {
    return suitesAxiosInstance.get(suppliersEndpoint, {params: {query, max}})
        .then(handleResponse)
        .catch(handleError)
};

export const getSupplierById = async (id) => {
    return suitesAxiosInstance.get(supplierEndpoint(id))
        .then(handleResponse)
        .catch(handleError)
};

export const getSupplierProducts = async (id, query, max) => {
    return suitesAxiosInstance.get(supplierProductsEndpoint(id), {params: {query, max}})
        .then(handleResponse)
        .catch(handleError)
};

export const updateSupplierProducts = async (supplierId, productId, data) => {
    return suitesAxiosInstance.put(updateProductsEndpoint(supplierId)(productId), data)
        .then(handleResponse)
        .catch(handleError)
}

// ################# PurchaseOrders Endpoints
export const getPurchaseOrders = async (query, max) => {
    return suitesAxiosInstance.get(purchaseOrdersEndpoint, {params: {query, max}})
        .then(handleResponse)
        .catch(handleError)
};

export const getPurchaseOrderById = async (id) => {
    return suitesAxiosInstance.get(purchaseOrderEndpoint(id))
        .then(handleResponse)
        .catch(handleError)
};

export const createInvoiceViaOrders = async (quotationId) => {
    return suitesAxiosInstance.post(createOrderInvoice(quotationId))
        .then(handleResponse)
        .catch(handleError)
}



