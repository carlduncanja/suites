import React, {useState, useContext, useEffect, useRef} from 'react';
import {View, StyleSheet, Dimensions, TouchableWithoutFeedback, Text} from 'react-native';
import Animated from 'react-native-reanimated'
import BottomSheet from 'reanimated-bottom-sheet'
import Button from '../components/common/Button';
import moment from 'moment';
import ScheduleCalendar from '../components/Schedule/ScheduleCalendar';
import MonthSelector from "../components/Calendar/MonthSelector";
import SchedulesList from "../components/Schedule/SchedulesList";
import {useCurrentDays, useEndDays, useStartDays} from "../hooks/useScheduleService";
import ScheduleContent from "../components/Schedule/ScheduleContent";
import {ScheduleContext} from '../contexts/ScheduleContext';
import {scheduleActions} from '../reducers/scheduleReducer';
import SearchBar from '../components/common/SearchBar'
import {TouchableOpacity} from 'react-native-gesture-handler';


const currentDate = new Date();
const appointmentsObj = [
    {
        id: "3502193851",
        scheduleType: 1,
        title: "Hello 2",
        startTime: new Date(),
        endTime: new Date(),
        description: "",
        additionalInfo: "",
    },
    {
        id: "3502193852",
        scheduleType: 1,
        title: "Hello",
        startTime: new Date(),
        endTime: new Date(),
        description: "",
        additionalInfo: "",
    },
    {
        id: "3502193853",
        scheduleType: 1,
        title: "Hello",
        startTime: new Date(),
        endTime: new Date(),
        description: "",
        additionalInfo: "",
    },
    {
        id: "3502193854",
        scheduleType: 1,
        title: "Hello",
        startTime: new Date(),
        endTime: new Date(),
        description: "",
        additionalInfo: "",
    },
    {
        id: "3502193856",
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

    // const getDrawerContent = () => {
    //     return Object.keys(scheduleDetails).length != 0 &&
    //         <ScrollableAppointmentCard
    //             scheduleDetails={scheduleDetails}
    //             // showScheduleButtons = {this.showScheduleButtons}
    //             //scheduleButtons={this.state.scheduleButtons}
    //             //deleteFloatingAction = {this.deleteFloatingAction}
    //             //completeDeleteFloatingAction = {this.completeDeleteFloatingAction}
    //             //deleteAppointment = {this.state.deleteAppointment}
    //             //completeDeleteAppointment = {this.state.completeDeleteAppointment}
    //             //exitDelete = {this.exitDelete}
    //             //closeActionButtons = {this.closeActionButtons}
    //             screenDimensions={props.screenDimensions}
    //             transparent={transparent}
    //         />
    // };

    const [state, dispatch] = useContext(ScheduleContext);
    const [dimensions, setDimensions] = useState(Dimensions.get('window'));

    const onChange = (dimensions) => {
        setDimensions(dimensions);
    };

    useEffect(() => {
        Dimensions.addEventListener("change", onChange);
        return () => {
            Dimensions.removeEventListener("change", onChange);
        };
    });

    const getDaysForMonth = (month) => {
        const selectedMonth = moment(month).startOf('month');

        let pevMonthEndDays = useStartDays(month);
        let nextMonthStartDays = useEndDays(month);
        let currentMonthDays = useCurrentDays(selectedMonth.month() + 1, selectedMonth.year());

        return pevMonthEndDays.concat(currentMonthDays.concat(nextMonthStartDays));
    };

    const getSelectedIndex = (day, days = []) => days.indexOf(day);
    const intialDaysList = getDaysForMonth(currentDate)
    const initalIndex = getSelectedIndex(moment(currentDate).format("YYYY-MM-DD").toString(), intialDaysList)

    const bottomSheetRef = useRef();
    const schedulesListRef = useRef();

    const [selectedMonth, setSelectedMonth] = useState(currentDate);
    const [selectedDay, setSelectedDay] = useState(currentDate);
    const [daysList, setDaysList] = useState(intialDaysList);
    const [appointments, setAppointments] = useState(appointmentsObj);
    const [selectedAppointment, setSelectedAppointment] = useState();
    const [sectionListIndex, setSectionListIndex] = useState(initalIndex);
    const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
    const [displayTodayAppointment, setDisplayTodayAppointment] = useState(false)
    const [textInput, setTextInput] = useState("")
    const [currentSearchPosition, setCurrentSearchPosition] = useState(0)
    const [searchOpen, setSearchOpen] = useState(false)
    // const matchesFound = state.searchMatchesFound.length
    const matchesFound = 3

    // animated states
    const [fall] = useState(new Animated.Value(1));

    const renderShadow = () => {
        const animatedShadowOpacity = Animated.interpolate(fall, {
            inputRange: [0, 1],
            outputRange: [0.5, 0],
        });

        return (
            <TouchableWithoutFeedback
                onPress={() => {
                    bottomSheetRef.current.snapTo(2);
                }}
            >
                <Animated.View
                    pointerEvents={isBottomSheetVisible ? 'auto' : 'none'}
                    style={[
                        styles.shadowContainer,
                        {
                            opacity: animatedShadowOpacity,
                        },
                    ]}
                />
            </TouchableWithoutFeedback>
        )
    };


    /**
     *
     * @param date string "YYYY-MM-DD" for the selected day.
     */
    const handleOnDaySelected = (date) => {
        setSelectedDay(date);
        const indexOfSelected = getSelectedIndex(date, daysList);
        setSectionListIndex(indexOfSelected);
    };

    const handleOnGoToToday = () => {
        let date = moment(new Date()).format("YYYY-MM-DD").toString()
        setSectionListIndex(getSelectedIndex(date, daysList))
        setSelectedDay(date)
        // setDisplayTodayAppointment(!displayTodayAppointment)
    }

    const handleOnMonthUpdated = (date) => {
        setSelectedMonth(date);
        setDaysList(getDaysForMonth(date));
    };

    const handleAppointmentPress = (appointment) => {
        setSelectedAppointment(appointment);
        if (bottomSheetRef) bottomSheetRef.current.snapTo(0);
    };

    const getSnapPoints = () => {
        // return [ dimensions.height || 500 * .5,  0]
        return [600, 500, 0]

    };

    const renderScheduleContent = (selectedSchedule) => () => {
        return <View style={{
            height: '100%',
            width: '100%',
            backgroundColor: 'white',
            zIndex: 5
        }}>
            <ScheduleContent
                scheduleItem={selectedSchedule}
                screenDimensions={dimensions}
            />
        </View>
    };

    const searchPress = () => {
        setSearchOpen(true)
    };

    const onGoToTodayClick = () => {
        setDisplayTodayAppointment(!displayTodayAppointment)
    }

    const searchChangeText = (textInput) => {
        setTextInput(textInput)
    }

    const pressNextSearchResult = () => {
        currentSearchPosition < matchesFound &&
        setCurrentSearchPosition(currentSearchPosition + 1)
    }

    const pressPreviousSearchResult = () => {
        currentSearchPosition > 0 &&
        setCurrentSearchPosition(currentSearchPosition - 1)
    }

    const pressNewSearch = () => {
        setTextInput("")
        dispatch({
            type: 'SETNEWSEARCH',
            newState: {
                searchValue: "",
                searchMatchesFound: []
            }
        })
    }

    const pressSubmit = () => {
        dispatch({
            type: 'GETSEARCHRESULT',
            newState: textInput
        })
    }

    return (
        <View style={styles.container}>
            <Animated.View
                style={{
                    ...styles.scheduleContainer
                }}>

                {searchOpen &&
                <View style={{position: 'absolute', top: 0, width: '100%', zIndex: 1}}>
                    <SearchBar
                        changeText={searchChangeText}
                        inputText={textInput}
                        matchesFound={matchesFound}
                        onPressNextResult={pressNextSearchResult}
                        onPressPreviousResult={pressPreviousSearchResult}
                        onPressNewSerch={pressNewSearch}
                        onPressSubmit={pressSubmit}
                    />
                </View>
                }

                <TouchableWithoutFeedback
                    onPress={() => {
                        searchOpen === true && setSearchOpen(false)
                    }}
                >
                    <View style={{flex: 1}}>
                        <View style={styles.scheduleTop}>
                            <Button
                                title="Search"
                                buttonPress={searchPress}
                                backgroundColor="#F7FAFC"
                                color="#4A5568"
                            />

                            <MonthSelector
                                selectedMonth={selectedMonth}
                                onMonthUpdated={handleOnMonthUpdated}
                            />

                            <Button
                                title={"Go to Today"}
                                buttonPress={handleOnGoToToday}
                            />

                        </View>

                        <View style={styles.scheduleCalendar}>
                            <View style={{
                                flexDirection: 'row',
                                alignSelf: 'flex-start'
                            }}>
                                <ScheduleCalendar
                                    onDaySelected={handleOnDaySelected}
                                    appointments={appointments}
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
                                    onAppointmentPress={handleAppointmentPress}
                                />
                            </View>
                        </View>
                </TouchableWithoutFeedback>
            </Animated.View>

            {renderShadow()}

            <BottomSheet
                ref={bottomSheetRef}
                snapPoints={getSnapPoints()}
                initialSnap={2}
                callbackNode={fall}
                borderRadius={14}
                renderContent={renderScheduleContent(selectedAppointment)}
                onCloseEnd={() => setBottomSheetVisible(false)}
                onOpenEnd={() => setBottomSheetVisible(true)}
                renderHeader={() =>
                    <View
                        style={{
                            height: 8,
                            alignSelf: 'center',
                            width: 50,
                            backgroundColor: 'white',
                            borderRadius: 4,
                            marginBottom: 14
                        }}
                    />
                }
            />
        </View>

)
};

export default Schedule

const styles = StyleSheet.create({
    container: {
    flex: 1
},

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

    // Shadow
    shadowContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
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
