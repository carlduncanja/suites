import React, {useState, useContext, useEffect} from 'react';
import {View, StyleSheet, ScrollView, Text, Easing, Animated, Dimensions, TouchableOpacity} from 'react-native';
import Button from '../components/common/Button';
import moment from 'moment';
import ScheduleCalendar from '../components/Schedule/ScheduleCalendar';
import MonthSelector from "../components/Calendar/MonthSelector";
import SchedulesList from "../components/Schedule/SchedulesList";
import {useCurrentDays, useEndDays, useStartDays} from "../hooks/useScheduleService";


const currentDate = new Date();
const appointmentsObj = [
    {
        id: "1",
        scheduleType: 1,
        title: "Hello",
        startTime: new Date(),
        endTime: new Date(),
        description: "",
        additionalInfo: "",
    },
    {
        id: "2",
        scheduleType: 1,
        title: "Hello",
        startTime: new Date(),
        endTime: new Date(),
        description: "",
        additionalInfo: "",
    },
    {
        id: "3",
        scheduleType: 1,
        title: "Hello",
        startTime: new Date(),
        endTime: new Date(),
        description: "",
        additionalInfo: "",
    },
    {
        id: "4",
        scheduleType: 1,
        title: "Hello",
        startTime: new Date(),
        endTime: new Date(),
        description: "",
        additionalInfo: "",
    },
    {
        id: "6",
        scheduleType: 1,
        title: "Hello",
        startTime: new Date(2020, 2, 10),
        endTime: new Date(),
        description: "",
        additionalInfo: "",
    }
];


const Schedule = (props) => {
    // const [showNotification, setShowNotification] = useState(false);
    //
    // const [state, dispatch] = useContext(ScheduleContext);
    //
    // const showFullCalendar = () => {
    //     let status = !displayFullCalendar;
    //     this.setState({displayFullCalendar: status})
    // };
    //
    // const restartDrag = () => {
    //     this.setState({slideDraggable: true})
    // };
    //
    // const stopScheduleDrag = (height, bottom) => {
    //     height === Dimensions.get('window').height - 150 ? this.setState({slideDraggable: false}) : null
    //     height === -bottom ? this.setState({showSlider: false}) : null
    // };
    // useEffect(() => {
    //     console.log('on schedule update')
    // });
    // const drawer = require("react-native-drawer-menu").default;
    // const scheduleContent = (
    //     <View
    //         style=
    //             {{
    //                 flex: 1,
    //                 position: 'relative',
    //                 marginLeft: '2%',
    //                 marginRight: '2%',
    //                 marginBottom: !state.displayFullCalendar ? '15%' : '45%',
    //                 zIndex: 1,
    //                 top: 0,
    //                 marginTop: 20,
    //             }}
    //     >
    //
    //         {/* <ScheduleListView /> */}
    //
    //     </View>
    // );
    // const mainContent = (
    //     <ScrollView scrollEnabled={false}>
    //         <View style={{flex: 1}}>
    //             {
    //                 showNotification &&
    //                 <View style={{flex: 1, position: 'absolute', zIndex: 1, right: 10, top: 10, width: '55%'}}>
    //                     <Notification
    //                         closeNavigation={setShowNotification}
    //                     />
    //                 </View>
    //             }
    //
    //             {/*<ScheduleTopBar*/}
    //             {/*    screenDimensions={props.screenDimensions}*/}
    //             {/*/>*/}
    //
    //             <ScheduleCalendar
    //                 screenDimensions={props.screenDimensions}
    //                 appointmentDays={[new Date().toString(), new Date(2020, 2, 10).toString()]}
    //                 month={new Date()}
    //                 selectedDate={new Date()}
    //                 onDaySelected={() => {}}
    //             />
    //
    //
    //         </View>
    //
    //         {/*{!state.displayFullCalendar ?*/}
    //         {/*    <View style={{flex: 1, alignSelf: 'center', marginBottom: 4}}>*/}
    //         {/*        <ExpandCalendarDivider content="Expand" pressAction={this.showFullCalendar}/>*/}
    //         {/*    </View>*/}
    //         {/*    :*/}
    //         {/*    <View style={{flex: 1, alignSelf: 'center'}}>*/}
    //         {/*        <ExpandCalendarDivider content="Collapse" pressAction={this.showFullCalendar}/>*/}
    //         {/*    </View>*/}
    //
    //         {/*}*/}
    //
    //         {scheduleContent}
    //
    //     </ScrollView>
    // );


    const getDaysForMonth = (month) => {
        const selectedMonth = moment(month).startOf('month');

        let pevMonthEndDays = useStartDays(month);
        let nextMonthStartDays = useEndDays(month);
        let currentMonthDays = useCurrentDays(selectedMonth.month() + 1, selectedMonth.year());

        return pevMonthEndDays.concat(currentMonthDays.concat(nextMonthStartDays));
    };

    const getSelectedIndex = (day, days=[]) => days.indexOf(day);


    const [selectedMonth, setSelectedMonth] = useState(currentDate);
    const [selectedDay, setSelectedDay] = useState(currentDate);
    const [daysList, setDaysList] = useState(getDaysForMonth(currentDate));
    const [appointments, setAppointments] = useState(appointmentsObj);
    const [sectionListIndex, setSectionListIndex] = useState(0);

    const getDrawerContent = () => {
        return Object.keys(scheduleDetails).length != 0 &&
            <ScrollableAppointmentCard
                scheduleDetails={scheduleDetails}
                // showScheduleButtons = {this.showScheduleButtons}
                //scheduleButtons={this.state.scheduleButtons}
                //deleteFloatingAction = {this.deleteFloatingAction}
                //completeDeleteFloatingAction = {this.completeDeleteFloatingAction}
                //deleteAppointment = {this.state.deleteAppointment}
                //completeDeleteAppointment = {this.state.completeDeleteAppointment}
                //exitDelete = {this.exitDelete}
                //closeActionButtons = {this.closeActionButtons}
                screenDimensions={props.screenDimensions}
                transparent={transparent}
            />
    };

    /***
     *
     *
     * @returns {[]} and array of day strings in the format "YYYY-MM-DD"
     */
    const getAppointmentDays = () => {
        const appointmentDays = [];
        appointments.forEach( item => appointmentDays.push( (moment(item.startTime).format("YYYY-MM-DD") )));
        return appointmentDays;
    };

    /**
     *
     * @param date string "YYYY-MM-DD" for the selected day.
     */
    const handleOnDaySelected = (date) => {
        setSelectedDay(date);

        const indexOfSelected = getSelectedIndex(date, daysList);
        setSectionListIndex(indexOfSelected)
    };


    const handleOnMonthUpdated = (date) => {
        setSelectedMonth(date);
        setDaysList(getDaysForMonth(date));
    };

    return (
        <View style={styles.scheduleContainer}>

            <View style={styles.scheduleTop}>

                <Button/>

                <MonthSelector
                    selectedMonth={selectedMonth}
                    onMonthUpdated={handleOnMonthUpdated}
                />

                <Button/>

            </View>

            <View style={styles.scheduleCalendar}>
                <View style={{
                    flexDirection: 'row',
                    alignSelf: 'flex-start'
                }}>
                    <ScheduleCalendar
                        onDaySelected={handleOnDaySelected}
                        appointmentDays={getAppointmentDays()}
                        month={selectedMonth}
                        days={daysList}
                        selectedDate={selectedDay}
                        screenDimensions={props.screenDimensions}
                    />
                </View>

                <View style={styles.scheduleContent}>

                    <SchedulesList
                        days={daysList}
                        appointments={appointments}
                        selectedIndex={sectionListIndex}
                    />

                </View>
            </View>
        </View>
    )
};

export default Schedule

const styles = StyleSheet.create({
    scheduleContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    scheduleTop: {
        paddingLeft: 32,
        paddingRight: 32,
        marginTop: 32,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    scheduleCalendar: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    scheduleContent: {
        flex: 1,
        flexDirection: 'column',
        alignSelf: 'flex-start',
        width: '100%',
        padding: 32,
        paddingTop: 24
    },

    searchContent: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        padding: 15,
    },
    topContainer: {
        marginLeft: '4%',
        marginRight: '4%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 20,
        marginTop: 18
    },
    partition: {
        backgroundColor: '#CBD5E0',
        borderRadius: 8,
        height: 6,
        width: 70,
        alignSelf: 'center',
        marginTop: 15,
        marginBottom: 24,

    },
    drawer: {
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        paddingLeft: 49,
        paddingTop: 32,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 16,
        borderBottomLeftRadius: 16,
    },
    mask: {
        backgroundColor: '#E5E5E5',
    },
});
