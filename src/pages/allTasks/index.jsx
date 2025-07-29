import { useCallback, useContext, useMemo, useState } from "react";
import Card from "@/components/card";
import { generateUniqueId, STATUS, statusBasedStyles } from "@/utils/helper";
import Modal from "@/components/modal";
import { useDebounce } from "@/hooks/useDebounce";
import { MainContext } from "../../context/mainContext";
import Toolbar from "@/components/toolbar";
import SummaryCards from "@/components/summaryCard";
import Select from "@/components/Select";
import DataCard from "@/components/dataCard";
import AddTaskModal from "@/components/addTaskModal";

const AllTask = () => {
    const { data, setData } = useContext(MainContext);
    const [currentFilterKey, setCurrentFilterKey] = useState("ALL");
    const [displayData, setDisplayData] = useState(data);
    const [editTaskId, setEditTaskID] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [sortKey, setSortKey] = useState("");

    const getSearchData = useCallback(
        (dataArray = data, search = searchValue) => {
            return [...dataArray]?.filter((task) => task?.title?.toLowerCase?.()?.includes(search?.toLowerCase?.()));
        },
        [data, searchValue]
    );

    const getSortData = useCallback(
        (dataArray = data, sortValue = sortKey, order = "asc") => {
            const orderMultiplier = order === "desc" ? -1 : 1;
            const tempSortedArray = [...dataArray]?.sort((a, b) => {
                if (sortValue === "due_date") {
                    try {
                        return (new Date(a?.[sortValue]) - new Date(b?.[sortValue])) * orderMultiplier;
                    } catch (error) {
                        console.error(error);
                        return 0;
                    }
                } else {
                    const valA = a?.[sortValue]?.toString()?.toLowerCase?.() || "";
                    const valB = b?.[sortValue]?.toString()?.toLowerCase?.() || "";
                    return valA.localeCompare(valB) * orderMultiplier;
                }
            });
            return tempSortedArray;
        },
        [data, sortKey]
    );
    const countData = useMemo(() => {
        let statusCount = {
            ALL: data?.length || 0,
            PENDING: 0,
            IN_PROGRESS: 0,
            COMPLETED: 0,
            OVERDUE: 0,
        };
        for (let i = 0; i < data?.length; i++) {
            statusCount[data?.[i]?.status] >= 0 && statusCount[data?.[i]?.status]++;
        }
        return statusCount;
    }, [data]);
    const displayDataCount = useMemo(() => {
        const tempSearchIncludedData = getSearchData(data, searchValue);
        let statusCount = {
            ALL: tempSearchIncludedData?.length || 0,
            PENDING: 0,
            IN_PROGRESS: 0,
            COMPLETED: 0,
            OVERDUE: 0,
        };
        for (let i = 0; i < tempSearchIncludedData?.length; i++) {
            statusCount[tempSearchIncludedData?.[i]?.status] >= 0 && statusCount[tempSearchIncludedData?.[i]?.status]++;
        }
        return statusCount;
    }, [searchValue, data]);

    const searchData = (e) => {
        const { value: searchTerm } = e?.target || {};
        setSearchValue(searchTerm?.trim?.());
        if (!searchTerm?.trim?.()) {
            setDisplayData([...data]);
            setCurrentFilterKey(STATUS?.ALL);
            setSortKey("");
            return;
        }
        const tempSearchData = getSearchData(data, searchTerm);
        setDisplayData([...tempSearchData]);
        setCurrentFilterKey(STATUS?.ALL);
        setSortKey("");
    };
    const handleSearch = useDebounce(searchData, 500);

    const handleFilterData = (statusValue) => {
        let searchIncludedData = [...data];
        if (searchValue) {
            searchIncludedData = getSearchData([...searchIncludedData], searchValue);
        }
        if (sortKey) {
            searchIncludedData = getSortData([...searchIncludedData], sortKey);
        }
        switch (statusValue) {
            case STATUS.ALL:
                setDisplayData([...searchIncludedData]);
                break;
            case STATUS.COMPLETED:
                setDisplayData([...(searchIncludedData?.filter((task) => task?.status === STATUS?.COMPLETED) || [])]);
                break;
            case STATUS.IN_PROGRESS:
                setDisplayData([...(searchIncludedData?.filter((task) => task?.status === STATUS.IN_PROGRESS) || [])]);
                break;
            case STATUS.OVERDUE:
                setDisplayData([...(searchIncludedData?.filter((task) => task?.status === STATUS.OVERDUE) || [])]);
                break;
            case STATUS.PENDING:
                setDisplayData([...(searchIncludedData?.filter((task) => task?.status === STATUS.PENDING) || [])]);
                break;
            default:
                setDisplayData([...searchIncludedData]);
        }
    };

    const handleSort = (sortValue) => {
        let tempData = [...data];
        if (searchValue?.trim()) {
            tempData = getSearchData([...tempData], searchValue);
        }
        if (sortValue) {
            tempData = getSortData([...tempData], sortValue);
        }
        if (currentFilterKey !== STATUS.ALL) {
            tempData = [...tempData]?.filter((task) => task?.status === currentFilterKey);
        }
        setDisplayData([...tempData]);
    };

    const handleAddTaskButton = (newTaskData) => {
        if (newTaskData?.id) {
            setData([...data]?.map((task) => (task?.id === newTaskData?.id ? newTaskData : task)));
            let tempDisplayData = [...displayData]?.map((task) => (task?.id === newTaskData?.id ? newTaskData : task));
            if (currentFilterKey !== STATUS.ALL) {
                tempDisplayData = [...tempDisplayData]?.filter((task) => task?.status === currentFilterKey);
            }
            if (sortKey) {
                tempDisplayData = getSortData([...tempDisplayData], sortKey);
            }
            setDisplayData(tempDisplayData);
        } else {
            const searchBar = document?.getElementById("search-bar");
            if (searchBar) searchBar.value = "";
            const tempData = [{ ...newTaskData, id: generateUniqueId() }, ...data];
            setData(tempData);
            setDisplayData(tempData);
            setSearchValue("");
            setSortKey("");
            setCurrentFilterKey(STATUS?.ALL);
        }
        setOpenModal(false);
        setEditTaskID("");
    };

    return (
        <div className="flex w-full flex-1 flex-col gap-2 overflow-hidden">
            <Toolbar handleSearch={handleSearch} setOpenModal={setOpenModal} />
            <Card className="relative flex-1 overflow-y-auto">
                <>
                    {/* start of summary card */}
                    <div className="flex flex-col gap-3">
                        <span className="text-2xl font-semibold">Summary Dashboard</span>
                        <div className="relative flex w-full flex-wrap justify-between gap-3">
                            {Object.entries(countData)?.map(
                                ([key, value]) =>
                                    key !== STATUS?.ALL && (
                                        <SummaryCards
                                            key={key}
                                            title={key?.replaceAll?.("_", " ")?.toLowerCase?.()}
                                            value={value}
                                            extraStyles={statusBasedStyles?.[key]?.border}
                                        />
                                    )
                            )}
                        </div>
                    </div>
                    {/* end of summary card */}

                    {/* start task list */}
                    <div className="relative mt-3 flex flex-col gap-3">
                        <span className="text-2xl font-semibold">Tasks</span>
                        <div className="sticky top-[-16px] z-[1] flex justify-between bg-white py-3">
                            {/* category navigator */}
                            <div className="flex flex-1 gap-1 overflow-x-auto">
                                {Object.entries(displayDataCount)?.map(([key, value]) => (
                                    <button
                                        key={key}
                                        onClick={() => {
                                            setCurrentFilterKey(key);
                                            handleFilterData(key);
                                        }}
                                        className={`relative flex rounded-[4px] border border-gray-200 p-1 ${currentFilterKey === key && "bg-blue-500 text-white"}`}
                                    >
                                        <div className="flex gap-1 text-xs whitespace-nowrap">
                                            <span className="capitalize">{key?.replaceAll?.("_", " ")?.toLowerCase?.()}</span>
                                            <span className="">{`(${value})`}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                            {/* category navigator ends here */}

                            {/* sort drop down */}
                            <Select
                                value={sortKey}
                                onChange={(e) => {
                                    const { value } = e?.target || {};
                                    setSortKey(value);
                                    handleSort(value);
                                }}
                                options={[
                                    { displayValue: "Sort by", value: "" },
                                    { displayValue: "Sort by due date", value: "due_date" },
                                    { displayValue: "Sort by name", value: "title" },
                                ]}
                            />
                            {/* sort dropdown ends */}
                        </div>
                        {/* card starts here */}
                        {!!searchValue && <span className="=text-sm font-bold">Search result({displayData?.length})</span>}
                        <div className="flex w-full flex-wrap justify-between gap-3">
                            {displayData?.length ? (
                                displayData?.map((task) => (
                                    <DataCard
                                        key={task?.id}
                                        task={task}
                                        handleEditClick={() => {
                                            setEditTaskID(task?.id);
                                            setOpenModal(true);
                                        }}
                                        handleDeleteClick={() => {
                                            setData([...data]?.filter((taskData) => taskData?.id !== task?.id));
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
                        {/* card ends here */}
                    </div>
                    {/* end task list */}
                </>
            </Card>
            {/* add task Modal */}
            <Modal
                onClose={() => {
                    setOpenModal(false);
                    setEditTaskID("");
                }}
                isOpen={openModal}
            >
                <AddTaskModal
                    handleAddButton={handleAddTaskButton}
                    editTaskId={editTaskId}
                    currentStatus={currentFilterKey}
                    handleCancelModal={() => {
                        setOpenModal(false);
                        setEditTaskID("");
                    }}
                />
            </Modal>
            {/* Add task modal ends here */}
        </div>
    );
};

export default AllTask;
