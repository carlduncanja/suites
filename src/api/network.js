import axios from "./index"

// ################# Mock Data
import {appointments} from "../../data/Appointments"
import caseFiles from "../../data/CaseFiles";
import procedures from "../../data/Procedures";
import physicians from "../../data/Physicians";
import storage from "../../data/Storage";


// ################# Schedule Endpoints
export const getSchedules = async () => {
    await new Promise(r => setTimeout(r, 2000));
    return appointments
    //return axios.get('/schedules')
};

export const getScheduleById = async (id) => {
    await new Promise(r => setTimeout(r, 2000));
    return appointments.find( item => item.id === id);
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

// ################# Case Files Endpoint
export const getCaseFiles = async () => {
    await new Promise(r => setTimeout(r, 2000));
    return caseFiles
    //return axios.get('/casefiles')
};

// ################# Procedures Endpoint
export const getProcedures = async () => {
    await new Promise(r => setTimeout(r, 2000));
    return procedures
    //return axios.get('/procedures')
};

// ################# Physicians Endpoint
export const getPhysicians = async () => {
    await new Promise(r => setTimeout(r, 2000));
    return physicians
    //return axios.get('/procedures')
};

// ################# Storage Endpoint
export const getStorage = async () => {
    await new Promise(r => setTimeout(r, 2000));
    return storage
    //return axios.get('/procedures')
};

