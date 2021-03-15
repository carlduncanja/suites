import React, {useState, useEffect, useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {connect} from 'react-redux';
import _, {isEmpty, forEach} from 'lodash';
import {useModal, withModal} from 'react-native-modalfy';
import moment from 'moment';
import styled, {css} from '@emotion/native';
import {useTheme} from 'emotion-theming';
import Page from '../../components/common/Page/Page';
import ListItem from '../../components/common/List/ListItem';
import RoundedPaginator from '../../components/common/Paginators/RoundedPaginator';
import FloatingActionButton from '../../components/common/FloatingAction/FloatingActionButton';
import CaseFileBottomSheet from '../../components/CaseFiles/CaseFileBottomSheet';
import ActionContainer from '../../components/common/FloatingAction/ActionContainer';
import ActionItem from '../../components/common/ActionItem';
import CreateCaseDialogContainer from '../../components/CaseFiles/CreateCaseDialogContainer';
import AddIcon from '../../../assets/svg/addIcon';
import ArchiveIcon from '../../../assets/svg/archiveIcon';
import DraftItem from '../../components/common/List/DraftItem';

import {setCaseFiles} from '../../redux/actions/caseFilesActions';
import {getCaseFiles, removeCaseFiles} from '../../api/network';

import {
    useNextPaginator,
    usePreviousPaginator,
    selectAll,
    checkboxItemPress, handleUnauthorizedError,
} from '../../helpers/caseFilesHelpers';
import {currencyFormatter, formatDate} from '../../utils/formatter';
import {SuitesContext} from '../../contexts/SuitesContext';

import caseFiles from '../../../data/CaseFiles';
import Footer from '../../components/common/Page/Footer';
import NavPage from '../../components/common/Page/NavPage';
import Data from '../../components/common/Table/Data';
import DataItem from '../../components/common/List/DataItem';
import MultipleTextDataItem from '../../components/common/List/MultipleTextDataItem';
import patient from '../../../assets/svg/newCasePatient';
import {emptyFn, LONG_PRESS_TIMER} from "../../const";
import {PageSettingsContext} from '../../contexts/PageSettingsContext';
import LongPressWithFeedback from "../../components/common/LongPressWithFeedback";
import WasteIcon from "../../../assets/svg/wasteIcon";
import {removeDraft} from "../../redux/actions/draftActions";
import Button from '../../components/common/Buttons/Button';
import ConfirmationComponent from '../../components/ConfirmationComponent';

const listHeaders = [
    {
        name: 'Patient',
        alignment: 'flex-start',
    },
    {
        name: 'Balance',
        alignment: 'flex-start',
    },
    {
        name: 'Staff',
        alignment: 'flex-start',
    },
    {
        name: 'Next Visit',
        alignment: 'flex-start',
    },
];

const ButtonContainer = styled.View`
    width: 105px;
    height: 26px;
    border: 1px solid #A0AEC0;
    box-sizing: border-box;
    border-radius: 6px;
    padding-top: 2px;
`;

function CaseFiles(props) {
    //######## const
    const modal = useModal();
    const theme = useTheme();

    // const router = useRouter
    const recordsPerPage = 10;

    //######## Props

    const {
        // Redux props
        caseFiles = [],
        setCaseFiles,
        drafts = [],
        removeDraft = emptyFn,

        // React Navigation Props
        navigation,
        route,
    } = props;

    //######## States

    const [selectedCaseIds, setSelectedCaseIds] = useState([]);
    const [isFetchingCaseFiles, setFetchingCaseFiles] = useState(false);
    const [isFloatingActionDisabled, setFloatingAction] = useState(false);
    const [hasActions, setHasActions] = useState(false);
    const [isNextDisabled, setNextDisabled] = useState(false);
    const [isPreviousDisabled, setPreviousDisabled] = useState(true);
    const [hasDraft, setHasDraft] = useState(true);
    const [pageSettingState, setPageSettingState] = useState({});
    const {isDisabled} = pageSettingState;

    const routeName = route.name;

    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResult] = useState([]);
    const [searchQuery, setSearchQuery] = useState({});

    // pagination
    const [totalPages, setTotalPages] = useState(1);
    const [currentPagePosition, setCurrentPagePosition] = useState(1);
    const [currentPageListMin, setCurrentPageListMin] = useState(0);
    const [currentPageListMax, setCurrentPageListMax] = useState(recordsPerPage);

    //######## Life Cycle Methods
    useEffect(() => {
        if (!caseFiles.length) {
            fetchCaseFilesData(currentPagePosition);
        }
        setTotalPages(
            caseFiles.length === 0 ? 1 :
                Math.ceil(caseFiles.length / recordsPerPage)
        );
    }, []);

    useEffect(() => {
        if (!searchValue) {
            // empty search values and cancel any out going request.
            setSearchResult([]);
            fetchCaseFilesData(1);
            if (searchQuery.cancel) searchQuery.cancel();
            return;
        }

        // wait 300ms before search. cancel any prev request before executing current.

        const search = _.debounce(fetchCaseFilesData, 300);

        setSearchQuery(prevSearch => {
            if (prevSearch && prevSearch.cancel) {
                prevSearch.cancel();
            }
            return search;
        });

        search();
        setCurrentPagePosition(1);
    }, [searchValue]);

    //######## Event Handlers

    const goToNextPage = () => {
        if (currentPagePosition < totalPages) {
            console.log('Next page');
            const {
                currentPage,
                currentListMin,
                currentListMax
            } = useNextPaginator(currentPagePosition, recordsPerPage, currentPageListMin, currentPageListMax);
            setCurrentPagePosition(currentPage);
            setCurrentPageListMin(currentListMin);
            setCurrentPageListMax(currentListMax);
            fetchCaseFilesData(currentPage);
            setNextDisabled(false);
        }
    };

    const goToPreviousPage = () => {
        if (currentPagePosition === 1) {
            return;
        }
        const {
            currentPage,
            currentListMin,
            currentListMax
        } = usePreviousPaginator(currentPagePosition, recordsPerPage, currentPageListMin, currentPageListMax);
        setCurrentPagePosition(currentPage);
        setCurrentPageListMin(currentListMin);
        setCurrentPageListMax(currentListMax);
        fetchCaseFilesData(currentPage);
    };

    const handleOnItemPress = (item, isOpenEditable) => () => {
        if (item !== null) {
            isEmpty(item?.patient?.medicalInfo) ?
                navigation.navigate('CreateCase', {
                    initial: false,
                    draftItem: item
                }) :
                navigation.navigate('Case', {
                    initial: false,
                    caseId: item._id,
                    isEdit: isOpenEditable
                });
        } else return;
    };

    const handleOnCheckBoxPress = caseItem => () => {
        const {_id, id} = caseItem; // account for both drafts and created cases.
        const updatedCases = checkboxItemPress(_id || id, selectedCaseIds);
        setSelectedCaseIds(updatedCases);
    };

    const handleOnSelectAll = () => {
        const updatedCases = selectAll(caseFiles, selectedCaseIds);
        setSelectedCaseIds(updatedCases);
    };

    const handleDataRefresh = () => {
        fetchCaseFilesData();
    };

    const toggleActionButton = () => {
        setFloatingAction(true);
        modal.openModal('ActionContainerModal',
            {
                actions: getFabActions(),
                title: 'CASE ACTIONS',
                onClose: () => {
                    setFloatingAction(false);
                }
            });
    };

    //######## Helper Functions

    const changeText = text => {
        setSearchValue(text);
    };

    const fetchCaseFilesData = pagePosition => {
        const currentPosition = pagePosition || 1;
        setCurrentPagePosition(currentPosition);

        setFetchingCaseFiles(true);
        getCaseFiles(searchValue, recordsPerPage, currentPosition)
            .then(caseResult => {
                const {data = [], pages = 0} = caseResult;

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
                setCaseFiles(data);
                setTotalPages(pages);
                // data.length === 0 ? setTotalPages(1) : setTotalPages(pages);
            })
            .catch(error => {
                console.log('failed to get case files', error);

                handleUnauthorizedError(error?.response?.status, setCaseFiles);
                setPageSettingState({...pageSettingState, isDisabled: true});
                setTotalPages(1);
                setPreviousDisabled(true);
                setNextDisabled(true);
            })
            .finally(_ => {
                setFetchingCaseFiles(false);
            });
    };

    const renderFn = item => {
        const {patient = {}} = item;

        // console.log("what's pssed to render?", item.patient);

        return <>
            <ListItem
                hasCheckBox={true}
                isChecked={selectedCaseIds.includes(item._id || item.id)}
                onCheckBoxPress={handleOnCheckBoxPress(item)}
                onItemPress={handleOnItemPress(item, false)}
                itemView={ item.isDraft  ? renderDraft(item) : caseItem(item)}//add ternary here to account for draft
                //items passed here should be deciphered whether it is a draft or not
            />
            {/* */}
        </>;
    };

    const getDate = dates => {
        let updatedDates = [...dates];
        let dateIndex = 0;
        while (dateIndex < dates.length) {
            const earliestDate = moment.min(updatedDates);
            const isAfterToday = moment(earliestDate)
                .isSameOrAfter(new Date());

            if (isAfterToday) {
                return earliestDate;
            }
            updatedDates = updatedDates.filter(item => item !== earliestDate);

            dateIndex += 1;
        }
    };

    const renderDraft = item => {
        if (item !== null) {
            const {patient = {}} = item || {};

            return (<DraftItem
                text={`${patient?.firstName ? `${patient?.firstName || ''} ${patient?.surname || ''}` : 'N/A'} `}/>);
        }
    };

    const caseItem = item => {
        const {
            caseNumber,
            patient = {},
            chargeSheet = {},
            staff = {},
            caseProcedures = [],
        } = item || {};

        let name,
            physicianName;
        // console.log("Item: ", item.chargeSheet)

        const {total = 0} = item.chargeSheet || {};
        const {leadPhysician} = staff;

        patient ? name = `${patient.firstName} ${patient.surname}` : name = '';
        leadPhysician ? physicianName = `Dr. ${leadPhysician.surname}` : physicianName = '';

        const dates = caseProcedures.map(item => {
            const {appointment} = item;
            const {startTime} = appointment;
            return moment(startTime);
        });

        const nextVisit = getDate(dates);

        return (
            <>
                <MultipleTextDataItem
                    primaryText={`# ${caseNumber}`}
                    secondaryText={name}
                />
                <DataItem text={`$ ${currencyFormatter(total)}`}/>
                <DataItem text={physicianName}/>
                <DataItem text={formatDate(nextVisit, 'MMM DD, YYYY') || 'n/a'}/>
            </>
        );
    };

    const handleRemoveDraft = (id) => {
        modal.closeAllModals();
        removeDraft(id);
        setFloatingAction(false);
    }

    const onArchivePress = () => {
        modal.closeModals('ActionContainerModal');
        setTimeout(() => {
            modal.openModal('ConfirmationModal', {
                content: (
                    <ConfirmationComponent
                        isError={false}//boolean to show whether an error icon or success icon
                        isEditUpdate={true}
                        onCancel={() => modal.closeAllModals() }
                        onAction={() => {
                            modal.closeAllModals();
                            handleArchiveCases();
                        }}
                        message="Do you want to archive these cases?"//general message you can send to be displayed
                        action="Yes"
                    />
                )
            })
        }, 200);
        
    }

    const handleArchiveCases = () => {
        const caseIds = { ids: [...selectedCaseIds] };
        console.log('Archive case/s: ', caseIds);

        removeCaseFiles({ ids: [...selectedCaseIds] })
            .then(_ => {
                modal.openModal('ConfirmationModal', {
                    content: (
                        <ConfirmationComponent
                            isError={false}//boolean to show whether an error icon or success icon
                            isEditUpdate={false}
                            onCancel={() => modal.closeAllModals() }
                            onAction={() => {
                                modal.closeAllModals();
                                handleDataRefresh();
                                setTimeout(() => {
                                    openViewArchivedCases();
                                }, 200)
                                
                            }}
                        />
                    )
                })
            })
            .catch(_ => {
                modal.openModal('ConfirmationModal', {
                    content: (
                        <ConfirmationComponent
                            isError={true}//boolean to show whether an error icon or success icon
                            isEditUpdate={false}
                            onCancel={() => modal.closeAllModals() }
                            onAction={() => modal.closeAllModals() }
                        />
                    )
                })
            })
    };

    const getFabActions = () => {
        const disabled = !!isEmpty(selectedCaseIds);
        const archiveCase = (
            <ActionItem
                title="Archive Case"
                icon={<ArchiveIcon strokeColor={disabled ? theme.colors['--color-gray-600'] : theme.colors['--company']}/>}
                onPress={onArchivePress}
                disabled={disabled}
                touchable={!disabled}
            />
        );

        const enabled = selectedCaseIds.length === 1 && drafts.some(item => item.id === selectedCaseIds[0])
        const strokeColor = !enabled ? theme.colors['--color-gray-600'] : theme.colors['--color-red-700'];

        const deleteDraftAction = (<View style={{
                borderRadius: 6,
                flex: 1,
                overflow: 'hidden'
            }}
            >
                <LongPressWithFeedback
                    pressTimer={LONG_PRESS_TIMER.LONG}
                    onLongPress={() => {handleRemoveDraft(selectedCaseIds[0])}}
                    isDisabled={!enabled}
                >
                    <ActionItem
                        title="Hold to Delete Draft"
                        icon={<WasteIcon strokeColor={strokeColor}/>}
                        disabled={!enabled}
                        touchable={false}
                    />
                </LongPressWithFeedback>
            </View>
        );

        const createNewCase = <ActionItem title="New Case" icon={<AddIcon/>} onPress={openCreateCaseFile}/>;

        return <ActionContainer
            floatingActions={[
                archiveCase,
                deleteDraftAction,
                createNewCase,
            ]}
            title="CASE ACTIONS"
        />;
    };

    const openCreateCaseFile = () => {
        modal.closeModals('ActionContainerModal');
        navigation.navigate('CreateCase', {
            initial: false,
            draftItem: null
        });
    };

    const openViewArchivedCases = () => {
        console.log('View Archived Cases');
        props.navigation.navigate('ArchiveCasesPage', {
            archivedCaseItem: caseItem,
            refreshCases: handleDataRefresh,
        });
    }

    // prepare case files to display
    const caseFilesToDisplay = [...caseFiles];

    return (
        <PageSettingsContext.Provider value={{
            pageSettingState,
            setPageSettingState
        }}
        >
            <NavPage
                isFetchingData={isFetchingCaseFiles}
                onRefresh={handleDataRefresh}
                placeholderText="Search by Case ID, Patient, Staff"
                changeText={changeText}
                inputText={searchValue}
                routeName="Case Files"
                listData={caseFilesToDisplay}
                TopButton={() => (
                    <ButtonContainer theme={theme}>
                        <Button
                            title="View Archive"
                            color={theme.colors['--color-gray-500']}
                            font="--text-sm-regular"
                            buttonPress={openViewArchivedCases}
                        />
                    </ButtonContainer>
                    
                )}

                listHeaders={listHeaders}
                itemsSelected={selectedCaseIds}
                onSelectAll={handleOnSelectAll}
                listItemFormat={renderFn}

                totalPages={totalPages}
                currentPage={currentPagePosition}
                goToNextPage={goToNextPage}
                goToPreviousPage={goToPreviousPage}
                isDisabled={isFloatingActionDisabled}
                toggleActionButton={toggleActionButton}
                hasPaginator={true}
                hasActionButton={true}
                hasActions={true}
                isNextDisabled={isNextDisabled}
                isPreviousDisabled={isPreviousDisabled}
            />
        </PageSettingsContext.Provider>
    );
}

const mapStateToProps = state => {
    let {caseFiles} = state;
    const {drafts} = state;

    if (drafts && drafts.length) caseFiles = [...drafts, ...caseFiles];

    return {
        caseFiles,
        drafts
    };
};

const mapDispatcherToProp = {setCaseFiles, removeDraft};

export default connect(mapStateToProps, mapDispatcherToProp)(CaseFiles);

const styles = StyleSheet.create({
    item: {
        flex: 1,
        //flexDirection:'row',
        alignItems: 'flex-start',
        //justifyContent:'center',
    },
    itemText: {
        fontSize: 14,
        color: '#4E5664',
    },
    footer: {
        flex: 1,
        alignSelf: 'flex-end',
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        marginBottom: 20,
        right: 0,
        marginRight: 30,
    },
});
