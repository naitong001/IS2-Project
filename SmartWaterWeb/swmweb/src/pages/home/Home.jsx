import React, { useState } from "react";
import Chart from "../../component/chart/Chart";
import FeaturedInfo from "../../component/featuredInfo/FeaturedInfo";
import "./home.css";
import TotalCost from "../../component/TotalCost";

import FilterDate from "../../component/FilterDate";
import { Box, Card } from "@mui/material";
import { getMonthlyUsage, getWeeklyUsage } from "../../apis";

export default function Home() {
    const [data, setData] = useState([]);
    const [dateType, setDateType] = useState("month");

    const handleDateTypeChange = async (val) => {
        const timeType = val.type;
        const time = val.value;
        setDateType(timeType);

        if (timeType === "week") {
            const resp = await getWeeklyUsage(time);
            setData(resp.data);
        } else if (timeType === "month") {
            const resp = await getMonthlyUsage(time);
            setData(resp.data);
        }
    };

    return (
        <Box sx={{ maxWidth: "800px", width: "80vw" }}>
            <FeaturedInfo />
            <Card sx={{ p: 1, ml: 3, mr: 3, mb: 3 }}>
                <FilterDate onChange={handleDateTypeChange} />
                <Chart
                    data={data}
                    title="Total Water Unit Used"
                    dataKey="maxUsage"
                    dateType={dateType}
                />
            </Card>
            <TotalCost />
        </Box>
    );
}
