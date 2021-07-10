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

/**
 * Util method that returns the days "YYYY-MM-DD" over specified period.
 * @param startDate
 * @param endDate
 * @return {string[]} - array of days
 */
export const getDaysInRange = (startDate, endDate) => {
    const days = [];

    const initialDate = moment(startDate);
    // loop over

    const finalDate = moment(endDate);
    do { // ensure that the loops run once if the clause is met.

        days.push(initialDate.format('YYYY-MM-DD'))
        initialDate.add(1, 'day')

    } while (!initialDate.isSameOrAfter(finalDate, 'day'));

    return days
}
