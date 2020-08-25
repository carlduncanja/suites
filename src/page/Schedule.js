import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, Dimensions, ActivityIndicator, Text } from 'react-native';
import Animated from 'react-native-reanimated'
import Button from '../components/common/Buttons/Button';
import moment from 'moment';
import ScheduleCalendar from '../components/Schedule/ScheduleCalendar';
import MonthSelector from "../components/Calendar/MonthSelector";
import SchedulesList from "../components/Schedule/SchedulesList";
import { ScheduleContext } from '../contexts/ScheduleContext';
import { getAppointments } from "../api/network";
import { getDaysForMonth } from "../utils";
import { formatDate } from "../utils/formatter";
import { connect } from 'react-redux'
import { setAppointments } from "../redux/actions/appointmentActions"
import { colors } from '../styles'
import ScheduleSearchContainer from "../components/common/Search/ScheduleSearchContainer";
import ScheduleOverlayContainer from "../components/Schedule/ScheduleOverlayContainer";
import { useModal } from "react-native-modalfy";
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
import SchedulePageHeader from '../components/Schedule/SchedulePageHeader';
import SchedulePageContent from '../components/Schedule/SchedulePageContent';


const currentDate = new Date();

const Schedule = (props) => {
    const {
        // Redux Props
        appointments,
        setAppointments
    } = props;
    const modal = useModal();
    const screenDimensions = Dimensions.get('window')
    const theme = useTheme();


    const getSelectedIndex = (day, days = []) => days.indexOf(day);
    const initialDaysList = getDaysForMonth(currentDate);
    const initialIndex = getSelectedIndex(formatDate(currentDate, "YYYY-MM-DD").toString(), initialDaysList);

    //########### States
    // const [dimensions, setDimensions] = useState(Dimensions.get('window'));

    // calendar states
    const [selectedMonth, setSelectedMonth] = useState(currentDate);
    const [selectedDay, setSelectedDay] = useState(currentDate);
    const [daysList, setDaysList] = useState(initialDaysList);

    // appointment states
    const [selectedAppointment, setSelectedAppointment] = useState();
    const [sectionListIndex, setSectionListIndex] = useState(initialIndex);
    const [isFetchingAppointment, setFetchingAppointments] = useState(false);

    //filter state
    const [checkedRadioButton, setcheckedButton] = useState("");
    const [type, setType] = useState(0);

    // search states
    const [searchOpen, setSearchOpen] = useState(false);
    const [isExpanded, setisExpanded] = useState(false);

    const onExpandButtonPress = () => {
        console.log("expand clicked");
        setisExpanded(!isExpanded);
    };

    const radioClicked = (item) => {
        console.log("them item clicked", item);
        setcheckedButton(item);
        filterBy(item);


    }

    const filterBy = (category) => {
        if (category === "Procedure") {
            setType(1);
        } else if (category === "Delivery") {
            setType(2);
        }


    }

    const fetchAppointments = (query) => {
        setFetchingAppointments(true);
        console.log("Type currently has:", query)
        getAppointments("", "", "", "", query, "")
            .then(data => {
                console.log("appointments", data);
                setAppointments(data);
            })
            .catch(error => {
                console.log("failed to get appointments", error);
            })
            .finally(_ => {
                setFetchingAppointments(false);
            })
    }

    // animated states

    //########### Event Listeners
    // useEffect(() => {
    //     Dimensions.addEventListener("change", onChange);
    //     return () => {
    //         Dimensions.removeEventListener("change", onChange);
    //     };
    // });

    useEffect(() => {
        if (!appointments.length) {
            setFetchingAppointments(true);

            getAppointments()
                .then(data => {
                    console.log("appointments", data);
                    setAppointments(data);
                })
                .catch(error => {
                    console.log("failed to get appointments", error);
                })
                .finally(_ => {
                    setFetchingAppointments(false)
                })

        } else {
            fetchAppointments(type);
        }
    }, [type]);

    //########### Functions
    // const onChange = (dimensions) => {
    //     setDimensions(dimensions);
    // };

    /*
     * @param date string "YYYY-MM-DD" for the selected day.
     */
    const handleOnDaySelected = (date) => {
        setSelectedDay(date);
        const indexOfSelected = getSelectedIndex(date, daysList);
        setSectionListIndex(indexOfSelected);
    };

    const handleOnGoToToday = () => {
        const currentDate = new Date();
        let date = formatDate(currentDate, "YYYY-MM-DD").toString();
        let currentDaysList = getDaysForMonth(currentDate);

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
        modal.openModal('BottomSheetModal', {
            // content: <ScheduleOverlayContainer appointment={appointment}/>,
            content: <ScheduleOverlayContainer appointment={appointment} />,
            initialSnap: 2,
            snapPoints: [600, 500, 0]
        })
    };


    const searchPress = () => {
        setSearchOpen(true)
    };

    const closeSearch = () => {
        setSearchOpen(false)
    };

    // ###### STYLED COMPONENTS

    const ScheduleWrapper = styled.View({
        flex: 1,
        backgroundColor: theme.colors['--color-neutral-gray-100'],
    });

    const ScheduleContainer = styled.View`
        display: flex;
        flex:1;
        width: 100%;
        height: 100%;
        justify-content: flex-start;
    `

    const SchedulePageWrapper = styled.View`
        flex:1;
        margin:0px;
    `
    const SchedulePageContainer = styled.View`
        display: flex;
        width: 100%;
        height: 100%;
    `

    return (
        <View style={styles.container}>
            <Animated.View style={styles.scheduleContainer}>

                <ScheduleSearchContainer
                    isOpen={searchOpen}
                    onSearchResultSelected={(appointment) => {
                        closeSearch();
                        handleAppointmentPress(appointment)
                    }}
                    onSearchClose={closeSearch}
                />

                <View style={{ flex: 1 }}>

                    <SchedulePageHeader
                        Expanded={isExpanded}
                        checkedRadioButton={checkedRadioButton}
                        onradioClick={radioClicked}
                        searchButtonPress={searchPress}
                        gotoTodayButtonPress={handleOnGoToToday}
                        selectedMonth={selectedMonth}
                        onMonthUpdate={handleOnMonthUpdated}
                        onExpand={onExpandButtonPress}

                    />
                    <SchedulePageContent
                        Expanded={isExpanded}
                        isFetchingAppointment={isFetchingAppointment}
                        onDaySelected={handleOnDaySelected}
                        appointments={appointments}
                        month={selectedMonth}
                        days={daysList}
                        selectedDate={selectedDay}
                        screenDimensions={screenDimensions}
                        selectedIndex={sectionListIndex}
                        onAppointmentPress={handleAppointmentPress}
                        selectedDay={selectedDay}
                        month={selectedMonth}
                    />



                    {/* <View style={styles.scheduleTop}>
                        <View style={styles.buttonContainer}>
                            <Button
                                title="Search"
                                buttonPress={searchPress}
                                color="#4E5664"
                            />
                        </View>


                        <MonthSelector
                            selectedMonth={selectedMonth}
                            onMonthUpdated={handleOnMonthUpdated}
                        />

                        <View style={styles.buttonContainer}>
                            <Button
                                title={"Go to Today"}
                                buttonPress={handleOnGoToToday}
                                color="#4E5664"
                            />
                        </View>

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
                                screenDimensions={screenDimensions}
                            />
                        </View>
                        {
                            isFetchingAppointment
                                ? <View style={{flex: 1, width: '100%', justifyContent: 'center'}}>
                                    <ActivityIndicator style={{alignSelf: 'center'}} size="large" color={colors.primary}/>
                                </View>
                                : <View style={styles.scheduleContent}>
                                    <SchedulesList
                                        selectedIndex={sectionListIndex}
                                        onAppointmentPress={handleAppointmentPress}
                                        selectedDay={selectedDay}
                                        month={selectedMonth}
                                    />
                                </View>
                        } 
                    </View> */}
                </View>
            </Animated.View>
        </View>

    )
};

const mapStateToProps = (state) => ({
    appointments: state.appointments
});

const mapDispatcherToProp = {
    setAppointments
};

export default connect(mapStateToProps, mapDispatcherToProp)(Schedule)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
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
        justifyContent: 'space-between',
        alignItems: "center"
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
        paddingTop: 24,
    },
    searchContainer: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 5,
    },

    // Shadow
    shadowContainer: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#000',
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
    buttonContainer: {
        height: 24,
        width: 91,
        borderColor: '#CCD6E0',
        borderRadius: 4,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#FFFFFF"
    }
});
