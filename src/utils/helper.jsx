export const convertDateToString = (date) => {
    if (!date) {
        return "";
    }
    try {
        const dateConverted = new Date(date);
        return dateConverted?.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    } catch (error) {
        console.error(error);
        return "";
    }
};

export const isDateOverDue = (date) => {
    if (!date) {
        return false;
    }
    try {
        const givenDate = new Date(date);
        const todaysDate = new Date();
        todaysDate?.setHours(23, 59, 59, 999);
        if (givenDate < todaysDate) {
            return true;
        }
        return false;
    } catch (error) {
        console.error(error);
        return false;
    }
};

export const generateUniqueId = () => {
    try {
        const uuid = crypto.randomUUID();
        return uuid;
    } catch {
        return Date.now()?.toString(36) + Math.random().toString(36)?.slice(2, 6);
    }
};

export const STATUS = {
    ALL: "ALL",
    PENDING: "PENDING",
    IN_PROGRESS: "IN_PROGRESS",
    COMPLETED: "COMPLETED",
    OVERDUE: "OVERDUE",
};

export const statusBasedStyles = {
    [STATUS?.OVERDUE]: {
        border: "border-red-500",
        background: "bg-red-200",
        text: "text-red-900",
    },
    [STATUS?.PENDING]: {
        border: "border-yellow-500",
        background: "bg-yellow-200",
        text: "text-yellow-900",
    },
    [STATUS?.IN_PROGRESS]: {
        border: "border-blue-500",
        background: "bg-blue-200",
        text: "text-blue-900",
    },
    [STATUS?.COMPLETED]: {
        border: "border-green-500",
        background: "bg-green-200",
        text: "text-green-900",
    },
};
