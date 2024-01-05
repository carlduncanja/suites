import React, { useState, useEffect } from "react";
import { StyleSheet, Dimensions } from "react-native";
import Animated from "react-native-reanimated";
import moment from "moment";
import { connect } from "react-redux";
import { useModal } from "react-native-modalfy";
import styled from "@emotion/native";
import { useTheme } from "emotion-theming";
import {
    getAppointmentRequest,
    getAppointments,
    getUserCall,
} from "../../../api/network";
import { getDaysForMonth } from "../../../utils";
import { formatDate } from "../../../utils/formatter";
import { setAppointments } from "../../../redux/actions/appointmentActions";
import ScheduleSearchContainer from "../../../components/common/Search/ScheduleSearchContainer";
import ScheduleOverlayContainer from "./ScheduleOverlayContainer";
import SchedulePageHeader from "./SchedulePageHeader";
import SchedulePageContent from "./SchedulePageContent";
import { useNavigation } from "@react-navigation/native";
import { emptyFn } from "../../../const";
import NewProcedureOverlayContainer from "./NewProcedureOverlayContainer";

const ScheduleWrapper = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors["--default-neutral-gray"]};
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
    return moment().startOf("day").subtract(1, "months").toDate();
};

/**
 * Return initial end date used for appointments range.
 * @return {Date}
 */
const getInitialEndDateRage = () => {
    return moment().endOf("day").add(2, "months").toDate();
};

const SchedulePage = (props) => {
    const { appointments, setAppointments } = props;

    const id = props.route.params.id;

    const [userPermissions, setUserPermissions] = useState({});
    const newProcedure = userPermissions.procedures?.create;

    useEffect(() => {
        fetchUser(id);
    }, []);

    const navigation = useNavigation();

    const modal = useModal();
    const screenDimensions = Dimensions.get("window");
    const theme = useTheme();

    const currentDate = new Date();
    const getSelectedIndex = (day, days = []) => days.indexOf(day);
    const initialDaysList = getDaysForMonth(currentDate);
    const initialIndex = getSelectedIndex(
        formatDate(currentDate, "YYYY-MM-DD").toString(),
        initialDaysList
    );

    const [appointmentsStartDate, setAppointmentsStartDate] = useState(
        getInitialStartDate()
    );
    const [appointmentsEndDate, setAppointmentsEndDate] = useState(
        getInitialEndDateRage()
    );

    const [selectedMonth, setSelectedMonth] = useState(currentDate);
    const [selectedDay, setSelectedDay] = useState(currentDate);
    const [daysList, setDaysList] = useState(initialDaysList);

    const [scheduleRefreshing, setScheduleRefreshing] = useState(false);

    const [sectionListIndex, setSectionListIndex] = useState(initialIndex);
    const [isFetchingAppointment, setFetchingAppointments] = useState(false);
    const [filteredAppointments, setFilteredAppointments] = useState([]);

    const [checkedRadioButton, setCheckedButton] = useState("");
    const [showDropDown, setShowDropDown] = useState(false);

    const [printOption, setPrintOption] = useState();
    const [showPrintOptions, setShowPrintOptions] = useState(false);

    const [searchOpen, setSearchOpen] = useState(false);
    const [isExpanded, setisExpanded] = useState(false); 

    const [flag, setFlag] = useState(false);
    const [currentAppointment, setCurrentAppointment] = useState({});

    useEffect(() => {
        fetchAppointments();
    }, [appointmentsEndDate, appointmentsStartDate]);

    useEffect(() => {
        checkedRadioButton === "" ? fetchAppointments() : filter(appointments);
    }, [checkedRadioButton]);

    const onExpandButtonPress = () => {
        setisExpanded(!isExpanded);
    };

    const showFilterMenu = () => {
        setShowDropDown(!showDropDown);
    };

    const radioClicked = (item = "") => {
        item.valueOf() === checkedRadioButton.valueOf()
            ? setCheckedButton("")
            : setCheckedButton(item);
    }; 

    const fetchUser = (id) => {
        getUserCall(id)
            .then((data) => {
                setUserPermissions(data.role?.permissions || {});
            })
            .catch((error) => {
                console.error("fetch.user.failed", error);
            })
            .finally();
    };


    const fetchAppointments = () => {
        setFetchingAppointments(true);

        getAppointmentRequest({
            query: "",
            from: appointmentsStartDate,
            to: appointmentsEndDate,
        })
            .then((data) => {
                setAppointments(data);
            })
            .catch((error) => {
                console.log("failed to get appointments", error);
            })
            .finally((_) => {
                setFetchingAppointments(false);
            });
    };

    const filter = (appointmentArray = []) => {
        setFilteredAppointments([
            ...appointmentArray.filter(
                (item) => item.type.name === checkedRadioButton
            ),
        ]);
    };

    const handleOnDaySelected = (date) => {
        setSelectedDay(date);
        const indexOfSelected = getSelectedIndex(date, daysList);
        setSectionListIndex(indexOfSelected);
    };

    const handleOnGoToToday = () => { 
        
        const currentDate = new Date();
        const date = formatDate(currentDate, "YYYY-MM-DD").toString();
        const currentDaysList = getDaysForMonth(currentDate);

        setDaysList(getDaysForMonth(currentDate));
        setSelectedMonth(currentDate);

        setSelectedDay(date);
        setSectionListIndex(getSelectedIndex(date, currentDaysList));
    };

    const handleOnMonthUpdated = (date) => {
        setSelectedMonth(date);
        setDaysList(getDaysForMonth(date));

        const isAfterRange = moment(date).isAfter(appointmentsEndDate);
        if (isAfterRange) {
            const newEndDate = moment(appointmentsEndDate)
                .add(3, "months")
                .toDate();
            setAppointmentsEndDate(newEndDate);
        }

        if (isAfterRange) {
            const newStartDate = moment(appointmentsStartDate)
                .subtract(3, "months")
                .toDate();
            setAppointmentsStartDate(newStartDate);
        }
    };
    

    const handleAppointmentPress = (appointment) => {
        modal.openModal("BottomSheetModal", {
            content: (
                <ScheduleOverlayContainer
                    handleScheduleRefresh={fetchAppointments}
                    appointment={appointment}
                    closeOverlay={() => {
                        setFlag(true);
                        setCurrentAppointment(appointment);
                        modal.closeAllModals();
                    }}
                />
            ),
            initialSnap: 2,
            snapPoints: [600, 500, 0],
        });
    };

    useEffect(() => {
        if (flag) {
            modal.openModal("BottomSheetModal", {
                content: (
                    <NewProcedureOverlayContainer
                        appointment={currentAppointment}
                        editMode={true}
                    />
                ),
                initialSnap: 2,
                snapPoints: [600, 500, 0],
            });
            setFlag(false);
        }
    }, [flag, currentAppointment]);

    const handleNewProcedurePress = (Date) => {   
        
        modal.openModal("BottomSheetModal", {
            content: (
                <NewProcedureOverlayContainer
                    handleScheduleRefresh={handleScheduleRefresh}
                    passedDate={Date}
                />
            ),
            initialSnap: 2,
            snapPoints: [680, 500, 0],
        });
    };

    const searchPress = () => {
        setSearchOpen(true);
    };

    const closeSearch = () => {
        setSearchOpen(false);
    };

    const handlePrintOptions = (option) => {
        setPrintOption(option);
        setShowPrintOptions(false);

        navigation.navigate("PrintSchedulePage", { option });
    };

    const handleScheduleRefresh = (successCallback = emptyFn) => {
        setScheduleRefreshing(true);
        getAppointments()
            .then((data) => {
                setAppointments(data);
                successCallback();
            })
            .catch((error) => {
                console.log("Failed to get Appointments", error);
            })
            .finally(() => {
                setScheduleRefreshing(false);
            });
    };

    return (
        <ScheduleWrapper theme={theme}>
            <Animated.View style={styles.scheduleContainer}>
                {searchOpen && (
                    <ScheduleSearchContainer
                        isOpen={searchOpen}
                        onSearchResultSelected={(appointment) => {
                            closeSearch();
                            handleAppointmentPress(appointment);
                        }}
                        onSearchClose={closeSearch}
                    />
                )}

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
                        appointments={
                            checkedRadioButton === ""
                                ? appointments
                                : filteredAppointments
                        }
                        newProcedure={newProcedure}
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

const mapStateToProps = (state) => ({ appointments: state.appointments });

const mapDispatcherToProp = { setAppointments };

export default connect(mapStateToProps, mapDispatcherToProp)(SchedulePage);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FAFAFA",
    },

    scheduleContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
    },
    scheduleTop: {
        paddingLeft: 32,
        paddingRight: 32,
        marginTop: 32,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    scheduleCalendar: {
        flex: 1,
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
    },
    scheduleContent: {
        flex: 1,
        flexDirection: "column",
        alignSelf: "flex-start",
        width: "100%",
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
        backgroundColor: "#000",
    },

    topContainer: {
        marginLeft: "4%",
        marginRight: "4%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingBottom: 20,
        marginTop: 18,
    },
    partition: {
        backgroundColor: "#CBD5E0",
        borderRadius: 8,
        height: 6,
        width: 70,
        alignSelf: "center",
        marginTop: 15,
        marginBottom: 24,
    },
    drawer: {
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        paddingLeft: 49,
        paddingTop: 32,
        backgroundColor: "#FFFFFF",
        borderTopLeftRadius: 16,
        borderBottomLeftRadius: 16,
    },
    mask: { backgroundColor: "#E5E5E5" },
    buttonContainer: {
        height: 24,
        width: 91,
        borderColor: "#CCD6E0",
        borderRadius: 4,
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFFFFF",
    },
});
