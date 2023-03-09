// SchedulePage.js
import React, {useState, useEffect} from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import Animated from 'react-native-reanimated';
import moment from 'moment';
import {connect} from 'react-redux';
import {useModal} from 'react-native-modalfy';
import styled from '@emotion/native';
import {useTheme} from 'emotion-theming';
import {getAppointmentRequest, getAppointments} from '../../../api/network';
import {getDaysForMonth} from '../../../utils';
import {formatDate} from '../../../utils/formatter';
import {setAppointments} from '../../../redux/actions/appointmentActions';
import ScheduleSearchContainer from '../../../components/common/Search/ScheduleSearchContainer';
import ScheduleOverlayContainer from './ScheduleOverlayContainer';
import SchedulePageHeader from './SchedulePageHeader';
import SchedulePageContent from './SchedulePageContent';
import PrintSchedule from './PrintSchedule';
import {useNavigation} from "@react-navigation/native";
import {emptyFn} from "../../../const";
import { View } from 'react-native-animatable';
import {Text} from 'react-native';
import NewProcedureOverlayContainer from './NewProcedureOverlayContainer';

const ScheduleWrapper = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors['--default-neutral-gray']};
`;

const BodyContainer = styled.View`
  flex: 1;
`;

/**
 * Return initial date used for appointment range.
 * initial start date is 2 months before now.
 * @return {Date}
 */
const getInitialStartDate = () => {
    return moment().startOf('day').subtract(1, 'months').toDate()
}

/**
 * Return initial end date used for appointments range.
 * @return {Date}
 */
const getInitialEndDateRage = () => {
    return moment().endOf('day').add(2, 'months').toDate()
}


const SchedulePage = props => {
    const {
        // Redux Props
        appointments,
        setAppointments
    } = props;

    const navigation = useNavigation();

    const modal = useModal();
    const screenDimensions = Dimensions.get('window');
    const theme = useTheme();

    const currentDate = new Date();
    const getSelectedIndex = (day, days = []) => days.indexOf(day);
    const initialDaysList = getDaysForMonth(currentDate);
    const initialIndex = getSelectedIndex(formatDate(currentDate, 'YYYY-MM-DD').toString(), initialDaysList);


    //########### States

    const [appointmentsStartDate, setAppointmentsStartDate] = useState(getInitialStartDate())
    const [appointmentsEndDate, setAppointmentsEndDate] = useState(getInitialEndDateRage())

    // calendar states
    const [selectedMonth, setSelectedMonth] = useState(currentDate);
    const [selectedDay, setSelectedDay] = useState(currentDate);
    const [daysList, setDaysList] = useState(initialDaysList);

    // schedule states
    const [scheduleRefreshing, setScheduleRefreshing] = useState(false);

    // appointment states
    const [sectionListIndex, setSectionListIndex] = useState(initialIndex);
    const [isFetchingAppointment, setFetchingAppointments] = useState(false);
    const [filteredAppointments, setFilteredAppointments] = useState([]);

    //filter state
    const [checkedRadioButton, setCheckedButton] = useState('');
    const [showDropDown, setShowDropDown] = useState(false);

    // Print state
    const [printOption, setPrintOption] = useState();
    const [showPrintOptions, setShowPrintOptions] = useState(false);

    // const [type, setType] = useState(0);

    // search states
    const [searchOpen, setSearchOpen] = useState(false);
    const [isExpanded, setisExpanded] = useState(false);

    //########### Event Listeners
    useEffect(() => {
        /**
         *  listen to changes in appointment range and fetches appointment with new range.
         *
         *  TODO consider appending appointments to existing list rather than re-fetching appointments
         */
        fetchAppointments();
    }, [appointmentsEndDate, appointmentsStartDate])


    useEffect(() => {
        console.log('filtered appointments state has:', filteredAppointments);
        // console.log("Checked filter button: ", checkedRadioButton);
        checkedRadioButton === '' ? fetchAppointments() : filter(appointments);
    }, [checkedRadioButton]);


    const onExpandButtonPress = () => {
        setisExpanded(!isExpanded);
    };

    const showFilterMenu = () => {
        setShowDropDown(!showDropDown);
    };

    const radioClicked = (item = '') => {
        item.valueOf() === checkedRadioButton.valueOf() ? setCheckedButton('') :
            setCheckedButton(item);
    };

    const fetchAppointments = () => {
        setFetchingAppointments(true);

        getAppointmentRequest({query: '', from: appointmentsStartDate, to: appointmentsEndDate})
            .then(data => {
                setAppointments(data);
            })
            .catch(error => {
                console.log('failed to get appointments', error);
            })
            .finally(_ => {
                setFetchingAppointments(false);
            });
    };

    const filter = (appointmentArray = []) => {
        setFilteredAppointments([...appointmentArray.filter(item => item.type.name === checkedRadioButton)]);
    };

    /*
     * @param date string "YYYY-MM-DD" for the selected day.
     */
    const handleOnDaySelected = date => {
        
        setSelectedDay(date);
        const indexOfSelected = getSelectedIndex(date, daysList);
        setSectionListIndex(indexOfSelected);
       
    };

    const handleOnGoToToday = () => {
        const currentDate = new Date();
        const date = formatDate(currentDate, 'YYYY-MM-DD').toString();
        const currentDaysList = getDaysForMonth(currentDate);

        setDaysList(getDaysForMonth(currentDate));
        setSelectedMonth(currentDate);

        setSelectedDay(date);
        setSectionListIndex(getSelectedIndex(date, currentDaysList));
    };

    const handleOnMonthUpdated = date => {
        setSelectedMonth(date);
        setDaysList(getDaysForMonth(date));

        // check if month is after end date range then fetch appointments
        const isAfterRange = moment(date).isAfter(appointmentsEndDate)
        if (isAfterRange) {
            // increase range
            const newEndDate = moment(appointmentsEndDate).add(3, 'months').toDate();
            setAppointmentsEndDate(newEndDate);
        }

        // check if month is before start date range then fetch appointments
        const isBeforeRange = moment(date).isBefore(appointmentsStartDate);
        if (isAfterRange) {
            // increase range
            const newStartDate = moment(appointmentsStartDate).subtract(3, 'months').toDate();
            setAppointmentsStartDate(newStartDate);
        }
    };
    const [flag, setFlag] = useState(false);
    const [currentAppointment, setCurrentAppointment] = useState({});
    
    const handleAppointmentPress = appointment => {
        modal.openModal('BottomSheetModal', {
            // content: <ScheduleOverlayContainer appointment={appointment}/>,
            content: <ScheduleOverlayContainer appointment={appointment} closeOverlay={() => {
                setFlag(true);
                setCurrentAppointment(appointment)
                modal.closeAllModals();
            }}/>,
            initialSnap: 2,
            snapPoints: [600, 500, 0]
        });        
    };
    
    useEffect(() => {
        if(flag) {
            modal.openModal('BottomSheetModal', {
                content: <NewProcedureOverlayContainer  appointment={currentAppointment} editMode={true} />,
                initialSnap: 2,
                snapPoints: [600, 500, 0]
            });
            setFlag(false);
        }
    }, [flag, currentAppointment])

    const handleNewProcedurePress= procedure => {
        modal.openModal('BottomSheetModal', {
            content: <NewProcedureOverlayContainer handleScheduleRefresh={handleScheduleRefresh} passedDate={selectedDay}/>,
            initialSnap: 2,
            snapPoints: [680, 500, 0]
        });
    };

    // handles the search bar at the to left
    // toggles visible or hidden
    const searchPress = () => {
        setSearchOpen(true);
    };

    // same ^
    const closeSearch = () => {
        setSearchOpen(false);
    };

    // once a print option is selected
    // navigates to the printschedule page
    const handlePrintOptions = option => {
        setPrintOption(option);
        setShowPrintOptions(false);

        navigation.navigate('PrintSchedulePage', {option})
    };

    // updates schedule
    const handleScheduleRefresh = (successCallback = emptyFn) => {
        // fetch the schedule
        console.log('muda')
        setScheduleRefreshing(true);
        getAppointments()
            .then(data => {
                setAppointments(data);
                successCallback()
            })
            .catch(error => {
                // TODO display toast or error to telling the user that something went wrong trying to fetch the data.
                console.log("Failed to get Appointments", error);
            })
            .finally(() => {
                setScheduleRefreshing(false)
            })
    };

    // ###### STYLED COMPONENTS

    return (
        <ScheduleWrapper theme={theme}>
            <Animated.View style={styles.scheduleContainer}>

                {
                    searchOpen &&
                    <ScheduleSearchContainer
                        isOpen={searchOpen}
                        onSearchResultSelected={appointment => {
                            closeSearch();
                            handleAppointmentPress(appointment);
                        }}
                        onSearchClose={closeSearch}
                    />
                }

                <BodyContainer>

                    <SchedulePageHeader
                        Expanded={isExpanded}
                        showDropDown={showDropDown}
                        showFilterMenu={showFilterMenu}
                        checkedRadioButton={checkedRadioButton}
                        onradioClick={radioClicked}
                        searchButtonPress={searchPress}
                        gotoTodayButtonPress={handleOnGoToToday}
                        selectedMonth={selectedMonth}
                        onMonthUpdate={handleOnMonthUpdated}
                        onExpand={onExpandButtonPress}
                        printOption={printOption}
                        showPrintOptions={showPrintOptions}
                        handlePrintOptions={(res) => handlePrintOptions(res)}
                        openPrintOptions={setShowPrintOptions}
                    />

                    <SchedulePageContent
                        Expanded={isExpanded}
                        isFetchingAppointment={isFetchingAppointment}
                        onDaySelected={handleOnDaySelected}
                        appointments={checkedRadioButton === '' ? appointments : filteredAppointments}
                        month={selectedMonth}
                        days={daysList}
                        selectedDate={selectedDay}
                        screenDimensions={screenDimensions}
                        selectedIndex={sectionListIndex}
                        onAppointmentPress={handleAppointmentPress}
                        onNewProcedurePress={handleNewProcedurePress}
                        selectedDay={selectedDay}
                        onScheduleRefresh={handleScheduleRefresh}
                        isRefreshing={scheduleRefreshing}
                    />
                </BodyContainer>
            </Animated.View>
        </ScheduleWrapper>
    );
};

const mapStateToProps = state => ({appointments: state.appointments});

const mapDispatcherToProp = {setAppointments};

export default connect(mapStateToProps, mapDispatcherToProp)(SchedulePage);

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
        alignItems: 'center'
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
    mask: {backgroundColor: '#E5E5E5'},
    buttonContainer: {
        height: 24,
        width: 91,
        borderColor: '#CCD6E0',
        borderRadius: 4,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF'
    }
});
