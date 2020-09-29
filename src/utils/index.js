import moment from 'moment';
import {useCurrentDays, useEndDays, useStartDays} from '../hooks/useScheduleService';

export const getDaysForMonth = month => {
    const selectedMonth = moment(month)
        .startOf('month');

    const pevMonthEndDays = useStartDays(selectedMonth);
    const nextMonthStartDays = useEndDays(selectedMonth);
    const currentMonthDays = useCurrentDays(selectedMonth.month() + 1, selectedMonth.year());

    return pevMonthEndDays.concat(currentMonthDays.concat(nextMonthStartDays));
};
