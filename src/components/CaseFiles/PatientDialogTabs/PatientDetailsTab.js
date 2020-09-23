import React, {useState} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {MenuOptions, MenuOption} from 'react-native-popup-menu';
import moment from 'moment';
import styled from '@emotion/native';
import {useTheme} from 'emotion-theming';
import InputField2 from '../../common/Input Fields/InputField2';
import OptionsField from '../../common/Input Fields/OptionsField';
import DateInputField from '../../common/Input Fields/DateInputField';
import { isValidDOB } from '../../../utils/formatter';

const Space = styled.View`
   width:  ${({theme}) => theme.space['--space-24']};
`;

const RowWrapper = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: ${({theme}) => theme.space['--space-20']};
    z-index: ${({zIndex}) => zIndex};
`;

const InputWrapper = styled.View`
    flex: 1;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    z-index: ${({zIndex}) => zIndex};

`;

const PatientDetailsTab = ({onFieldChange, fields, errors}) => {
    const theme = useTheme();

    const handleTrnValidation = trnValue => {
        if (trnValue.toString().length > 9) return;

        if (/^\d+$/g.test(trnValue) || !trnValue) {
            onFieldChange('trn')(trnValue);
        }
    };

    const onDateChange = date => {
        if (isValidDOB(date)) {
            console.log('Date: ', date);
            onFieldChange('dob')(date);
        }
    };

    return (
        <View style={styles.sectionContainer}>

            <RowWrapper style={styles.row}>
                <InputWrapper style={styles.inputWrapper}>
                    <InputField2
                        label="First Name"
                        labelWidth={98}
                        onChangeText={onFieldChange('firstName')}
                        value={fields.firstName}
                        onClear={() => onFieldChange('firstName')('')}
                        hasError={errors.firstName}
                        errorMessage={errors.firstName}
                    />
                </InputWrapper>
                <Space theme={theme}/>
                <View style={styles.inputWrapper}>
                    <InputField2
                        label="Middle Name"
                        labelWidth={98}
                        onChangeText={onFieldChange('middleName')}
                        value={fields.middleName}
                        onClear={() => onFieldChange('middleName')('')}
                    />
                </View>

            </RowWrapper>

            <RowWrapper theme={theme} zIndex={-1}>

                <InputWrapper style={styles.inputWrapper}>
                    <InputField2
                        label="Last Name"
                        onChangeText={onFieldChange('surname')}
                        labelWidth={98}
                        value={fields.surname}
                        onClear={() => onFieldChange('surname')('')}
                        hasError={errors.surname}
                        errorMessage={errors.surname}
                    />
                </InputWrapper>
                <Space theme={theme}/>

                <InputWrapper style={styles.inputWrapper}>
                    <OptionsField
                        label="Title"
                        labelWidth={98}
                        text={fields.title}
                        oneOptionsSelected={onFieldChange('title')}
                        menuOption={(
                            <MenuOptions>
                                <MenuOption value="Mr." text="Mr."/>
                                <MenuOption value="Ms." text="Ms."/>
                                <MenuOption value="Mrs." text="Mrs."/>
                                <MenuOption value="Dr." text="Dr."/>
                            </MenuOptions>
                        )}
                    />
                </InputWrapper>

            </RowWrapper>

            <RowWrapper theme={theme} zIndex={-2}>

                <InputWrapper style={styles.inputWrapper}>
                    <OptionsField
                        label="Gender"
                        labelWidth={98}
                        text={fields.gender}
                        oneOptionsSelected={onFieldChange('gender')}
                        menuOption={(
                            <MenuOptions>
                                <MenuOption value="Female" text="Female"/>
                                <MenuOption value="Male" text="Male"/>
                            </MenuOptions>
                        )}
                    />
                </InputWrapper>
                <Space theme={theme}/>

                <InputWrapper style={styles.inputWrapper}>
                    <InputField2
                        label="TRN"
                        labelWidth={98}
                        onChangeText={value => {
                            handleTrnValidation(value);
                        }}
                        value={fields.trn}
                        onClear={() => onFieldChange('trn')('')}
                        keyboardType="number-pad"
                        hasError={errors.trn}
                        errorMessage={errors.trn}
                    />
                </InputWrapper>

            </RowWrapper>

            <RowWrapper theme={theme} zIndex={-3}>

                <InputWrapper style={styles.inputWrapper}>
                    <DateInputField
                        label="Date of Birth"
                        labelWidth={98}
                        value={fields.dob}
                        onClear={() => onFieldChange('dob')('')}
                        mode="date"
                        format="YYYY-MM-DD"
                        keyboardType="number-pad"
                        placeholder="YYYY/MM/DD"
                        minDate={null}
                        maxDate={new Date(moment().subtract(1, 'days'))}
                        onDateChange={onDateChange}
                        hasError={errors.dob}
                        errorMessage={errors.dob}
                    />
                </InputWrapper>

                <Space/>
                <InputWrapper/>

            </RowWrapper>

        </View>
    );
};

PatientDetailsTab.propTypes = {};
PatientDetailsTab.defaultProps = {};

export default PatientDetailsTab;

const styles = StyleSheet.create({
    sectionContainer: {
        height: 260,
        backgroundColor: '#FFFFFF',
        flexDirection: 'column',
        padding: 24,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    inputWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    fieldContainer: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#E3E8EF',
        borderRadius: 8,
        height: 32,
        padding: 10,
        paddingTop: 2,
        paddingBottom: 2,
        justifyContent: 'center'
    },
    text: {
        fontSize: 12,
        color: '#718096',
        fontWeight: '500',
        marginRight: 20
    }
});
