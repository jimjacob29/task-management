import Card from "./card";

const Toolbar = ({ handleSearch, setOpenModal, showAddButton = true }) => {
    return (
        <Card>
            <div className="flex w-full items-center justify-end gap-2">
                <input
                    onChange={(e) => {
                        handleSearch(e);
                    }}
                    // value={searchValue}
                    placeholder="Search Tasks"
                    className="rounded-[4px] border border-gray-200 p-1 focus-visible:!border-transparent"
                />
                {showAddButton && (
                    <button
                        onClick={() => {
                            setOpenModal(true);
                        }}
                        className="flex items-center gap-1 rounded-[4px] bg-blue-500 px-2 py-1 font-semibold text-white"
                    >
                        + Add task
                    </button>
                )}
            </div>
        </Card>
    );
};

export default Toolbar;
