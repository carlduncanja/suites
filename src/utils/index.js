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

/**
 * Format and displays physician's information.
 * @param {string} physician.firstName
 * @param {string} physician.surname
 * @param {object} physician
 * @param {boolean} showFull - displays full firstname
 * @param {string} defaultString - default string shown if firstname and surname values are null.
 * @return {string}
 */
export const formatPhysician = (physician = {}, showFull = true, defaultString = 'Unassigned') => {
    const {firstName = '', surname = ''} = physician.length > 0 ? physician[0] : [];

    if (!firstName && !surname) return " ";
    else if (firstName && surname) return showFull ? `Dr. ${firstName} ${surname}` : `Dr. ${firstName[0]}. ${surname}`
    else if (firstName) return `Dr. ${firstName}`
    else return `Dr. ${surname}`
}
