import { useContext, useEffect, useState } from "react";
import { MainContext } from "../context/mainContext";
import { STATUS } from "../utils/helper";
import Select from "./Select";

const AddTaskModal = ({ editTaskId, handleAddButton, handleCancelModal, currentStatus = "" }) => {
    const { getDataFromId } = useContext(MainContext);
    const [loading, setLoading] = useState(!!editTaskId);
    const [taskData, setTaskData] = useState({
        id: "",
        title: "",
        status: currentStatus !== STATUS?.ALL ? currentStatus : STATUS?.PENDING,
        description: "",
        due_date: "",
    });

    const handleChange = (e) => {
        const { name, value } = e?.target;
        const tempTaskData = { ...taskData };
        if (value === "due_date" && taskData?.status === STATUS?.OVERDUE && !isDateOverDue(value)) {
            tempTaskData.status = STATUS?.PENDING;
        }
        setTaskData({ ...tempTaskData, [name]: value });
    };
    useEffect(() => {
        if (!editTaskId) {
            return;
        }
        setLoading(true);
        try {
            const idData = getDataFromId(editTaskId);
            if (!!idData?.length) {
                setTaskData({
                    ...taskData,
                    ...idData[0],
                });
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [editTaskId]);
    return (
        <div className="m-1 flex min-w-[99vw] flex-col gap-2 rounded-[8px] bg-white p-3 sm:min-w-[450px]">
            {loading ? (
                <>Loading...</>
            ) : (
                <>
                    <span className="text-2xl font-semibold">{editTaskId ? "Add Task" : "Edit Task"}</span>
                    <span className="text-sm text-gray-600">Fill in the details below </span>
                    <form
                        onSubmit={(e) => {
                            handleAddButton(taskData, e);
                        }}
                        className="flex flex-col gap-3"
                    >
                        <div className="flex flex-col gap-y-2">
                            <label className="text-sm" htmlFor="title">
                                Title <span className="text-red-500">*</span>
                            </label>
                            <input
                                className="rounded-[4px] border border-gray-200 p-1"
                                type="text"
                                id="title"
                                name="title"
                                value={taskData?.title}
                                required
                                placeholder="Enter a title for your task"
                                maxLength={256}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <label className="text-sm" htmlFor="description">
                                Description
                            </label>
                            <textarea
                                className="rounded-[4px] border border-gray-200 p-1"
                                type="text"
                                id="description"
                                name="description"
                                value={taskData?.description}
                                placeholder="Enter a little description for your task"
                                maxLength={512}
                                rows={4}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col justify-between gap-3 sm:flex-row">
                            <div className="flex flex-1 flex-col gap-y-2">
                                <label className="text-sm" htmlFor="status">
                                    Status
                                </label>
                                <Select value={taskData?.status} id="status" name="status" onChange={handleChange}>
                                    {Object?.values(STATUS)?.map(
                                        (statusValue) =>
                                            statusValue !== STATUS?.ALL && (
                                                <option key={statusValue} value={statusValue}>
                                                    {statusValue?.replaceAll("_", " ")?.toLowerCase?.()}
                                                </option>
                                            )
                                    )}
                                </Select>
                                {/* <select
                                    value={taskData?.status}
                                    className="rounded-[4px] border border-gray-200 p-1"
                                    id="status"
                                    name="status"
                                    onChange={handleChange}
                                >
                                    {Object?.values(STATUS)?.map(
                                        (statusValue) =>
                                            statusValue !== STATUS?.ALL && (
                                                <option key={statusValue} value={statusValue}>
                                                    {statusValue?.replaceAll("_", " ")?.toLowerCase?.()}
                                                </option>
                                            )
                                    )}
                                </select> */}
                            </div>
                            <div className="flex flex-1 flex-col gap-y-2">
                                <label className="text-sm" htmlFor="due_date">
                                    Due date <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    value={taskData?.due_date}
                                    className="rounded-[4px] border border-gray-200 p-1"
                                    id="due_date"
                                    name="due_date"
                                    onChange={handleChange}
                                    min={new Date()?.toISOString()?.split("T")}
                                    required
                                    placeholder="Enter a due date"
                                />
                            </div>
                        </div>
                        <div className="mt-5 flex items-center justify-end gap-3">
                            <button
                                onClick={(e) => {
                                    e?.stopPropagation();
                                    handleCancelModal?.();
                                }}
                                className="flex items-center rounded-[4px] border border-gray-200 px-2 py-1 font-semibold"
                            >
                                Cancel
                            </button>
                            <button
                                disabled={!taskData?.due_date || !taskData?.title}
                                onClick={(e) => {
                                    e?.stopPropagation();
                                    handleAddButton?.(taskData);
                                }}
                                className="flex items-center rounded-[4px] bg-blue-500 px-2 py-1 font-semibold text-white"
                                type="submit"
                            >
                                {editTaskId ? "Update Task" : "Create Task"}
                            </button>
                        </div>
                    </form>
                </>
            )}
        </div>
    );
};

export default AddTaskModal;
