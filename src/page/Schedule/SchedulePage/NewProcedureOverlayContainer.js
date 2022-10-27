import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { MenuOptions, MenuOption } from 'react-native-popup-menu';
import InputField2 from '../../../components/common/Input Fields/InputField2';
import DateInputField from '../../../components/common/Input Fields/DateInputField';
import OptionsField from '../../../components/common/Input Fields/OptionsField';
import { getTheatres, createPhysician, createTheatre, createNewProcedure, updateCaseFile, updateAppointmentById, updatePatient as patientUpdater, getUsersCall } from '../../../api/network';
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
import { createCaseFile } from '../../../api/network'
import { addCaseFile } from '../../../redux/actions/caseFilesActions';
import SearchableOptionsField from '../../../components/common/Input Fields/SearchableOptionsField';
import _, { reduce, set } from "lodash";
import { getProcedures, getPhysicians, getCaseFileById } from '../../../api/network';
import moment from 'moment';
import { useModal } from 'react-native-modalfy';
import ConfirmationComponent from '../../../components/ConfirmationComponent';
import ActionItem from '../../../components/common/ActionItem';
import AddIcon from '../../../../assets/svg/addIcon';
import { appointments } from '../../../../data/Appointments';

function NewProcedureOverlayContainer({ appointment = {}, editMode = false }) {

    const theme = useTheme();
    const modal = useModal();
    const [patientID, setPatientID] = useState(appointment.item !== undefined ? appointment.item.case.patient._id : "Patient ID:--")
    const [patientValue, setPatient] = useState(undefined);
    const [searchPatientValue, setSearchPatientValue] = useState("");
    const [searchPatientResult, setSearchPatientResult] = useState([]);
    const [searchPatientQuery, setSearchPatientQuery] = useState({});

    const [procedure, setProcedure] = useState(undefined);
    const [searchProcedureValue, setSearchProcedureValue] = useState("");
    const [searchProcedureResult, setSearchProcedureResult] = useState([]);
    const [searchProcedureQuery, setSearchProcedureQuery] = useState({});

    const [location, setLocation] = useState(undefined);
    const [searchLocationValue, setSearchLocationValue] = useState("");
    const [searchLocationResult, setSearchLocationResult] = useState([]);
    const [searchLocationQuery, setSearchLocationQuery] = useState({});

    const [searchValue, setSearchValue] = useState('')
    const [searchQuery, setSearchQuery] = useState({})
    const [searchResult, setSearchResults] = useState([]);

    const [currentIndex, setCurrentIndex] = useState(0);

    const [selectedType, setSelectedType] = useState("Physician");

    const [selectedDate, setDate] = useState(undefined);
    const [startTime, setStartTime] = useState(undefined);

    const [generatedLeadSurgeon, setGeneratedLeadSurgeon] = useState();
    const [generatedAnaesthesiologist, setGeneratedAnaesthesiologist] = useState();
    const [generatedAssistantSurgeon, setGeneratedAssistantSurgeon] = useState();
    const [generatedNurse, setGeneratedNurse] = useState();

    const [attemptedSubmit, setAttemptedSubmit] = useState(false);
    const [allowedToSubmit, setAllowedToSubmit] = useState(false)

    const RowWrapper = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: ${({ theme }) => theme.space['--space-20']};
    z-index: ${({ zIndex }) => zIndex};
`

    const InputWrapper = styled.View`
        flex: 1;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        z-index: ${({ zIndex }) => zIndex};
    `

    const NewProcedureButton = styled.TouchableOpacity`
        align-items:center;
        border-width:1px;
        justify-content:center;
        border-color:${({ theme }) => theme.colors["--accent-line"]};
        background-color: white;
        width:53px;
        height:26px;
        border-radius:6px;

    `;

    const ButtonContainer = styled.View`
        width:70%;
        height:100%;
    `;

    const NewProcedureButtonText = styled.Text`
        align-items: center; 
        color: ${({ theme }) => theme.colors["--accent-button"]};
        font:${({ theme }) => theme.font["--text-sm-regular"]};
    `;

    const [selectedItem, setSelectedItem] = useState({});
    // manual case creation o,o
    const [patientFields, setPatientFields] = useState();

    const [staffInfo, setStaffInfo] = useState([]);

    const [caseProceduresInfo, setCaseProceduresInfo] = useState([]);
    const [isComplete, setComplete] = useState(false);
    const [fields, setFields] = useState({
        firstName: '',
        surname: '',
        procedure: '',
        location: '',
        date: '',
        time: ''
    });

    const onFieldChange = (fieldName) => (value) => {
        setFields({
            ...fields,
            [fieldName]: value,
            id: selectedItem._id || '',
        });
    };

    const onPatientFieldChange = (fieldName => (value) => {
        setPatientFields({
            ...patientFields,
            [fieldName]: value
        })
    });

    const onProcedureFieldChange = (fieldName => (value) => {
        setCaseProceduresInfo({
            ...caseProceduresInfo,
            [fieldName]: value
        })
    });

    function validateAllFieldsFilled() {
        let foundInvalidField = true;
        const locationCheck = location;
        const procedureCheck = procedure;
        const staffCheck = staffInfo.length

        if (locationCheck !== undefined &&
            procedureCheck !== undefined &&
            staffCheck >= 4
        ) {
            foundInvalidField = true;

        }

        else {
            foundInvalidField = false;
        }
        return foundInvalidField
    }

    function handleCreateCaseButton() {
        const validateAllFields = validateAllFieldsFilled();
        setAttemptedSubmit(true);

        if (validateAllFields) {
            setAllowedToSubmit(true)
        }

        else {
            modal.openModal('ConfirmationModal', {
                content: <ConfirmationComponent
                    isError={false}
                    isEditUpdate={true}
                    onCancel={() => modal.closeModals('ConfirmationModal')}
                    onAction={() => {
                        setAllowedToSubmit(true);
                        modal.closeModals("ConfirmationModal")
                    }}
                    message="Your appointment may be missing key information. Do you want to continue without updating?"
                    action="Yes"
                />
            })
        }


    }

    useEffect(() => {
        if (allowedToSubmit) {
            const nameToken = fields.firstName.split(" ");

            // size 1 ? firstname
            if (nameToken.length === 1) {
                patientFields.firstName = nameToken[0];
                patientFields.middleName = " ";
                patientFields.surname = " ";
            }
            // size 2 ? firstname lastname
            if (nameToken.length === 2) {
                patientFields.firstName = nameToken[0];
                patientFields.middleName = " ";
                patientFields.surname = nameToken[1];
            }
            // size 3 ? firstname middlename lastname
            if (nameToken.length === 3) {
                patientFields.firstName = nameToken[0];
                patientFields.middleName = nameToken[1];
                patientFields.surname = nameToken[2]
            }

            // size > 3 ? firstname middlename... lastname 
            if (nameToken.length > 3) {
                patientFields.firstName = nameToken[0]
                patientFields.surname = nameToken[nameToken.length - 1];
                patientFields.middleName = nameToken.slice(1, nameToken.length - 1).join(' ')
            }

            const caseFileData = {
                name: `${patientFields.firstName} ${patientFields.middleName} ${patientFields.surname}`,
                patient: {
                    firstName: patientFields.firstName,
                    middleName: patientFields.middleName,
                    surname: patientFields.surname
                },
                caseProcedures: [],
                staff: {
                    physicians: [],
                    nurses: [],
                },
            };

            // adding patient info
            caseFileData.patient = patientFields;

            // adding staff info
            for (const staffInfoElement of staffInfo) {
                if (staffInfoElement.type === 'Physician') {
                    caseFileData.staff.physicians.push(staffInfoElement._id);
                } else {
                    caseFileData.staff.nurses.push(staffInfoElement._id);
                }
            }
            let leadDoc = "";
            let leadObj = {};
            staffInfo.filter(item => {
                if (item.tag === "Lead Surgeon") {
                    leadDoc = item.name;
                    leadObj = item;
                }

            })

            let updatedLocation = "";

            if (location === undefined) {
                updatedLocation = "5ea05a3886d32b41d5b291e7"
            }

            else {
                updatedLocation = location._id
            }

            caseFileData.staff.leadPhysician = leadObj;
            caseFileData.caseProcedures = [{
                procedure: procedure !== undefined ? procedure._id : "5ea05a3886d32b41d5b291e7",
                location: updatedLocation,
                startTime: procedure?.startTime || startTime,
                duration: procedure?.duration || 2,
            }];

            if (patientID !== "Patient ID:--") {
                caseFileData.patient._id = patientID;
            }

            caseFileData.roleKeys = staffInfo
            if (caseFileData.staff.leadPhysician._id === undefined) {
                // moving away from using leadSurgeon
                // this allows for blank lead field
                caseFileData.staff.leadPhysician = {
                    "_id": "5ea05a3886d32b41d5b291e7",
                    "name": " ",
                    "tag": "Lead Surgeon",
                    "type": "Physician",
                }
            }

            // adding procedure info
            if (!editMode) {
                createCaseFile(caseFileData)
                    .then(data => {
                        addCaseFile(data);
                    })
                    .catch(error => {
                        console.log('failed to create case file', error.message);
                        console.log('failed to create case file', error.response);
                    })
                    .finally(_ => {
                        console.log("finally done")
                    });
            }

            if (editMode) {
                patientUpdater(appointment.item.case.patient._id, {
                    firstName: patientFields.firstName,
                    surname: patientFields.surname
                })
                updateCaseFile(appointment.item.case._id, { staff: caseFileData.staff, roleKeys: caseFileData.roleKeys })

                const appointmentID = appointment._id;
                updateAppointmentById(appointmentID,
                    {
                        description: `${patientFields.firstName} ${patientFields.surname}`,
                        subject: leadDoc,
                        startTime: caseFileData.caseProcedures[0].startTime,
                        endTime: moment(caseFileData.caseProcedures[0].startTime).add(2, 'hours'),
                        title: procedure?.name || "",
                        location: updatedLocation
                    })
                    .catch(err => {
                        console.log(err)
                    })

            }

            modal.openModal('ConfirmationModal',
                {
                    content: <ConfirmationComponent
                        isError={false}
                        isEditUpdate={false}
                        onCancel={() => {
                            modal.closeModals('ConfirmationModal');
                        }}
                        onAction={() => {
                            modal.closeAllModals();

                        }}
                        message="Completed Successfully!"
                    // onAction = { () => confirmAction()}
                    />,
                    onClose: () => {
                        modal.closeModals('ConfirmationModal');
                    }
                });

        }
    }, [allowedToSubmit])

    const handlePatient = (value) => {

        setPatient(value
            ? {
                _id: value._id,
                name: value.name,
            }
            : value);

        setSearchPatientValue('')
        setSearchPatientResult([]);
        setSearchPatientQuery(undefined);
    };

    const handleSurgeon = (value) => {
        const staff = {
            _id: value?._id,
            name: value?.name,
            tag: value?.tag,
            type: "Physician"
        }

        setStaffInfo([
            ...staffInfo,
            staff
        ])
    }


    const handleProcedure = (value) => {
        setProcedure(value
            ? {
                _id: value._id,
                name: value.name,
                duration: value.duration,
            }
            : value);

        setSearchProcedureValue('')
        setSearchProcedureResult([]);
        setSearchProcedureQuery(undefined);
    };

    const handleLocationChange = (value) => {
        setLocation(value
            ? {
                _id: value._id,
                name: value.name,
            }
            : value);

        onFieldChange("location")(location);

        setSearchLocationValue('')
        setSearchLocationResult([]);
        setSearchLocationQuery(undefined);
    };

    const fetchPatients = () => {
        /*const data =  {
            _id: "1",
            name: "bob ross"
        }*/

        // const data = [];

        setSearchPatientResult([])
    }

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
        if (!searchPatientValue) {
            // empty search values and cancel any out going request.
            setSearchProcedureResult([]);
            if (searchPatientQuery?.cancel) searchPatientQuery?.cancel();
            return;
        }

        // wait 300ms before search. cancel any prev request before executing current.

        const search = _.debounce(fetchPatients, 300);

        setSearchPatientQuery((prevSearch) => {
            if (prevSearch && prevSearch?.cancel) {
                prevSearch?.cancel();
            }
            return search;
        });

        search();
    }, [searchPatientValue]);

    useEffect(() => {
        if (!searchValue) {
            // empty search values and cancel any out going request.
            setSearchResults([]);
            if (searchQuery.cancel) searchQuery.cancel();
            return;
        }

        // wait 300ms before search. cancel any prev request before executing current.

        const searchFunction = (selectedType === "Physician") ? fetchPhysicians : fetchNurses

        const search = _.debounce(searchFunction, 300);

        setSearchQuery(prevSearch => {
            if (prevSearch && prevSearch.cancel) {
                prevSearch.cancel();
            }
            return search;
        });
        search()
    }, [searchValue])

    const fetchNurses = () => {
        getUsersCall(searchValue, 1, 5)
            .then((userResult = []) => {
                const { data = [], pages = 0 } = userResult
                const filterUser = data.filter(user => user?.role?.name === 'Nurse');
                const results = filterUser.map(item => ({
                    name: `Nurse ${item.last_name}`,
                    ...item
                }));
                console.group("Nurse results: ", results);
                setSearchResults(results || []);

            })
            .catch(error => {
                // TODO handle error
                console.log("failed to get nurses");
                setSearchResults([]);
            })
    }

    const fetchPhysicians = () => {
        getPhysicians(searchValue, 5)
            .then((physicianResult = []) => {
                const { data = [], pages = 0 } = physicianResult
                const results = data.map(item => ({
                    name: `Dr. ${item.surname}`,
                    ...item
                }));
                setSearchResults(results || []);

            })
            .catch(error => {
                // TODO handle error
                console.log("failed to get physicians");
                setSearchResults([]);
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

        setDate(newDate)
        // update procedure
        setProcedure({
            ...procedure,
            date: date,
            startTime: newStartTime && newStartTime.toDate(),
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
        setProcedure({
            ...procedure,
            [field]: newTime.toDate(),
        });

    };

    const onStaffChange = (value) => {
        console.log(value)
        setStaffInfo([
            ...staffInfo,
            value
        ])
    }

    const SectionListHeaderTitle = styled.Text(`
        color: ${theme.colors['--color-blue-900']};
        flex: 2;
        font-weight: 500;
        font-size: 16px;
        font-style: normal;
        line-height: 16px;
        display: flex;
    `);

    const StatusLabel = styled.View(`
        width: 105px;
        height: 24px;
        background-color: ${theme.colors['--color-gray-200']};
        color: ${theme.colors['--color-gray-500']};
        padding: 4px 8px 4px 8px;
        border-radius: 12px;
        border-style: solid;
        border-width: 1px;
        border-color: ${theme.colors['--color-gray-200']};
        font-size 12px;
        display: flex;
        align-items: center;
        justify-content: center;
    `);

    const Accent = styled.View`
        background-color: ${theme.colors['--color-gray-300']};
        width: 100%;
        height: 1px;
        margin-top: 5px;
        margin-bottom: 24px;
    `;

    function updatePatient(value) {
        setSearchPatientValue(value);
        setPatient(value)
    };

    async function updatePhysicianDB(item, handlePatientFunc, setSelectedValueFunc) {
        let result = {};
        const token = item.split(" ");
        item = {
            "firstName": token[0],
            "surname": token[1]
        },
            await createPhysician(item).then(res => {
                result = {
                    _id: res._id,
                    name: `${res.firstName} ${res.surname}`
                }
            }).then(res => {
                handlePatientFunc(result);
                setSelectedValueFunc(result);
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

    async function updatePatientDB(item, handlePatientFunc, setSelectedValueFunc) {
        const result = {
            _id: "1444",
            name: item
        }
        handlePatientFunc(result);
        setSelectedValueFunc(result);
    }

    async function updateProcedureDB(item, handlePatientFunc, setSelectedValueFunc) {
        let inputUpdate = {};

        const result = {
            // reference :'',
            name: item,
            duration: 2,
            // notes:'',
            // isTemplate : false,
            hasRecovery: false,
            physician: {
                "_id": "5ea05a3886d32b41d5b291e6",
                "active": "active",
                "address": Array[
                    {
                        "_id": "5ea05969a75843f64322d913",
                        "line1": "Barbican Road, Kingston",
                        "line2": "Apartment 23",
                    }
                ],
            }
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

    useEffect(() => {
        if (appointment._id !== undefined) {
            getCaseFileById(appointment.item.case._id).then(res => {
                const resultLocation = res.caseProcedures[0].appointment.location;
                const resultPatient = appointment.item.case.patient;
                const procedureId = res.caseProcedures[0].procedure._id;
                const procedureName = res.caseProcedures[0].appointment.title;
                const resultTime = appointment.startTime;
                const endTime = moment(appointment.startTime);

                if (resultLocation !== null) {
                    handleLocationChange({
                        _id: resultLocation._id,
                        name: resultLocation.name
                    });
                }


                handlePatient({
                    _id: resultPatient._id,
                    name: `${resultPatient.firstName} ${resultPatient.surname}`
                });

                onFieldChange('firstName')(`${resultPatient.firstName} ${resultPatient.surname}`);
                onPatientFieldChange('firstName')(`${resultPatient.firstName} ${resultPatient.surname}`);

                if (procedureName.length > 0) {
                    handleProcedure({
                        _id: procedureId,
                        name: procedureName
                    });
                }


                setDate(moment(resultTime));
                setStartTime(endTime);
                const container = [];

                function findStaffByTag(tag) {
                    const resultItem = res.roleKeys.filter(itemTag => tag === itemTag.tag);


                    return resultItem.length > 0 ? resultItem[0] : null
                }

                const finalLeadSurgeon = findStaffByTag("Lead Surgeon");
                const finalAnaesthesiologist = findStaffByTag("Anaesthesiologist");
                const finalAssitantSurgeon = findStaffByTag("Assistant Surgeon");
                const finalNurse = findStaffByTag("Nurse");

                if (finalLeadSurgeon !== null) {
                    container.push(finalLeadSurgeon);
                    setGeneratedLeadSurgeon(finalLeadSurgeon);
                }

                if (finalAnaesthesiologist !== null) {
                    container.push(finalAnaesthesiologist);
                    setGeneratedAnaesthesiologist(finalAnaesthesiologist);
                }

                if (finalAssitantSurgeon !== null) {
                    container.push(finalAssitantSurgeon);
                    setGeneratedAssistantSurgeon(finalAssitantSurgeon)
                }

                if (finalNurse !== null) {
                    container.push(finalNurse);
                    setGeneratedNurse(
                        {
                            _id: finalNurse._id,
                            name: `${finalNurse.name}`,
                            type: "Nurse",
                            tag: "Nurse"
                        }
                    )
                }

                setStaffInfo(container)
            })
        }
    }, []);

    function deleteSurgeonTag(tag) {
        let staffClone = staffInfo;
        let indx;

        const result = staffClone.filter(item => item.tag !== tag);

        setStaffInfo(result);

    }

    function findStaffByTag(tag) {
        return staffInfo.filter(item => item.tag === tag);
    }

    return (
        <>
            <View style={styles.container}>

                <View style={styles.row}>
                    <SectionListHeaderTitle>{patientID}</SectionListHeaderTitle>
                    <StatusLabel>
                        <Text style={styles.textDisplay} >Not yet started</Text>
                    </StatusLabel>
                </View>

                <View style={[styles.row, { zIndex: 10 }]}>
                    <SearchableOptionsField
                        emptyAfterSubmit={attemptedSubmit && patientValue === undefined ? true : false}
                        updateDB={updatePatientDB}
                        highlightOn={true}
                        highlightColor="#F6F8F8"
                        title={"Patient"}
                        showActionButton={true}
                        text={searchPatientValue}
                        value={patientValue}
                        oneOptionsSelected={handlePatient}
                        onChangeText={(value) => {
                            setSearchPatientValue(value);
                            onFieldChange('firstName')(value);
                            onPatientFieldChange('firstName')(value);
                        }}
                        onClear={() => console.log("clear")}
                        options={searchPatientResult}
                        isPopoverOpen={searchPatientQuery}
                        placeholder="Select Patient"
                        handlePatient={handlePatient}
                    />

                    <Space />
                    <Space />
                    <Space />
                    <Space />
                    <Space />
                    <Space />
                    <Space />

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
                        onClear={handleProcedure}
                        options={searchProcedureResult}
                        isPopoverOpen={searchProcedureQuery}
                        placeholder="Select Procedure"
                        handlePatient={handleProcedure}
                    />
                </View>

                <Accent />

                <View style={[styles.row, { zIndex: 1 }]}>
                    <View style={styles.column}>

                        <View style={styles.textContainer}>
                            <Text style={styles.labels}>Theatre</Text>
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
                            onClear={handleLocationChange}
                            options={searchLocationResult}
                            isPopoverOpen={searchLocationQuery}
                            handlePatient={handleLocationChange}
                        />
                    </View>

                    <Space />

                    <View style={styles.groupItem}>
                        <View style={styles.column}>
                            <View style={styles.textContainer}>
                                <Text style={styles.labels}>Date</Text>
                            </View>

                            <View style={styles.inputWrapper}>
                                <DateInputField
                                    value={selectedDate}
                                    onClear={() => { setDate(undefined) }}
                                    keyboardType="number-pad"
                                    mode={'date'}
                                    format={"DD/MM/YYYY"}
                                    placeholder="DD/MM/YYYY"
                                    onDateChange={onDateUpdate}
                                />
                            </View>
                        </View>

                        <TinySpace />

                        <View style={styles.column}>
                            <View style={styles.textContainer}>
                                <Text style={styles.labels}>Time</Text>
                            </View>
                            <View style={styles.inputWrapper}>
                                <DateInputField
                                    onDateChange={onTimeUpdate("startTime")}
                                    value={startTime}
                                    mode={"time"}
                                    format={"hh:mm A"}
                                    onClear={() => setStartTime(undefined)}
                                    placeholder="HH:MM"
                                />
                            </View>
                        </View>

                    </View>

                </View>

                <Accent />

                <View style={styles.staffContainer}>

                    <View style={[styles.row, { zIndex: 10 }]}>
                        <View style={styles.staffField}>
                            <SearchableOptionsField
                                emptyAfterSubmit={findStaffByTag("Lead Surgeon").length < 1 && attemptedSubmit ? true : false}
                                updateDB={updatePhysicianDB}
                                showActionButton={true}
                                placeholder="Select Surgeon"
                                text={currentIndex === 1 ? searchValue : ''}
                                value={generatedLeadSurgeon}
                                onChangeText={(value) => {
                                    setSearchValue(value);
                                    setCurrentIndex(1);
                                    setSelectedType("Physician")
                                }}
                                oneOptionsSelected={(value) => {
                                    const staff = {
                                        _id: value?._id,
                                        name: value?.name,
                                        type: "Physician",
                                        tag: "Lead Surgeon"
                                    }
                                    setSearchValue('')
                                    onStaffChange(staff);

                                }}
                                handlePatient={handleSurgeon}
                                options={searchResult}
                                onClear={() => {
                                    setSearchValue('');
                                    deleteSurgeonTag('Lead Surgeon');
                                }}
                                isPopoverOpen={currentIndex === 1 ? true : false}
                            />

                            <Space />
                            <Space />
                            <Space />
                            <Space />
                            <Space />
                            <Space />

                            <View style={styles.staffText}>
                                <Text style={styles.labels}>Lead Surgeon</Text>
                            </View>

                        </View>
                    </View>

                    <View style={[styles.row, { zIndex: 9 }]}>
                        <View style={styles.staffField}>
                            <SearchableOptionsField
                                emptyAfterSubmit={findStaffByTag("Anaesthesiologist").length < 1 && attemptedSubmit ? true : false}
                                handlePatient={handleSurgeon}
                                updateDB={updatePhysicianDB}
                                value={generatedAnaesthesiologist}
                                showActionButton={true}
                                placeholder="Select Staff"
                                text={currentIndex === 2 ? searchValue : ''}
                                onChangeText={(value) => {
                                    setSearchValue(value);
                                    setCurrentIndex(2);
                                    setSelectedType("Physician")
                                }}
                                oneOptionsSelected={(value) => {

                                    const staff = {
                                        _id: value?._id,
                                        name: value?.name,
                                        type: "Physician",
                                        tag: "Anaesthesiologist"
                                    }
                                    setSearchValue('')
                                    onStaffChange(staff)
                                }}
                                options={searchResult}
                                onClear={() => {
                                    setSearchValue('')
                                    deleteSurgeonTag("Anaesthesiologist")
                                }}
                                isPopoverOpen={currentIndex === 2 ? true : false}
                            />

                            <Space />
                            <Space />
                            <Space />
                            <Space />
                            <Space />
                            <Space />

                            <View style={styles.staffText}>
                                <Text style={styles.labels}>Anaesthesiologist</Text>
                            </View>

                        </View>
                    </View>

                    <View style={[styles.row, { zIndex: 8 }]}>
                        <View style={styles.staffField}>
                            <SearchableOptionsField
                                emptyAfterSubmit={findStaffByTag("Assistant Surgeon").length < 1 && attemptedSubmit ? true : false}
                                handlePatient={handleSurgeon}
                                updateDB={updatePhysicianDB}
                                value={generatedAssistantSurgeon}
                                showActionButton={true}
                                placeholder="Select Staff"
                                text={currentIndex === 3 ? searchValue : ''}
                                onChangeText={(value) => {
                                    setSearchValue(value);
                                    setCurrentIndex(3);
                                    setSelectedType("Physician");
                                }}
                                oneOptionsSelected={(value) => {

                                    const staff = {
                                        _id: value?._id,
                                        name: value?.name,
                                        type: "Physician",
                                        tag: "Assistant Surgeon"
                                    }
                                    setSearchValue('')
                                    onStaffChange(staff)
                                }}
                                options={searchResult}
                                onClear={() => {
                                    setSearchValue('');
                                    deleteSurgeonTag("Assistant Surgeon");
                                }}
                                isPopoverOpen={currentIndex === 3 ? true : false}
                            />

                            <Space />
                            <Space />
                            <Space />
                            <Space />
                            <Space />
                            <Space />

                            <View style={styles.staffText}>
                                <Text style={styles.labels}>Assistant Surgeon</Text>
                            </View>

                        </View>
                    </View>

                </View>

                <Space />

                <View style={styles.staffContainer}>
                    <View style={[styles.row, { zIndex: 7 }]}>
                        <View style={styles.staffField}>
                            <SearchableOptionsField
                                emptyAfterSubmit={findStaffByTag("Nurse").length < 1 && attemptedSubmit ? true : false}
                                value={generatedNurse}
                                handlePatient={handleSurgeon}
                                updateDB={updatePhysicianDB}
                                showActionButton={true}
                                placeholder="Select Staff"
                                text={currentIndex === 4 ? searchValue : ''}
                                onChangeText={(value) => {
                                    setSearchValue(value);
                                    setCurrentIndex(4);
                                    setSelectedType("Nurse")
                                }}
                                oneOptionsSelected={(value) => {

                                    const staff = {
                                        _id: value?._id,
                                        name: value?.name,
                                        type: "Nurse",
                                        tag: "Nurse"
                                    }
                                    setSearchValue('')
                                    onStaffChange(staff)
                                }}
                                options={searchResult}
                                onClear={() => {
                                    setSearchValue('')
                                    deleteSurgeonTag("Nurse")
                                }}
                                isPopoverOpen={currentIndex === 4 ? true : false}
                            />

                            <Space />
                            <Space />
                            <Space />
                            <Space />
                            <Space />
                            <Space />

                            <View style={styles.staffText}>
                                <Text style={styles.labels}>Nurse</Text>
                            </View>

                        </View>
                    </View>
                </View>


            </View>
            <View style={styles.editContainer}>
                <Text style={styles.editText} >Now in edit mode</Text>
                <View style={styles.buttonHolder}>
                    <NewProcedureButton theme={theme} onPress={() => handleCreateCaseButton()}>
                        <NewProcedureButtonText>Done</NewProcedureButtonText>
                    </NewProcedureButton>
                </View>
            </View>
        </>
    )
}

export default NewProcedureOverlayContainer;

const Space = styled.View`
   width:  ${({ theme }) => theme.space['--space-24']};
`;

const TinySpace = styled.View`
   width:  ${({ theme }) => theme.space['--space-10']};
`;

const styles = StyleSheet.create({



    editText: {
        color: '#E3E8EF',
        fontSize: 16,
        fontWeight: "500",
        flex: 1,
        // backgroundColor: 'red'
    },

    editContainer: {
        height: 50,
        zIndex: 100,
        backgroundColor: '#0CB0E7',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 17,
        paddingHorizontal: 32
    },

    container: {
        flex: 1,
        flexDirection: 'column',
        // backgroundColor: 'red',
        padding: 35
    },
    sectionContainer: {
        height: 150,
        backgroundColor: '#FFFFFF',
        flexDirection: 'column',
        padding: 24,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        // backgroundColor:'red'

    },

    column: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        // backgroundColor: 'red',
    },

    groupItem: {
        display: 'flex',
        height: '100%',
        flex: 1,
        flexDirection: 'row',
        marginLeft: 45,
        minWidth: 100
    },

    inputWrapper: {
        // flex: 1,
        width: '100%',
        flexDirection: 'row',
        marginRight:10
        // backgroundColor: 'blue'
    },

    fieldWrapper: {
        flex: 1,
        marginRight: 35,
        flexDirection: 'column'
    },

    textDisplay: {
        fontSize: 12,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'gray'
    },

    textContainer: {
        // backgroundColor: 'blue',
        height: 20,
        color: 'yellow',
        marginBottom: 5
    },

    labels: {
        color: '#718096',
        fontWeight: "400",
        fontSize: 14

    },

    staffContainer: {
        backgroundColor: '#FAFAFA',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 16,
        paddingBottom: 0,
        borderRadius: 8,
        marginBottom: 13
    },

    staffField: {
        flexDirection: 'row',
        // backgroundColor: 'blue',
        flex: 1,
    },

    staffText: {
        fontSize: 12,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        flex: 1,
        fontWeight: '400',
        fontSize: 16,
        color: '#4E5664'
        // backgroundColor: 'red'
    },


    buttonHolder: {
        flex: 1,
        // backgroundColor: 'black',
        display: 'flex',
        alignItems: 'flex-end',

    }

})