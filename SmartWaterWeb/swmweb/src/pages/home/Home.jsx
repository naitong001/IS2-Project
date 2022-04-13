import Chart from "../../component/chart/Chart"
import FeaturedInfo from "../../component/featuredInfo/FeaturedInfo"
import "./home.css"
import WidgetSm from "../../component/widgetSm/WidgetSm"
import WidgetLg from "../../component/widgetLg/WidgetLg"
import React, { useState } from "react"
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import axios from 'axios';

const monthValue = {
    'January': 1,
    'Febuary': 2,
    'March': 3,
    'Apirl': 4,
    'May': 5,
    'June': 6,
    'July': 7,
    'August': 8,
    'September': 9,
    'October': 10,
    'November': 11,
    'December': 12
}

const yearValue = {
    '2021' : 2021,
    '2022' : 2022,
    '2023' : 2023
}

export default function Home() {
    const [data, setData] = React.useState([])
    const [action, setAction] = React.useState("month")
    function changeWaterData(type) {
        if (type == "week") {
            //setData(waterData2)
            setAction("week")
        }
        else {
            //setData(waterData)
            setAction("month")
        }
    }
    const [selected, setSelected] = React.useState('');

    const handleChange = async (event) => {
        setSelected(event.target.value);
        console.log(event)
        if (action == "week") {
            const week = await axios.get(`http://localhost:5000/week/${event.target.value}`)
            console.log(week.data)
            setData(week.data)
            console.log(data)
        }
        else{
            const month = await axios.get(`http://localhost:5000/week/${event.target.value}`)
            console.log(month.data)
            setData(month.data)
            console.log(data)
        }
    };
    function changeDropDown() {
        if (action == "week") {
            return (monthValue)

        }
        else {
            return (yearValue)
        }
    }
    return (
        <div className="home">
            <FeaturedInfo />
            <button onClick={() => changeWaterData("week")}>Week</button>
            <button onClick={() => changeWaterData("month")}>Months</button>
            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">{action == 'week'? 'Month': 'Year'}</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selected}
                        label="Month"
                        onChange={handleChange}
                    >
                        {Object.keys(changeDropDown()).map(key => {
                            return <MenuItem value={monthValue[key]}>{key}</MenuItem>
                        })}
                    </Select>
                </FormControl>
            </Box>
            <Chart data={data} title="Total Water Unit Used" dataKey="maxUsage" />
            <div className="homeWidgets">
                <WidgetSm />
                <WidgetLg />
            </div>
        </div>
    )
}
