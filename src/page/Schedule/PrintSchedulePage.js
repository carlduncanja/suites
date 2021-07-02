import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from "react-native";
import Page from "../../components/common/Page/Page";
import styled from "@emotion/native";
import {useTheme} from "emotion-theming";
import DefaultPage from "../../components/common/Page/DefaultPage";
import {useNavigation} from "@react-navigation/native";
import OverlayDialog from "../../components/common/Dialog/OverlayDialog";
import DateInputField from "../../components/common/Input Fields/DateInputField";
import CalendarIcon from "../../../assets/svg/calendar";
import InputField2 from "../../components/common/Input Fields/InputField2";
import {useModal} from "react-native-modalfy";
import moment from "moment";
import OptionsField from "../../components/common/Input Fields/OptionsField";
import {MenuOption, MenuOptions} from "react-native-popup-menu";
import PageButton from "../../components/common/Page/PageButton";
import ChevronLeft from "../../../assets/svg/ChevronLeft";
import ChevronRight from "../../../assets/svg/ChevronRight";

/**
 *
 * @param option - Print option
 * @return {JSX.Element}
 * @constructor
 */
function PrintSchedulePage({option}) {
    const theme = useTheme();
    const navigation = useNavigation();

    const modal = useModal();

    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [documentName, setDocumentName] = useState();

    useEffect(() => {
        let start;
        let end;
        let today = moment();
        if (option === 'Print Today') {
            start = today;
            end = today;
        } else if (option === 'Last Week') {
            start = moment().subtract(1, 'weeks').startOf('week');
            end = moment().subtract(1, 'weeks').endOf('week');
        } else if (option === 'This Month') {
            start = moment().startOf('month');
            end = moment().endOf('month');
        }
        console.log('Option, start, end: ', option, start, end);
        setStartDate(start);
        setEndDate(end);
    }, []);

    const handleClosePress = () => {
        navigation.goBack();
    }

    const onCloseModal = () => {
        modal.closeModals('OverlayInfoModal');
    };

    const onButtonPress = () => {
    };

    const onDocumentNameChange = value => {
        setDocumentName(value);
    };

    return (
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

                </View>
            </PageContentWrapper>


            <FooterWrapper>
                <FooterContainer>
                    <FooterButtonContainer>
                        <PageButton
                            backgroundColor={theme.colors['--color-gray-200']}
                            fontColor={theme.colors['--color-gray-600']}
                            text="Cancel"
                            // onPress={onPreviousButtonPress}
                        />
                    </FooterButtonContainer>

                    <FooterButtonContainer>
                        <PageButton
                            backgroundColor={theme.colors['--color-blue-500']}
                            fontColor={theme.colors['--default-shade-white']}
                            text={'Print'}
                            // onPress={onPositiveButtonPress}
                        />
                    </FooterButtonContainer>
                </FooterContainer>
            </FooterWrapper>


        </DefaultPage>
    );
}

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

const DatesContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${({theme}) => theme.space['--space-16']};
`;

const Date = styled.View`
  min-width: 208px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-right: 8px;

  background: ${({theme}) => theme.colors['--color-white']};
  border: ${({theme}) => `1px solid ${theme.colors['--color-gray-300']}`};
  box-sizing: border-box;
  border-radius: 4px;
`;

const NameContainer = styled.View`
  display: flex;
  flex-direction: row;
  padding-right: ${({theme}) => theme.space['--space-12']};
  align-items: center;

  background: ${({theme}) => theme.colors['--color-white']};

  border: ${({theme}) => `1px solid ${theme.colors['--color-gray-300']}`};
  box-sizing: border-box;
  border-radius: 4px;

`;

const Extension = styled.Text`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  color: ${({theme}) => theme.colors['--color-gray-500']};
`;

export default PrintSchedulePage;
