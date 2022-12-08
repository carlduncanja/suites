import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { MenuOptions, MenuOption } from 'react-native-popup-menu';
import moment from 'moment';
import InputField2 from '../common/Input Fields/InputField2';
import SearchableOptionsField from '../common/Input Fields/SearchableOptionsField';
import DateInputField from '../common/Input Fields/DateInputField';
import OptionsField from '../common/Input Fields/OptionsField';
import Button from '../common/Buttons/Button';
import { getCategories, addCategory } from '../../api/network'
import { useModal } from "react-native-modalfy";
import { formatDate, transformToSentence, calcAge, isValidEmail, handleNumberValidation } from '../../utils/formatter';
import ConfirmationComponent from '../ConfirmationComponent';

const EditablePhysiciansDetailsTab = ({ fields, onFieldChange }) => {

    const modal =  useModal();

    const [docterFeild, setDocterFeild] = useState('')
    const [docterFieldResult, setDocterFieldResult] = useState([])
    const [searchDocterFieldQuery, setSearchDocterFeildQuery] = useState({})
    const [valueState, setValueState] = useState({ name: fields.field })
    const handlePhones = () => {

        let newPhoneArray = [...fields.phones];

        const cellPhone = fields.phones.filter(phone => phone.type === 'cell');
        const homePhone = fields.phones.filter(phone => phone.type === 'home');
        const workPhone = fields.phones.filter(phone => phone.type === 'work');

        if (cellPhone.length > 0) {
           
        } else {
            newPhoneArray = [...newPhoneArray, {
                type: 'cell',
                phone: ''
            }];
        }

        if (workPhone.length > 0) {
            newPhoneArray = newPhoneArray;
        } else {
            newPhoneArray = [...newPhoneArray, {
                type: 'work',
                phone: ''
            }];
        }

        if (homePhone.length > 0) {
            newPhoneArray = newPhoneArray;
        } else {
            newPhoneArray = [...newPhoneArray, {
                type: 'home',
                phone: ''
            }];
        }

        return newPhoneArray;
    };

    useEffect(() => {
        fetchCategories();
    }, [docterFeild])

    const fetchCategories = () => {
        getCategories("staff", 1000, docterFeild)
            .then((categoriesData) => {
                const { data = [], page } = categoriesData
                const fulldata = data.map(cats => {
                    const { _id = '', name = '', status = '' } = cats
                    return { _id: _id, name: name, status: status }
                })

                setDocterFieldResult(fulldata || []);
            })
            .catch(error => {
                console.log('Unable to retrieve physician category items: ', error);
            });
    }
    const createCategory = (name) => {

        if (!name) return;
        addCategory({ name: name, type: "staff" })
            .then(_ => {
                onFieldChange('field')('')
                fetchCategories();
                modal.openModal('ConfirmationModal', {
                    content: <ConfirmationComponent
                        isEditUpdate={false}
                        isError={false}
                        onCancel={() => {
                            modal.closeModals('ConfirmationModal');
                        }}
                        onAction={() => {
                            modal.closeModals('ConfirmationModal');
                        }}
                    />,
                    onClose: () => {
                        modal.closeModals('ConfirmationModal');
                    },
                });
            })
            .catch(error => {
                modal.openModal('ConfirmationModal', {
                    content: <ConfirmationComponent
                        isEditUpdate={false}
                        isError={true}
                        onCancel={() => {
                            modal.closeModals('ConfirmationModal');
                        }}
                        onAction={() => {
                            modal.closeModals('ConfirmationModal');
                        }}
                    />,
                    onClose: () => {
                        modal.closeModals('ConfirmationModal');
                    },
                });
                console.log(error);
            })
    };

    const handleEmails = () => {
        let newEmailArray = [...fields.emails];

        const primaryEmail = fields.emails.filter(email => email.type === 'primary');
        const otherEmail = fields.emails.filter(email => email.type === 'other');
        const workEmail = fields.emails.filter(email => email.type === 'work');

        if (primaryEmail.length === 0) {
            newEmailArray = [...newEmailArray, {
                type: 'primary',
                email: ''
            }];
        }

        if (otherEmail.length === 0) {
            newEmailArray = [...newEmailArray, {
                type: 'other',
                email: ''
            }];
        }

        if (workEmail.length === 0) {
            newEmailArray = [...newEmailArray, {
                type: 'work',
                email: ''
            }];
        }

        return newEmailArray;
    };

    const handleAddress = () => {
        let newAddress = [...fields.address];
        if (newAddress.length === 0) {
            newAddress = [{
                line1: '',
                line2: ''
            }];
        }
        return newAddress;
    };

    const handleEmergencyContact = () => {
        let newEmergency = [...fields.emergencyContact];
        if (newEmergency.length === 0) {
            newEmergency = [{
                email: '',
                name: '',
                phone: '',
                relation: ''
            }];
        }
        return newEmergency;
    };

    const [phoneValue, setPhoneValue] = useState(handlePhones());
    const [emailValue, setEmailValue] = useState(handleEmails());
    const [addresses, setAddresses] = useState(handleAddress());
    const [emergencyContacts, setEmergencyContacts] = useState(handleEmergencyContact());
    const [dateOfBirth, setDateOfBirth] = useState(formatDate(fields.dob, 'DD/MM/YYYY'));
    const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
    const [emergencyIndex, setEmergencyIndex] = useState(0);
    const [popoverList, setPopoverList] = useState([
        {
            name: 'emergency1',
            status: false
        },
        {
            name: 'emergency2',
            status: false
        }
    ]);

    // ######## Helper Functions

    const formatTrn = value => value.replace(/(\d{3})(\d{3})(\d{3})/, '$1-$2-$3');

    const formatNumber = value => value.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');

    const formatDOB = date => {
        const parts = date.split('/');
        const newDate = new Date(parts[2], parts[1] - 1, parts[0]);
        return newDate;
    };

    const formatEmergencyName = (name, relation) => (`${name} (${relation})`).trim();

    const updatePhone = (newValue, phoneType) => {
        const objIndex = phoneValue.findIndex(obj => obj.type === phoneType);
        const updatedObj = { ...phoneValue[objIndex], phone: newValue };
        const updatedPhones = [
            ...phoneValue.slice(0, objIndex),
            updatedObj,
            ...phoneValue.slice(objIndex + 1),
        ];
        setPhoneValue(updatedPhones);
        return updatedPhones;
    };

    const updateEmail = (newValue, emailType) => {
        const objIndex = emailValue.findIndex(obj => obj.type === emailType);
        const updatedObj = { ...emailValue[objIndex], email: newValue };
        const updatedEmails = [
            ...emailValue.slice(0, objIndex),
            updatedObj,
            ...emailValue.slice(objIndex + 1),
        ];
        setEmailValue(updatedEmails);
        return updatedEmails;
    };


    const divider = (
        <View style={{
            backgroundColor: '#CCD6E0',
            height: 1,
            borderRadius: 2,
            marginTop: 8,
            marginBottom: 38
        }}
        />
    );

    // ######## Event Handlers

    const handlePhoneChange = (number, phoneType) => {
        const formattedNumber = number.replace(/\s/g, '');
        const updatedPhones = updatePhone(formatNumber(formattedNumber), phoneType);

        if (number === '') {
            onFieldChange('phones')(updatePhone('', phoneType));
        } else if (/^\d{10}$/g.test(formattedNumber) || !number) {
            onFieldChange('phones')(updatedPhones);
        }
    };

    const handleEmailChange = (email, emailType) => {
        const updatedEmails = updateEmail(email, emailType);

        if (email === '') {
            onFieldChange('emails')(updatedEmails);
        } else if (isValidEmail(email) || !email) {
            onFieldChange('emails')(updatedEmails);
        }
    };

    const updatedAddress = (value, key, id) => {
        const objIndex = addresses.findIndex(obj => obj._id === id);
        let updatedObj = {};
        if (key === 'line1') {
            updatedObj = { ...addresses[objIndex], line1: value };
        } else {
            updatedObj = { ...addresses[objIndex], line2: value };
        }

        const updatedAddress = [
            ...addresses.slice(0, objIndex),
            updatedObj,
            ...addresses.slice(objIndex + 1),
        ];
        setAddresses(updatedAddress);

        onFieldChange('address')(updatedAddress);
    };

    const handleEmergency = (value, key, contactIndex) => {
        const objIndex = emergencyContacts.findIndex((ob, index) => index === contactIndex);
        let updatedObj = {};
        let updatedContacts = [];

        if (key === 'name') {
            updatedObj = { ...emergencyContacts[objIndex], name: value };
            updatedContacts = [
                ...emergencyContacts.slice(0, objIndex),
                updatedObj,
                ...emergencyContacts.slice(objIndex + 1),
            ];

            onFieldChange('emergencyContact')(updatedContacts);
        } else if (key === 'relation') {
            if (value === '') {
                updatedObj = { ...emergencyContacts[objIndex], relation: '' };
            } else {
                // console.log("Value: ", value.trim())
                // let splitValue = value.trim().split(' ')

                // if (/\((\w)*\)/g.test(value)){
                //     console.log("Length 1")
                //     name = ""
                //     relation = value.replace(/[()]/g, "")
                // }else if(/\w*\s*\((\w)*\)/g.test(value.trim()) && splitValue.length === 2){
                //     console.log("Length 2")
                //     name = splitValue[0]
                //     relation = splitValue[1].replace(/[()]/g, "")
                // }else {
                //     name = splitValue[0].contact(' ', splitValue[1])
                //     relation = splitValue[2].replace(/[()]/g, "")
                // }

                updatedObj = { ...emergencyContacts[objIndex], relation: value.trim() };
            }

            updatedContacts = [
                ...emergencyContacts.slice(0, objIndex),
                updatedObj,
                ...emergencyContacts.slice(objIndex + 1),
            ];

            onFieldChange('emergencyContact')(updatedContacts);
        } else if (key === 'phone') {
            const formattedNumber = value.replace(/\s/g, '');
            updatedObj = { ...emergencyContacts[objIndex], phone: formatNumber(formattedNumber) };

            updatedContacts = [
                ...emergencyContacts.slice(0, objIndex),
                updatedObj,
                ...emergencyContacts.slice(objIndex + 1),
            ];

            if (/^\d{10}$/g.test(formattedNumber) || !value) {
                onFieldChange('emergencyContact')(updatedContacts);
            }
        } else {
            updatedObj = { ...emergencyContacts[objIndex], email: value };

            updatedContacts = [
                ...emergencyContacts.slice(0, objIndex),
                updatedObj,
                ...emergencyContacts.slice(objIndex + 1),
            ];

            if (isValidEmail(value) || !value) {
                onFieldChange('emergencyContact')(updatedContacts);
            }
        }

        setEmergencyContacts(updatedContacts);
    };

    const handleDateValidation = date => {
        onFieldChange('dob')(date);
    };

    const handleDOB = date => {
        const updatedDob = formatDOB(date);
        if (/(\d{2})\/(\d{2})\/(\d{4})/g.test(date) || !date) {
            onFieldChange('dob')(updatedDob);
        }
        setDateOfBirth(date);
    };

    const openEmergencyName = index => {
        console.log('E indexx:', index);
        setEmergencyIndex(index);
        setIsEmergencyOpen(!isEmergencyOpen);
    };

    const onAddEmergency = () => {
        console.log('Emergency Contacts: ', emergencyContacts);
        const updatedEmergency = [...emergencyContacts, {
            email: '',
            name: '',
            phone: '',
            relation: ''
        }];
        setEmergencyContacts(updatedEmergency);
    };

    const handlePopovers = popoverValue => popoverItem => {
        let updatedPopovers = [];
        if (!popoverItem) {
            updatedPopovers = popoverList.map(item => ({
                ...item,
                status: false
            }));

            // setPopoverList(updatedPopovers)
        } else {
            const objIndex = popoverList.findIndex(obj => obj.name === popoverItem);
            const updatedObj = { ...popoverList[objIndex], status: popoverValue };
            updatedPopovers = [
                ...popoverList.slice(0, objIndex),
                updatedObj,
                ...popoverList.slice(objIndex + 1),
            ];
            // setPopoverList(updatedPopovers)
        }
        setPopoverList(updatedPopovers);
    };

    const demoData = (
        <>

            <View style={styles.row}>

                <View style={styles.fieldWrapper}>

                    <View style={{ marginBottom: 5, }}>
                        <Text style={styles.title}>First Name</Text>
                    </View>

                    <View style={styles.inputWrapper}>
                        <InputField2
                            onChangeText={onFieldChange('firstName')}
                            value={fields.firstName}
                            onClear={() => onFieldChange('firstName')('')}
                        />
                    </View>

                </View>

                <View style={styles.fieldWrapper}>
                    <View style={{ flex: 1, marginBottom: 5 }}>
                        <Text style={styles.title}>Middle Name</Text>
                    </View>

                    <View style={styles.inputWrapper}>
                        <InputField2
                            onChangeText={onFieldChange('middleName')}
                            value={fields.middleName}
                            onClear={() => {
                                onFieldChange('middleName')('');
                            }}
                        />
                    </View>
                </View>

                <View style={styles.fieldWrapper}>
                    <View style={{ marginBottom: 5 }}>
                        <Text style={styles.title}>Surname</Text>
                    </View>

                    <View style={styles.inputWrapper}>
                        <InputField2
                            onChangeText={onFieldChange('surname')}
                            value={fields.surname}
                            onClear={() => {
                                onFieldChange('surname')('');
                            }}
                        />
                    </View>
                </View>

            </View>

            <View style={styles.row}>

                <View style={styles.fieldWrapper}>
                    <View style={{ marginBottom: 5 }}>
                        <Text style={styles.title}>Age</Text>
                    </View>
                    <View style={styles.inputWrapper}>
                        <Text>{calcAge(new Date(fields.dob)) || 0}</Text>
                    </View>
                </View>

                <View style={styles.fieldWrapper}>
                    <View style={{ marginBottom: 5 }}>
                        <Text style={styles.title}>Gender</Text>
                    </View>

                    <View style={styles.inputWrapper}>
                        <OptionsField
                            text={transformToSentence(fields.gender)}
                            oneOptionsSelected={onFieldChange('gender')}
                            menuOption={(
                                <MenuOptions>
                                    <MenuOption value="Male" text="Male" />
                                    <MenuOption value="Female" text="Female" />
                                </MenuOptions>
                            )}
                        />
                    </View>
                </View>

                <View style={styles.fieldWrapper}>
                    <View style={{ marginBottom: 5 }}>
                        <Text style={styles.title}>Date Of Birth</Text>
                    </View>

                    <View style={styles.inputWrapper}>
                        <DateInputField
                            value={formatDate(fields.dob || new Date(), 'DD/MM/YYYY')}
                            onClear={() => onFieldChange('dob')('')}
                            keyboardType="number-pad"
                            mode="date"
                            format="DD/MM/YYYY"
                            placeholder="DD/MM/YYYY"
                            onDateChange={handleDateValidation}
                            maxDate={new Date(moment().subtract(1, 'days'))}
                        />
                    </View>
                </View>

            </View>

            <View style={styles.row}>

                <View style={styles.fieldWrapper}>
                    <View style={{ marginBottom: 5 }}>
                        <Text style={styles.title}>TRN</Text>
                    </View>

                    <View style={styles.inputWrapper}>
                        <InputField2
                            onChangeText={value => {
                                const val = handleNumberValidation(value, 9);
                                if (val || val === '') onFieldChange('trn')(val);
                            }}
                            value={fields.trn}
                            onClear={() => onFieldChange('trn')('')}
                        />
                    </View>
                </View>

                <View style={styles.fieldWrapper}>
                    <View style={{ marginBottom: 5 }}>
                        <Text style={styles.title}>Specialization</Text>
                    </View>
                    <SearchableOptionsField
                        value={valueState}
                        placeholder="Please Choose A Specialization"
                        onClear={() => {
                            setSearchDocterFeildQuery(" ")
                            onFieldChange('field')('')
                            setValueState("")
                        }}
                        onChangeText={(value) => {
                            //setValueState(value)
                            setDocterFeild(value)
                        }}
                        oneOptionsSelected={(value) => {
                            onFieldChange('field')(value.name)
                        }}
                        options={docterFieldResult}
                        showActionButton={true}
                        updateDB={createCategory}
                        isPopoverOpen={searchDocterFieldQuery}
                        handlePatient={(value) => {
                            setValueState(value)
                            onFieldChange('field')(value.name)
                        }}
                        text={docterFeild}
                    />

                </View>

                <View style={styles.fieldWrapper} />
            </View>
        </>
    );

    const contactData = (
        <>

            <View style={styles.row}>
                {phoneValue.map((phone, index) => {
                    const { type } = phone;
                    const number = phone.phone;
                    const title = type === 'cell' ? 'Cell Phone' : type === 'home' ? 'Home Phone' : type === 'work' ? 'Work Phone' : null;
                    return (
                        <View style={styles.fieldWrapper} key={index}>
                            <View style={{ marginBottom: 5 }}>
                                <Text style={styles.title}>{title}</Text>
                            </View>

                            <View style={styles.inputWrapper}>
                                <InputField2
                                    onChangeText={value => handlePhoneChange(value, type)}
                                    value={formatNumber(number)}
                                    onClear={() => handlePhoneChange('', type)}
                                    keyboardType="number-pad"
                                />
                            </View>
                        </View>

                    );
                })}
            </View>

            <View style={styles.row}>
                {emailValue.map((email, index) => {
                    const { type } = email;
                    const emailAddress = email.email;
                    const title = type === 'primary' ? 'Primary Email' : type === 'other' ? 'Alternate Email' : type === 'work' ? 'Work Email' : null;
                    return (
                        <View style={styles.fieldWrapper} key={index}>
                            <View style={{ marginBottom: 5 }}>
                                <Text style={styles.title}>{title}</Text>
                            </View>

                            <View style={styles.inputWrapper}>
                                <InputField2
                                    onChangeText={value => handleEmailChange(value, type)}
                                    value={emailAddress}
                                    onClear={() => handleEmailChange('', type)}
                                    keyboardType="email-address"
                                />
                            </View>
                        </View>

                    );
                })}
            </View>

            <View style={{}}>
                {addresses.map((addressObj, index) => (
                    <View key={index} style={{ flexDirection: 'row', flex: 1 }}>

                        <View style={[{ paddingRight: 35, width: '33%', marginBottom: 30 }]}>
                            <View style={{ marginBottom: 5 }}>
                                <Text style={styles.title}>Address 1</Text>
                            </View>

                            <View style={styles.inputWrapper}>
                                <InputField2
                                    onChangeText={value => updatedAddress(value, 'line1', addressObj._id)}
                                    value={addressObj.line1}
                                    onClear={() => {
                                        updatedAddress('', 'line1', addressObj._id);
                                    }}
                                />
                            </View>
                        </View>

                        <View style={styles.fieldWrapper}>
                            <View style={{ marginBottom: 5 }}>
                                <Text style={styles.title}>Address 2</Text>
                            </View>

                            <View style={styles.inputWrapper}>
                                <InputField2
                                    onChangeText={value => updatedAddress(value, 'line2', addressObj._id)}
                                    value={addressObj.line2}
                                    onClear={() => {
                                        updatedAddress('', 'line2', addressObj._id);
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                ))}
            </View>

        </>
    );

    const emergencyContactData = (
        <>
            <View style={{}}>

                {emergencyContacts.map((contact, index) => {
                    const isOpen = popoverList.filter(item => item.name === `emergency${index + 1}`);
                    return (
                        <View style={{ width: '100%', zIndex: index === 1 ? -1 : 0 }} key={index}>

                            <View style={{ marginBottom: 10 }}>
                                <Text>Emergency Contact {index + 1}</Text>
                            </View>

                            <>
                                {/* <TouchableOpacity
                                style={{paddingRight:35, width:'33%', marginBottom:30, zIndex:1}}
                                onPress = {()=>{openEmergencyName(index); handlePopovers(true)(`emergency${index + 1}`)}}
                                activeOpacity = {1}
                            >
                                <View style={{ marginBottom:5}}>
                                    <Text style={[styles.title,{fontSize:12}]}>Emergency Contact Name {index + 1}</Text>
                                </View>

                                <View style={[styles.inputWrapper]}>
                                    {/* <View style={styles.inputField}>
                                        <Text>
                                            {`${contact.name} (${contact.relation})`}
                                        </Text>
                                    </View> */}

                                {/* <InputField2
                                        onChangeText = {()=>{}}
                                        value = {`${contact.name} (${contact.relation})`}
                                        onClear = {()=>{}}
                                    />
                                    { isEmergencyOpen && index === emergencyIndex && isOpen[0].status &&
                                        <View style={styles.modalContainer}>
                                            <InputField2
                                                label = "Name"
                                                onChangeText = {(value)=>handleEmergency(value, 'name', contact._id )}
                                                value = {contact.name}
                                                onClear = {()=>handleEmergency('', 'name', contact._id)}
                                            />

                                            <InputField2
                                                label = "Relation"
                                                onChangeText = {(value)=>handleEmergency(value, 'relation', contact._id )}
                                                value = {contact.relation}
                                                onClear = {()=>handleEmergency('', 'relation', contact._id)}
                                            />

                                        </View>
                                    }
                                </View>
                            </TouchableOpacity>
 */}
                                <View style={[styles.row]}>

                                    <View style={{ paddingRight: 35, flex: 1, marginBottom: 30, zIndex: -1 }}>
                                        <View style={{ marginBottom: 5 }}>
                                            <Text style={[styles.title, { fontSize: 12 }]}>Name</Text>
                                        </View>

                                        <View style={styles.inputWrapper}>
                                            <InputField2
                                                onChangeText={value => handleEmergency(value, 'name', index)}
                                                value={contact.name}
                                                onClear={() => handleEmergency('', 'name', index)}
                                            />
                                        </View>
                                    </View>

                                    <View style={{ paddingRight: 35, flex: 1, marginBottom: 30, zIndex: -1 }}>
                                        <View style={{ marginBottom: 5 }}>
                                            <Text style={[styles.title, { fontSize: 12 }]}>Relation</Text>
                                        </View>

                                        <View style={styles.inputWrapper}>
                                            <InputField2
                                                onChangeText={value => handleEmergency(value, 'relation', index)}
                                                value={contact.relation}
                                                onClear={() => handleEmergency('', 'relation', index)}
                                            />
                                        </View>
                                    </View>

                                </View>

                                <View style={[styles.row]}>

                                    <View style={{ paddingRight: 35, flex: 1, marginBottom: 30, zIndex: -1 }}>
                                        <View style={{ marginBottom: 5 }}>
                                            <Text style={[styles.title, { fontSize: 12 }]}>Phone</Text>
                                        </View>

                                        <View style={styles.inputWrapper}>
                                            <InputField2
                                                onChangeText={value => handleEmergency(value, 'phone', index)}
                                                value={contact.phone}
                                                onClear={() => handleEmergency('', 'phone', index)}
                                                keyboardType="number-pad"
                                            />
                                        </View>
                                    </View>

                                    <View style={{ paddingRight: 35, flex: 1, marginBottom: 30, zIndex: -2 }}>
                                        <View style={{ marginBottom: 5 }}>
                                            <Text style={[styles.title, { fontSize: 12 }]}>Email</Text>
                                        </View>

                                        <View style={styles.inputWrapper}>
                                            <InputField2
                                                onChangeText={value => handleEmergency(value, 'email', index)}
                                                value={contact.email}
                                                onClear={() => handleEmergency('', 'email', index)}
                                                keyboardType="email-address"
                                            />
                                        </View>
                                    </View>

                                </View>

                            </>
                        </View>

                    );
                })}
                {
                    emergencyContacts.length < 2 &&
                    <View style={{
                        zIndex: -1,
                        padding: 15,
                        paddingTop: 10,
                        paddingBottom: 10,
                        backgroundColor: '#83AED1',
                        alignSelf: 'center',
                        alignItems: 'center'
                    }}
                    >
                        <Button
                            title="Add Emergency Contact"
                            backgroundColor="#83AED1"
                            color="#FFFFFF"
                            buttonPress={() => {
                                onAddEmergency();
                            }}
                        />
                    </View>

                }
            </View>
        </>
    );

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            enabled
            keyboardVerticalOffset={300}
            behavior="padding"
        >
            <ScrollView
                bounces={true}
                // fadingEdgeLength = {100}
                contentContainerStyle={{ paddingBottom: 40 }}
            >
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => handlePopovers(false)()}
                >
                    {demoData}
                    {divider}
                    {contactData}
                    {divider}
                    {emergencyContactData}
                </TouchableOpacity>

            </ScrollView>
        </KeyboardAvoidingView>

    );
};

EditablePhysiciansDetailsTab.propTypes = {};
EditablePhysiciansDetailsTab.defaultProps = {};

export default EditablePhysiciansDetailsTab;

const styles = StyleSheet.create({
    section: {},
    row: { flexDirection: 'row' },
    fieldWrapper: {
        flex: 1,
        marginRight: 35,
        marginBottom: 30,
        flexDirection: 'column',

    },
    inputWrapper: {
        // flex:1,
        height: 30,
        // width:'100%',
        justifyContent: 'center',
    },
    title: {
        color: '#718096',
        fontSize: 16,
        // marginBottom:5
    },
    modalContainer: {
        position: 'absolute',
        padding: 10,
        backgroundColor: '#FFFFFF',
        width: 300,
        height: 100,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 8,
        borderWidth: 1,
        borderColor: '#E3E8EF',
        borderRadius: 4,
    },
    inputField: {
        flex: 1,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#E3E8EF',
        borderRadius: 4,
        height: 32,
        padding: 10,
        paddingBottom: 2,
        paddingTop: 2
    }

});
