import "./chart.css";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Label,
} from "recharts";
import { Card } from "@mui/material";
import { useMemo } from "react";
import { getOffsetUsage, interpolateData } from "../../common/dateUtils";

export default function Chart({ title, data, dataKey, dateType }) {
    const interpolatedData = useMemo(() => {
        return interpolateData(dateType, getOffsetUsage(data));
    }, [data, dateType]);

    return (
        <Card sx={{ p: 1 }}>
            <h3 className="chartTitle">{title}</h3>
            <ResponsiveContainer width="100%" aspect={4 / 1}>
                <BarChart
                    data={interpolatedData}
                    margin={{ top: 15, right: 30, left: 20, bottom: 5 }}
                >
                    <XAxis dataKey="name" stroke="#5550bd">
                        <Label value={dateType} position="insideBottomRight" />
                    </XAxis>
                    <YAxis stroke="#5550bd">
                        <Label
                            value="m^3"
                            offset={-5}
                            position="insideTopLeft"
                        />
                    </YAxis>
                    <Tooltip />
                    <Legend />
                    <Bar
                        dataKey={dataKey}
                        fill="#8884d8"
                        label={{ position: "top" }}
                    />
                </BarChart>
            </ResponsiveContainer>
        </Card>
    );
}
