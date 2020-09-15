import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import styled, {css} from '@emotion/native';
import {useTheme} from 'emotion-theming';
import TextArea from "../Input Fields/TextArea";
import InputField2 from "../Input Fields/InputField2";


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


function Record({
                    recordTitle = "",
                    recordValue = '--',
                    titleStyle = "--text-sm-regular",
                    valueStyle = "--text-base-regular",
                    titleColor = '--color-gray-600',
                    valueColor = '--color-gray-900',
                    flex = 1,
                    // EDIT MODE PROPS
                    editMode = false,
                    editable = true,
                    useTextArea = false,
                    onClearValue = () => {
                    },
                    onRecordUpdate = () => {
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
                    editMode && !useTextArea &&
                    <InputField2
                        value={recordValue}
                        onChangeText={onRecordUpdate}
                        enabled={editable}
                        onClear = {onClearValue}
                    />
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
