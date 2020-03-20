import axios from "./index"


export const getSchedules = () => {
    return axios.get('/schedules')
};
