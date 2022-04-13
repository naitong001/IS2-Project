import "./chart.css"
import { BarChart, Bar,  XAxis, YAxis, 
     Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Chart({title, data, dataKey}) {

   


    return (
        <div className="chart">
            <h3 className="chartTitle">{title}</h3>
            <ResponsiveContainer width="100%" aspect={4 / 1}>
                <BarChart data={data}>
                    <XAxis dataKey="_id" stroke="#5550bd"/>
                    <YAxis stroke="#5550bd"/>
                    <Tooltip />
                    <Legend />
                    <Bar dataKey={dataKey} fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}
