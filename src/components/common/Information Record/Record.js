import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import styled, {css} from '@emotion/native';
import {useTheme} from 'emotion-theming';
import TextArea from "../Input Fields/TextArea";
import InputField2 from "../Input Fields/InputField2";
import DateInputField from '../Input Fields/DateInputField';
import OptionsField from '../Input Fields/OptionsField';
import SearchableOptionsField from '../Input Fields/SearchableOptionsField';
import {MenuOption, MenuOptions} from "react-native-popup-menu";
import { formatDate } from '../../../utils/formatter';

const RecordWrapper = styled.View`
    flex:${({flex}) => flex.toString()};
    margin-right: ${({theme}) => theme.space['--space-4']};

`;
const RecordContainer = styled.View`
    display: flex;
    flex-direction:column;
`;

const TitleText = styled.Text(({theme, titleColor, titleStyle}) => ({
    ...theme.font[titleStyle],
    color: theme.colors[titleColor],
    marginBottom: 10,
}));

const ValueText = styled.Text(({theme, valueStyle, valueColor}) => ({
    ...theme.font[valueStyle],
    color: theme.colors[valueColor]
}));

const TextAreaWrapper = styled.View`
    display: flex;
    height: 70px;
`;

const DateWrapper = styled.View`
    /* background-color : yellow; */
    display : flex;
    width : 150px;
    height : 30px;
`;

const DropdownWrapper = styled.View`
    display :flex;
    height  :30px;
`;

const InputWrapper = styled.View`
    display :flex;
    height  :30px;
`


  
function Record({
                    recordTitle = "",
                    recordValue = '--',
                    titleStyle = "--text-sm-regular",
                    valueStyle = "--text-base-regular",
                    titleColor = '--color-gray-600',
                    valueColor = '--color-gray-900',
                    flex = 1,
                    minDate = new Date(),
                    options = ()=>{},
                    searchText = "",
                    searchResults = [],
                    searchQuery = false,
                    // EDIT MODE PROPS
                    editMode = false,
                    editable = true,
                    useTextArea = false,
                    useDateField = false,
                    useDropdown = false,
                    useSearchable = false,
                    onClearValue = () => {
                    },
                    onRecordUpdate = () => {
                    },
                    onSearchChange = () => {
                    }
                }) {
    const theme = useTheme();


    return (
        <RecordWrapper flex={flex} theme={theme}>
            <RecordContainer>

                <TitleText theme={theme} titleColor={titleColor} titleStyle={titleStyle}>{recordTitle}</TitleText>

                {
                    !editMode &&
                    <ValueText
                        theme={theme}
                        valueColor={valueColor}
                        valueStyle={valueStyle}>
                        {recordValue || "--"}
                    </ValueText>
                }

                {
                    editMode && useTextArea &&
                    <TextAreaWrapper>
                        <TextArea
                            onChangeText={onRecordUpdate}
                            value={recordValue}
                            multiline={true}
                            numberOfLines={4}
                            onClear={onClearValue}
                        />
                    </TextAreaWrapper>
                }

                {
                    editMode && useDateField &&
                    <DateWrapper>
                        <DateInputField
                            // placeholder = "Delivery Date"
                            borderColor = "--color-gray-400"
                            minDate = {minDate}
                            onDateChange = {onRecordUpdate}
                            value={formatDate(recordValue,"DD/MM/YYYY")}
                            onClear={onClearValue}
                            mode={"date"}
                            format={"DD/MM/YYYY"}
                        />
                    </DateWrapper>
                    
                }

                {
                    editMode && useDropdown &&
                    <InputWrapper>
                        <OptionsField
                            text={recordValue}
                            oneOptionsSelected={(value) => {
                                onRecordUpdate(value)
                            }}
                            menuOption={options}
                        />
                    </InputWrapper>
                }

                {
                    editMode && useSearchable &&
                    
                    <SearchableOptionsField
                        value={recordValue}
                        text={searchText}
                        oneOptionsSelected={(item)=> onRecordUpdate(item)}
                        onChangeText={(value) => {onSearchChange(value)}}
                        onClear={()=>{onClearValue()}}
                        options={searchResults}
                        handlePopovers={() => {
                            // console.log("handle popovers");
                        }}
                        isPopoverOpen={searchQuery}
                    />
                }

                {
                    editMode && !useTextArea && !useDateField && !useDropdown && !useSearchable &&
                    <InputWrapper>
                        <InputField2
                            value={recordValue}
                            onChangeText={onRecordUpdate}
                            enabled={editable}
                            onClear = {onClearValue}
                        />
                    </InputWrapper>
                    

                }


            </RecordContainer>
        </RecordWrapper>
    )
}

export default Record

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column'
    },
    recordTitle: {
        paddingBottom: 4,
    },

})
