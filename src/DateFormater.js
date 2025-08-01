import { format, isThisWeek, isToday, isTomorrow } from "date-fns";
function DateFormater() {
    const formateDate = (date) => {;
        if (isToday(date)) {
            return "Today";
        } else if (isTomorrow(date)) {
            return "Tomorrow";
        } else if (isThisWeek(date)) {
            return format(date, "EEEE"); // "Monday", "Tuesday", etc.
        } else {
            return format(date, "PP"); // ex: "Aug 5, 2025"
        }
    };

    const formateTime = (date) => {
        return format(date, "p")
    }
    return {formateDate, formateTime}
}

const dateFormater = DateFormater();
export default dateFormater;