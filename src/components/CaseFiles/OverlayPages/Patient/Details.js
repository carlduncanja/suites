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
import {formatDate, calcAge, handleNumberValidation, formatPhoneNumber, isValidEmail, checkObjectProperty} from '../../../../utils/formatter';
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

    const onTabUpdated = updatedFields => setFields({...fields, ...updatedFields});

    useEffect(() => {
        if (isUpdated && !isEditMode) {
            modal.openModal('ConfirmationModal', {
                content: (
                    <ConfirmationComponent
                        isError={false} // boolean to show whether to show an error icon or a success icon
                        isEditUpdate={true}
                        onCancel={() => {
                            // resetState();
                            setPageState({
                                ...pageState,
                                isEditMode: true
                            });
                            setUpdated(false);
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
                setUpdated(false);
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

    const defaultRecordValue = (object, key, defaultValue) => {
        const isPropertyValueValid = checkObjectProperty(object, key);
        return isPropertyValueValid ? object[key] : defaultValue || '--';
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
                        recordValue={defaultRecordValue(fields, 'firstName', firstName)}
                        onClearValue={() => onFieldChange('firstName')('')}
                        onRecordUpdate={onFieldChange('firstName')}
                        editMode={isEditMode}
                        editable={true}
                    />

                    <Record
                        recordTitle="Middle Name"
                        recordValue={defaultRecordValue(fields, 'middleName', middleName)}
                        onClearValue={() => onFieldChange('middleName')('')}
                        onRecordUpdate={onFieldChange('middleName')}
                        editMode={isEditMode}
                        editable={true}
                    />

                    <Record
                        recordTitle="Surname"
                        recordValue={defaultRecordValue(fields, 'surname', surname)}
                        onClearValue={() => onFieldChange('surname')('')}
                        onRecordUpdate={onFieldChange('surname')}
                        editMode={isEditMode}
                        editable={true}
                    />
                </Row>

                <Row>

                    <Record
                        recordTitle="Height"
                        recordValue={defaultRecordValue(fields, 'height', height)}
                        onClearValue={() => onFieldChange('height')('')}
                        onRecordUpdate={onFieldChange('height')}
                        editMode={isEditMode}
                        editable={true}
                        keyboardType="decimal-pad"
                    />

                    <Record
                        recordTitle="Weight"
                        recordValue={defaultRecordValue(fields, 'weight', weight)}
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
                        recordValue={isEditMode ? defaultRecordValue(fields, 'dob', dob) : dateOfBirth}
                        editMode={isEditMode}
                        editable={true}
                        useDateField={true}
                        maxDate={new Date()}
                        onClearValue={() => onFieldChange('dob')('')}
                        onRecordUpdate={date => onFieldChange('dob')(date)}
                    />
                    <Record
                        recordTitle="TRN"
                        recordValue={defaultRecordValue(fields, 'trn', trn)}
                        onClearValue={() => onFieldChange('trn')('')}
                        onRecordUpdate={value => {
                            const val = handleNumberValidation(value, 9);
                            if (val || val === '') onFieldChange('trn')(val);
                        }}
                        editMode={isEditMode}
                        editable={true}
                        keyboardType="number-pad"
                    />
                    <Record
                        recordTitle="Gender"
                        recordValue={defaultRecordValue(fields, 'gender', gender)}
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
                        recordValue={defaultRecordValue(fields, 'ethnicity', ethnicity)}
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
                        recordValue={defaultRecordValue(fields, 'bloodType', bloodType)}
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
        const {contactInfo = {}, address: addresses = []} = tabDetails;
        const {phones = [], emails = []} = contactInfo;

        const [fields, setFields] = useState({
            phones,
            emails
        });

        const handlePhones = () => {
            const cellPhone = phones.find(p => p.type === 'cell');
            const homePhone = phones.find(p => p.type === 'home');
            const workPhone = phones.find(p => p.type === 'work');

            return [
                {
                    type: 'cell',
                    phone: cellPhone ? cellPhone.phone : ''
                },
                {
                    type: 'home',
                    phone: homePhone ? homePhone.phone : ''
                },
                {
                    type: 'work',
                    phone: workPhone ? workPhone.phone : ''
                }
            ];
        };

        const handleEmails = () => {
            const primaryEmail = emails.find(e => e.type === 'primary');
            const otherEmail = emails.find(e => e.type === 'other');
            const workEmail = emails.find(e => e.type === 'work');

            return [
                {
                    type: 'primary',
                    phone: primaryEmail ? primaryEmail.email : ''
                },
                {
                    type: 'other',
                    phone: otherEmail ? otherEmail.email : ''
                },
                {
                    type: 'work',
                    phone: workEmail ? workEmail.email : ''
                }
            ];
        };

        const handleAddresses = () => (addresses.length ? [...addresses] : [
            {
                line1: '',
                line2: ''
            }
        ]);

        const [phoneValues, setPhoneValues] = useState(handlePhones());
        const [emailValues, setEmailValues] = useState(handleEmails());
        const [addressValues, setAddressValues] = useState(handleAddresses());

        const onFieldChange = fieldName => value => {
            const updatedFields = {
                ...fields,
                [fieldName]: value
            };

            setFields(updatedFields);
            onTabUpdated({
                contactInfo: updatedFields,
                address: addressValues
            });
            setUpdated(true);
        };

        const updatePhone = (newValue, phoneType) => {
            const updatedPhones = [...phoneValues];
            updatedPhones.map(p => {
                if (p.type === phoneType) p.phone = newValue;
            });

            setPhoneValues(updatedPhones);
            return updatedPhones;
        };

        const updateEmail = (newValue, emailType) => {
            const updatedEmails = [...emailValues];
            updatedEmails.map(e => {
                if (e.type === emailType) e.email = newValue;
            });

            setEmailValues(updatedEmails);
            return updatedEmails;
        };

        const updateAddress = (value, key, id) => {
            const updatedAddresses = [...addressValues];
            updatedAddresses.map(addressObj => {
                if (addressObj._id === id) addressObj[key] = value;
            });

            setAddressValues(updatedAddresses);
            onFieldChange('address')(updatedAddresses);
        };

        const handlePhoneChange = (number, phoneType) => {
            const formattedNumber = number.replace(/\s/g, ''); // remove whitespaces
            const updatedPhones = updatePhone(formattedNumber, phoneType);

            if (number === '') onFieldChange('phones')(updatePhone('', phoneType));
            else if (/^\d+$/g.test(formattedNumber) || !number) onFieldChange('phones')(updatedPhones);
        };

        const handleEmailChange = (email, emailType) => {
            const updatedEmails = updateEmail(email, emailType);

            if (email === '') onFieldChange('emails')(updatedEmails);
            else if (isValidEmail(email) || !email) onFieldChange('emails')(updatedEmails);
        };

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

        // Patient Phone Values
        const cellPhoneObj = phones.find(p => p.type === 'cell');
        const homePhoneObj = phones.find(p => p.type === 'home');
        const workPhoneObj = phones.find(p => p.type === 'work');

        const cellPhoneRecordValue = cellPhoneObj ? cellPhoneObj.phone : '';
        const homePhoneRecordValue = homePhoneObj ? homePhoneObj.phone : '';
        const workPhoneRecordValue = workPhoneObj ? workPhoneObj.phone : '';

        // an unhealthy way of setting defaults (if edit value (phoneValue) is an empty string, still set it, otherwise, set the value currently pulled from the backend
        const editCellPhoneValue = phoneValues.find(p => p.type === 'cell').phone === '' ?
            phoneValues.find(p => p.type === 'cell').phone :
            phoneValues.find(p => p.type === 'cell').phone || cellPhoneRecordValue;

        const editHomePhoneValue = phoneValues.find(p => p.type === 'home').phone === '' ?
            phoneValues.find(p => p.type === 'home').phone :
            phoneValues.find(p => p.type === 'home').phone || homePhoneRecordValue;

        const editWorkPhoneValue = phoneValues.find(p => p.type === 'work').phone === '' ?
            phoneValues.find(p => p.type === 'work').phone :
            phoneValues.find(p => p.type === 'work').phone || workPhoneRecordValue;

        // Patient Email Values
        const primaryEmailObj = emails.find(e => e.type === 'primary');
        const otherEmailObj = emails.find(e => e.type === 'other');
        const workEmailObj = emails.find(e => e.type === 'work');

        const primaryEmailRecordValue = primaryEmailObj ? primaryEmailObj.email : '';
        const otherEmailRecordValue = otherEmailObj ? otherEmailObj.email : '';
        const workEmailRecordValue = workEmailObj ? workEmailObj.email : '';

        // an unhealthy way of setting defaults (if edit value (emailValue) is an empty string, still set it, otherwise, set the value currently pulled from the backend
        const editPrimaryEmailValue = emailValues.find(e => e.type === 'primary').email === '' ?
            emailValues.find(e => e.type === 'primary').email :
            emailValues.find(e => e.type === 'primary').email || primaryEmailRecordValue;

        const editOtherEmailValue = emailValues.find(e => e.type === 'other').email === '' ?
            emailValues.find(e => e.type === 'other').email :
            emailValues.find(e => e.type === 'other').email || otherEmailRecordValue;

        const editWorkEmailValue = emailValues.find(e => e.type === 'work').email === '' ?
            emailValues.find(e => e.type === 'work').email :
            emailValues.find(e => e.type === 'work').email || workEmailRecordValue;

        return (
            <>
                <Row>
                    {
                        isEditMode ? (
                            <Record
                                recordTitle="Cell Phone Number"
                                recordValue={editCellPhoneValue}
                                onClearValue={() => handlePhoneChange('', 'cell')}
                                onRecordUpdate={value => {
                                    const val = handleNumberValidation(value, 10);
                                    if (val || val === '') handlePhoneChange(value, 'cell');
                                }}
                                editMode={isEditMode}
                                editable={true}
                                keyboardType="number-pad"
                            />
                        ) : (
                            <ResponsiveRecord
                                recordTitle="Cell Phone Number"
                                recordValue={formatPhoneNumber(cellPhoneRecordValue)}
                                handleRecordPress={() => {
                                }}
                            />
                        )
                    }

                    {
                        isEditMode ? (
                            <Record
                                recordTitle="Home Phone Number"
                                recordValue={editHomePhoneValue}
                                onClearValue={() => handlePhoneChange('', 'home')}
                                onRecordUpdate={value => {
                                    const val = handleNumberValidation(value, 10);
                                    if (val || val === '') handlePhoneChange(value, 'home');
                                }}
                                editMode={isEditMode}
                                editable={true}
                                keyboardType="number-pad"
                            />
                        ) : (
                            <ResponsiveRecord
                                recordTitle="Home Phone Number"
                                recordValue={formatPhoneNumber(homePhoneRecordValue)}
                                handleRecordPress={() => {
                                }}
                            />
                        )
                    }

                    {
                        isEditMode ? (
                            <Record
                                recordTitle="Work Phone Number"
                                recordValue={editWorkPhoneValue}
                                onClearValue={() => handlePhoneChange('', 'work')}
                                onRecordUpdate={value => {
                                    const val = handleNumberValidation(value, 10);
                                    if (val || val === '') handlePhoneChange(value, 'work');
                                }}
                                editMode={isEditMode}
                                editable={true}
                                keyboardType="number-pad"
                            />
                        ) : (
                            <ResponsiveRecord
                                recordTitle="Work Phone Number"
                                recordValue={formatPhoneNumber(workPhoneRecordValue)}
                                handleRecordPress={() => {
                                }}
                            />
                        )
                    }
                </Row>

                <Row>
                    {
                        isEditMode ? (
                            <Record
                                recordTitle="Primary Email"
                                recordValue={editPrimaryEmailValue}
                                onClearValue={() => handleEmailChange('', 'primary')}
                                onRecordUpdate={value => handleEmailChange(value, 'primary')}
                                editMode={isEditMode}
                                editable={true}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        ) : (
                            <ResponsiveRecord
                                recordTitle="Primary Email"
                                recordValue={primaryEmailRecordValue}
                                handleRecordPress={() => {
                                }}
                            />
                        )
                    }

                    {
                        isEditMode ? (
                            <Record
                                recordTitle="Alternate Email"
                                recordValue={editOtherEmailValue}
                                onClearValue={() => handleEmailChange('', 'other')}
                                onRecordUpdate={value => handleEmailChange(value, 'other')}
                                editMode={isEditMode}
                                editable={true}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        ) : (
                            <ResponsiveRecord
                                recordTitle="Alternate Email"
                                recordValue={otherEmailRecordValue}
                                handleRecordPress={() => {
                                }}
                            />
                        )
                    }

                    {
                        isEditMode ? (
                            <Record
                                recordTitle="Work Email"
                                recordValue={editWorkEmailValue}
                                onClearValue={() => handleEmailChange('', 'work')}
                                onRecordUpdate={value => handleEmailChange(value, 'work')}
                                editMode={isEditMode}
                                editable={true}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        ) : (
                            <ResponsiveRecord
                                recordTitle="Work Email"
                                recordValue={workEmailRecordValue}
                                handleRecordPress={() => {
                                }}
                            />
                        )
                    }
                </Row>

                {
                    isEditMode ? (
                        addressValues.map((item, index) => (
                            <Row key={index}>
                                <View style={{flex: 2}}>
                                    <Record
                                        recordTitle="Address 1"
                                        recordValue={item.line1}
                                        onClearValue={() => updateAddress('', 'line1', item._id)}
                                        onRecordUpdate={value => updateAddress(value, 'line1', item._id)}
                                        editMode={isEditMode}
                                        editable={true}
                                    />
                                </View>

                                <Record
                                    recordTitle="Address 2"
                                    recordValue={item.line2}
                                    onClearValue={() => updateAddress('', 'line2', item._id)}
                                    onRecordUpdate={value => updateAddress(value, 'line2', item._id)}
                                    editMode={isEditMode}
                                    editable={true}
                                />
                            </Row>
                        ))
                    ) : (
                        addresses.map((item, index) => (
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
                        ))
                    )
                }
            </>
        );
    };

    const EmergencyData = () => {
        const {contactInfo = {}} = tabDetails;
        const {emergencyContact: emergencyContacts = []} = contactInfo;

        const [fields, setFields] = useState({emergencyContact: emergencyContacts});

        const handleEmergencyContacts = () => (emergencyContacts.length ? [...emergencyContacts] : [
            {
                email: '',
                name: '',
                phone: '',
                relation: ''
            }
        ]);

        const [emergencyContactsValues, setEmergencyContactsValues] = useState(handleEmergencyContacts());

        return (
            <>
                {
                    isEditMode ? (
                        emergencyContactsValues.map((contact, index) => {
                            const {relation = '', email = '', phone = '', name = ''} = contact;
                            return (
                                <React.Fragment key={index}>
                                    <Row>
                                        <Record
                                            recordTitle={`Emergency Contact ${index + 1}'s Name`}
                                            recordValue={name}
                                            // onClearValue={() => handleEmergency('', 'name', index)}
                                            // onRecordUpdate={value => handleEmergency(value, 'name', index)}
                                            editMode={isEditMode}
                                            editable={true}
                                        />

                                        <Record
                                            recordTitle={`Emergency Contact ${index + 1}'s Relation`}
                                            recordValue={relation}
                                            // onClearValue={() => handleEmergency('', 'relation', index)}
                                            // onRecordUpdate={value => handleEmergency(value, 'relation', index)}
                                            editMode={isEditMode}
                                            editable={true}
                                        />
                                    </Row>

                                    <Row>
                                        <Record
                                            recordTitle={`Emergency Contact ${index + 1}'s Phone Number`}
                                            recordValue={phone}
                                            // onClearValue={() => handleEmergency('', 'phone', index)}
                                            // onRecordUpdate={value => handleEmergency(value, 'phone', index)}
                                            editMode={isEditMode}
                                            editable={true}
                                        />

                                        <Record
                                            recordTitle={`Emergency Contact ${index + 1}'s Email`}
                                            recordValue={email}
                                            // onClearValue={() => handleEmergency('', 'email', index)}
                                            // onRecordUpdate={value => handleEmergency(value, 'email', index)}
                                            editMode={isEditMode}
                                            editable={true}
                                        />
                                    </Row>
                                </React.Fragment>
                            );
                        })
                    ) : (
                        emergencyContacts.map((contact, index) => {
                            const {relation = '', email = '', phone = '', name = ''} = contact;
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
                        })
                    )
                }
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
