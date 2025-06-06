import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import OverlayDialog from "../common/Dialog/OverlayDialog";
import DialogTabs from "../common/Dialog/DialogTabs";
import InputField2 from "../common/Input Fields/InputField2";
import DropdownInputField from "../common/Input Fields/DropdownInputField";
import { withModal, useModal } from 'react-native-modalfy';
import ConfirmationComponent from '../ConfirmationComponent';
import InputUnitField from "../common/Input Fields/InputUnitFields";
import SearchableOptionsField from '../common/Input Fields/SearchableOptionsField';
import CustomSearchableOptionsField from '../common/Input Fields/CustomSearchableOptionsField';
import DateInputField from '../common/Input Fields/DateInputField';
import { connect } from 'react-redux';
import { getTheatres, createTheatre, createNewProcedure, updateCaseFile, updateAppointmentById, updatePatient as patientUpdater, getUsersCall, getProcedures, getCaseFiles, createCaseFile, createAppointment, getAppointmentById, getPhysicians } from '../../api/network';
import _, { reduce, set } from "lodash";
import moment from 'moment';
import { formatDate } from '../../utils/formatter';
/**
 * Component to handle the create storage process.
 *
 * @param onCancel
 * @param onCreated
 * @param appiontment
 * @returns {*}
 * @constructor
 */

const EditWorkItemDialogContainer = ({ onCancel, onCreated, appiontment, refreshShedule = () => { } }) => {

    const modal = useModal();
    const dialogTabs = ['Details'];
    const selectedIndex = 0;


    const [fields, setFields] = useState({});

    const [appiontmentId, setAppiomentId] = useState("")
    const [physicianId, setPhysicianId] = useState("")

    const [searchProcedureValue, setSearchProcedureValue] = useState("");
    const [attemptedSubmit, setAttemptedSubmit] = useState(false);
    const [isFloatingActionDisabled, setFloatingAction] = useState(false);

    const [procedure, setProcedure] = useState(undefined);
    const [searchProcedureResult, setSearchProcedureResult] = useState([]);
    const [searchProcedureQuery, setSearchProcedureQuery] = useState({});

    const [location, setLocation] = useState(undefined);
    const [searchLocationValue, setSearchLocationValue] = useState("");
    const [searchLocationResult, setSearchLocationResult] = useState([]);
    const [searchLocationQuery, setSearchLocationQuery] = useState({});

    const [caseItem, setCaseItem] = useState(undefined);
    const [searchCaseValue, setSearchCaseValue] = useState("");
    const [searchCaseResult, setSearchCaseResult] = useState([]);
    const [searchCaseQuery, setSearchCaseQuery] = useState({});

    const [selectedDate, setDate] = useState(undefined);
    const [startTime, setStartTime] = useState(undefined);
    const [endTime, setEndTime] = useState(undefined);

    const [fieldErrors, setErrors] = useState({});


    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '/' + mm + '/' + dd;

    useEffect(() => {
        if (!searchProcedureValue) {
            // empty search values and cancel any out going request.
            setSearchProcedureResult([]);
            if (searchProcedureQuery?.cancel) searchProcedureQuery?.cancel();
            return;
        }

        // wait 300ms before search. cancel any prev request before executing current.

        const search = _.debounce(fetchProcedures, 300);

        setSearchProcedureQuery((prevSearch) => {
            if (prevSearch && prevSearch?.cancel) {
                prevSearch?.cancel();
            }
            return search;
        });

        search();
    }, [searchProcedureValue]);

    useEffect(() => {
        fetchAppointmentbyId()
    }, [])

    useEffect(() => {
        if (!searchLocationValue) {
            // empty search values and cancel any out going request.
            setSearchLocationResult([]);
            if (searchLocationQuery?.cancel) searchLocationQuery.cancel();
            return;
        }

        // wait 300ms before search. cancel any prev request before executing current.

        const search = _.debounce(fetchLocations, 300);

        setSearchLocationQuery((prevSearch) => {
            if (prevSearch && prevSearch?.cancel) {
                prevSearch?.cancel();
            }
            return search;
        });

        search();
    }, [searchLocationValue]);

    useEffect(() => {
        if (!searchCaseValue) {
            // empty search values and cancel any out going request.
            setSearchCaseResult([]);
            if (searchCaseQuery?.cancel) searchCaseQuery.cancel();
            return;
        }

        // wait 300ms before search. cancel any prev request before executing current.

        const search = _.debounce(fetchCaseFiles, 300);

        setSearchCaseQuery((prevSearch) => {
            if (prevSearch && prevSearch?.cancel) {
                prevSearch?.cancel();
            }
            return search;
        });

        search();
    }, [searchCaseValue]);

    const fetchProcedures = () => {
        getProcedures(searchProcedureValue, 5)
            .then((procedureInfo) => {
                const { data = [], pages } = procedureInfo;
                setSearchProcedureResult(data || []);

            })
            .catch((error) => {
                // TODO handle error
                console.log("failed to get procedures");
                setSearchProcedureResult([]);
            });
    };


    const fetchAppointmentbyId = (id) => {
        getAppointmentById(appiontment.id)
            .then(data => { 
               
                const { item = {},
                    users = {},
                    type = {},
                    _id = '',
                    title = "",
                    subject = "",
                    startTime = '',
                    description = '',
                    endTime = '',
                    location = {}
                } = data

                setCaseItem({
                    _id: item.case._id,
                    name: item.case.caseNumber
                });

                setProcedure({
                    name: title
                })

                setAppiomentId(_id);

                setDate(formatDate(startTime, 'YYYY-MM-DD'));
                setStartTime(startTime);
                setEndTime(endTime);
                
                setLocation({
                    _id: location._id,
                    name: location.name,
                })
                setFields({
                    "caseItem": item,
                    "procedure": title,
                    "location": location,
                    "selectedDate": formatDate(startTime, 'YYYY-MM-DD'),
                    "startTime": startTime,
                    "endTime": endTime
                })
                setPhysicianId(item.case.physicians[0]._id);
            })
            .catch((error) => {
                // TODO handle error
                console.log("failed to get procedures");
                setSearchProcedureResult([]);
            });
    }

    const handleProcedure = (value) => {
        setProcedure(value
            ? {
                _id: value._id,
                name: value.name,
                duration: value.duration,
            }
            : value);

        onFieldChange("procedure")(value);
        setSearchProcedureValue('')
        setSearchProcedureResult([]);
        setSearchProcedureQuery(undefined);
    };


    const onFieldChange = (fieldName) => (value) => {
        setFields({
            ...fields,
            [fieldName]: value
        })

        const updatedErrors = { ...fieldErrors }
        delete updatedErrors[fieldName]
        setErrors(updatedErrors)
    };

    const removeEmpty = (obj) => {
        // REVIEW
        let newObj = {};
        Object.keys(obj).forEach((key) => {
            if (obj[key] === Object(obj[key])) newObj[key] = removeEmpty(obj[key]);
            else if (obj[key] !== undefined) newObj[key] = obj[key];
        });
        return newObj;
    };

    const handleCloseDialog = () => {
        onCancel();
        // check if fields are empty
        // add confirmation modal here
        //modal.closeAllModals();
        
        const allFields = {
            procedure,
            location,
            caseItem,
            selectedDate,
            startTime,
            endTime
        }
        // check if fields are empty/undefined
        const checkEmpty = removeEmpty(allFields);
        const hasEmptyField = Object.keys(checkEmpty).length === 0;
        if (!hasEmptyField) {
            // open confirm modal
            modal.openModal('ConfirmationModal', {
                content: <ConfirmationComponent
                    isError={false}
                    isEditUpdate={true}
                    onCancel={() => modal.closeModals('ConfirmationModal')}
                    onAction={() => {
                        modal.closeAllModals();
                    }}
                    message="Are you sure you want to exit? Changes will not be saved"
                    action="Save"
                    type='binary'
                />
            })
        }
        else {
            modal.closeAllModals();
        }
        // check if removeEmpty is length 0
    };
    async function updateProcedureDB(item, handlePatientFunc, setSelectedValueFunc) {
        let inputUpdate = {};
        let doctor = '';

        await getPhysicians(' ', 1).then(result => { 
            doctor = result.data[0]?._id
        });

        const result = {
            // reference :'',
            name: item,
            duration: 2,
            // notes:'',
            // isTemplate : false,
            hasRecovery: false,
            physicians: [doctor],
            // supportedRooms: [], *
            // inventories:[],
            // equipments:[],
            // serviceFee : 0
        };

        await createNewProcedure(result).then(res => {

            inputUpdate = {
                _id: res._id,
                name: res.name
            }

            handlePatientFunc(inputUpdate);
            setSelectedValueFunc(inputUpdate);
        })
    }

    async function updateTheatreDB(item, handlePatientFunc, setSelectedValueFunc) {
        let result = {};
        const token = item.split(" ");

        item = {
            name: `${token[0]} ${token[1]}`,
            isRecovery: false
        }
        await createTheatre(item).then(res => {
            result = {
                _id: res[0]._id,
                name: `${res[0].name}`
            }

        }).then(res => {

            handlePatientFunc(result);
            setSelectedValueFunc(result);
        })
    }

    async function updateCaseDB(item, handlePatientFunc, setSelectedValueFunc) {
        let result = {};
        const token = item.split(" ");

        item = {
            name: `${token[0]} ${token[1]}`

        }
        await createCaseFile(item).then(res => {
            result = {
                _id: res[0]._id,
                name: `${res[0].caseNumber}`
            }

        }).then(res => {

            handlePatientFunc(result);
            setSelectedValueFunc(result);
        })
    }

    const handleLocationChange = (value) => {
        setLocation(value
            ? {
                _id: value._id,
                name: value.name,
            }
            : value);

        onFieldChange("location")(value);
        setSearchLocationValue('')
        setSearchLocationResult([]);
        setSearchLocationQuery(undefined);
    };

    const handleCaseChange = (value) => {

        setCaseItem(value
            ? {
                _id: value._id,
                name: value.caseNumber
            } :
            value);

        onFieldChange("caseItem")(value);
        setSearchCaseValue('')
        setSearchCaseResult([])
        setSearchCaseQuery(undefined)

    }

    const fetchLocations = () => {
        getTheatres(searchLocationValue, 5)
            .then((locationsInfo) => {
                const { data = [], pages } = locationsInfo;
                
                setSearchLocationResult(data || []);
            })
            .catch((error) => {
                // TODO handle error
                console.log("failed to get procedures");
                setSearchLocationResult([]);
            });
    };


    const fetchCaseFiles = () => {


        getCaseFiles()
            .then(caseResult => {
                const { data = [], pages = 0 } = caseResult;
                
                setSearchCaseResult(data || [])
            })
            .catch(error => {
                console.log('failed to get case files', error);
                setSearchLocationResult([]);
            })

    };

    const onDateUpdate = (date) => {
        // update the date for start and end time.
        const newDate = moment(date);

        const newStartTime = startTime
            ? moment(startTime)
                .year(newDate.year())
                .month(newDate.month())
                .date(newDate.date())
            : undefined;

        const newEndTime = endTime
            ? moment(endTime)
                .year(newDate.year())
                .month(newDate.month())
                .date(newDate.date())
            : undefined;

        setDate(newDate)
        onFieldChange("selectedDate")(newDate);
        // update procedure
        setProcedure({
            ...procedure,
            date: date,
            startTime: newStartTime && newStartTime.toDate(),
            endTime: newEndTime && newEndTime.toDate()
        });
    };

    const onTimeUpdate = (field) => (dateTime) => {
      
        let newTime = moment(dateTime); 
       
        if (selectedDate) {
            const dateMoment = new moment(selectedDate); 
            newTime
                .year(dateMoment.year())
                .month(dateMoment.month())
                .date(dateMoment.date());
       
        }
        
        setStartTime(newTime)
        onFieldChange("startTime")(newTime);
        setProcedure({
            ...procedure,
            [field]: newTime.toDate(),
        });
    };

    const EndTimeUpdate = (field) => (dateTime) => {

        let newTime = moment(dateTime);
        if (selectedDate) {
            const dateMoment = new moment(selectedDate);
            newTime
                .year(dateMoment.year())
                .month(dateMoment.month())
                .date(dateMoment.date());
        }
        
        setEndTime(newTime)
        onFieldChange("endTime")(newTime);
        setProcedure({
            ...procedure,
            [field]: newTime.toDate(),
        });
    }

    const validateFields = () => {
        let errors = {};
        let isValid = true;
        const requiredFields = ['procedure', 'location', 'caseItem', 'selectedDate', 'startTime', 'endTime']
        for (const requiredField of requiredFields) {
            if (!fields[requiredField]) {
                errors = {
                    ...errors,
                    [requiredField]: "Value is Required"
                }
                isValid = false;
            }
        }
        setErrors(errors)
        return isValid;
    }


    const UpdateWorkItem = () => {
        const validateAllFields = validateFields();
        if (!validateAllFields) { return }
        if (validateAllFields) {
            console.log("jbabkjdhks", procedure.endTime, procedure.startTime)
            let workItem = {
                "startTime": procedure?.startTime,
                "endTime": procedure?.endTime,
                "location": location._id,
                "item":{'case':caseItem._id},
                "title": procedure.name,
                "physicianId": physicianId,
                "isRecovery": false,
                "authInfo": physicianId 
                
            } 
            console.log("updated work item", appiontmentId, workItem)

            updateAppointmentById(appiontmentId, workItem)
                .then(data => {
                    modal.openModal(
                        'ConfirmationModal',
                        {
                            content: <ConfirmationComponent
                                message={'The work item has been updated'}
                                isError={false}
                                isEditUpdate={false}
                                onAction={() => {
                                    modal.closeModals('ConfirmationModal');
                                }}
                            />,
                            onClose: () => {
                                modal.closeModals('ConfirmationModal');
                            }
                        }
                    );
                    setTimeout(() => {
                        modal.closeAllModals();
                    }, 2000);
                    refreshShedule()
                })
                .catch(error => {
                    modal.openModal(
                        'ConfirmationModal',
                        {
                            content: <ConfirmationComponent
                                message={'There was an issue performing this action'}
                                isError={true}
                                isEditUpdate={false}
                                onAction={() => {
                                    modal.closeModals('ConfirmationModal');
                                }}
                            />,
                            onClose: () => {
                                modal.closeModals('ConfirmationModal');
                            }
                        }
                    );
                    setTimeout(() => {
                        modal.closeAllModals();
                    }, 5000);

                    console.log('Failed to update work item', error);
                })
        }
        else {

            modal.openModal('ConfirmationModal', {
                content: <ConfirmationComponent
                    isError={false}
                    isEditUpdate={true}
                    onCancel={() => modal.closeModals('ConfirmationModal')}
                    onAction={() => {
                        modal.closeModals("ConfirmationModal")
                    }}
                    message="Your work Action may be missing key information"
                    action="Yes"
                />
            })

        }




    }
   
    return (

        <OverlayDialog
            title={"Edit Work Item"}
            onPositiveButtonPress={UpdateWorkItem}
            onClose={handleCloseDialog}
            positiveText={"DONE"}
        >
            <View style={styles.container}>
                <DialogTabs
                    tabs={dialogTabs}
                    tab={selectedIndex}
                    onTabPress={() => { }}
                />
                <View style={styles.sectionContainer}>

                    <View style={[styles.row, { zIndex: 8 }]}>

                        <View style={styles.inputWrapper}>
                            <View style={styles.textContainer}>
                                <Text style={styles.labels}>Task</Text>
                            </View>

                            <SearchableOptionsField
                                emptyAfterSubmit={attemptedSubmit && procedure === undefined ? true : false}
                                updateDB={updateProcedureDB}
                                highlightOn={true}
                                highlightColor="#F6F8F8"
                                showActionButton={true}
                                text={searchProcedureValue}
                                value={procedure}
                                oneOptionsSelected={handleProcedure}
                                onChangeText={(value) => setSearchProcedureValue(value)}
                                onClear={() => {
                                    onFieldChange("procedure")('');
                                    setProcedure(undefined)
                                }}
                                options={searchProcedureResult}
                                isPopoverOpen={searchProcedureQuery}
                                placeholder="Select Procedure"
                                handlePatient={handleProcedure}
                                hasError={fieldErrors['procedure']}
                                errorMessage={fieldErrors['procedure']}
                            />


                        </View>
                        <View style={[styles.inputWrapper]}>
                            <View style={styles.textContainer}>
                                <Text style={styles.labels}>Location</Text>
                            </View>

                            <SearchableOptionsField
                                emptyAfterSubmit={attemptedSubmit && location === undefined ? true : false}
                                updateDB={updateTheatreDB}
                                showActionButton={true}
                                value={location}
                                placeholder="Select Location"
                                text={searchLocationValue}
                                oneOptionsSelected={handleLocationChange}
                                onChangeText={(value) => setSearchLocationValue(value)}
                                onClear={() => {
                                    onFieldChange("location")('');
                                    setLocation(undefined)
                                }}
                                options={searchLocationResult}
                                isPopoverOpen={searchLocationQuery}
                                handlePatient={handleLocationChange}
                                hasError={fieldErrors['location']}
                                errorMessage={fieldErrors['location']}
                            />

                        </View>

                    </View>

                    <View style={[styles.row, { zIndex: 7 }]}>
                        <View style={styles.inputWrapper}>
                            <View style={styles.textContainer}>
                                <Text style={styles.labels}>Case</Text>
                            </View>

                            <CustomSearchableOptionsField
                                emptyAfterSubmit={attemptedSubmit && caseItem === undefined ? true : false}
                                updateDB={updateCaseDB}
                                showActionButton={true}
                                value={caseItem}
                                placeholder="Select Case"
                                text={searchCaseValue}
                                oneOptionsSelected={handleCaseChange}
                                onChangeText={(value) => setSearchCaseValue(value)}
                                onClear={() => {
                                    onFieldChange("caseItem")('');
                                    setCaseItem(undefined)
                                }}
                                options={searchCaseResult}
                                isPopoverOpen={searchCaseQuery}
                                handlePatient={handleCaseChange}
                                searchFeild='caseNumber'
                                hasError={fieldErrors['caseItem']}
                                errorMessage={fieldErrors['caseItem']}
                            />

                        </View>

                        <View style={styles.inputWrapper}>
                            <View style={styles.textContainer}>
                                <Text style={styles.labels}>Date</Text>
                            </View>

                            <DateInputField
                                value={formatDate(selectedDate, 'DD/MM/YYYY')}
                                //minDate={new Date(today)}
                                onClear={() => {
                                    onFieldChange("selectedDate")('');
                                    setDate(undefined)
                                }}
                                keyboardType="number-pad"
                                mode={'date'}
                                format={"DD/MM/YYYY"}
                                placeholder="DD/MM/YYYY"
                                onDateChange={onDateUpdate}
                                hasError={fieldErrors['selectedDate']}
                                errorMessage={fieldErrors['selectedDate']}
                                borderColor={fieldErrors['selectedDate'] ? '--color-red-700' : '--color-gray-300'}
                            />

                        </View>

                    </View>

                    <View style={[styles.row]}>

                        <View style={styles.inputWrapper}>
                            <View style={styles.textContainer}>
                                <Text style={styles.labels}>Start</Text>
                            </View>

                            <DateInputField
                                onDateChange={onTimeUpdate("startTime")}
                                value={formatDate(startTime, 'hh:mm a')}
                                mode={"time"}
                                format={"hh:mm A"}
                                onClear={() => {
                                    onFieldChange("startTime")('');
                                    setStartTime(undefined)
                                }}
                                placeholder="HH:MM"
                                keyboardType="number-pad"
                                hasError={fieldErrors['startTime']}
                                errorMessage={fieldErrors['startTime']}
                                borderColor={fieldErrors['startTime'] ? '--color-red-700' : '--color-gray-300'}
                            />

                        </View>
                        <View style={styles.inputWrapper}>
                            <View style={styles.textContainer}>
                                <Text style={styles.labels}>End</Text>
                            </View>

                            <DateInputField
                                onDateChange={EndTimeUpdate("endTime")}
                                value={formatDate(endTime, 'hh:mm a')}
                                mode={"time"}
                                format={"hh:mm A"}
                                keyboardType="number-pad"
                                onClear={() => {
                                    onFieldChange("endTime")('');
                                    setEndTime(undefined)
                                }}
                                placeholder="HH:MM"
                                hasError={fieldErrors['endTime']}
                                errorMessage={fieldErrors['endTime']}
                                borderColor={fieldErrors['endTime'] ? '--color-red-700' : '--color-gray-300'}
                            />

                        </View>

                    </View>

                </View>
            </View>
        </OverlayDialog>

    )
}

EditWorkItemDialogContainer.propTypes = {}
EditWorkItemDialogContainer.defaultProps = {}

const mapDispatcherToProps = {};
export default connect(null, mapDispatcherToProps)(EditWorkItemDialogContainer)


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: 636,
        flexDirection: 'column',
        backgroundColor: 'black',
        alignSelf: 'center'
    },
    sectionContainer: {
        height: 200,
        backgroundColor: '#FFFFFF',
        flexDirection: 'column',
        padding: 24,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20
    },
    inputField: {
        // flex: 1,
        width: 64,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#E3E8EF',
        borderRadius: 4,
        height: 32,
    },
    inputWrapper: {
        // flex: 1,
        width: 260,
        flexDirection: 'row',
        // backgroundColor: 'blue'
    },
    textContainer: {
        // backgroundColor: 'blue',
        height: 32,
        width: 98,
        color: 'yellow',


    },
    textLabel: {
        marginRight: 20,
        fontSize: 12,
        color: '#718096',
        fontWeight: '500',
    },
    labels: {
        color: '#718096',
        fontWeight: "400",
        fontSize: 14

    },

    selectorWrapper: {
        height: 184,
        width: 32
    }
});
