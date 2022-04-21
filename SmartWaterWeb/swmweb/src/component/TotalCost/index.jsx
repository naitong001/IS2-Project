import {
    Box,
    Card,
    CircularProgress,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getMonthlyUsage } from "../../apis";
import { MONTHS } from "../../common/dateUtils";
import "./style.css";

const YEARS = [2021, 2022, 2023];

const PER_UNIT = 0.15;
const WATER_COST = 8.5;
const MONTHLY = 25;
const VAT = 0.07;

const displayCost = (monthIndex, value) => {
    if (!value) return 0;

    const currentMonthUsage = value.find((item) => item._id === monthIndex);

    if (currentMonthUsage) {
        return Math.round((currentMonthUsage.maxUsage * PER_UNIT)+(currentMonthUsage.maxUsage * WATER_COST)+MONTHLY+(currentMonthUsage.maxUsage*VAT));
    }

    return 0;
};

export default function TotalCost() {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [year, setYear] = useState(new Date().getFullYear());

    useEffect(() => {
        (async () => {
            try {
                const resp = await getMonthlyUsage(year);
                setData(resp.data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        })();
    }, [year]);

    return (
        <Card sx={{ p: 1, ml: 3, mr: 3, mb: 3 }}>
            <Card sx={{ p: 1, mb: 3 }}>
                <FormControl fullWidth>
                    <InputLabel>Year</InputLabel>
                    <Select
                        value={year}
                        label="Year"
                        onChange={(e) => setYear(e.target.value)}
                    >
                        {YEARS.map((value, index) => (
                            <MenuItem value={value} key={index}>
                                {value}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Card>
            <h3 className="widgetLgTitle">Total Cost ({year})</h3>
            {isLoading && (
                <Box
                    sx={{
                        alignItems: "center",
                        justifyContent: "center",
                        display: "flex",
                        width: "100%",
                        height: "80%",
                    }}
                >
                    <CircularProgress />
                </Box>
            )}
            {!isLoading && (
                <table className="widgetLgTable">
                    <thead>
                        <tr className="widgetLgTr">
                            <th className="widgetLgTh">Month</th>
                            <th className="widgetLgTh">Cost</th>
                        </tr>
                    </thead>
                    <tbody>
                        {MONTHS.map((val, index) => (
                            <tr className="widgetLgTr" key={index}>
                                <td className="widgetLgMonth">
                                    <span className="WidgetLgMonthName">
                                        {val}
                                    </span>
                                </td>
                                <td className="widgetLgCost">
                                    {displayCost(index + 1, data)} Baht
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </Card>
    );
}
