import suitesAxiosInstance from "./index"
import {handleError, handleResponse} from "./apiUtils";

import {
    inventoriesEndpoint, storageLocationsEndpoint,
    theatresEndpoint
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

// ################# Inventory Endpoints
export const getInventories = async () => {
    return suitesAxiosInstance.get(inventoriesEndpoint)
        .then(handleResponse)
        .catch(handleError);
};

// ################# Case Files Endpoints
export const getCaseFiles = async () => {
    await new Promise(r => setTimeout(r, 2000));
    return caseFiles
    //return axios.get('/casefiles')
};

// ################# Procedures Endpoints
export const getProcedures = async () => {
    await new Promise(r => setTimeout(r, 2000));
    return procedures
    //return axios.get('/procedures')
};

// ################# Physicians Endpoints
export const getPhysicians = async () => {
    await new Promise(r => setTimeout(r, 2000));
    return physicians
    //return axios.get('/physicians')
};

// ################# Storage Endpoints
export const getStorage = async () => {
    return suitesAxiosInstance.get(storageLocationsEndpoint)
        .then(handleResponse)
        .catch(handleError)
};

// ################# Equipment Endpoint
export const getEquipment = async () => {
    await new Promise(r => setTimeout(r, 2000));
    return equipment
    //return axios.get('/equipment')
};



