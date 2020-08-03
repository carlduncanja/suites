import React, {useEffect, useState} from "react";
import {View} from "react-native";
import ProcedureTab from "./ProcedureTab";
import ScheduleDisplayComponent, {EVENT_TYPES} from "../../ScheduleDisplay/ScheduleDisplayComponent";
import {getAppointments} from "../../../api/network";
import moment from "moment";


const ProcedureStep = ({onProcedureUpdate, procedures, patient = "--", selectedTabIndex, errors, onErrorUpdate}) => {

    // TODO clean up logic for scheduling assistant.

    const [isLoading, setLoading] = useState(true);
    const [appointments, setAppointments] = useState([])
    const [currentProcedure, setCurrentProcedure] = useState(procedures[selectedTabIndex]);
    // const [date, setDate] = useState(new Date());
    // const [location, setLocation] = useState("");
    // const [duration, setDuration] = useState(0)
    // const [startTime, setStartTime] = useState()
    // const [procedure, setProcedure] = useState()

    // useEffect(() => {
    //     refreshAppointments()
    // }, [location, date])
    //
    // useEffect(() => {
    //     refreshTempAppointment()
    // }, [procedure, duration, startTime])

    useEffect(() => {
        const currentProcedure = procedures[selectedTabIndex];
        setCurrentProcedure(currentProcedure);
    }, [selectedTabIndex])


    useEffect(() => {
        updateValuesForScheduleAssistant().then(r => {
        })
    }, [currentProcedure])

    const onProcedureFieldChange = (objIndex) => (value) => {
        const updatedProcedure = [...procedures];
        updatedProcedure[objIndex] = value;
        onProcedureUpdate(updatedProcedure)

        setCurrentProcedure(value);
    }

    const handleOnErrorUpdate = (objIndex) => (value) => {
        const updatedErrors = [...errors];
        updatedErrors[objIndex] = value;
        onErrorUpdate(updatedErrors)
    }

    const fetchAppointmentForDate = async (location, date) => {
        const start = moment(date).startOf("day").toDate();
        const end = moment(date).endOf('day').toDate();

        setLoading(true);
        try {
            const data = await getAppointments("", location, start, end, 1)
            return data.map(item => {
                const {patient} = item;
                const subTitle = patient ? `${patient.firstName} ${patient.surname}` : item.title;

                return {
                    ...item,
                    startTime: item.startTime,
                    endTime: item.endTime,
                    isActive: false,
                    title: item.subject,
                    subTitle,
                    type: EVENT_TYPES.GONE,
                }
            })

        } catch (e) {
            console.log("failed to get appointment", e, location, start, end);
            return [];
        }

    }

    const updateValuesForScheduleAssistant = async () => {

        let appointments = [];

        if (currentProcedure) {
            const {
                procedure,
                duration,
                startTime,
                location,
                date
            } = currentProcedure;


            if (location && date) {
                const appointmentsForDate = await fetchAppointmentForDate(location._id, date)

                console.log("appointment for date", appointmentsForDate);

                appointments = [...appointments, ...appointmentsForDate]
            }


            if (duration && startTime) {
                const tempAppointment = getTempAppointment(duration, startTime)
                const {startTime: newStart, endTime: newEnd} = tempAppointment;

                for (const appointment of appointments) {
                    const start = moment(appointment?.startTime);
                    const end = moment(appointment?.endTime);

                    const hasConflict = moment(start).isBetween(startTime, newEnd)|| moment(end).isBetween(startTime, newEnd);

                    console.log("checking conflict time", appointment._id, start, end, startTime, hasConflict);
                    if (hasConflict) {
                        tempAppointment.isValid = false;
                        tempAppointment.type = EVENT_TYPES.ERROR
                        break
                    }
                }


                if (tempAppointment) {
                    appointments = [...appointments, tempAppointment];
                }
            }


        }
        setAppointments(appointments)
    }

    const getTempAppointment = (duration, startTime, procedure) => {
        if (!duration || !startTime) return null;

        const start = moment(startTime).toDate();
        const end = moment(startTime).add(+duration, "hours").toDate();
        return {
            key: "temp",
            startTime: start,
            endTime: end,
            isActive: true,
            title: "--",
            subTitle: patient,
            type: EVENT_TYPES.DEFAULT,
        }

    }


    console.log("procedure step", selectedTabIndex, procedures)

    const date = currentProcedure?.date || new Date()

    return (
        <View style={{flex: 1}}>
            <ProcedureTab
                onProcedureInfoChange={onProcedureFieldChange(selectedTabIndex)}
                procedureInfo={currentProcedure}
                errors={errors[selectedTabIndex] || {}}
                onErrorUpdate={handleOnErrorUpdate(selectedTabIndex)}
            />

            <View style={{backgroundColor: '#C4C4C4', width: '100%', height: 1}}/>

            {/* SCHEDULING ASSISTANT */}

            <View style={{flex: 1, paddingRight: 30}}>
                <ScheduleDisplayComponent appointments={appointments} date={date}/>
            </View>

        </View>
    )
}

export default ProcedureStep

