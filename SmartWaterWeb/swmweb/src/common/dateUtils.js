export const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

export const interpolateData = (dateType, data) => {
    if (dateType === "month") {
        return data.map((item) => ({
            name: MONTHS[item["_id"]],
            maxUsage: item.maxUsage,
        }));
    }

    return data.map((item) => ({
        name: item["_id"] + 1,
        maxUsage: item.maxUsage,
    }));
};
