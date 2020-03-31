import axios from "./index"

// ################# Mock Data
import {appointments} from "../../data/Appointments"

const caseFiles = require("../../assets/db.json").caseFiles.caseFilesInformation.data;


// ################# Schedule Endpoints
export const getSchedules = async () => {
    await new Promise(r => setTimeout(r, 2000));
    return appointments
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

