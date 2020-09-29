import React, {useContext, useEffect, useRef, useState} from 'react';
import {ScrollView, View, StyleSheet, TouchableOpacity} from 'react-native';
import moment from 'moment';
import {useModal, withModal} from 'react-native-modalfy';
import styled, {css} from '@emotion/native';
import {useTheme} from 'emotion-theming';
import {MenuOption, MenuOptions} from 'react-native-popup-menu';
import BMIConverter from '../../BMIConverter';
import {PersonalRecord, ContactRecord, MissingValueRecord} from '../../../common/Information Record/RecordStyles';
import ResponsiveRecord from '../../../common/Information Record/ResponsiveRecord';
import PatientBMIChart from '../../PatientBMIChart';
import {formatDate, calcAge, handleNumberValidation, formatNumber, isValidEmail} from '../../../../utils/formatter';
import Row from '../../../common/Row';
import Record from '../../../common/Information Record/Record';
import {PageContext} from '../../../../contexts/PageContext';
import ConfirmationComponent from '../../../ConfirmationComponent';
import {updatePatient} from '../../../../api/network';

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

const itemWidth = `${100 / 3}%`;

const Details = ({
    tabDetails,
    onUpdated = () => {
    }
}) => {
    const theme = useTheme();

    const Divider = styled.View`
        height : 1px;
        width : 100%;
        background-color: ${theme.colors['--color-gray-400']};
        border-radius : 2px;
        margin-bottom : ${theme.space['--space-20']};
    `;

    const modal = useModal();

    const baseStateRef = useRef();

    const {_id: patientId} = tabDetails;
    const [fields, setFields] = useState({});

    const {pageState, setPageState} = useContext(PageContext);
    const {isEditMode} = pageState;

    const [isLoading, setLoading] = useState(false);
    const [isUpdated, setUpdated] = useState(false);

    const onTabUpdated = fields => setFields({...fields});

    useEffect(() => {
        if (isUpdated && !isEditMode) {
            modal.openModal('ConfirmationModal', {
                content: (
                    <ConfirmationComponent
                        isError={false} // boolean to show whether to show an error icon or a success icon
                        isEditUpdate={true}
                        onCancel={() => {
                            // resetState()
                            setPageState({
                                ...pageState,
                                isEditMode: true
                            });
                            modal.closeAllModals();
                        }}
                        onAction={() => {
                            modal.closeAllModals();
                            updatePatientAction();
                        }}
                        message="Do you want to save changes?" // general message you can send to be displayed
                        action="Yes"
                    />
                ),
                onClose: () => console.log('Modal closed'),
            });
        }
    }, [isEditMode]);

    const updatePatientAction = () => {
        const data = {...fields};

        setLoading(true);
        updatePatient(patientId, data)
            .then(_ => {
                onUpdated(data);
                modal.openModal('ConfirmationModal', {
                    content: (
                        <ConfirmationComponent
                            isError={false} // boolean to show whether an error icon or success icon
                            isEditUpdate={false}
                            onCancel={() => modal.closeAllModals()}
                            onAction={() => modal.closeAllModals()}
                            message="Changes were successful." // general message you can send to be displayed
                            action="Yes"
                        />
                    ),
                    onClose: () => console.log('Modal closed'),
                });
            })
            .catch(error => {
                console.log('Failed to update Patient', error);
                modal.openModal('ConfirmationModal', {
                    content: (
                        <ConfirmationComponent
                            error={true}//boolean to show whether an error icon or success icon
                            isEditUpdate={false}
                            onCancel={() => modal.closeAllModals()}
                            onAction={() => {
                                modal.closeAllModals();
                                resetState();
                            }}
                            message="Something went wrong when applying changes."//general message you can send to be displayed
                            action="Yes"
                        />
                    ),
                    onClose: () => console.log('Modal closed'),
                });
            })
            .finally(_ => {
                setLoading(false);
            });
    };

    const resetState = () => {
        setFields(baseStateRef.current);
        setUpdated(false);
    };

    const handleBMIPress = value => {
        modal.openModal('OverlayInfoModal', {
            overlayContent: <PatientBMIChart
                value={value}
                bmiScale={bmiScale}
            />
        });
    };

    const DemographicData = () => {
        const {firstName, middleName, surname, height, weight, dob, trn, gender, ethnicity, bloodType, nextVisit} = tabDetails;

        const [fields, setFields] = useState({
            firstName,
            middleName,
            surname,
            height,
            weight,
            dob,
            trn,
            gender,
            ethnicity,
            bloodType,
            nextVisit
        });

        useEffect(() => {
            baseStateRef.current = {
                firstName,
                middleName,
                surname,
                height,
                weight,
                dob,
                trn,
                gender,
                ethnicity,
                bloodType,
                nextVisit
            };

            return () => {
                baseStateRef.current = {};
            };
        }, []);

        const onFieldChange = fieldName => value => {
            const updatedFields = {
                ...fields,
                [fieldName]: value
            };

            setFields(updatedFields);
            onTabUpdated(updatedFields);
            setUpdated(true);
        };

        const age = calcAge(fields.dob || dob);
        const dateOfBirth = `${formatDate(fields.dob || dob, 'DD/MM/YYYY')} (${age})`;
        const metreHeight = Math.pow((height / 100), 2) || 0;
        const bmiMeasure = Math.ceil(weight / metreHeight) || 0;
        const bmi = bmiMeasure > 100 ? 100 : bmiMeasure;

        return (
            <>
                <Row>
                    {/* I concede; fields attributes not being instantiated like EVERYWHERE else so I give up. 'fields.<attribute>' || '<attribute>' defaulting it is */}
                    <Record
                        recordTitle="First Name"
                        recordValue={fields.firstName || firstName}
                        onClearValue={() => onFieldChange('firstName')('')}
                        onRecordUpdate={onFieldChange('firstName')}
                        editMode={isEditMode}
                        editable={true}
                    />

                    <Record
                        recordTitle="Middle Name"
                        recordValue={fields.middleName || middleName}
                        onClearValue={() => onFieldChange('middleName')('')}
                        onRecordUpdate={onFieldChange('middleName')}
                        editMode={isEditMode}
                        editable={true}
                    />

                    <Record
                        recordTitle="Surname"
                        recordValue={fields.surname || surname}
                        onClearValue={() => onFieldChange('surname')('')}
                        onRecordUpdate={onFieldChange('surname')}
                        editMode={isEditMode}
                        editable={true}
                    />
                </Row>

                <Row>

                    <Record
                        recordTitle="Height"
                        recordValue={fields.height || height}
                        onClearValue={() => onFieldChange('height')('')}
                        onRecordUpdate={onFieldChange('height')}
                        editMode={isEditMode}
                        editable={true}
                        keyboardType="decimal-pad"
                    />

                    <Record
                        recordTitle="Weight"
                        recordValue={fields.weight || weight}
                        onClearValue={() => onFieldChange('weight')('')}
                        onRecordUpdate={onFieldChange('weight')}
                        editMode={isEditMode}
                        editable={true}
                        keyboardType="decimal-pad"
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
                    <Record
                        recordTitle="Date of Birth"
                        recordValue={isEditMode ? (fields.dob || dob) : dateOfBirth}
                        editMode={isEditMode}
                        editable={true}
                        useDateField={true}
                        maxDate={new Date()}
                        onClearValue={() => onFieldChange('dob')('')}
                        onRecordUpdate={(date) => onFieldChange('dob')(date)}
                    />
                    <Record
                        recordTitle="TRN"
                        recordValue={fields.trn || trn}
                        onClearValue={() => onFieldChange('trn')('')}
                        onRecordUpdate={value => {
                            const val = handleNumberValidation(value, 9);
                            if (val) onFieldChange('trn')(val);
                        }}
                        editMode={isEditMode}
                        editable={true}
                        keyboardType="number-pad"
                    />
                    <Record
                        recordTitle="Gender"
                        recordValue={fields.gender || gender}
                        editMode={isEditMode}
                        editable={true}
                        useDropdown={true}
                        onRecordUpdate={onFieldChange('gender')}
                        options={(
                            <MenuOptions>
                                <MenuOption value="Male" text="Male"/>
                                <MenuOption value="Female" text="Female"/>
                            </MenuOptions>
                        )}
                    />
                </Row>

                <Row>
                    <Record
                        recordTitle="Ethnicity"
                        recordValue={fields.ethnicity || ethnicity}
                        editMode={isEditMode}
                        editable={true}
                        useDropdown={true}
                        onRecordUpdate={onFieldChange('ethnicity')}
                        options={(
                            <MenuOptions>
                                <MenuOption value="Black / African American" text="Black / African American"/>
                                <MenuOption value="White / Caucasian" text="White / Caucasian"/>
                                <MenuOption value="Indian" text="Indian"/>
                                <MenuOption value="Asian" text="Asian"/>
                                <MenuOption value="Hispanic" text="Hispanic"/>
                                <MenuOption value="Other" text="Other"/>
                            </MenuOptions>
                        )}
                    />
                    <Record
                        recordTitle="Blood Type"
                        recordValue={fields.bloodType || bloodType}
                        editMode={isEditMode}
                        editable={true}
                        useDropdown={true}
                        onRecordUpdate={onFieldChange('bloodType')}
                        options={(
                            <MenuOptions>
                                <MenuOption value="A+" text="A+"/>
                                <MenuOption value="A-" text="A-"/>
                                <MenuOption value="B+" text="B+"/>
                                <MenuOption value="B-" text="B-"/>
                                <MenuOption value="O+" text="O+"/>
                                <MenuOption value="O-" text="O-"/>
                                <MenuOption value="AB+" text="AB+"/>
                                <MenuOption value="AB-" text="AB-"/>
                            </MenuOptions>
                        )}
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

        // const updatePhone = (newValue, phoneType) => {
        //     const objIndex = phoneValue.findIndex(obj => obj.type === phoneType);
        //     const updatedObj = {...phoneValue[objIndex], phone: newValue};
        //     const updatedPhones = [
        //         ...phoneValue.slice(0, objIndex),
        //         updatedObj,
        //         ...phoneValue.slice(objIndex + 1),
        //     ];
        //     setPhoneValue(updatedPhones);
        //     return updatedPhones;
        // };
        //
        // const updateEmail = (newValue, emailType) => {
        //     const objIndex = emailValue.findIndex(obj => obj.type === emailType);
        //     const updatedObj = {...emailValue[objIndex], email: newValue};
        //     const updatedEmails = [
        //         ...emailValue.slice(0, objIndex),
        //         updatedObj,
        //         ...emailValue.slice(objIndex + 1),
        //     ];
        //     setEmailValue(updatedEmails);
        //     return updatedEmails;
        // };
        //
        // const handlePhoneChange = (number, phoneType) => {
        //     const formattedNumber = number.replace(/\s/g, '');
        //     const updatedPhones = updatePhone(formatNumber(formattedNumber), phoneType);
        //
        //     if (number === '') {
        //         onFieldChange('phones')(updatePhone('', phoneType));
        //     } else if (/^\d{10}$/g.test(formattedNumber) || !number) {
        //         onFieldChange('phones')(updatedPhones);
        //     }
        // };
        //
        // const handleEmailChange = (email, emailType) => {
        //     const updatedEmails = updateEmail(email, emailType);
        //
        //     if (email === '') {
        //         onFieldChange('emails')(updatedEmails);
        //     } else if (isValidEmail(email) || !email) {
        //         onFieldChange('emails')(updatedEmails);
        //     }
        // };
        //
        // const updatedAddress = (value, key, id) => {
        //     const objIndex = addresses.findIndex(obj => obj._id === id);
        //     let updatedObj = {};
        //     if (key === 'line1') {
        //         updatedObj = {...addresses[objIndex], line1: value};
        //     } else {
        //         updatedObj = {...addresses[objIndex], line2: value};
        //     }
        //
        //     const updatedAddress = [
        //         ...addresses.slice(0, objIndex),
        //         updatedObj,
        //         ...addresses.slice(objIndex + 1),
        //     ];
        //     setAddresses(updatedAddress);
        //
        //     onFieldChange('address')(updatedAddress);
        // };
        //
        // const handleEmergency = (value, key, contactIndex) => {
        //     const objIndex = emergencyContacts.findIndex((ob, index) => index === contactIndex);
        //     let updatedObj = {};
        //     let updatedContacts = [];
        //
        //     if (key === 'name') {
        //         updatedObj = {...emergencyContacts[objIndex], name: value};
        //         updatedContacts = [
        //             ...emergencyContacts.slice(0, objIndex),
        //             updatedObj,
        //             ...emergencyContacts.slice(objIndex + 1),
        //         ];
        //
        //         onFieldChange('emergencyContact')(updatedContacts);
        //     } else if (key === 'relation') {
        //         if (value === '') {
        //             updatedObj = {...emergencyContacts[objIndex], relation: ''};
        //         } else {
        //             // console.log("Value: ", value.trim())
        //             // let splitValue = value.trim().split(' ')
        //
        //             // if (/\((\w)*\)/g.test(value)){
        //             //     console.log("Length 1")
        //             //     name = ""
        //             //     relation = value.replace(/[()]/g, "")
        //             // }else if(/\w*\s*\((\w)*\)/g.test(value.trim()) && splitValue.length === 2){
        //             //     console.log("Length 2")
        //             //     name = splitValue[0]
        //             //     relation = splitValue[1].replace(/[()]/g, "")
        //             // }else {
        //             //     name = splitValue[0].contact(' ', splitValue[1])
        //             //     relation = splitValue[2].replace(/[()]/g, "")
        //             // }
        //
        //             updatedObj = {...emergencyContacts[objIndex], relation: value.trim()};
        //         }
        //
        //         updatedContacts = [
        //             ...emergencyContacts.slice(0, objIndex),
        //             updatedObj,
        //             ...emergencyContacts.slice(objIndex + 1),
        //         ];
        //
        //         onFieldChange('emergencyContact')(updatedContacts);
        //     } else if (key === 'phone') {
        //         const formattedNumber = value.replace(/\s/g, '');
        //         updatedObj = {...emergencyContacts[objIndex], phone: formatNumber(formattedNumber)};
        //
        //         updatedContacts = [
        //             ...emergencyContacts.slice(0, objIndex),
        //             updatedObj,
        //             ...emergencyContacts.slice(objIndex + 1),
        //         ];
        //
        //         if (/^\d{10}$/g.test(formattedNumber) || !value) {
        //             onFieldChange('emergencyContact')(updatedContacts);
        //         }
        //     } else {
        //         updatedObj = {...emergencyContacts[objIndex], email: value};
        //
        //         updatedContacts = [
        //             ...emergencyContacts.slice(0, objIndex),
        //             updatedObj,
        //             ...emergencyContacts.slice(objIndex + 1),
        //         ];
        //
        //         if (isValidEmail(value) || !value) {
        //             onFieldChange('emergencyContact')(updatedContacts);
        //         }
        //     }
        //
        //     setEmergencyContacts(updatedContacts);
        // };

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

                            // return isEditMode ?
                            //     (
                            //         <Record
                            //             recordTitle={title}
                            //             recordValue={formatNumber(phone)}
                            //             editMode={isEditMode}
                            //             editable={true}
                            //         />
                            //     ) :
                            //     (
                            //         <ResponsiveRecord
                            //             key={index}
                            //             recordTitle={title}
                            //             recordValue={phone}
                            //             handleRecordPress={() => {
                            //             }}
                            //         />
                            //     );
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
