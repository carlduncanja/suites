import moment from "moment";
import {
  useCurrentDays,
  useEndDays,
  useStartDays,
} from "../hooks/useScheduleService";

export const getDaysForMonth = (month) => {
  const selectedMonth = moment(month).startOf("month");

  const pevMonthEndDays = useStartDays(selectedMonth);
  const nextMonthStartDays = useEndDays(selectedMonth);
  const currentMonthDays = useCurrentDays(
    selectedMonth.month() + 1,
    selectedMonth.year()
  );

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
  do {
    // ensure that the loops run once if the clause is met.

    days.push(initialDate.format("YYYY-MM-DD"));
    initialDate.add(1, "day");
  } while (!initialDate.isSameOrAfter(finalDate, "day"));

  return days;
};

/**
 * Format and displays physician's information.
 * @param {string} physician.firstName
 * @param {string} physician.surname
 * @param {object} physician
 * @param {boolean} showFull - displays full firstname
 * @param {string} defaultString - default string shown if firstname and surname values are null.
 * @return {string}
 */
export const formatPhysician = (
  physician = {},
  showFull = true,
  defaultString = "Unassigned"
) => {
  const { firstName = "", surname = "" } =
    physician.length > 0 ? physician[0] : [];

  if (!firstName && !surname) return " ";
  else if (firstName && surname)
    return showFull
      ? `Dr. ${firstName} ${surname}`
      : `Dr. ${firstName[0]}. ${surname}`;
  else if (firstName) return `Dr. ${firstName}`;
  else return `Dr. ${surname}`;
};

export function calculateProcedureOvertime(
  procedureDetails,
  anaesthesiaType,
  anaesthesiaCost
) {
  if (procedureDetails?.endTime?.length < 1 || !procedureDetails?.endTime)
    return {
      overtimeCost: 0,
      procedureHours: procedureDetails.estimatedDuration,
    };
  const durationFormat = procedureDetails.estimatedDuration + ":00";
  const endTime = moment(procedureDetails.endTime);
  const startTime = moment(procedureDetails.startTime)
    .format("HH:mm")
    .split(":");
  const timeDifference = moment(
    endTime.subtract({ hours: startTime[0], minutes: startTime[1] })
  ).format("HH:mm");
  if (
    moment(timeDifference, "HH:mm") <= moment(durationFormat, "HH:mm") ||
    anaesthesiaType == "none"
  )
    return {
      overtimeCost: 0,
      procedureHours: moment.duration(timeDifference).asHours(),
    };
  if (moment(timeDifference, "HH:mm") > moment(durationFormat, "HH:mm")) {
    const overTime =
      moment.duration(timeDifference).asHours() -
      procedureDetails.estimatedDuration;
    return {
      overtimeCost: overTime * anaesthesiaCost[anaesthesiaType],
      procedureHours: moment.duration(timeDifference).asHours(),
    };
  }
}

export function validateNameField(name) {
  const regex = /^[a-zA-Z\-\ ]{0,30}$/;
  return regex.test(name);
}

export function validateAddressField(address) {
  const regex = /^[a-zA-Z0-9\-\,\#\.\ ]{0,100}$/;
  return regex.test(address);
}
