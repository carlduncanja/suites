import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import {useNavigation} from '@react-navigation/native'
import { connect } from 'react-redux';
import _, { isEmpty } from 'lodash';
import { useModal } from 'react-native-modalfy';
import moment from 'moment';
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
import ListItem from '../../components/common/List/ListItem';
import ActionContainer from '../../components/common/FloatingAction/ActionContainer';
import ActionItem from '../../components/common/ActionItem';
import AddIcon from '../../../assets/svg/addIcon';
import ArchiveIcon from '../../../assets/svg/archiveIcon';
import DraftItem from '../../components/common/List/DraftItem';

import { setCaseFiles } from '../../redux/actions/caseFilesActions';
import { deleteCaseFile, getCaseFiles, removeCaseFiles, removeCaseFilesId } from '../../api/network';

import {
    useNextPaginator,
    usePreviousPaginator,
    selectAll,
    checkboxItemPress, handleUnauthorizedError,
} from '../../helpers/caseFilesHelpers';
import { currencyFormatter, formatDate } from '../../utils/formatter';

import NavPage from '../../components/common/Page/NavPage';
import DataItem from '../../components/common/List/DataItem';
import RightBorderDataItem from "../../components/common/List/RightBorderDataItem";
import MultipleTextDataItem from '../../components/common/List/MultipleTextDataItem';
import { emptyFn, LONG_PRESS_TIMER } from "../../const";
import { PageSettingsContext } from '../../contexts/PageSettingsContext';
import LongPressWithFeedback from "../../components/common/LongPressWithFeedback";
import WasteIcon from "../../../assets/svg/wasteIcon";
import { removeDraft } from "../../redux/actions/draftActions";
import Button from '../../components/common/Buttons/Button';
import ConfirmationComponent from '../../components/ConfirmationComponent';
import { userPassword } from '../../const/suitesEndpoints';
import { getPatients, deletePatient, } from '../../api/network';
import patient from '../../../assets/svg/newCasePatient';
const ButtonContainer = styled.View`
    width: 105px;
    height: 26px;
    border: 1px solid #A0AEC0;
    box-sizing: border-box;
    border-radius: 6px;
    padding-top: 2px;
`;

const listHeaders = [
    {
        name: 'Name',
        aligment: 'flex-start',
        flex: 2
    },
    {
        name: 'Gender',
        aligment: 'flex-end',
        flex: 1,
    },
    {
        name: "Contact #",
        aligment: 'flex-start',
        flex: 1,
    },
    {
        name: 'TRN',
        aligment: "flex-start",
        flex: 1,
    }
]

function PatientFiles(props) {
    //######## const
    const modal = useModal();
    const theme = useTheme();
    const recordsPerPage = 10;

    const {
        navigation
    } = props


    // States
    const [selectedPatientds, setSelectedPatientIds] = useState([]);
    const [isFloatingActionDisabled, setFloatingAction] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [isFetchingPatients, setFetchingPatients] = useState(false);
    const [patientData, setPatientData] = useState([])
    const [searchResults, setSearchResult] = useState([]);
    const [searchQuery, setSearchQuery] = useState({});
    // pagination
    const [totalPages, setTotalPages] = useState(1);
    const [currentPageListMin, setCurrentPageListMin] = useState(0);
    const [currentPageListMax, setCurrentPageListMax] = useState(recordsPerPage);
    const [currentPagePosition, setCurrentPagePosition] = useState(1);
    const [isNextDisabled, setNextDisabled] = useState(false);
    const [isPreviousDisabled, setPreviousDisabled] = useState(true);
    const [currentPage, setCurrentPage] = useState(1)

    

    useEffect(() => {
        if (!searchValue) {
            // empty search values and cancel any out going request.
            setSearchResult([]);
            fetchPatientFiles(1);
            if (searchQuery.cancel) searchQuery.cancel();
            return;
        }

        // wait 300ms before search. cancel any prev request before executing current.

        const search = _.debounce(fetchPatientFiles, 300);

        setSearchQuery(prevSearch => {
            if (prevSearch && prevSearch.cancel) {
                prevSearch.cancel();
            }
            return search;
        });

        search();
        // setCurrentPagePosition(1);
    }, [searchValue]);

    const onSearchChange = input => {
        setSearchValue(input);
    };

    const goToNextPage = () => {
        if (currentPagePosition < totalPages) { 
            console.log("total pages: " + totalPages)
            console.log("current page position: ", currentPagePosition)
            
            const {
                currentPage,
                currentListMin,
                currentListMax
            } = useNextPaginator(currentPagePosition, recordsPerPage, currentPageListMin, currentPageListMax);
            
            console.log("current page: ", currentPage)
            
           
            setCurrentPagePosition(currentPagePosition);
            setCurrentPage(currentPage);
            
            console.log("new current page position: ", currentPagePosition)
            
            setCurrentPageListMin(currentListMin);
            setCurrentPageListMax(currentListMax);
            
            fetchPatientFiles(currentPage);
        }
    };
 
    

    const goToPreviousPage = () => { 
        const {
            currentPage,
            currentListMin,
            currentListMax
        } = usePreviousPaginator(currentPagePosition, recordsPerPage, currentPageListMin, currentPageListMax);
        setCurrentPagePosition(currentPage);
        console.log("current page: ", currentPage)
        setCurrentPageListMin(currentListMin);
        setCurrentPageListMax(currentListMax);
        fetchPatientFiles(currentPage);
    };

    const fetchPatientFiles = pagePosition => {
        const currentPosition = pagePosition || 1;
        setCurrentPagePosition(currentPagePosition) 
        setFetchingPatients(true) 
        
         
        getPatients(searchValue, 10, currentPosition)
            .then(patientResults => {
                const { data = [], pages = 0 } = patientResults 
                console.log(patientResults)
                if (pages === 1) {
                    setPreviousDisabled(true);
                    setNextDisabled(true);
                } else if (currentPosition === 1) {
                    setPreviousDisabled(true);
                    setNextDisabled(false);
                } else if (currentPosition === pages) {
                    setNextDisabled(true);
                    setPreviousDisabled(false);
                } else if (currentPosition < pages) {
                    setNextDisabled(false);
                    setPreviousDisabled(false);
                } else {
                    setNextDisabled(true);
                    setPreviousDisabled(true);
                } 
                setCurrentPagePosition(currentPosition)
                setPatientData(data);
                data.length === 0 ? setTotalPages(1) : setTotalPages(pages); 
                
            })
            .catch(error => {
                setTotalPages(1);
                setPreviousDisabled(true);
                setNextDisabled(true);
                console.log("failed to get the data", error)
            })
            .finally(_ => {
                setFetchingPatients(false)
            })
    }
    const patientItem = item => {
        const {
            firstName,
            middleName,
            surname,
            gender,
            contactInfo,
            trn
        } = item || {}

        const genderLetter = gender == 'Male' ? "M" : "F"
        //console.log("we are here", contactInfo.phones[0])

        const phoneNumber = contactInfo?.phones[0]?.['phone'] || "--"
        return (
            <>
                <RightBorderDataItem text={`${firstName} ${middleName === undefined ? "" : middleName} ${surname}`} flex={2} />
                <DataItem text={genderLetter} color={"--color-blue-700"} flex={0.7} align={'flex-end'} />
                <DataItem text={phoneNumber} color={"--color-blue-700"} flex={1.2} textAlign='center' />
                <DataItem text={trn} color={"--color-blue-700"} flex={1} />
            </>
        )
    }

    const handleOnItemPress = (item, isOpenEditable) => () => {
        console.log('i anklfn oifja', item)
        if (item !== null) {
                navigation.navigate('patient', {
                    initial: false,
                    patientPage: true,
                    patientId: item._id,
                    isEdit: isOpenEditable
                });
        } else return;
    };

    const renderFn = item => {
        return <>

            {console.log('i a, iajksj', item)}

            <ListItem
                hasCheckBox={true}
                isChecked={selectedPatientds.includes(item._id || item.id)}
                itemView={patientItem(item)}
                onItemPress={handleOnItemPress(item, false)}
                onCheckBoxPress={handleOnCheckBoxPress(item)}
            />
        </>

    }

    const openErrorConfirmation = () => {
        modal.openModal(
            'ConfirmationModal',
            {
                content: <ConfirmationComponent
                    isError={true}
                    isEditUpdate={false}
                    onCancel={() => modal.closeModals('ConfirmationModal')}
                />,
                onClose: () => {
                    modal.closeModals('ConfirmationModal');
                }
            }
        );
    };

    const handleDataRefresh = () => {
        fetchPatientFiles();
    };

    const removePatientsCall = data => {
        deletePatient(data)
            .then(_ => {
                modal.openModal(
                    'ConfirmationModal',
                    {
                        content: <ConfirmationComponent
                            isError={false}
                            isEditUpdate={false}
                            onAction={() => {
                                modal.closeModals('ConfirmationModal');
                                setTimeout(() => {
                                    modal.closeModals('ActionContainerModal');
                                    handleDataRefresh();
                                }, 200);
                            }}
                        />,
                        onClose: () => {
                            modal.closeModals('ConfirmationModal');
                        }
                    }
                );

                setSelectedPatientIds([]);
            })
            .catch(error => {
                openErrorConfirmation();
                setTimeout(() => {
                    modal.closeModals('ActionContainerModal');
                }, 200);
                console.log('Failed to remove case file: ', error);
            })
            .finally(_ => {
                setFloatingAction(false);
            });
    }

    const openDeletionConfirm = data => {
        modal.openModal(
            'ConfirmationModal',
            {
                content: <ConfirmationComponent
                    isError={false}
                    isEditUpdate={true}
                    onCancel={() => modal.closeModals('ConfirmationModal')}
                    onAction={() => {
                        modal.closeModals('ConfirmationModal');
                        removePatientsCall(data);

                    }}
                    // onAction = { () => confirmAction()}
                    message="Do you want to delete these item(s)?"
                />,
                onClose: () => {

                    modal.closeModals('ConfirmationModal');
                }
            }
        );

    };

    const handleRemovePatient = async (id) => {
        console.log('delted idss', selectedPatientds)
        openDeletionConfirm({ patientIds: [...selectedPatientds] })
    }

    const handleOnCheckBoxPress = item => () => {
        const { _id, id } = item; // account for both drafts and created cases.
        const updateditems = checkboxItemPress(_id || id, selectedPatientds);
        setSelectedPatientIds(updateditems);
    };

    const openCreatePatient = () => {
        modal.closeModals('ActionContainerModal');
        navigation.navigate('PatientCreation', {
            initial: false,
            draftItem: null,
            intialPage: "Patient"
        });
    } 

    const handleAddProcedure =()=>{
        modal.closeModals('ActionContainerModal');
        navigation.navigate('AddProcedure', {
            initial: false,
            draftItem: null,
            patientId:selectedPatientds[0]
        });
    }

    const getFabActions = () => {
        const actionArray = []
        const disabled = !!isEmpty(selectedPatientds);
        const enabled = selectedPatientds.length === 1
        const strokeColor = !enabled ? theme.colors['--color-gray-600'] : theme.colors['--color-red-700'];
        const deleteAction = (
            <View style={{
                borderRadius: 6,
                flex: 1,
                overflow: 'hidden'
            }}
            >
                <LongPressWithFeedback
                    pressTimer={LONG_PRESS_TIMER.MEDIUM}
                    isDisabled={disabled}
                    onLongPress={() => handleRemovePatient(selectedPatientds[0])}
                >
                    <ActionItem
                        title="Hold to Delete Patient"
                        icon={(
                            <WasteIcon
                                strokeColor={disabled ? theme.colors['--color-gray-600'] : theme.colors['--color-red-700']}
                            />
                        )}
                        touchable={false}
                        disabled={disabled}
                    />
                </LongPressWithFeedback>

            </View>
        );

        const createPatient = (
            <ActionItem
                title=' Create Patient'
                icon={<AddIcon />}
                onPress={openCreatePatient}
            />)

        const addProcedure = (
            <ActionItem
                title='Add Procedure'
                icon={<AddIcon 
                    strokeColor={!enabled ? theme.colors['--color-gray-600'] : theme.colors['--color-green-700']}
                />} 
                disabled={!enabled}
                onPress={handleAddProcedure}
            />) 

        actionArray.push(addProcedure)
        actionArray.push(createPatient)
        actionArray.push(deleteAction)



        return <ActionContainer
            floatingActions={actionArray}
            title="CASE ACTIONS"
        />;

    }

    const toggleActionButton = () => {
        setFloatingAction(true);
        modal.openModal('ActionContainerModal',
            {
                actions: getFabActions(),
                title: 'PATIENT ACTIONS',
                onClose: () => {
                    setFloatingAction(false);
                }
            });
    };

    return (

        <NavPage
            isFetchingData={isFetchingPatients}
            routeName='Patients'
            placeholderText="Search Patient by name"
            listData={patientData}
            changeText={onSearchChange}
            itemsSelected={selectedPatientds}
            inputText={searchValue}
            listItemFormat={renderFn}
            TopButton={() => (
                <ButtonContainer theme={theme}>
                    <Button
                        title="Archives"
                        color={theme.colors['--color-gray-500']}
                        font="--text-sm-regular"
                    />
                </ButtonContainer>)}
            listHeaders={listHeaders}
            isDisabled={isFloatingActionDisabled}
            toggleActionButton={toggleActionButton}

            totalPages={totalPages}
            currentPage={currentPagePosition}
            goToNextPage={goToNextPage}
            goToPreviousPage={goToPreviousPage}
            hasPaginator={true}
            hasActionButton={true}
            hasActions={true}
            isNextDisabled={isNextDisabled}
            isPreviousDisabled={isPreviousDisabled}
        />


    )

}

const mapStateToProps = state => {

}
const mapDispatcherToProp = {}

export default connect(mapStateToProps, mapDispatcherToProp)(PatientFiles)