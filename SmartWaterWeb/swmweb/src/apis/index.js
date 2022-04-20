import axios from "axios";

const URL = "http://localhost:5000";

export const getWeeklyUsage = (time) => {
    return axios.get(`${URL}/week/${time}`);
};

export const getMonthlyUsage = (time) => {
    return axios.get(`${URL}/month/${time}`);
};
