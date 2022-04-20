import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";
import { Card } from "@mui/material";

const MONTHS = {
    January: 1,
    Febuary: 2,
    March: 3,
    Apirl: 4,
    May: 5,
    June: 6,
    July: 7,
    August: 8,
    September: 9,
    October: 10,
    November: 11,
    December: 12,
};

const YEARS = [2021, 2022, 2023];

const FilterDate = ({ onChange }) => {
    const [timeType, setTimeType] = useState("month");
    const [monthValue, setMonthValue] = useState(new Date().getMonth());
    const [yearValue, setYearValue] = useState(new Date().getFullYear());

    const handleChange = (e) => {
        if (timeType === "week") {
            setMonthValue(e.target.value);
        } else if (timeType === "month") {
            setYearValue(e.target.value);
        } else {
            return;
        }

        onChange({ type: timeType, value: e.target.value });
    };

    return (
        <Box>
            <Card sx={{ p: 1, ml: 3, mr: 3 }}>
                <Box sx={{ mb: 2 }}>
                    <Button
                        variant={timeType === "week" ? "contained" : "outlined"}
                        onClick={() => setTimeType("week")}
                        sx={{ mr: 1 }}
                    >
                        Week
                    </Button>
                    <Button
                        variant={
                            timeType === "month" ? "contained" : "outlined"
                        }
                        onClick={() => setTimeType("month")}
                    >
                        Months
                    </Button>
                </Box>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                        {timeType === "week" ? "Month" : "Year"}
                    </InputLabel>
                    {timeType === "week" && (
                        <Select
                            value={monthValue}
                            label="Month"
                            onChange={handleChange}
                        >
                            {Object.entries(MONTHS).map((value, index) => (
                                <MenuItem value={value[1]} key={index}>
                                    {value[0]}
                                </MenuItem>
                            ))}
                        </Select>
                    )}
                    {timeType === "month" && (
                        <Select
                            value={yearValue}
                            label="Year"
                            onChange={handleChange}
                        >
                            {YEARS.map((value, index) => (
                                <MenuItem value={value} key={index}>
                                    {value}
                                </MenuItem>
                            ))}
                        </Select>
                    )}
                </FormControl>
            </Card>
        </Box>
    );
};

export default FilterDate;
