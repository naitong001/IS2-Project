import "./chart.css";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { Card } from "@mui/material";
import { useMemo } from "react";

const MONTHS = [
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

const interpolateData = (dateType, data) => {
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

export default function Chart({ title, data, dataKey, dateType }) {
    const interpolatedData = useMemo(() => {
        return interpolateData(dateType, data);
    }, [data, dateType]);

    return (
        <Card sx={{ p: 1, ml: 3, mr: 3 }}>
            <h3 className="chartTitle">{title}</h3>
            <ResponsiveContainer width="100%" aspect={4 / 1}>
                <BarChart data={interpolatedData}>
                    <XAxis dataKey="name" stroke="#5550bd" />
                    <YAxis stroke="#5550bd" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey={dataKey} fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </Card>
    );
}
