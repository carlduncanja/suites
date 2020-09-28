import React, {useContext} from 'react';
import {ScrollView, View, StyleSheet, TouchableOpacity} from 'react-native';
import moment from 'moment';
import {withModal} from 'react-native-modalfy';
import styled, {css} from '@emotion/native';
import {useTheme} from 'emotion-theming';
import BMIConverter from '../../BMIConverter';
import {PersonalRecord, ContactRecord, MissingValueRecord} from '../../../common/Information Record/RecordStyles';
import ResponsiveRecord from '../../../common/Information Record/ResponsiveRecord';
import PatientBMIChart from '../../PatientBMIChart';
import {formatDate, calcAge} from '../../../../utils/formatter';
import Row from '../../../common/Row';

const itemWidth = `${100 / 3}%`;

const Details = ({tabDetails, modal}) => {
    const theme = useTheme();

    const Divider = styled.View`
        height : 1px;
        width : 100%;
        background-color: ${theme.colors['--color-gray-400']};
        border-radius : 2px;
        margin-bottom : ${theme.space['--space-20']};
    `;

    const bmiScale = [
        {
            color: '#4299E1',
            startValue: 0,
            endValue: 18.4
        },
        {
            color: '#48BB78',
            startValue: 18.5,
            endValue: 24.9
        },
        {
            color: '#ED8936',
            startValue: 25,
            endValue: 29.9
        },
        {
            color: '#E53E3E',
            startValue: 30,
            endValue: 34.9
        },
        {
            color: '#805AD5',
            startValue: 35,
            endValue: 100
        }
    ];

    const handleBMIPress = value => {
        modal.openModal('OverlayInfoModal', {
            overlayContent: <PatientBMIChart
                value={value}
                bmiScale={bmiScale}
            />
        });
    };

    const seperateNumber = number => number.toString()
        .match(/\d{1,3}/g)
        .join(' ');

    const DemographicData = () => {
        const {
            firstName = '',
            middleName = '',
            surname = '',
            height = 0,
            weight = 0,
            dob = '',
            trn = '',
            gender = '',
            ethnicity = '',
            bloodType = '',
            nextVisit = null
        } = tabDetails;

        const age = calcAge(dob);
        const dateOfBirth = `${formatDate(dob, 'DD/MM/YYYY')} (${age})`;
        const metreHeight = Math.pow((height / 100), 2) || 0;
        const bmiMeasure = Math.ceil(weight / metreHeight) || 0;
        const bmi = bmiMeasure > 100 ? 100 : bmiMeasure;

        return (
            <>
                <Row>
                    <PersonalRecord
                        recordTitle="First Name"
                        recordValue={firstName}
                    />

                    <PersonalRecord
                        recordTitle="Middle Name"
                        recordValue={middleName}
                    />

                    <PersonalRecord
                        recordTitle="Surname"
                        recordValue={surname}
                    />
                </Row>

                <Row>

                    <PersonalRecord
                        recordTitle="Height"
                        recordValue={height}
                    />

                    <PersonalRecord
                        recordTitle="Weight"
                        recordValue={weight}
                    />

                    <TouchableOpacity
                        style={styles.rowItem}
                        activeOpactiy={1}
                        onPress={() => handleBMIPress(bmi)}
                    >
                        {/*<BMIConverter*/}
                        {/*    recordTitle={"BMI"}*/}
                        {/*    bmiValue={bmi}*/}
                        {/*    bmiScale = {bmiScale}*/}
                        {/*/>*/}
                    </TouchableOpacity>
                </Row>

                <Row>
                    <PersonalRecord
                        recordTitle="Date of Birth"
                        recordValue={dateOfBirth}
                    />
                    <PersonalRecord
                        recordTitle="TRN"
                        recordValue={trn}
                    />
                    <PersonalRecord
                        recordTitle="Gender"
                        recordValue={gender}
                    />
                </Row>

                <Row>
                    <PersonalRecord
                        recordTitle="Ethnicity"
                        recordValue={ethnicity}
                    />
                    <PersonalRecord
                        recordTitle="Blood Type"
                        recordValue={bloodType}
                    />
                    <PersonalRecord
                        recordTitle="Next Visit"
                        recordValue={formatDate(nextVisit, 'MMM DD, YYYY') || 'n/a'}
                    />
                </Row>
            </>
        );
    };

    const ContactData = () => {
        const {contactInfo = {}, address = []} = tabDetails;
        const {phones = [], emails = []} = contactInfo;
        const emailTypes = ['primary', 'other', 'work'];
        const phoneTypes = ['cell', 'home', 'work'];
        let phone = '';
        let title = '';
        let email = '';

        return (
            <>

                <Row>
                    {
                        phoneTypes.map((item, index) => {
                            const phoneArray = phones.filter(phone => phone.type === item);
                            phoneArray.length === 0 ? phone = '' : phone = phoneArray[0].phone;

                            item === 'cell' ? title = 'Cell Phone Number' :
                                item === 'home' ? title = 'Home Phone Number' :
                                    item === 'work' ? title = 'Work Phone Number' :
                                        title = 'Other Phone Number';

                            return (
                                <ResponsiveRecord
                                    key={index}
                                    recordTitle={title}
                                    recordValue={phone}
                                    handleRecordPress={() => {
                                    }}
                                />
                            );
                        })
                    }
                </Row>

                <Row>
                    {
                        emailTypes.map((item, index) => {
                            const emailArray = emails.filter(email => email.type === item);
                            emailArray.length === 0 ? email = '' : email = emailArray[0].email;

                            item === 'primary' ? title = 'Primary Email' :
                                item === 'other' ? title = 'Alternate Email' :
                                    item === 'work' ? title = 'Work Email' :
                                        title = 'Other';

                            return (

                                <ResponsiveRecord
                                    key={index}
                                    recordTitle={title}
                                    recordValue={email}
                                    handleRecordPress={() => {
                                    }}
                                />

                            );
                        })
                    }

                </Row>

                {address.map((item, index) => (
                    <Row key={index}>
                        <View style={{flex: 2}}>
                            <PersonalRecord
                                recordTitle="Address 1"
                                recordValue={item.line1}
                            />
                        </View>

                        <PersonalRecord
                            recordTitle="Address 2"
                            recordValue={item.line2}
                        />
                    </Row>
                ))}

            </>

        );
    };

    const EmergencyData = () => {
        const {contactInfo = {}} = tabDetails;
        const {emergencyContact = []} = contactInfo;
        return (
            <>
                {emergencyContact.map((contact, index) => {
                    const {relation = '', email = '', phone = '', name = 'Coleen Brown'} = contact;
                    return (
                        <Row key={index}>
                            <PersonalRecord
                                recordTitle="Emergency Contact Name"
                                recordValue={`${name} (${relation})`}
                            />

                            <ResponsiveRecord
                                recordTitle="Emergency Contact Phone"
                                recordValue={phone}
                                handleRecordPress={() => {
                                }}
                            />

                            <ResponsiveRecord
                                recordTitle="Emergency Contact Email"
                                recordValue={email}
                                handleRecordPress={() => {
                                }}
                            />

                        </Row>
                    );
                })}
            </>
        );
    };

    return (
        <ScrollView>
            {DemographicData()}
            {<Divider/>}
            {ContactData()}
            {<Divider/>}
            {EmergencyData()}
        </ScrollView>
    );
};

export default withModal(Details);

const styles = StyleSheet.create({
    separator: {
        height: 1,
        backgroundColor: '#CCD6E0',
        borderRadius: 2,
        marginTop: 10,
        //marginBottom:10
    },
    rowContainer: {
        flex: 1,
        flexDirection: 'row',
        // backgroundColor:'green',
        // marginLeft:10,
        // marginRight:10,
        marginBottom: 20,
        // alignItems:'flex-start',
        justifyContent: 'space-between'
    },
    rowItem: {width: itemWidth}
});
