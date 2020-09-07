import React, {useContext, useEffect, useState} from 'react';
import styled, {css} from '@emotion/native';
import {useTheme} from "emotion-theming";
import {Text, View} from "react-native";
import TabsContainer from "../../components/common/Tabs/TabsContainerComponent"
import Divider from "../../components/common/Divider";
import PageButton from "../../components/common/Page/PageButton";
import ChevronLeft from "../../../assets/svg/ChevronLeft";
import ChevronRight from "../../../assets/svg/ChevronRight";
import moment from "moment";
import {getAppointments, getTheatres} from "../../api/network";
import ScheduleDisplayComponent, {EVENT_TYPES} from "../../components/ScheduleDisplay/ScheduleDisplayComponent";
import ProcedureTab from "../../components/CaseFiles/ProceduresDialogTabs/ProcedureTab";
import _ from "lodash";
import SearchableOptionsField from "../../components/common/Input Fields/SearchableOptionsField";
import DateInputField from "../../components/common/Input Fields/DateInputField";
import InputUnitField from "../../components/common/Input Fields/InputUnitFields";
import OptionsField from "../../components/common/Input Fields/OptionsField";
import {MenuOption, MenuOptions} from "react-native-popup-menu";
import Table from "../../components/common/Table/Table";
import Paginator from "../../components/common/Paginators/Paginator";
import Button from "../../components/common/Buttons/Button";


const HeaderText = styled.Text`
    font:${({theme}) => theme.font["--text-xl-medium"]};
    color:${({theme}) => theme.colors["--company"]}
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
    z-index: ${({zIndex}) => zIndex};

`


const CloseButtonContainer = styled.TouchableOpacity`
    background-color:${({theme}) => theme.colors["--color-gray-300"]};
    width:68px;
    height:26px;
    padding:4px 14px;
    border-radius:6px;
    justify-content:center;
`;

const CloseText = styled.Text`
    color:${({theme}) => theme.colors["--color-gray-600"]};
    font:${({theme}) => theme.font["--text-sm-bold"]}
`;


const AppointmentPageContentWrapper = styled.View`
    flex:1;
    margin : 0;

     padding-top: ${({theme}) => theme.space['--space-12']};
    // padding-left: ${({theme}) => theme.space['--space-24']};
    // padding-right: ${({theme}) => theme.space['--space-24']};
`

const AppointmentPageContentContainer = styled.View`
    display: flex;
    flex:1;
`
const ContentContainer = styled.View`
    display: flex;
    flex:1;
    padding-top: ${({theme}) => theme.space['--space-24']};
    padding-left: ${({theme}) => theme.space['--space-24']};
    padding-right: ${({theme}) => theme.space['--space-24']};
`


const FooterWrapper = styled.View`
  //height: 500px;
  border: 1px solid ${({theme}) => theme.colors['--color-gray-300']};
  border-bottom-width: 0;
  border-left-width: 0;
  border-right-width: 0;
  padding-top: ${({theme}) => theme.space['--space-24']}; 
  padding-bottom: ${({theme}) => theme.space['--space-24']}; 
  margin-left: ${({theme}) => theme.space['--space-24']}; 
  margin-top: 0;
  margin-right: ${({theme}) => theme.space['--space-24']}; 
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
  background-color: ${({theme}) => theme.colors['--default-shade-white']};
`
const PageContentWrapper = styled.View`
  flex: 1;
  //padding: ${({theme}) => theme.space['--space-32']}
`

const HeaderWrapper = styled.View`
  display: flex;
  height: 47px;
  //width: 100%;
  justify-content: center;
  padding-left: ${({theme}) => theme.space['--space-24']};
  padding-right: ${({theme}) => theme.space['--space-24']};
  
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

function AppointmentPage({navigation}) {
    const currentTabs = [PAGE_TABS.APPOINTMENT, PAGE_TABS.RECOVERY, PAGE_TABS.CONSUMABLES, PAGE_TABS.EQUIPMENT];
    const theme = useTheme();

    const [currentTabIndex, setTabIndex] = useState(0);
    const [isEditMode, setEditMode] = useState(false);

    const [caseProceduresInfo, setCaseProceduresInfo] = useState({});
    const [procedureErrors, setProcedureErrors] = useState([]);

    useEffect(() => {

    }, [])


    //#region Event Handler
    const onTabPress = (selectedTab) => {
        if (isEditMode) return;

        const index = currentTabs.indexOf(selectedTab)
        if (index < 0) return
        setTabIndex(index);

    };

    const onNextButtonPress = () => {

        // Validate Fields

        //
        const isFinalTab = currentTabIndex === currentTabs.length - 1
        if (isFinalTab) {

        } else {
            const nextTabIndex = currentTabIndex + 1
            setTabIndex(nextTabIndex);
        }

    }

    const onPreviousButtonPress = () => {
        const isFirstTab = currentTabIndex === 0;
        if (isFirstTab) return;

        const prvTabIndex = currentTabIndex - 1
        setTabIndex(prvTabIndex)
    }

    const closeTapped = () => {
        navigation.navigate("CaseFiles")
    }

    const onProcedureUpdate = (value) => {
        setCaseProceduresInfo(value)
    }

    const onRecoveryUpdate = () => {

    }


    //#endregion


    //#region Helper Methods


    const testData = [
        {
            name : "Agents",
            amount : 5
        },
        {
            name : "Agents",
            amount : 6
        },
        {
            name : "Agents",
            amount : 7
        },
        {
            name : "Agents",
            amount : 8
        },
        {
            name : "Agents",
            amount : 9
        },
        {
            name : "Agents",
            amount : 10
        },
    ]


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
                    recoveryFields={{}}
                    onRecoveryFieldUpdate={onRecoveryUpdate}
                />
            case PAGE_TABS.CONSUMABLES:
                return <ItemsTable
                    title={"Consumable"}
                    data={testData}
                />
            case PAGE_TABS.EQUIPMENT:
                return <ItemsTable
                    title={"Equipments"}
                    data={testData}
                />
            default:
                return <View/>
        }
    };

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
                            IconLeft={<ChevronLeft strokeColor={theme.colors['--color-gray-600']}/>}
                        />
                    </FooterButtonContainer>


                    <FooterButtonContainer>
                        <PageButton
                            backgroundColor={theme.colors['--color-blue-500']}
                            fontColor={theme.colors['--default-shade-white']}
                            text={"NEXT"}
                            onPress={onNextButtonPress}
                            IconRight={<ChevronRight strokeColor={theme.colors['--default-shade-white']}/>}
                        />
                    </FooterButtonContainer>
                </FooterContainer>
            </FooterWrapper>

        </PageWrapper>
    );
}

AppointmentPage.propTypes = {};
AppointmentPage.defaultProps = {};

export default AppointmentPage;


const AppointmentTab = ({onProcedureUpdate, procedure, patient = "--", errors, onErrorUpdate}) => {

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
        <View style={{flex: 1}}>
            <ProcedureTab
                onProcedureInfoChange={onProcedureFieldChange}
                procedureInfo={currentProcedure}
                errors={errors}
                onErrorUpdate={handleOnErrorUpdate}
            />

            <View style={{backgroundColor: '#C4C4C4', width: '100%', height: 1}}/>

            {/* SCHEDULING ASSISTANT */}

            <View style={{flex: 1, paddingRight: 30}}>
                <ScheduleDisplayComponent appointments={appointments} date={date}/>
            </View>

        </View>
    )
}


const RowWrapper = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: ${({theme}) => theme.space['--space-16']};
    z-index: ${({zIndex}) => zIndex};
`

/**
 *
 * @param isEdit
 * @param appointmentField
 * @return {*}
 * @constructor
 */
const RecoveryTab = ({isEdit, recoveryFields, onRecoveryFieldUpdate}) => {
    const theme = useTheme();
    const {duration = {}, location, startTime} = recoveryFields;
    const {name = ""} = location || {}

    const [hasRecovery, setRecovery] = useState(true);


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
            startTime: newStartTime.toDate(),
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
                const {data = [], pages} = locationsInfo;
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
            <RowWrapper theme={theme}>

                <InputWrapper theme={theme}>
                    <OptionsField
                        label={"Recovery"}
                        labelWidth={70}
                        enabled={isEdit}
                        text={hasRecovery ? 'Yes' : 'No'}
                        oneOptionsSelected={() => {

                        }}
                        menuOption={<MenuOptions>
                            <MenuOption value={true} text='Yes'/>
                            <MenuOption value={false} text='No'/>
                        </MenuOptions>}
                    />
                </InputWrapper>

                <View style={{width: 20}}/>
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
                    />
                </InputWrapper>

            </RowWrapper>

            <RowWrapper theme={theme} zIndex={3}>
                <InputWrapper theme={theme} style={{flex: 1}}>
                    <DateInputField
                        label="Date"
                        labelWidth={70}
                        value={moment(startTime).toDate()}
                        format={"MMM/DD/YYYY"}
                        mode={"date"}
                        onDateChange={onStartTimeUpdated}
                        placeholder="MMM/D/YYYY"
                    />
                </InputWrapper>

                <View style={{width: 24}}/>

                <InputWrapper theme={theme} style={{flex: 1}}>
                    <DateInputField
                        label="Time"
                        labelWidth={70}
                        value={moment(startTime).toDate()}
                        format={"h:mm A"}
                        mode={"time"}
                        onDateChange={onStartTimeUpdated}
                        placeholder="HH:MM"
                    />

                    {/*    EDIT TIME    */}

                </InputWrapper>


            </RowWrapper>

            <RowWrapper theme={theme}>
                <InputWrapper theme={theme} style={{flex: 1}}>
                    <InputUnitField
                        label={"Duration"}
                        labelWidth={70}
                        onChangeText={onDurationUpdated}
                        value={duration}
                        units={['hrs']}
                        keyboardType="number-pad"
                        errorMessage="Input estimated time (hours)."
                    />
                </InputWrapper>

                <View style={{width: 24}}/>
                <InputWrapper theme={theme}/>

            </RowWrapper>
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

const ItemsTable = ({title, data}) => {

    const theme = useTheme();

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

    }

    const onGoToPrevious = () => {

    }


    const listItemFormat = (item) => {
        return (
            <View style={{marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{}}>
                    <Text style={{color: "#3182CE"}}>{item.name}</Text>
                </View>
                <View style={{width: 70, alignItems: 'center'}}>
                    <Text style={{color: "#4A5568"}}>{item.amount}</Text>
                </View>
            </View>
        )
    }


    return <ContentContainer theme={theme}>

        <View style={{flex: 1}}>
            <Table
                data={data}
                currentListMin={1}
                currentListMax={2}
                listItemFormat={listItemFormat}
                headers={headers}
                isCheckbox={false}
            />
        </View>

        {
            <View style={{alignItems: 'flex-start', justifyContent: 'flex-start'}}>
                <PaginatorContainer theme={theme}>
                    <Paginator
                        currentPage={1}
                        totalPages={1}
                        goToNextPage={onGoToNext}
                        goToPreviousPage={onGoToPrevious}
                    />
                </PaginatorContainer>
            </View>
        }
    </ContentContainer>
}
