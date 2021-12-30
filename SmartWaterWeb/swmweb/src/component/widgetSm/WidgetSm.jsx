import "./widgetSm.css"
import {Refresh} from '@mui/icons-material';

export default function WidgetSm() {
    return (
        <div className="widgetSm">
            <span className="widgetSmTitle">Last Water Value Update</span>
            <button className="widgetSmButton">
                <Refresh className="widgetSmIcon"/>
                Refresh Data
            </button>
            <ul className="widgetSmList">
                <li className="widgetSmListItem">
                    <span className="widgetSmWaterValue">0.15</span>
                </li>
                <li className="widgetSmListItem">
                    <span className="widgetSmWaterValue">0.30</span>
                </li>
                <li className="widgetSmListItem">
                    <span className="widgetSmWaterValue">0.45</span>
                </li>
                <li className="widgetSmListItem">
                    <span className="widgetSmWaterValue">0.55</span>
                </li>
                <li className="widgetSmListItem">
                    <span className="widgetSmWaterValue">0.70</span>
                </li>
                <li className="widgetSmListItem">
                    <span className="widgetSmWaterValue">0.85</span>
                </li>
            </ul>
        </div>
    )
}
