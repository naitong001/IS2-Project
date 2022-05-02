import { Card } from "@mui/material";
import { useEffect, useState } from "react";
import { getWeeklyUsage } from "../../apis";
import "./featuredInfo.css";

export default function FeaturedInfo() {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const resp = await getWeeklyUsage(new Date().getMonth() + 1);
                setData(resp.data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);

    const renderContent = () => {
        if (isLoading) return "loading..."
        if (!data.length) return 0
        return data[data.length - 1].maxUsage
    }

    return (
        <Card sx={{ p: 1, ml: 3, mr: 3, mb: 3 }}>
            <span>Total Water Unit</span>
            <div>
                <span className="featuredMoney">
                    {renderContent()}
                </span>
            </div>
        </Card>
    );
}
