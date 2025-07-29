import Card from "./card";

const Toolbar = ({ handleSearch, setOpenModal, searchValue = "", showAddButton = true }) => {
    return (
        <Card>
            <div className="flex w-full flex-col justify-end gap-2 sm:flex-row sm:items-center">
                <input
                    id="search-bar"
                    onChange={(e) => {
                        handleSearch(e);
                    }}
                    placeholder="Search Tasks"
                    className="rounded-[4px] border border-gray-200 p-1 focus-visible:!border-transparent"
                />
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

export default Toolbar;
