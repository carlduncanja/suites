import React, {useEffect, useState} from 'react';
import {View} from "react-native";
import styled from "@emotion/native";
import {useTheme} from "emotion-theming";
import DefaultPage from "../../../components/common/Page/DefaultPage";
import DateInputField from "../../../components/common/Input Fields/DateInputField";
import InputField2 from "../../../components/common/Input Fields/InputField2";
import {useModal} from "react-native-modalfy";
import moment from "moment";
import PageButton from "../../../components/common/Page/PageButton";
import SchedulesList from "../SchedulePage/SchedulesList";
import {generateDocumentLink, getAppointmentRequest} from "../../../api/network";
import LoadingComponent from "../../../components/LoadingComponent";
import * as Sharing from "expo-sharing";
import {formatDate} from "../../../utils/formatter";
import * as FileSystem from "expo-file-system";
import {getDaysInRange} from "../../../utils";


const PrintOptions = {
    today: "Print Today",
    lastWeek: "Last Week",
    thisMonth: "This Month",
    custom: "Custom",
}

/**
 *
 * @param option - Print option
 * @return {JSX.Element}
 * @constructor
 */
function PrintSchedulePage({route, navigation}) {
    const {option} = route.params;

    const theme = useTheme();
    const date = new Date();

    const modal = useModal();

    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [isLoading, setLoading] = useState(true);
    const [documentName, setDocumentName] = useState();
    const [appointments, setAppointments] = useState();

    useEffect(() => {
        let start;
        let end;
        let today = moment();
        if (option === PrintOptions.today) {
            start = moment().startOf('day');
            end = moment().endOf('day');
        } else if (option === PrintOptions.lastWeek) {
            start = moment().subtract(1, 'weeks').startOf('week');
            end = moment().subtract(1, 'weeks').endOf('week');
        } else if (option === PrintOptions.thisMonth) {
            start = moment().startOf('month');
            end = moment().endOf('month');
        }
        console.log('Option, start, end: ', option, start, end);

        setStartDate(start?.toDate());
        setEndDate(end?.toDate());

        getAppointmentsInRange(startDate, endDate)

    }, []);

    const handleClosePress = () => {
        navigation.goBack();
    }

    const onDocumentNameChange = value => {
        setDocumentName(value);
    };

    /**
     * Cancels print request, sends use back to schedule page.
     */
    const onCancelBtnPress = () => {
        navigation.goBack();
    }

    /**
     *  Start print request and generates documents.
     */
    const onPrintBtnPress = async () => {
        // await sharePdf()
        setLoading(true);
        try {
            // prepare print data.
            const printDocumentPayload = getPrintDocumentRequestPayload()
            console.log('print payload: ', printDocumentPayload);

            // generate pdf for print schedule.
            const response = await generateDocumentLink(printDocumentPayload);

            const fileUrl = response?.url;
            const filenameParts = fileUrl.split('/');
            const filename = filenameParts[filenameParts.length - 1];

            // save file in memory
            const file = await FileSystem.downloadAsync(
                fileUrl,
                `${FileSystem.cacheDirectory}${filename}`
            )

            const {uri} = file;

            await Sharing.shareAsync(uri, {UTI: 'pdf'})


            //display preview.

        } catch (e) {
            console.log('Failed to print document.', e)

            alert('Failed to print Schedule, try again.')
            // modal.openModal('ConfirmationModal')
        }

        setLoading(false);

    };

    /**
     *  loops over appointment to be prints
     *  and prepare the request data to be sent to Document generation endpoint.
     */
    const getPrintDocumentRequestPayload = () => {
        const days = getDaysInRange(startDate, endDate)
        let appointmentList = [...appointments].reverse();

        // find the appointments for the day and group them.
        return {
            "key": "suites_print_schedule_day_view",
            "file_name": documentName,
            "persist": false,
            "is_pdf": true,
            "from_html": true,
            "args": {
                "schedule_start_date": formatDate(startDate, 'DD/MM/YYYY'),
                "schedule_end_date": formatDate(endDate, 'DD/MM/YYYY'),
                "days": days.map((sectionDay => {
                    const title = formatDate(sectionDay, "dddd - MMM D");

                    let appointmentForDay = [];
                    let index = appointmentList.length - 1;


                    while (index >= 0) {
                        let appDay = moment(appointmentList[index].startTime);
                        const isSameDay = appDay.isSame(moment(sectionDay), 'day');
                        if (isSameDay) {
                            const day = appointmentList.splice(index, 1); // remove item found to decrease the list
                            appointmentForDay.push(day.pop());
                        }

                        --index
                    }

                    return {
                        day: title,
                        appointments: appointmentForDay.map(appointment => ({
                            info: `${appointment.title} - ${appointment.subject}`,
                            time: `${formatDate(appointment.startTime, "h:mm")}` + " - " + `${formatDate(appointment.endTime, "h:mm")}`,
                            color: `${appointment.type && appointment.type.color || 'gray'}`,
                        })),
                    }
                }))
            }
        };
    }


    /**
     * Send request to SUITE API for appointments withing the given range.
     *
     * @param startDate {Date} start date for appointment range
     * @param endDate {Date}|end date for appointment range
     * @return {Promise<unknown>}
     */
    const getAppointmentsInRange = (startDate, endDate) => {
        setLoading(true);
        getAppointmentRequest({from: startDate, to: endDate})
            .then(data => {
                setAppointments(data);
            })
            .catch(error => {
                console.log('Failed to get appointments in date ranges');
                // TODO display error;
            })
            .finally(_ => {
                setLoading(false);
            })
    }

    
    return (

        <MainWrapper>


            <DefaultPage
                pageTitle="Print Schedule"
                onClosePress={handleClosePress}
            >
                <View>
                    <PrintContent theme={theme}>
                        <RowWrapper>
                            <InputWrapper>
                                <DateInputField
                                    value={startDate}
                                    label="Start Date"
                                    onClear={() => setStartDate()}
                                    keyboardType="number-pad"
                                    mode="date"
                                    format="DD/MM/YYYY"
                                    placeholder="DD/MM/YYYY"
                                    onDateChange={date => setStartDate(date)}
                                    hasBorder={true}
                                />
                                {/*<CalendarIcon/>*/}
                            </InputWrapper>

                            <Space/>

                            <InputWrapper>
                                <DateInputField
                                    value={endDate}
                                    label="End Date"
                                    onClear={() => setEndDate()}
                                    keyboardType="number-pad"
                                    mode="date"
                                    format="DD/MM/YYYY"
                                    placeholder="DD/MM/YYYY"
                                    onDateChange={date => setEndDate(date)}
                                    hasBorder={true}
                                    minDate={startDate}
                                />
                                {/*<CalendarIcon/>*/}
                            </InputWrapper>
                        </RowWrapper>


                        <RowWrapper theme={theme} zIndex={-2}>

                            <InputWrapper>
                                <InputField2
                                    label="File Name"
                                    onChangeText={onDocumentNameChange}
                                    value={documentName}
                                    onClear={() => setDocumentName('')}
                                    hasBorder={true}
                                    placeholder="SchedulePage"
                                    IconRight={<Extension>
                                        .pdf
                                    </Extension>}
                                />
                            </InputWrapper>

                            <Space/>

                            <InputWrapper>
                                {/*<OptionsField*/}
                                {/*    label="View"*/}
                                {/*    labelWidth={98}*/}
                                {/*    text={fields.title}*/}
                                {/*    oneOptionsSelected={onFieldChange('title')}*/}
                                {/*    menuOption={(*/}
                                {/*        <MenuOptions>*/}
                                {/*            <MenuOption value="Mr." text="Mr."/>*/}
                                {/*            <MenuOption value="Ms." text="Ms."/>*/}
                                {/*            <MenuOption value="Mrs." text="Mrs."/>*/}
                                {/*            <MenuOption value="Dr." text="Dr."/>*/}
                                {/*        </MenuOptions>*/}
                                {/*    )}*/}
                                {/*/>*/}
                            </InputWrapper>

                        </RowWrapper>

                    </PrintContent>
                </View>

                <PageContentWrapper>
                    <View style={{flex: 1}}>
                        <ScheduleListWrapper>
                            <SchedulesList
                                appointments={appointments}
                                onAppointmentPress={() => {
                                }}
                                selectedDay={date}
                                month={date}
                                startDate={startDate}
                                endDate={endDate}
                            />
                        </ScheduleListWrapper>
                    </View>
                </PageContentWrapper>

                <FooterWrapper>
                    <FooterContainer>
                        <FooterButtonContainer>
                            <PageButton
                                backgroundColor={theme.colors['--color-gray-200']}
                                fontColor={theme.colors['--color-gray-600']}
                                text="Cancel"
                                onPress={onCancelBtnPress}
                            />
                        </FooterButtonContainer>

                        <FooterButtonContainer>
                            <PageButton
                                backgroundColor={theme.colors['--color-blue-500']}
                                fontColor={theme.colors['--default-shade-white']}
                                text={'Print'}
                                onPress={onPrintBtnPress}
                            />
                        </FooterButtonContainer>
                    </FooterContainer>
                </FooterWrapper>


            </DefaultPage>


            {
               isLoading && <LoadingComponent/>
            }
        </MainWrapper>
    );
};


const ScheduleListWrapper = styled.View`
  flex: 1;
  padding: 24px 32px 32px 32px;
`

const MainWrapper = styled.View`
  display: flex;
  flex-direction: column;
  flex: 1;
`

const FooterWrapper = styled.View`
  bottom: 0;
  border: 1px solid ${({theme}) => theme.colors['--color-gray-300']};
  border-bottom-width: 0;
  border-left-width: 0;
  border-right-width: 0;
  padding-top: ${({theme}) => theme.space['--space-24']};
  padding-bottom: ${({theme}) => theme.space['--space-24']};
  margin-left: ${({theme}) => theme.space['--space-24']};
  margin-right: ${({theme}) => theme.space['--space-24']};
`;

const FooterContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const FooterButtonContainer = styled.View`
  width: 145px;
  height: 48px;
`;

const Space = styled.View`
  width: ${({theme}) => theme.space['--space-24']};
`;

const PageContentWrapper = styled.View`
  flex: 1;
`;


const InputWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  z-index: ${({zIndex}) => zIndex};
`;


const RowWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${({theme}) => theme.space['--space-20']};
  z-index: ${({zIndex}) => zIndex};
`;


const PrintContent = styled.View`
  display: flex;
  flex-direction: column;
  padding: ${({theme}) => theme.space['--space-24']};
  height: 142px;
`;


const Extension = styled.Text`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  color: ${({theme}) => theme.colors['--color-gray-500']};
`;

export default PrintSchedulePage;
