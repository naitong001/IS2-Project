import Chart from "../../component/chart/Chart"
import FeaturedInfo from "../../component/featuredInfo/FeaturedInfo"
import "./home.css"
import {waterData} from "../../dummyData"
import WidgetSm from "../../component/widgetSm/WidgetSm"
import WidgetLg from "../../component/widgetLg/WidgetLg"

export default function Home() {
    return (
        <div className="home">
            <FeaturedInfo/>
            <Chart data={waterData} title="Total Water Unit Used" dataKey="water unit"/>
            <div className="homeWidgets">
                <WidgetSm/>
                <WidgetLg/>
            </div>
        </div>
    )
}
