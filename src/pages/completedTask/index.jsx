import { useCallback, useContext, useEffect, useState } from "react";
import Toolbar from "../../components/toolbar";
import { MainContext } from "../../context/mainContext";
import { generateUniqueId, STATUS } from "../../utils/helper";
import DataCard from "../../components/dataCard";
import { useDebounce } from "../../hooks/useDebounce";
import Card from "../../components/card";
import Modal from "../../components/modal";
import AddTaskModal from "../../components/addTaskModal";

const CompletedTask = () => {
    const { data, setData } = useContext(MainContext);
    const [completedData, setCompletedData] = useState([]);
    const [displayData, setDisplayData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchValue, setSearchValue] = useState("");
    const [openModal, setOpenModal] = useState("");

    const getSearchData = useCallback(
        (dataArray = completedData, search = searchValue) => {
            return [...dataArray]?.filter((task) => task?.title?.toLowerCase?.()?.includes(search?.toLowerCase?.()));
        },
        [displayData, searchValue]
    );

    const searchData = (e) => {
        const { value: searchTerm } = e?.target || {};
        setSearchValue(searchTerm?.trim?.());
        if (!searchTerm?.trim?.()) {
            setDisplayData([...completedData]);
            return;
        }
        const tempSearchData = getSearchData(completedData, searchTerm);
        setDisplayData([...tempSearchData]);
    };
    const handleSearch = useDebounce(searchData, 500);

    const handleAddTaskButton = (newTaskData) => {
        const searchBar = document?.getElementById("search-bar");
        if (searchBar) searchBar.value = "";
        const tempData = [{ ...newTaskData, id: generateUniqueId() }, ...data];
        setData(tempData);
        setCompletedData(tempData?.filter((task) => task?.status === STATUS?.COMPLETED));
        setDisplayData(tempData?.filter((task) => task?.status === STATUS?.COMPLETED));
        setSearchValue("");
        setOpenModal(false);
    };

    useEffect(() => {
        setLoading(true);
        if (!data?.length) {
            return;
        }
        const completedTasks = data?.filter((task) => task?.status === STATUS.COMPLETED);
        setCompletedData(completedTasks);
        setDisplayData(completedTasks);
        setLoading(false);
    }, []);

    return loading ? (
        <>Loading...</>
    ) : (
        <div className="flex w-full flex-1 flex-col gap-2 overflow-hidden">
            <Toolbar handleSearch={handleSearch} setOpenModal={setOpenModal} />
            <Card className="relative flex-1 overflow-y-auto">
                <div className="relative mt-3 flex flex-col gap-3">
                    {!!searchValue && <span className="text-sm font-bold">Search result({displayData?.length})</span>}
                    <div className="flex w-full flex-wrap justify-between gap-3">
                        {displayData?.length ? (
                            displayData?.map((task) => (
                                <DataCard
                                    key={task?.id}
                                    task={task}
                                    showEditButton={false}
                                    handleDeleteClick={() => {
                                        setData([...data]?.filter((taskData) => taskData?.id !== task?.id));
                                        setCompletedData([...completedData]?.filter((taskData) => taskData?.id !== task?.id));
                                        setDisplayData([...displayData]?.filter((taskData) => taskData?.id !== task?.id));
                                    }}
                                />
                            ))
                        ) : (
                            <div className="flex h-50 w-full flex-col items-center justify-center gap-5">
                                <span> No tasks available, please add one </span>
                                <button
                                    onClick={() => {
                                        setOpenModal(true);
                                    }}
                                    className="flex items-center gap-1 rounded-[4px] bg-blue-500 px-2 py-1 font-semibold text-white"
                                >
                                    + Add task
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </Card>
            <Modal
                onClose={() => {
                    setOpenModal(false);
                }}
                isOpen={openModal}
            >
                <AddTaskModal
                    handleAddButton={handleAddTaskButton}
                    handleCancelModal={() => {
                        setOpenModal(false);
                    }}
                />
            </Modal>
        </div>
    );
};

export default CompletedTask;
