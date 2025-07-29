import { NavLink, Outlet } from "react-router";
import Card from "@/components/card";
const tabs = [
    { path: ".", label: "All Tasks" },
    { path: "completed", label: "Completed" },
];
const Home = () => {
    return (
        <div className="flex h-[100vh] flex-1 flex-col gap-2 bg-sky-50 pb-2 pl-2">
            <div className="flex w-full flex-col items-center justify-center gap-1 bg-white py-3">
                <span className="text-2xl font-bold">Task Management Dashboard</span>
                <span>Organize and track your tasks efficiently</span>
            </div>
            <Card>
                <div className="flex w-full gap-2">
                    {tabs.map((tab) => (
                        <NavLink
                            key={tab.path}
                            to={tab.path}
                            className={({ isActive }) =>
                                `border-b-2 px-1 py-4 text-sm font-medium transition-colors duration-200 ${
                                    isActive ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                                }`
                            }
                        >
                            {tab.label}
                        </NavLink>
                    ))}
                </div>
            </Card>
            <div className="flex flex-1 flex-col overflow-hidden">
                <Outlet />
            </div>
        </div>
    );
};

export default Home;
