import React, {useState, useContext, useEffect} from 'react';
import {View, StyleSheet, Dimensions, ActivityIndicator, Text} from 'react-native';
import Animated from 'react-native-reanimated';
import moment from 'moment';
import {connect} from 'react-redux';
import {useModal} from 'react-native-modalfy';
import styled, {css} from '@emotion/native';
import {useTheme} from 'emotion-theming';
import {isEmpty} from 'lodash';
import Button from '../components/common/Buttons/Button';
import ScheduleCalendar from '../components/Schedule/ScheduleCalendar';
import MonthSelector from '../components/Calendar/MonthSelector';
import SchedulesList from '../components/Schedule/SchedulesList';
import {ScheduleContext} from '../contexts/ScheduleContext';
import {getAppointments} from '../api/network';
import {getDaysForMonth} from '../utils';
import {formatDate} from '../utils/formatter';
import {setAppointments} from '../redux/actions/appointmentActions';
import {colors} from '../styles';
import ScheduleSearchContainer from '../components/common/Search/ScheduleSearchContainer';
import ScheduleOverlayContainer from '../components/Schedule/ScheduleOverlayContainer';
import SchedulePageHeader from '../components/Schedule/SchedulePageHeader';
import SchedulePageContent from '../components/Schedule/SchedulePageContent';

const ScheduleWrapper = styled.View`
    flex:1;
    background-color:${({theme}) => theme.colors['--default-neutral-gray']};
`;

const BodyContainer = styled.View`
    flex:1;
`;

const Schedule = props => {
    const {
        // Redux Props
        appointments,
        setAppointments
    } = props;
    const modal = useModal();
    const screenDimensions = Dimensions.get('window');
    const theme = useTheme();

    const currentDate = new Date();
    const getSelectedIndex = (day, days = []) => days.indexOf(day);
    const initialDaysList = getDaysForMonth(currentDate);
    const initialIndex = getSelectedIndex(formatDate(currentDate, 'YYYY-MM-DD').toString(), initialDaysList);

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
    const [filteredAppointments, setFilteredAppointments] = useState([]);

    //filter state
    const [checkedRadioButton, setcheckedButton] = useState('');
    const [showDropDown, setShowDropDown] = useState(false);

    // const [type, setType] = useState(0);

    // search states
    const [searchOpen, setSearchOpen] = useState(false);
    const [isExpanded, setisExpanded] = useState(false);

    const onExpandButtonPress = () => {
        setisExpanded(!isExpanded);
    };

    const showFilterMenu = () => {
        setShowDropDown(!showDropDown);
    };

    const radioClicked = (item = '') => {
        item.valueOf() === checkedRadioButton.valueOf() ? setcheckedButton('') :
            setcheckedButton(item);
    };

    // const filterBy = (category) => {
    //     if (category === "Procedure") {
    //         setType(1);
    //     } else if (category === "Delivery") {
    //         setType(2);
    //     } else if (category === "Inventory Re-stock") {
    //         setType(3);
    //     } else if (category === "Inventory Audit") {
    //         setType(4);
    //     } else if (category === "Equipment") {
    //         setType(5);
    //     }

    // }

    const fetchAppointments = () => {
        setFetchingAppointments(true);

        getAppointments()
            .then(data => {
                //console.log("appointments", data);

                setAppointments(data);
            })
            .catch(error => {
                console.log('failed to get appointments', error);
            })
            .finally(_ => {
                setFetchingAppointments(false);
            });
        // console.log("what is in filtered is", filterd);
    };

    const filter = (appointmentArray = []) => {
        setFilteredAppointments([...appointmentArray.filter(item => item.type.name === checkedRadioButton)]);
    };

    // animated states

    //########### Event Listeners
    // useEffect(() => {
    //     Dimensions.addEventListener("change", onChange);
    //     return () => {
    //         Dimensions.removeEventListener("change", onChange);
    //     };
    // });

    useEffect(() => {
        console.log('filtered appointments state has:', filteredAppointments);
        // console.log("Checked filter button: ", checkedRadioButton);
        checkedRadioButton === '' ? fetchAppointments() : filter(appointments);
    }, [checkedRadioButton]);

    // useEffect(() => {

    //     !showDropDown ? setcheckedButton("") : "";

    // }, [showDropDown])

    //########### Functions
    // const onChange = (dimensions) => {
    //     setDimensions(dimensions);
    // };

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
    };

    const handleAppointmentPress = appointment => {
        modal.openModal('BottomSheetModal', {
            // content: <ScheduleOverlayContainer appointment={appointment}/>,
            content: <ScheduleOverlayContainer appointment={appointment}/>,
            initialSnap: 2,
            snapPoints: [600, 500, 0]
        });
    };

    const searchPress = () => {
        setSearchOpen(true);
    };

    const closeSearch = () => {
        setSearchOpen(false);
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
                        selectedDay={selectedDay}
                    />
                </BodyContainer>
            </Animated.View>
        </ScheduleWrapper>

    );
};

const mapStateToProps = state => ({appointments: state.appointments});

const mapDispatcherToProp = {setAppointments};

export default connect(mapStateToProps, mapDispatcherToProp)(Schedule);

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
