import { memo } from "react";
import Card from "./card";

const Toolbar = ({ handleSearch, setOpenModal, autoCompleteData = [], searchValue = "", showAddButton = true }) => {
    return (
        <Card>
            <div className="flex w-full flex-col justify-end gap-2 sm:flex-row sm:items-center">
                <div className="relative">
                    <input
                        id="search-bar"
                        onChange={(e) => {
                            handleSearch(e);
                        }}
                        placeholder="Search Tasks"
                        className="rounded-[4px] border border-gray-200 p-1 focus-visible:!border-transparent"
                    />
                    {!!autoCompleteData?.length && (
                        <div className="absolute top-full z-10 flex max-h-[200px] w-full flex-col overflow-auto border bg-white">
                            {autoCompleteData?.map((task) => (
                                <span key={task.id} className="cursor-pointer p-2 hover:bg-gray-200">
                                    {task?.title}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
                {showAddButton && (
                    <button
                        onClick={() => {
                            setOpenModal(true);
                        }}
                        className="flex max-w-[100px] items-center gap-1 rounded-[4px] bg-blue-500 px-2 py-1 font-semibold text-white"
                    >
                        + Add task
                    </button>
                )}
            </div>
        </Card>
    );
};

export default memo(Toolbar);
