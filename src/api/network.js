import axios from "./index"

// ################# Mock Data
const appointments = [
    {
        id: "35021393859",
        scheduleType: {
            "_id": 3,
            "name": "Equipment",
            "color": "red",
            "description": "Equipments"
        },
        title: "Cardiac Catheterization - Dr. H. Buckley",
        startTime: new Date(2020, 1, 26, 9),
        endTime: new Date(2020, 1, 26, 10),
        description: "",
        additionalInfo: "",
    },
    {
        id: "35021393851",
        scheduleType: {
            "_id": 3,
            "name": "Equipment",
            "color": "red",
            "description": "Equipments"
        },
        title: "Cardiac Catheterization - Dr. H. Buckley",
        startTime: new Date(2020, 2, 8, 9),
        endTime: new Date(2020, 2, 8, 10),
        description: "",
        additionalInfo: "",
    },
    {
        id: "35021393851",
        scheduleType: {
            "_id": 3,
            "name": "Equipment",
            "color": "red",
            "description": "Equipments"
        },
        title: "Cardiac Catheterization - Dr. H. Buckley",
        startTime: new Date(2020, 2, 8, 13),
        endTime: new Date(2020, 2, 8, 14),
        description: "",
        additionalInfo: "",
    },
    {
        id: "3502193852",
        scheduleType: {
            "_id": 3,
            "name": "Equipment",
            "color": "red",
            "description": "Equipments"
        },
        title: "Coronary Bypass Graft - Dr. H. Buckley",
        startTime: new Date(2020, 2, 8, 7),
        endTime: new Date(2020, 2, 8, 8),
        description: "",
        additionalInfo: "",
    },
    {
        id: "3502193853",
        scheduleType: {
            "_id": 2,
            "name": "Restock",
            "color": "yellow",
            "description": "Equipments"
        },
        title: "Restock Gauze - Surgery Theater 6",
        startTime: new Date(2020, 2, 8, 10),
        endTime: new Date(2020, 2, 8, 11),
        description: "",
        additionalInfo: "",
    },
    {
        id: "3502193854",
        scheduleType: {
            "_id": 1,
            "name": "Equipment",
            "color": "blue",
            "description": ""
        },
        title: "MRI Machine #3 - Dr. J. Sullivan",
        startTime: new Date(2020, 2, 11, 10),
        endTime: new Date(2020, 2, 11, 11),
        description: "",
        additionalInfo: "",
    },
    {
        id: "3502193856",
        scheduleType: {
            "_id": 3,
            "name": "Surgery",
            "color": "red",
            "description": ""
        },
        title: "Biopsy, Breast (Breast Biopsy) - Dr. H. Carrington",
        startTime: new Date(2020, 2, 11, 9),
        endTime: new Date(2020, 2, 11, 10),
        description: "",
        additionalInfo: "",
    },
    {
        id: "3502193859",
        scheduleType: {
            "_id": 3,
            "name": "Surgery",
            "color": "red",
            "description": ""
        },
        title: "Biopsy, Breast (Breast Biopsy) - Dr. H. Carrington",
        startTime: new Date(2020, 2, 10, 9),
        endTime: new Date(2020, 2, 10, 10),
        description: "",
        additionalInfo: "",
    },
    {
        id: "3502193859",
        scheduleType: {
            "_id": 3,
            "name": "Surgery",
            "color": "red",
            "description": ""
        },
        title: "Biopsy, Breast (Breast Biopsy) - Dr. H. Carrington",
        startTime: new Date(2020, 2, 20, 9),
        endTime: new Date(2020, 2, 20, 10),
        description: "",
        additionalInfo: "",
    },
    {
        id: "3502193854",
        scheduleType: {
            "_id": 1,
            "name": "Equipment",
            "color": "blue",
            "description": ""
        },
        title: "MRI Machine #3 - Dr. J. Sullivan",
        startTime: new Date(2020, 2, 20, 10),
        endTime: new Date(2020, 2, 20, 11),
        description: "",
        additionalInfo: "",
    },
    {
        id: "3502193854",
        scheduleType: {
            "_id": 1,
            "name": "Equipment",
            "color": "blue",
            "description": ""
        },
        title: "MRI Machine #3 - Dr. J. Sullivan",
        startTime: new Date(2020, 2, 20, 13),
        endTime: new Date(2020, 2, 20, 14),
        description: "",
        additionalInfo: "",
    },
    {
        id: "3502193854",
        scheduleType: {
            "_id": 1,
            "name": "Equipment",
            "color": "blue",
            "description": ""
        },
        title: "MRI Machine #3 - Dr. J. Sullivan",
        startTime: new Date(2020, 2, 20, 8),
        endTime: new Date(2020, 2, 20, 9),
        description: "",
        additionalInfo: "",
    },
    {
        id: "3502193853",
        scheduleType: {
            "_id": 2,
            "name": "Restock",
            "color": "yellow",
            "description": "Equipments"
        },
        title: "Restock Gauze - Surgery Theater 6",
        startTime: new Date(2020, 2, 20, 10),
        endTime: new Date(2020, 2, 20, 11),
        description: "",
        additionalInfo: "",
    },
    {
        id: "3502193953",
        scheduleType: {
            "_id": 2,
            "name": "Restock",
            "color": "yellow",
            "description": "Equipments"
        },
        title: "Restock Gauze - Surgery Theater 6",
        startTime: new Date(2020, 2, 20, 11),
        endTime: new Date(2020, 2, 20, 12),
        description: "",
        additionalInfo: "",
    },
    {
        id: "3502194854",
        scheduleType: {
            "_id": 1,
            "name": "Equipment",
            "color": "blue",
            "description": ""
        },
        title: "MRI Machine #3 - Dr. J. Sullivan",
        startTime: new Date(2020, 2, 20, 9),
        endTime: new Date(2020, 2, 20, 10),
        description: "",
        additionalInfo: "",
    },
    {
        id: "3502193954",
        scheduleType: {
            "_id": 1,
            "name": "Equipment",
            "color": "blue",
            "description": ""
        },
        title: "MRI Machine #3 - Dr. J. Sullivan",
        startTime: new Date(2020, 2, 20, 10),
        endTime: new Date(2020, 2, 20, 12),
        description: "",
        additionalInfo: "",
    },
];
const caseFiles = require("../../assets/db.json").caseFiles.caseFilesInformation.data;


// ################# Schedule Endpoints
export const getSchedules = async () => {
    await new Promise(r => setTimeout(r, 2000));
    return appointments
    //return axios.get('/schedules')
};

export const searchSchedule = async (query) => {
    await new Promise(r => setTimeout(r, 700));

    console.log("searching for ", query);

    // mocking endpoint calls
    query = query.toLowerCase();
    return appointments.filter( item => item.title.toLowerCase().includes(query))

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

