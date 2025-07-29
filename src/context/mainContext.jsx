import { createContext, useState } from "react";
import { dummydata } from "../utils/constants";

export const MainContext = createContext();
const MainContextProvider = ({ children }) => {
    const [data, setData] = useState(dummydata);

    const getDataFromId = (id) => {
        return [...data]?.filter((task) => {
            return task?.id === id;
        });
    };

    const value = { data, setData, getDataFromId };

    return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
};

export default MainContextProvider;
