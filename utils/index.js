import moment from "moment";
import {useCurrentDays, useEndDays, useStartDays} from "../hooks/useScheduleService";


export const getDaysForMonth = (month) => {
    const selectedMonth = moment(month).startOf('month');

    let pevMonthEndDays = useStartDays(selectedMonth);
    let nextMonthStartDays = useEndDays(selectedMonth);
    let currentMonthDays = useCurrentDays(selectedMonth.month() + 1, selectedMonth.year());

    return pevMonthEndDays.concat(currentMonthDays.concat(nextMonthStartDays));
};
