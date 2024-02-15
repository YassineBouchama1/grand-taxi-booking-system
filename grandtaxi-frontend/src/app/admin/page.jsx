import StatisticGroup from "../ui/admin/Statistic/StatisticGroup";
import TableUsers from "../ui/admin/users/TableUsers";


export default async function Page() {

    
    return (
        <div className="flex flex-col gap-y-10 overflow-hidden rounded-xl bg-white p-8 shadow">
            {/* Statistic Cards  */}

            <StatisticGroup />

            <div>
                <TableUsers />
            </div>
        </div>
    );
}