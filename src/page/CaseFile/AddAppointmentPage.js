import React, { useContext, useEffect, useState } from 'react';
import styled, { css } from '@emotion/native';
import { useTheme } from "emotion-theming";
import { Text, View } from "react-native";
import TabsContainer from "../../components/common/Tabs/TabsContainerComponent"
import Divider from "../../components/common/Divider";
import PageButton from "../../components/common/Page/PageButton";
import ChevronLeft from "../../../assets/svg/ChevronLeft";
import ChevronRight from "../../../assets/svg/ChevronRight";
import moment from "moment";
import {
    addProcedureAppointmentCall,
    getAppointments,
    getProcedureById,
    getTheatres,
    isValidCaseProcedureAppointment
} from "../../api/network";
import ScheduleDisplayComponent, { EVENT_TYPES } from "../../components/ScheduleDisplay/ScheduleDisplayComponent";
import ProcedureTab from "../../components/CaseFiles/ProceduresDialogTabs/ProcedureTab";
import _ from "lodash";
import SearchableOptionsField from "../../components/common/Input Fields/SearchableOptionsField";
import DateInputField from "../../components/common/Input Fields/DateInputField";
import InputUnitField from "../../components/common/Input Fields/InputUnitFields";
import OptionsField from "../../components/common/Input Fields/OptionsField";
import { MenuOption, MenuOptions } from "react-native-popup-menu";
import Table from "../../components/common/Table/Table";
import Paginator from "../../components/common/Paginators/Paginator";
import Button from "../../components/common/Buttons/Button";
import Snackbar from "react-native-paper/src/components/Snackbar";
import { useModal } from "react-native-modalfy";
import ConfirmationComponent from "../../components/ConfirmationComponent";
import LoadingComponent from "../../components/LoadingComponent";


const HeaderText = styled.Text`
    font:${({ theme }) => theme.font["--text-xl-medium"]};
    color:${({ theme }) => theme.colors["--company"]};
`;

const CloseButtonWrapper = styled.View`
    //align-items:flex-end;
    //width:540px;
`;

const InputWrapper = styled.View`
    flex: 1;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    z-index: ${({ zIndex }) => zIndex};

`


const CloseButtonContainer = styled.TouchableOpacity`
    background-color:${({ theme }) => theme.colors["--color-gray-300"]};
    width:68px;
    height:26px;
    padding:4px 14px;
    border-radius:6px;
    justify-content:center;
`;

const CloseText = styled.Text`
    color:${({ theme }) => theme.colors["--color-gray-600"]};
    font:${({ theme }) => theme.font["--text-sm-bold"]};
`;


const AppointmentPageContentWrapper = styled.View`
    flex:1;
    margin : 0;

     padding-top: ${({ theme }) => theme.space['--space-12']};
    // padding-left: ${({ theme }) => theme.space['--space-24']};
    // padding-right: ${({ theme }) => theme.space['--space-24']};
`

const AppointmentPageContentContainer = styled.View`
    display: flex;
    flex:1;
`
const ContentContainer = styled.View`
    display: flex;
    flex:1;
    padding-top: ${({ theme }) => theme.space['--space-24']};
    padding-left: ${({ theme }) => theme.space['--space-24']};
    padding-right: ${({ theme }) => theme.space['--space-24']};
`


const FooterWrapper = styled.View`
  //height: 500px;
  border: 1px solid ${({ theme }) => theme.colors['--color-gray-300']};
  border-bottom-width: 0;
  border-left-width: 0;
  border-right-width: 0;
  padding-top: ${({ theme }) => theme.space['--space-24']}; 
  padding-bottom: ${({ theme }) => theme.space['--space-24']}; 
  margin-left: ${({ theme }) => theme.space['--space-24']}; 
  margin-top: 0;
  margin-right: ${({ theme }) => theme.space['--space-24']}; 
`

const FooterContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

const FooterButtonContainer = styled.View`
  width: 145px;
  height: 48px;
`

const TabsViewContainer = styled.View`
    height: 54px;
`;

const PageWrapper = styled.View`
  flex: 1;
  display: flex;  
  margin:0;
  background-color: ${({ theme }) => theme.colors['--default-shade-white']};
`
const PageContentWrapper = styled.View`
  flex: 1;
  //padding: ${({ theme }) => theme.space['--space-32']};
`

const HeaderWrapper = styled.View`
  display: flex;
  height: 47px;
  //width: 80%;
  justify-content: center;
  padding-left: ${({ theme }) => theme.space['--space-24']};
  padding-right: ${({ theme }) => theme.space['--space-24']};
  
`
const HeaderContainer = styled.View`
  //flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const PAGE_TABS = {
    APPOINTMENT: "Appointment",
    RECOVERY: "Recovery",
    CONSUMABLES: "Consumables",
    EQUIPMENT: "Equipment",
}

function AppointmentPage({ navigation, route }) {

    const currentTabs = [PAGE_TABS.APPOINTMENT, PAGE_TABS.RECOVERY, PAGE_TABS.CONSUMABLES, PAGE_TABS.EQUIPMENT];
    const { caseId, onAppointmentCreated } = route.params;
    const modal = useModal();
    const theme = useTheme();

    const [currentTabIndex, setTabIndex] = useState(0);
    const [isLoading, setLoading] = useState(false)

    const [selectedProcedure, setSelectedProcedure] = useState();
    const [caseProceduresInfo, setCaseProceduresInfo] = useState({});
    const [procedureErrors, setProcedureErrors] = useState({});

    const [hasRecovery, setRecovery] = useState(true);
    const [recoveryInfo, setRecoveryInfo] = useState({})
    const [recoveryInfoError, setRecoveryInfoErrors] = useState({})


    const [snackbar, setSnackbar] = useState({ visible: false, message: "" })


    //#region Event Handler
    const onTabPress = () => {
    };

    let valid;
    const onNextButtonPress = async () => {

        // Validate Fields
        switch (currentTabs[currentTabIndex]) {
            case PAGE_TABS.APPOINTMENT:
                valid = await validateProcedureInfo(caseProceduresInfo)
                break
            case PAGE_TABS.RECOVERY:
                valid = validateRecoveryInfo(recoveryInfo)
                break
            default:
                valid = true;
                break

        }

        if (!valid) {
            return
        }

        //
        const isFinalTab = currentTabIndex === currentTabs.length - 1
        if (isFinalTab) {
            console.log("Final Tab")
            onFinalTab()
        } else {
            const nextTabIndex = currentTabIndex + 1
            setTabIndex(nextTabIndex);

            if (currentTabs[nextTabIndex] === PAGE_TABS.RECOVERY) {
                getProcedureData(caseProceduresInfo?.procedure?._id)
            }
        }
    }

    const onFinalTab = () => {
        const createAppointmentObj = {}

        createAppointmentObj.location = caseProceduresInfo.location?._id;
        createAppointmentObj.procedure = caseProceduresInfo.procedure?._id;
        createAppointmentObj.duration = caseProceduresInfo.duration;
        createAppointmentObj.startTime = caseProceduresInfo.startTime;

        if (hasRecovery) {
            const recoveryObj = {}

            const startTimeMoment = new moment(recoveryInfo.startTime)
            const dateMoment = new moment(recoveryInfo.date);

            recoveryObj.startTime = new moment(dateMoment.toDate())
                .hours(startTimeMoment.hours())
                .minutes(startTimeMoment.minutes()).toDate();

            recoveryObj.duration = recoveryInfo.duration
            recoveryObj.location = recoveryInfo.location._id

            createAppointmentObj.recovery = recoveryObj;
        }

        console.log("create appointment: ", createAppointmentObj);
        addProcedureAppointment(createAppointmentObj);
    }

    const onPreviousButtonPress = () => {
        const isFirstTab = currentTabIndex === 0;
        if (isFirstTab) return;

        const prvTabIndex = currentTabIndex - 1
        setTabIndex(prvTabIndex)
    }

    const closeTapped = () => {
        navigation.goBack()
    }

    const onProcedureUpdate = (value) => {
        setCaseProceduresInfo(value)
    }

    const onRecoveryUpdate = (value) => {
        setRecoveryInfo(value);
    }

    const clearSnackBar = () => {
        setSnackbar({
            visible: false,
            message: ""
        })
    }

    //#endregion

    //#region Helper Methods
    const getTabContent = (selectedTab) => {
        switch (selectedTab) {
            case PAGE_TABS.APPOINTMENT:
                return <AppointmentTab
                    onProcedureUpdate={onProcedureUpdate}
                    procedure={caseProceduresInfo}
                    errors={procedureErrors}
                    onErrorUpdate={(value) => setProcedureErrors(value)}
                />
            case PAGE_TABS.RECOVERY:
                return <RecoveryTab
                    recoveryFields={recoveryInfo}
                    onRecoveryToggle={value => setRecovery(value)}
                    onRecoveryFieldUpdate={onRecoveryUpdate}
                    errors={recoveryInfoError}
                    hasRecovery={hasRecovery}
                />
            case PAGE_TABS.CONSUMABLES:
                return <ItemsTable
                    title={"Consumable"}
                    data={getInventoryDataFromSelectedProcedure()}
                />
            case PAGE_TABS.EQUIPMENT:
                return <ItemsTable
                    title={"Equipments"}
                    data={getEquipmentDataFromSelectedProcedure()}
                />
            default:
                return <View />
        }
    };

    const getEquipmentDataFromSelectedProcedure = () => {
        const equipments = selectedProcedure?.equipments || []

        return equipments.map(item => ({
            name: item.equipment?.name,
            amount: item.amount
        }))
    }

    const getInventoryDataFromSelectedProcedure = () => {
        const inventories = selectedProcedure?.inventories || []

        return inventories.map(item => ({
            name: item.inventory?.name,
            amount: item.amount
        }))
    }

    const validateRecoveryInfo = (recoveryFields) => {
        if (!hasRecovery) return true;

        let isValid = true;
        const requiredParams = ["time", "date", "location", "duration"];
        const errorObj = {}

        for (const requiredParam of requiredParams) {
            if (!recoveryFields[requiredParam]) {
                console.log(`${requiredParam} is required`);
                isValid = false;
                errorObj[requiredParam] = "Please enter a value";
            } else {
                delete errorObj[requiredParam];
            }
        }

        setRecoveryInfoErrors(errorObj);
        console.log("errors: ", errorObj, recoveryFields);

        return isValid
    }

    const validateProcedureInfo = async (procedureInfo) => {
        let isValid = true;
        const requiredParams = ["date", "startTime", "location", "procedure", "duration"];

        let errorObj = { ...procedureErrors } || {};

        for (const requiredParam of requiredParams) {
            if (!procedureInfo[requiredParam]) {
                console.log(`${requiredParam} is required`);
                isValid = false;
                errorObj[requiredParam] = "Please enter a value";
            } else {
                delete errorObj[requiredParam];
            }
        }

        setProcedureErrors(errorObj);
        // console.log("procedure errors", procedureErrors);
        if (!isValid) return isValid

        // TODO validate time.
        const { procedure, location, startTime, duration } = procedureInfo;
        isValid = await validateProcedureAsync(procedure._id, location._id, startTime, duration);

        // TODO validate theatre location.
        // TODO validate recovery.
        // TODO validate equipment and inventory.

        return isValid;
    };

    const validateProcedureAsync = (procedure, location, startTime, duration) => {
        setLoading(true)
        return isValidCaseProcedureAppointment(procedure, location, startTime, duration)
            .then(results => {
                const { errors = [], isValid } = results;

                // loop through and show all errors.
                let messages = errors.map(item => item.message)

                if (messages.length) {
                    let message = messages.join('\n')
                    setSnackbar({ visible: true, message })
                }

                return isValid;
            })
            .catch(error => {
                console.log("Failed to validate procedure", error);
                setSnackbar({ visible: true, message: "Something went wrong" })
                return false
            })
            .finally(_ => setLoading(false))
    }

    const getProcedureData = (procedureId) => {

        // check to see if we already have data for procedure
        if (selectedProcedure?._id === procedureId) return;

        console.log("Fetching procedure data");
        getProcedureById(procedureId)
            .then(Procedure => {
                setSelectedProcedure(Procedure);
            })
            .catch(error => {
                console.error("Failed to fetch procedure info", error);
                setSnackbar({ visible: true, message: "Failed to fetch consumable & equipments data." })
            })
    }

    const addProcedureAppointment = (procedureAppointment) => {
        setLoading(true);
        addProcedureAppointmentCall(caseId, procedureAppointment)
            .then(data => {
                modal.openModal('ConfirmationModal', {
                    content: (
                        <ConfirmationComponent
                            error={false}//boolean to show whether an error icon or success icon
                            isEditUpdate={false}
                            onCancel={() => {
                                modal.closeAllModals();
                            }}
                            onAction={() => {
                                modal.closeAllModals();
                                navigation.goBack()
                                if (onAppointmentCreated) {
                                    onAppointmentCreated(data)
                                }
                            }}
                            message="New Appointment was successfully created"
                            action="Yes"
                        />
                    ),
                    onClose: () => {
                        console.log('Modal closed');
                    },
                });
            })
            .catch(error => {
                console.log("Failed to create new appointment for procedure.")

            })
            .finally(_ => {
                setLoading(false)
            })
    }

    //endregion

    return (
        <PageWrapper theme={theme}>

            <HeaderWrapper theme={theme}>
                <HeaderContainer theme={theme}>
                    <HeaderText theme={theme}>Add Appointment</HeaderText>
                    <CloseButtonWrapper>
                        <CloseButtonContainer onPress={closeTapped}>
                            <CloseText>Close</CloseText>
                        </CloseButtonContainer>
                    </CloseButtonWrapper>
                </HeaderContainer>
            </HeaderWrapper>

            <PageContentWrapper theme={theme}>
                <TabsViewContainer>
                    <TabsContainer
                        tabs={currentTabs}
                        selectedTab={currentTabs[currentTabIndex]}
                        onPressChange={onTabPress}
                    />
                </TabsViewContainer>

                <AppointmentPageContentWrapper>
                    <AppointmentPageContentContainer>
                        {getTabContent(currentTabs[currentTabIndex])}
                    </AppointmentPageContentContainer>
                </AppointmentPageContentWrapper>

            </PageContentWrapper>

            <FooterWrapper>
                <FooterContainer>
                    <FooterButtonContainer>
                        <PageButton
                            backgroundColor={theme.colors['--color-gray-200']}
                            fontColor={theme.colors['--color-gray-600']}
                            text={"PREVIOUS"}
                            onPress={onPreviousButtonPress}
                            IconLeft={<ChevronLeft strokeColor={theme.colors['--color-gray-600']} />}
                        />
                    </FooterButtonContainer>


                    <FooterButtonContainer>
                        <PageButton
                            backgroundColor={theme.colors['--color-blue-500']}
                            fontColor={theme.colors['--default-shade-white']}
                            text={"NEXT"}
                            onPress={onNextButtonPress}
                            IconRight={<ChevronRight strokeColor={theme.colors['--default-shade-white']} />}
                        />
                    </FooterButtonContainer>
                </FooterContainer>
            </FooterWrapper>

            <Snackbar
                visible={snackbar?.visible}
                onDismiss={clearSnackBar}
                duration={Snackbar.DURATION_MEDIUM}
                theme={{
                    colors: {
                        accent: theme.colors['--color-red-700'],
                        surface: theme.colors['--color-red-700'],
                    }
                }}
                style={{
                    backgroundColor: theme.colors['--color-red-200'],
                    color: theme.colors['--color-red-700']
                }}
                action={{
                    label: "X",
                    onPress: clearSnackBar,
                }}>
                {snackbar?.message || "Something went wrong"}
            </Snackbar>

            {
                isLoading &&
                <LoadingComponent />
            }

        </PageWrapper>
    );
}

AppointmentPage.propTypes = {};
AppointmentPage.defaultProps = {};

export default AppointmentPage;


const AppointmentTab = ({ onProcedureUpdate, onProcedureSelected, procedure, patient = "--", errors, onErrorUpdate }) => {

    // TODO clean up logic for scheduling assistant.

    const [isLoading, setLoading] = useState(true);
    const [appointments, setAppointments] = useState([])
    const [currentProcedure, setCurrentProcedure] = useState(procedure);


    useEffect(() => {
        updateValuesForScheduleAssistant().then(r => {
        })
    }, [currentProcedure])

    const onProcedureFieldChange = (value) => {
        onProcedureUpdate(value)
        setCurrentProcedure(value);
    }

    const handleOnErrorUpdate = (value) => {
        onErrorUpdate(value)
    }

    const fetchAppointmentForDate = async (location, date) => {
        const start = moment(date).startOf("day").toDate();
        const end = moment(date).endOf('day').toDate();

        setLoading(true);
        try {
            const data = await getAppointments("", location, start, end, 1)
            return data.map(item => {
                const { patient } = item;
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
                const { startTime: newStart, endTime: newEnd } = tempAppointment;

                for (const appointment of appointments) {
                    const start = moment(appointment?.startTime);
                    const end = moment(appointment?.endTime);

                    const hasConflict = moment(start).isBetween(startTime, newEnd) || moment(end).isBetween(startTime, newEnd);

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

    const date = currentProcedure?.date || new Date()

    return (
        <View style={{ flex: 1 }}>
            <ProcedureTab
                onProcedureInfoChange={onProcedureFieldChange}
                onProcedureSelected={onProcedureSelected}
                procedureInfo={currentProcedure}
                errors={errors}
                onErrorUpdate={handleOnErrorUpdate}
            />

            <View style={{ backgroundColor: '#C4C4C4', width: '100%', height: 1 }} />

            {/* SCHEDULING ASSISTANT */}

            <View style={{ flex: 1, paddingRight: 30 }}>
                <ScheduleDisplayComponent appointments={appointments} date={date} />
            </View>

        </View>
    )
}


const RowWrapper = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: ${({ theme }) => theme.space['--space-16']};
    z-index: ${({ zIndex }) => zIndex};
`
const RecoveryFieldsContainer = styled.View`
  flex: 1;
  padding-top: ${({ theme }) => theme.space['--space-32']};
  margin-top: ${({ theme }) => theme.space['--space-24']};
  border: 1px solid ${({ theme }) => theme.colors['--color-gray-300']};
  border-bottom-width: 0;
  border-left-width: 0;
  border-right-width: 0;
`

/**
 *
 * @param isEdit
 * @param appointmentField
 * @return {*}
 * @constructor
 */
const RecoveryTab = ({ isEdit, recoveryFields, errors, onRecoveryFieldUpdate, hasRecovery, onRecoveryToggle }) => {
    const theme = useTheme();
    const { duration, location, time, date } = recoveryFields;
    const { name = "" } = location || {}

    const onDurationUpdated = (duration) => {
        // validate num
        if (isNaN(+duration)) return;

        onRecoveryFieldUpdate({
            ...recoveryFields,
            duration,
        })
    }

    const onStartTimeUpdated = (date) => {
        const newStartTime = moment(date)
        onRecoveryFieldUpdate({
            ...recoveryFields,
            time: newStartTime.toDate(),
        })
    }

    const onDateUpdated = (date) => {
        const newStartTime = moment(date)
        onRecoveryFieldUpdate({
            ...recoveryFields,
            date: newStartTime.toDate(),
        })
    }

    const onDateClear = () => {
        onRecoveryFieldUpdate({
            ...recoveryFields,
            date: undefined
        })
    }

    const onTimeClear = () => {
        onRecoveryFieldUpdate({
            ...recoveryFields,
            time: undefined
        })
    }

    const onLocationFieldUpdated = (location) => {
        onRecoveryFieldUpdate({
            ...recoveryFields,
            location
        })
    }

    const [searchLocationValue, setSearchLocationValue] = useState("");
    const [searchLocationResult, setSearchLocationResult] = useState([]);
    const [searchLocationQuery, setSearchLocationQuery] = useState({});

    useEffect(() => {

        console.log('search location change', searchLocationValue)

        if (!searchLocationValue) {
            // empty search values and cancel any out going request.
            setSearchLocationResult([]);
            if (searchLocationQuery.cancel) searchLocationQuery.cancel();
            return;
        }

        // wait 300ms before search. cancel any prev request before executing current.

        const search = _.debounce(fetchLocations, 300);

        setSearchLocationQuery((prevSearch) => {
            if (prevSearch && prevSearch.cancel) {
                prevSearch.cancel();
            }
            return search;
        });

        search();
    }, [searchLocationValue]);

    const fetchLocations = () => {
        getTheatres(searchLocationValue, 5, 1, 1)
            .then((locationsInfo) => {
                const { data = [], pages } = locationsInfo;
                setSearchLocationResult(data || []);
            })
            .catch((error) => {
                // TODO handle error
                console.log("failed to get procedures");
                setSearchLocationResult([]);
            });
    };

    const handleLocationChange = (value) => {
        const location = value
            ? {
                _id: value._id,
                name: value.name,
            }
            : value;

        setSearchLocationValue("");

        setSearchLocationResult([]);
        setSearchLocationQuery({});

        onLocationFieldUpdated(location);
    };

    return (
        <ContentContainer theme={theme}>
            <RowWrapper theme={theme} zIndex={3}>

                <InputWrapper theme={theme}>
                    <OptionsField
                        label={"Recovery"}
                        labelWidth={70}
                        enabled={isEdit}
                        text={hasRecovery ? 'Yes' : 'No'}
                        oneOptionsSelected={onRecoveryToggle}
                        menuOption={<MenuOptions>
                            <MenuOption value={true} text='Yes' />
                            <MenuOption value={false} text='No' />
                        </MenuOptions>}
                    />
                </InputWrapper>

                <View style={{ width: 20 }} />
                <InputWrapper theme={theme} />

            </RowWrapper>

            {
                hasRecovery &&
                <RecoveryFieldsContainer theme={theme}>

                    <RowWrapper theme={theme} zIndex={3}>

                        <InputWrapper theme={theme}>
                            <SearchableOptionsField
                                title="Location"
                                selectable={true}
                                labelWidth={70}
                                enabled={true}
                                label="Location"
                                value={location}
                                text={searchLocationValue}
                                oneOptionsSelected={handleLocationChange}
                                onChangeText={(value) => {
                                    setSearchLocationValue(value)
                                }}
                                onClear={handleLocationChange}
                                options={searchLocationResult}
                                hasError={errors["location"]}
                                errorMessage={errors["location"]}
                            />
                        </InputWrapper>

                        <View style={{ width: 24 }} />

                        <InputWrapper theme={theme} style={{ flex: 1 }}>
                            <DateInputField
                                label="Date"
                                labelWidth={70}
                                value={date}
                                format={"MMM/DD/YYYY"}
                                mode={"date"}
                                onDateChange={onDateUpdated}
                                onClear={onDateClear}
                                placeholder="MMM/D/YYYY"
                                hasError={errors["date"]}
                                errorMessage={errors["date"]}
                            />
                        </InputWrapper>


                    </RowWrapper>

                    <RowWrapper theme={theme} zIndex={2}>

                        <InputWrapper theme={theme} style={{ flex: 1 }}>
                            <DateInputField
                                label="Time"
                                labelWidth={70}
                                value={time}
                                format={"h:mm A"}
                                mode={"time"}
                                onDateChange={onStartTimeUpdated}
                                onClear={onTimeClear}
                                placeholder="HH:MM"
                                hasError={errors["time"]}
                                errorMessage={errors["time"]}
                            />

                            {/*    EDIT TIME    */}

                        </InputWrapper>


                        <View style={{ width: 24 }} />

                        <InputWrapper theme={theme} style={{ flex: 1 }}>
                            <InputUnitField
                                label={"Duration"}
                                labelWidth={70}
                                onChangeText={onDurationUpdated}
                                value={duration}
                                units={['hrs']}
                                keyboardType="number-pad"
                                hasError={errors["duration"]}
                                errorMessage="Input estimated time (hours)."
                            />
                        </InputWrapper>

                    </RowWrapper>

                </RecoveryFieldsContainer>
            }

        </ContentContainer>
    )
}

const PaginatorContainer = styled.View`
    border: 1px solid #CCD6E0;
    height: 50px;
    width: 150px;
    border-radius: 4px;
    margin-bottom: 20px;
`

const ItemsTable = ({ title, data }) => {
    const theme = useTheme();
    const [currentPage, setCurrentPage] = useState(1);
    const ITEM_PER_PAGE = 10;

    const headers = [
        {
            name: title,
            alignment: "flex-start"
        },
        {
            name: "Amount",
            alignment: "flex-end"
        }
    ]


    const onGoToNext = () => {
        const lastPage = Math.ceil(data.length / ITEM_PER_PAGE)
        const nextPage = currentPage + 1;

        if (nextPage > lastPage) return

        setCurrentPage(nextPage);
    }

    const onGoToPrevious = () => {
        const prvPage = currentPage - 1;

        if (!prvPage) return
        setCurrentPage(prvPage);
    }

    const listItemFormat = (item) => {
        return (
            <View style={{ marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{}}>
                    <Text style={{ color: "#3182CE" }}>{item.name}</Text>
                </View>
                <View style={{ width: 70, alignItems: 'center' }}>
                    <Text style={{ color: "#4A5568" }}>{item.amount}</Text>
                </View>
            </View>
        )
    }

    const totalPages = Math.ceil(data.length / ITEM_PER_PAGE);
    const start = (currentPage - 1) * ITEM_PER_PAGE;
    const end = start + ITEM_PER_PAGE;

    const dataToShow = data.slice(start, end)


    return <ContentContainer theme={theme}>

        <View style={{ flex: 1 }}>
            <Table
                data={dataToShow}
                listItemFormat={listItemFormat}
                headers={headers}
                isCheckbox={false}
            />
        </View>

        {
            <View style={{ alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                <PaginatorContainer theme={theme}>
                    <Paginator
                        currentPage={currentPage}
                        totalPages={totalPages}
                        goToNextPage={onGoToNext}
                        goToPreviousPage={onGoToPrevious}
                    />
                </PaginatorContainer>
            </View>
        }
    </ContentContainer>
}
