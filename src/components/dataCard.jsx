import { CalendarDaysIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { convertDateToString, isDateOverDue, STATUS, statusBasedStyles } from "@/utils/helper";
import Card from "@/components/card";

export const DataCard = ({ task, handleEditClick, handleDeleteClick, showEditButton = true }) => {
    return (
        <div
            key={task?.id}
            className={`relative m-1 flex w-full rounded-[8px] border-l-3 transition-shadow duration-300 hover:shadow-[0_0_20px_rgba(0,0,0,0.2)] md:h-[200px] md:w-[48%] ${statusBasedStyles?.[task?.status]?.border}`}
        >
            <Card>
                <div className="flex h-full flex-col gap-1">
                    <span className="pl-1 text-lg font-semibold">{task?.title}</span>
                    <span
                        className={`${statusBasedStyles?.[task?.status]?.background} ${statusBasedStyles?.[task?.status]?.text} w-full rounded-full px-2 py-1 text-sm font-semibold sm:w-[50%]`}
                    >
                        {task?.status?.replaceAll("_", " ")}
                    </span>
                    <div className="flex flex-1 overflow-y-auto pl-1 text-sm">{task?.description}</div>
                    <div className="flex justify-between pl-1">
                        {isDateOverDue(task?.due_date) && task?.status !== STATUS?.COMPLETED ? (
                            <span className="flex items-center gap-1 text-xs font-semibold text-red-500">
                                <CalendarDaysIcon className="h-4 w-4 text-red-900" />
                                Overdue: {convertDateToString(task?.due_date)}
                            </span>
                        ) : (
                            <span className="flex items-center gap-1 text-xs font-semibold">
                                <CalendarDaysIcon className="h-4 w-4 text-black" /> Due: {convertDateToString(task?.due_date)}
                            </span>
                        )}
                        <div className="flex gap-2">
                            {showEditButton && (
                                <button onClick={handleEditClick}>
                                    <PencilIcon className="h-4 w-4 text-yellow-600" />
                                </button>
                            )}
                            <button onClick={handleDeleteClick}>
                                <TrashIcon className="h-4 w-4 text-red-900" />
                            </button>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default DataCard;
