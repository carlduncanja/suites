import React,{ useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import InputField2 from "../common/Input Fields/InputField2";
import OptionsField from "../common/Input Fields/OptionsField";
import { MenuOptions, MenuOption } from 'react-native-popup-menu';
import DateInputField from "../common/Input Fields/DateInputField";
import moment from 'moment';
import MultipleSelectionsField from "../common/Input Fields/MultipleSelectionsField";
import { addCategory, getCategories } from "../../api/network";
import { useModal } from "react-native-modalfy";
import ConfirmationComponent from "../ConfirmationComponent";
import SearchableOptionsField from "../common/Input Fields/SearchableOptionsField";
import InputLabelComponent from "../common/InputLablel";



const PhysiciansDetailsTab = ({ onFieldChange, fields, errorFields, setAboveOpen = () => {} }) =>{
    const [attemptedSubmit, setAttemptedSubmit] = useState(false);
    const [patientValue, setPatient] = useState(undefined);
    const modal = useModal();
    const templateText = {
        true: "Yes",
        false: "No"
    }
    const [dateText, setDateText] = useState(fields['dob'])
    const [trnText, setTrnText] = useState(fields['trn'])

    const handleDateValidation = (date) => {
        onFieldChange('dob')(date)
    }

    const handleTrnValidation = (trnValue) => {
        if (trnValue.toString().length > 9) return;
        if (/^\d{9}$/g.test(trnValue) || !trnValue) {
            onFieldChange('trn')(trnValue)
        }
        setTrnText(trnValue)
    }

    // Category Search
    const [categories, setCategories] = useState([])
    const [categorySearchValue, setCategorySearchValue] = useState();
    const [categorySearchResults, setCategorySearchResult] = useState([]);

    const [valueState, setValueState] = useState({ name: fields.field });
    const [searchDocterFieldQuery, setSearchDocterFeildQuery] = useState({});
    const [docterFeild, setDocterFeild] = useState('');
    const [docterFieldResult, setDocterFieldResult] = useState([]);

    const handleCategorySelected = (checkCategories) => {
        const categoryIds = [];

        checkCategories.map((name) => {
            const value = categories.find(item => item.name === name);
            value && categoryIds.push(value._id);
        });

        onFieldChange('categories')(categoryIds);
    }
    
    const fetchCategories = () => {
        getCategories("staff", 1000, docterFeild)
            .then(categoriesData => {
                const { data = [], page } = categoriesData
                const fulldata = data.map(cats => {
                    const { _id = '', name = '', status = '' } = cats
                    return { _id: _id, name: name, status: status }
                });
                
                setDocterFieldResult(fulldata || []);
            })
            .catch(error => {
                console.log('Unable to retrieve physician category items: ', error);
            });
    }

    useEffect(() => {
        fetchCategories();
    }, [docterFeild]);
    
    const createCategory = (name, handlePatientFunc, setSelectedValueFunc) => {
        if(!name) return;
        addCategory({ name: name, type: "staff" })
            .then(_ => {
                setAboveOpen(false);
                handlePatientFunc({ name: name, type: "staff" });
                setSelectedValueFunc({ name: name, type: "staff" })
                setDocterFeild("");
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

    return (
        <View style={styles.sectionContainer}>

            <View style={styles.row}>

                <View style={styles.inputWrapper}>
                    <InputField2
                        label={"First Name"}
                        onChangeText={onFieldChange('firstName')}
                        value={fields['firstName']}
                        onClear={() => onFieldChange('firstName')('')}
                        hasError = {errorFields['firstName']}
                        errorMessage = "Name must be filled."
                    />
                </View>
                <View style={[styles.inputWrapper]}>
                    <InputField2
                        label={"Middle Name"}
                        onChangeText={onFieldChange('middleName')}
                        value={fields['middleName']}
                        onClear={() => onFieldChange('middleName')('')}
                    />
                </View>

            </View>

            <View style={styles.row}>

                <View style={styles.inputWrapper}>
                    <InputField2
                        label={"Surname"}
                        onChangeText={onFieldChange('surname')}
                        value={fields['surname']}
                        onClear={() => onFieldChange('surname')('')}
                        hasError = {errorFields['surname']}
                        errorMessage = "Name must be filled."
                    />
                </View>

                <View style={styles.inputWrapper}>
                    <InputField2
                        label={"Contact"}
                        onChangeText={onFieldChange('phone')}
                        value={fields['phone']}
                        onClear={() => onFieldChange('phone')('')}
                        hasError = {errorFields['phone']}
                        errorMessage = "Please provide contact."
                    />
                </View>
                
            </View>

            <View style={styles.row}>
                <View style={styles.inputWrapper}>
                    <InputLabelComponent label={'Specialization'} />
                    <SearchableOptionsField
                        setIsOpen={setAboveOpen}
                        isMedium={true}
                        value={valueState}
                        onClear={() => {
                            setSearchDocterFeildQuery(" ")
                            setDocterFeild("")
                            onFieldChange('field')('')
                            setValueState("")
                        }}
                        onChangeText={(value) => {
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
            </View>
        </View>
    )
}

PhysiciansDetailsTab.propTypes = {}
PhysiciansDetailsTab.defaultProps = {}

export default PhysiciansDetailsTab

const styles = StyleSheet.create({
    sectionContainer: {
        height: 190,
        backgroundColor: '#FFFFFF',
        flexDirection: 'column',
        padding: 24,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    rightRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        display: 'flex',
        marginLeft: 'auto',
        zIndex: 10

    },
    inputWrapper: {
        width: 260,
        flexDirection: 'row',
    }
})
