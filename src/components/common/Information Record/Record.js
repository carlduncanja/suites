import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
import { MenuOption, MenuOptions } from 'react-native-popup-menu';
import TextArea from '../Input Fields/TextArea';
import InputField2 from '../Input Fields/InputField2';
import DateInputField from '../Input Fields/DateInputField';
import OptionsField from '../Input Fields/OptionsField';
import SearchableOptionsField from '../Input Fields/SearchableOptionsField';
import { formatDate } from '../../../utils/formatter';
import _ from "lodash";

const RecordWrapper = styled.View`
    flex:${({ flex }) => flex.toString()};
    flex-direction:column;
    justify-content: flex-start;
    margin-right: ${({ theme }) => theme.space['--space-4']};
    margin-bottom: ${({ theme }) => theme.space['--space-20']};    
`;
const RecordContainer = styled.View`
    display: flex;
    /* justify-content: center; */
`;

const TitleText = styled.Text(({ theme, titleColor, titleStyle }) => ({
    ...theme.font[titleStyle],
    color: theme.colors[titleColor],
}));

const TitleWrapper = styled.View`
    height: 32px;
    justify-content: center;
`;

const ValueText = styled.Text(({ theme, valueStyle, valueColor }) => ({
    ...theme.font[valueStyle],
    color: theme.colors[valueColor]
}));

const PlaceHolderText = styled.Text(({ theme }) => ({
    ...theme.font['--text-base-regular'],
    color: theme.colors['--color-gray-500']
}))



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
`;

function Record({
    useDefaultRecordValue = true,
    recordPlaceholder = '--',
    recordTitle = '',
    recordValue = useDefaultRecordValue ? recordPlaceholder : '',
    titleStyle = '--text-xs-medium',
    valueStyle = '--text-base-regular',
    titleColor = '--color-gray-600',
    valueColor = '--color-gray-900',
    flex = 1,
    minDate = null,
    maxDate = null,
    options = () => {
    },
    searchText = '',
    searchResults = [],
    searchQuery = false,
    // EDIT MODE PROPS
    editMode = false,
    editable = true,
    useTextArea = false,
    useDateField = false,
    useDropdown = false,
    useSearchable = false,
    keyboardType = 'default',
    autoCapitalize = 'sentences',
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

                <TitleWrapper>
                    <TitleText theme={theme} titleColor={titleColor} titleStyle={titleStyle}>{recordTitle}</TitleText>
                </TitleWrapper>

                {
                    !editMode &&
                    <ValueText
                        theme={theme}
                        valueColor={valueColor}
                        valueStyle={valueStyle}
                    >
                        {recordValue}
                    </ValueText>
                }

                {
                    !editMode && useTextArea && recordValue === '' &&
                    <PlaceHolderText theme={theme}>
                        {recordPlaceholder}
                    </PlaceHolderText>
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
                            borderColor="--color-gray-400"
                            minDate={minDate}
                            maxDate={maxDate}
                            onDateChange={onRecordUpdate}
                            value={formatDate(recordValue, 'DD/MM/YYYY')}
                            onClear={onClearValue}
                            mode="date"
                            format="DD/MM/YYYY"
                        />
                    </DateWrapper>

                }

                {
                    editMode && useDropdown &&
                    <InputWrapper>
                        <OptionsField
                            text={recordValue}
                            oneOptionsSelected={value => {
                                onRecordUpdate(value);
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
                        oneOptionsSelected={item => onRecordUpdate(item)}
                        onChangeText={value => {
                            onSearchChange(value);
                        }}
                        onClear={() => {
                            onClearValue();
                        }}
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
                            onClear={onClearValue}
                            keyboardType={keyboardType}
                            autoCapitalize={autoCapitalize}
                        />
                    </InputWrapper>

                }

            </RecordContainer>
        </RecordWrapper>
    );
}

export default Record;

const styles = StyleSheet.create({
    container: { flexDirection: 'column' },
    recordTitle: { paddingBottom: 4 },

});
