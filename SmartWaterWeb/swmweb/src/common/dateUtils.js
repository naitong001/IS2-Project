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
            name: MONTHS[item["_id"] - 1],
            maxUsage: item.maxUsage,
        }));
    }

    return data.map((item) => ({
        name: item["_id"] + 1,
        maxUsage: item.maxUsage,
    }));
};

export const calculateCost = (usage) => {
    if (usage > 200) {
        return (usage % 200) * 14.45 + 2396;
    }

    if (usage === 200) {
        return 2396;
    }

    if (usage >= 161) {
        return (usage % 40) * 13.8 + 1844;
    }

    if (usage > 119) {
        return (usage % 120) * 13.47 + 1305;
    }

    if (usage > 99) {
        return (usage % 100) * 13.15 + 1042;
    }

    if (usage > 89) {
        return (usage % 90) * 12.82 + 914;
    }

    if (usage > 79) {
        return (usage % 80) * 12.5 + 789;
    }

    if (usage > 69) {
        return (usage % 70) * 11.33 + 676;
    }

    if (usage > 59) {
        return (usage % 60) * 11 + 566;
    }

    if (usage > 49) {
        return (usage % 50) * 10.68 + 459;
    }

    if (usage > 39) {
        return (usage % 40) * 10.35 + 355;
    }

    if (usage > 29) {
        return (usage % 30) * 10.03 + 255;
    }

    return (usage) * 8.5;
};

export const getOffsetUsage = (data) => {
    const result = data.map((item, index) => {
        if (index === 0) {
            return item;
        }

        return {
            ...data[index],
            maxUsage: data[index].maxUsage - data[index - 1].maxUsage,
        };
    });

    return result;
};
