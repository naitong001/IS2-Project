import "./featuredInfo.css"
import { ArrowUpward } from "@material-ui/icons";

export default function featuredInfo() {
    return (
        <div className="featured">
            <div className="featuredItem">
                <span className="featuredTitle">Total Water Unit</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">25</span>
                </div>
            </div>
            <div className="featuredItem">
                <span className="featuredTitle">This month usage</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">35</span>
                    <span className="featuredMoneyRate">
                        +10<ArrowUpward className="featuredIcon" />
                    </span>
                </div>
                <span className="featuredSub">Compared to last month</span>
            </div>
            <div className="featuredItem">
                <span className="featuredTitle">Water Leak Status</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">Not Leak</span>
                </div>
            </div>
        </div>
    )
}
