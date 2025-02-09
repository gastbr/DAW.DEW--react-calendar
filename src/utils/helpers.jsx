// Helper functions
export const isSameDay = (date1, date2) => {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    );
};

export const formatDate = (date, selectedDate, currentDate) => {
    if (isSameDay(date, selectedDate)) return "selected-day";
    if (isSameDay(date, currentDate)) return "current-day";
    return "";
};