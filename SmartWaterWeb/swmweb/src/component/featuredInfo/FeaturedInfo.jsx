import { Card } from "@mui/material";
import { useEffect, useState } from "react";
import { getMonthlyUsage } from "../../apis";
import "./featuredInfo.css";

export default function FeaturedInfo() {
    const [totalUsage, setTotalUsage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const resp = await getMonthlyUsage(new Date().getFullYear());
                setTotalUsage(resp.data.at(-1).maxUsage);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);

    const renderContent = () => {
        if (isLoading) return "loading..."
        return totalUsage
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
