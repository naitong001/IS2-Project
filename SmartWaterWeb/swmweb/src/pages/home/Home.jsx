import Chart from "../../component/chart/Chart";
import FeaturedInfo from "../../component/featuredInfo/FeaturedInfo";
import "./home.css";
import WidgetSm from "../../component/widgetSm/WidgetSm";
import WidgetLg from "../../component/widgetLg/WidgetLg";
import React, { useEffect, useState } from "react";

import axios from "axios";
import FilterDate from "../../component/FilterDate";

export default function Home() {
    const [data, setData] = useState([]);
    const [dateType, setDateType] = useState("month");

    const handleDateTypeChange = async (val) => {
        const timeType = val.type;
        const time = val.value;
        setDateType(timeType);

        if (timeType === "week") {
            const week = await axios.get(`http://localhost:8000/week/${time}`);
            setData(week.data);
        } else if (timeType === "month") {
            const month = await axios.get(
                `http://localhost:8000/month/${time}`
            );
            setData(month.data);
        }
    };

    return (
        <div className="home">
            <FeaturedInfo />
            <FilterDate onChange={handleDateTypeChange} />
            <Chart
                data={data}
                title="Total Water Unit Used"
                dataKey="maxUsage"
                dateType={dateType}
            />
            <div className="homeWidgets">
                <WidgetSm />
                <WidgetLg />
            </div>
        </div>
    );
}
