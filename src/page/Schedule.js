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
import {scheduleActions} from '../redux/reducers/scheduleReducer';
import SearchBar from '../components/common/SearchBar'
import {TouchableOpacity} from 'react-native-gesture-handler';
import {getSchedules} from "../api/network";
import {getDaysForMonth} from "../utils";


const currentDate = new Date();
const appointmentsObj = [
    {
        id: "3502193851",
        scheduleType: {
            "_id": 3,
            "name": "Equipment",
            "color": "red",
            "description": "Equipments"
        },
        title: "Cardiac Catheterization - Dr. H. Buckley",
        startTime: new Date(2020, 2, 8, 9),
        endTime: new Date(2020, 2, 8, 10),
        description: "",
        additionalInfo: "",
    },
    {
        id: "3502193852",
        scheduleType: {
            "_id": 3,
            "name": "Equipment",
            "color": "red",
            "description": "Equipments"
        },
        title: "Coronary Bypass Graft - Dr. H. Buckley",
        startTime: new Date(2020, 2, 8, 7),
        endTime: new Date(2020, 2, 8, 8),
        description: "",
        additionalInfo: "",
    },
    {
        id: "3502193853",
        scheduleType: {
            "_id": 2,
            "name": "Restock",
            "color": "yellow",
            "description": "Equipments"
        },
        title: "Restock Gauze - Surgery Theater 6",
        startTime: new Date(2020, 2, 8, 10),
        endTime: new Date(2020, 2, 8, 11),
        description: "",
        additionalInfo: "",
    },
    {
        id: "3502193854",
        scheduleType: {
            "_id": 1,
            "name": "Equipment",
            "color": "blue",
            "description": ""
        },
        title: "MRI Machine #3 - Dr. J. Sullivan",
        startTime: new Date(2020, 2, 11, 10),
        endTime: new Date(2020, 2, 11, 11),
        description: "",
        additionalInfo: "",
    },
    {
        id: "3502193856",
        scheduleType: {
            "_id": 3,
            "name": "Surgery",
            "color": "red",
            "description": ""
        },
        title: "Biopsy, Breast (Breast Biopsy) - Dr. H. Carrington",
        startTime: new Date(2020, 2, 11, 9),
        endTime: new Date(2020, 2, 11, 10),
        description: "",
        additionalInfo: "",
    },
    {
        id: "3502193859",
        scheduleType: {
            "_id": 3,
            "name": "Surgery",
            "color": "red",
            "description": ""
        },
        title: "Biopsy, Breast (Breast Biopsy) - Dr. H. Carrington",
        startTime: new Date(2020, 2, 10, 9),
        endTime: new Date(2020, 2, 10, 10),
        description: "",
        additionalInfo: "",
    }
];


const Schedule = (props) => {

    const getSelectedIndex = (day, days = []) => days.indexOf(day);
    const initialDaysList = getDaysForMonth(currentDate);
    const initialIndex = getSelectedIndex(moment(currentDate).format("YYYY-MM-DD").toString(), initialDaysList);
    const matchesFound = 3;

    const bottomSheetRef = useRef();

    // States
    const [state, dispatch] = useContext(ScheduleContext);
    const [dimensions, setDimensions] = useState(Dimensions.get('window'));

    const [selectedMonth, setSelectedMonth] = useState(currentDate);
    const [selectedDay, setSelectedDay] = useState(currentDate);
    const [daysList, setDaysList] = useState(initialDaysList);
    const [appointments, setAppointments] = useState([]);
    const [selectedAppointment, setSelectedAppointment] = useState();
    const [sectionListIndex, setSectionListIndex] = useState(initialIndex);
    const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
    const [displayTodayAppointment, setDisplayTodayAppointment] = useState(false);
    const [textInput, setTextInput] = useState("");
    const [currentSearchPosition, setCurrentSearchPosition] = useState(0);
    const [searchOpen, setSearchOpen] = useState(false);
    // const matchesFound = state.searchMatchesFound.length

    // animated states
    const [fall] = useState(new Animated.Value(1));

    // Effect
    useEffect(() => {
        Dimensions.addEventListener("change", onChange);
        return () => {
            Dimensions.removeEventListener("change", onChange);
        };
    });

    useEffect( () => {

        getSchedules()
            .then(data => setAppointments(data))
            .catch()


    }, []);

    const onChange = (dimensions) => {
        setDimensions(dimensions);
    };

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
        const currentDate = new Date();
        let date = moment(currentDate).format("YYYY-MM-DD").toString();
        let currentDaysList = getDaysForMonth(currentDate)

        setDaysList(getDaysForMonth(currentDate));
        setSelectedMonth(currentDate);

        setSelectedDay(date);
        setSectionListIndex(getSelectedIndex(date, currentDaysList));
    };

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

    const searchChangeText = (textInput) => {
        setTextInput(textInput)
    };

    const pressNextSearchResult = () => {
        currentSearchPosition < matchesFound &&
        setCurrentSearchPosition(currentSearchPosition + 1)
    };

    const pressPreviousSearchResult = () => {
        currentSearchPosition > 0 &&
        setCurrentSearchPosition(currentSearchPosition - 1)
    };

    const pressNewSearch = () => {
        setTextInput("");
        dispatch({
            type: 'SETNEWSEARCH',
            newState: {
                searchValue: "",
                searchMatchesFound: []
            }
        })
    };

    const pressSubmit = () => {
        dispatch({
            type: 'GETSEARCHRESULT',
            newState: textInput
        })
    };

    return (
        <View style={styles.container}>
            <Animated.View
                style={{
                    ...styles.scheduleContainer
                }}>

                {
                    searchOpen && <View style={styles.searchContainer}>

                        {/* Background Shadow View*/}
                        <TouchableWithoutFeedback
                            onPress={() => {
                                setSearchOpen(false)
                            }}>
                            <View
                                pointerEvents={searchOpen ? 'auto' : 'none'}
                                style={[
                                    styles.shadowContainer,
                                    {
                                        opacity: .5,
                                    },
                                ]}
                            />
                        </TouchableWithoutFeedback>

                        <View style={{
                            position: 'absolute',
                            width: '100%',
                            top: 0
                        }}>
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
                    </View>
                }


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
                                selectedDay = {selectedDay}
                                daysList = {daysList}
                            />
                        </View>
                    </View>
                </View>

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
    searchContainer: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 5
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
