import React, { Component, useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList, ScrollView } from 'react-native';
import { getAppointments, getAppointmentRequest } from '../api/network';
import SchedulePaginator from './common/Paginators/SchedulePaginator';
import ScheduleDisplayComponent from './ScheduleDisplay/ScheduleDisplayComponent';
import { formatDate } from '../utils/formatter';
import moment from "moment";
import { useModal } from 'react-native-modalfy';
import { useTheme } from 'emotion-theming';
import ActionContainer from '../components/common/FloatingAction/ActionContainer';
import LongPressWithFeedback from '../components/common/LongPressWithFeedback';
import ActionItem from '../components/common/ActionItem';
import WasteIcon from '../../assets/svg/wasteIcon';
import AddIcon from '../../assets/svg/addIcon';
import { LONG_PRESS_TIMER } from '../const';
import CreateWorkItemDialogContainer from '../components/Physicians/CreateWorkItemDialog'

function PaginatedSchedule({ ID, isPhysician }) {
    const weekday = new Array(7);
    weekday[0] = 'Sunday';
    weekday[1] = 'Monday';
    weekday[2] = 'Tuesday';
    weekday[3] = 'Wednesday';
    weekday[4] = 'Thursday';
    weekday[5] = 'Friday';
    weekday[6] = 'Saturday';

    const dateFormatter = item => {
        const datetobePassed =
            `${weekday[item.getDay()]
            } ${item.getFullYear()
            }/${item.getMonth() + 1
            }/${item.getDate()}`;
        // console.log("The new formatted date is:", datetobePassed);
        return datetobePassed;
    };
    const modal = useModal();
    const theme = useTheme();

    const [relevantAppointment, setrelevantApppointments] = useState([]);
    const [isFetchingAppointment, setFetchingAppointment] = useState(false);
    const [dateObj, setdateObj] = useState(new Date());
    const [testDate, settestDate] = useState(new Date());
    const [isFloatingActionDisabled, setFloatingAction] = useState(false);
    const [alteredDate, setalteredDate] = useState(dateFormatter(dateObj));
    const [currentAppointment, setCurrentAppointment] = useState({});

    // console.log("Altered date: ", typeof alteredDate);
    // console.log("Moment Altered date: ", typeof formatDate(dateObj, 'dddd MMM/D/YYYY'));

    useEffect(() => {
        fetchAppointments(ID, alteredDate);
    }, [alteredDate]);

    const goToPreviousDayApp = () => {
        settestDate(dateObj.setDate(dateObj.getDate() - 1));

        setdateObj(dateObj);
        // console.log("what's in the tester?", testDate);

        // let tempdate = new Date(testDate);

        // console.log('the temp date has:', tempdate);

        // console.log('what is in altered date:', alteredDate);
        setalteredDate(dateFormatter(dateObj));
    };

    const goToNextDayApp = () => {
        dateObj.setDate(dateObj.getDate() + 1);

        setalteredDate(dateFormatter(dateObj));
    };

    const fetchAppointments = (id, datePassed = new Date()) => {
        setFetchingAppointment(true);

        let tommorrow = new Date(datePassed);
        tommorrow = tommorrow.setDate(tommorrow.getDate() + 1)

        let fromDate = formatDate(datePassed, 'YYYY/MM/DD');
        let toDate = formatDate(tommorrow, 'YYYY/MM/DD')

        console.log("date passed", fromDate, toDate, id)

        getAppointments("", "", fromDate, toDate, '', id)
            .then(data => {
                //console.log("Objected values:", Object.values(data));
                console.log('The appointment data received is:', data);
                relevantAppointment.length = 0;
                //console.log("data visualization", relevantAppointment)

                const appointmentData = data.map(item => {
                    let modifiedAppointment = { ...item };
                    let today = new Date();
                    // const mm = moment(item.startTime);
                    const start = moment(modifiedAppointment.startTime);
                    const end = moment(modifiedAppointment.endTime);

                    const isActive = moment().isBetween(start, end);
                    if (end < today) {
                        console.log("appointment has passed");
                        modifiedAppointment.type = 3;
                    } else (isActive) ? (modifiedAppointment.type = 0) : (modifiedAppointment.type = 1);

                    return { ...modifiedAppointment, }
                })

                setrelevantApppointments(relevantAppointment.concat(appointmentData));
            })
            .catch(error => {
                console.log('Failed to get desired appointments', error);
            })
            .finally(_ => {
                setFetchingAppointment(false);
            });
    };

    const toggleActionButton = () => {
        setFloatingAction(true);
        modal.openModal("ActionContainerModal", {
            title: "INVOICE ACTIONS",
            actions: getFabActions(),
            onClose: () => {
                setFloatingAction(false);
            },
        })
    }

    const getFabActions = () => {
        const isDisabled = false;
        const deleteAction = (
            <View style={{ borderRadius: 6, flex: 1, overflow: 'hidden' }}>
                <LongPressWithFeedback
                    pressTimer={LONG_PRESS_TIMER.LONG}
                    onLongPress={console.log()}
                    isDisabled={isDisabled}
                >
                    <ActionItem
                        title="Hold to Delete"
                        icon={<WasteIcon strokeColor={isDisabled ? theme.colors['--color-gray-600'] : theme.colors['--color-red-700']} />}
                        onPress={() => {
                        }}
                        touchable={false}
                        disabled={isDisabled}
                    />
                </LongPressWithFeedback>
            </View>
        );
        const addWorkItem = (
            <View>
                <ActionItem title="Add Work Item" icon={<AddIcon />} onPress={handleNewProcedurePress} />
            </View>
        );

        return <ActionContainer
            floatingActions={[
                deleteAction,
                addWorkItem
            ]}
            title="SCHEDULE ACTIONS"
        />;
    };

    const handleNewProcedurePress = procedure => {
        console.log("here")
        modal.openModal('OverlayModal', {
            content: (
               
                    <CreateWorkItemDialogContainer
                        onCancel={() => setFloatingAction(false)}
                        addWorkItem={{ "id": ID }}
                    />
                
            ),
            onClose: () => setFloatingAction(false)
        });

    };



    return (
        <>
            <ScheduleDisplayComponent appointments={Array.from(relevantAppointment)} date={alteredDate} />

            <SchedulePaginator date={formatDate(dateObj, 'dddd MMM / D / YYYY')}
                goToPreviousDay={goToPreviousDayApp}
                goToNextDay={goToNextDayApp}
                toggleActionButton={toggleActionButton}
            />




        </>
    );
}

export default PaginatedSchedule;
