import Card from "@/components/card";
import { memo } from "react";

const SummaryCards = ({ title, value, extraStyles = "" }) => {
    return (
        <div className={`relative flex w-full min-w-[180px] rounded-[8px] border-l-3 md:w-[24%] ${extraStyles}`}>
            <Card>
                <div className="flex flex-col gap-2">
                    <span className="capitalize">{title?.replaceAll?.("_", " ")?.toLowerCase?.()}</span>
                    <span className="text-3xl font-bold">{value}</span>
                </div>
            </Card>
        </div>
    );
};

export default memo(SummaryCards);
