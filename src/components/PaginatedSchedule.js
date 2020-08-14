import React, { Component, useState, useEffect } from 'react';
import { getAppointments } from "../api/network";
import moment from 'moment';

import SchedulePaginator from "./common/Paginators/SchedulePaginator";
import ScheduleDisplayComponent from "./ScheduleDisplay/ScheduleDisplayComponent"
import { set } from 'numeral';
import { View } from 'react-native-animatable';

function PaginatedSchedule({ ID, isPhysician }) {

    const weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    const dateFormatter = (item) => {
        const datetobePassed =
            weekday[item.getDay()] +
            " " +
            item.getFullYear() +
            "/" +
            (item.getMonth() + 1) +
            "/" +
            item.getDate();
        //console.log("The new formatted date is:", datetobePassed);
        return datetobePassed;
    };



    const [relevantAppointment, setrelevantApppointments] = useState([]);
    const [isFetchingAppointment, setFetchingAppointment] = useState(false);
    const [dateObj, setdateObj] = useState(new Date());
    const [testDate, settestDate] = useState(new Date());




    const [alteredDate, setalteredDate] = useState(dateFormatter(dateObj));




    useEffect(() => {

        fetchAppointments(ID, alteredDate);

    }, [alteredDate]);






    const goToPreviousDayApp = () => {


        settestDate(dateObj.setDate(dateObj.getDate() - 1));


        // setdateObj(dateObj);

        console.log("what's in the tester?", testDate);

        let tempdate = new Date(testDate);

        console.log("the temp date has:", tempdate);

        console.log("what is in altered date:", alteredDate);
        setalteredDate(dateFormatter(dateObj));



    }




    const goToNextDayApp = () => {

        dateObj.setDate(dateObj.getDate() + 1);

        setalteredDate(dateFormatter(dateObj));


    };

    const fetchAppointments = (id, datePassed = new Date()) => {

        setFetchingAppointment(true);



        getAppointments("", !isPhysician ? id : "", datePassed, datePassed, "", !isPhysician ? "" : id)
            .then((data) => {
                //console.log("Objected values:", Object.values(data));
                console.log("The appointment data received is:", data);
                relevantAppointment.length = 0;

                setrelevantApppointments(relevantAppointment.concat(data));

                //  console.log("Appointment array has:", relevantappointment);
            })
            .catch((error) => {
                console.log("Failed to get desired appointments", error);
            })
            .finally((_) => {
                setFetchingAppointment(false);
            });




    };






    return (
        <>


            <ScheduleDisplayComponent appointments={Array.from(relevantAppointment)} date={alteredDate} />

            <SchedulePaginator date={alteredDate} goToPreviousDay={goToPreviousDayApp} goToNextDay={goToNextDayApp} />


        </>

    )



}

export default PaginatedSchedule;