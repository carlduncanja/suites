import suitesAxiosInstance from "./index"
import {handleError, handleResponse} from "./apiUtils";

import {
    inventoriesEndpoint, inventoryEndpoint,
    theatresEndpoint, theatreEndpoint,
    physiciansEndpoint, physicianEndpoint,
    proceduresEndpoint, procedureEndpoint,
    caseFilesEndpoint, caseFileEndpoint,
    equipmentsEndpoint, equipmentEndpoint, equipmentTypesEndpoint,
    storageLocationsEndpoint,
} from "../const/suitesEndpoints";

// ################# Mock Data
import {appointments} from "../../data/Appointments"
import caseFiles from "../../data/CaseFiles";
import procedures from "../../data/Procedures";
import physicians from "../../data/Physicians";
import storage from "../../data/Storage";
import equipment from "../../data/Equipment";


// ################# Schedule Endpoints
export const getSchedules = async () => {
    await new Promise(r => setTimeout(r, 2000));
    return appointments
    //return axios.get('/schedules')
};

export const getScheduleById = async (id) => {
    await new Promise(r => setTimeout(r, 2000));
    return appointments.find(item => item.id === id);
    //return axios.get('/schedules')
};

export const searchSchedule = async (query) => {
    if (!query) return []; //  don't search for empty string;

    await new Promise(r => setTimeout(r, 700));

    // mocking endpoint calls
    query = query.toLowerCase();
    return appointments.filter(item => item.title.toLowerCase().includes(query))

    // TODO implement search api with cancellation.
    // return axios.get('/schedules', {
    //     params: {
    //         query
    //     }
    // })
};

// ################# Theatres Endpoints
export const getTheatres = async () => {
    return suitesAxiosInstance.get(theatresEndpoint)
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
export const getInventories = async () => {
    return suitesAxiosInstance.get(inventoriesEndpoint)
        .then(handleResponse)
        .catch(handleError);
};

export const getInventoryById = async (id) => {
    return suitesAxiosInstance.get(inventoryEndpoint(id))
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

// ################# Procedures Endpoints
export const getProcedures = async () => {
    return suitesAxiosInstance.get(proceduresEndpoint)
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
export const getPhysicians = async () => {
    return suitesAxiosInstance.get(physiciansEndpoint)
        .then(handleResponse)
        .catch(handleError)
};

export const getPhysicianById = async (id) => {
    return suitesAxiosInstance.get(physicianEndpoint(id))
        .then(handleResponse)
        .catch(handleError)
};

// ################# Storage Endpoints
export const getStorage = async () => {
    return suitesAxiosInstance.get(storageLocationsEndpoint)
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
export const getEquipment = async () => {
    return suitesAxiosInstance.get(equipmentsEndpoint)
        .then(handleResponse)
        .catch(handleError)
};

export const getEquipmentById = async (id) => {
    return suitesAxiosInstance.get(equipmentEndpoint(id))
        .then(handleResponse)
        .catch(handleError)
};

export const getEquipmentTypes = async () => {
    return suitesAxiosInstance.get(equipmentTypesEndpoint)
        .then(handleResponse)
        .catch(handleError)
};



