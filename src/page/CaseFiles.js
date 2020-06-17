import React, {useState, useEffect, useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import Page from '../components/common/Page/Page';
import ListItem from "../components/common/List/ListItem";
import RoundedPaginator from '../components/common/Paginators/RoundedPaginator';
import FloatingActionButton from '../components/common/FloatingAction/FloatingActionButton';
import CaseFileBottomSheet from '../components/CaseFiles/CaseFileBottomSheet';
import ActionContainer from "../components/common/FloatingAction/ActionContainer";
import ActionItem from "../components/common/ActionItem";
import CreateCaseDialogContainer from '../components/CaseFiles/CreateCaseDialogContainer';

import AddIcon from "../../assets/svg/addIcon";
import ArchiveIcon from "../../assets/svg/archiveIcon";

import {connect} from 'react-redux';
import {setCaseFiles} from "../redux/actions/caseFilesActions";
import {getCaseFiles} from "../api/network";

import {useNextPaginator, usePreviousPaginator} from '../helpers/caseFilesHelpers';
import {currencyFormatter} from '../utils/formatter';
import {SuitesContext} from '../contexts/SuitesContext';

import {withModal} from 'react-native-modalfy';
import moment from 'moment';
import {formatDate} from '../utils/formatter';
import caseFiles from "../../data/CaseFiles";


const listHeaders = [
    {
        name: "Patient",
        alignment: "flex-start"
    },
    {
        name: "Balance",
        alignment: "flex-start"
    },
    {
        name: "Staff",
        alignment: "flex-start"
    },
    {
        name: "Next Visit",
        alignment: "flex-start"
    }
];

const CaseFiles = (props) => {
    //######## const

    const recordsPerPage = 10;

    //######## Props

    const {
        // Redux props
        caseFiles,
        setCaseFiles,
        navigation,
        modal
    } = props;

    //######## States
    const [textInput, setTextInput] = useState("");
    const [selectedCaseIds, setSelectedCaseIds] = useState([]);
    const [isFetchingCaseFiles, setFetchingCaseFiles] = useState(false);
    const [isFloatingActionDisabled, setFloatingAction] = useState(false)

    const routeName = navigation.state.routeName;

    // pagination
    const [totalPages, setTotalPages] = useState(0);
    const [currentPagePosition, setCurrentPagePosition] = useState(1);
    const [currentPageListMin, setCurrentPageListMin] = useState(0);
    const [currentPageListMax, setCurrentPageListMax] = useState(recordsPerPage);

    //######## Life Cycle Methods
    useEffect(() => {
        if (!caseFiles.length) {
            fetchCaseFilesData()
        }
        setTotalPages(Math.ceil(caseFiles.length / recordsPerPage))
    }, []);

    //######## Event Handlers

    const goToNextPage = () => {
        if (currentPagePosition < totalPages) {
            let {currentPage, currentListMin, currentListMax} = useNextPaginator(currentPagePosition, recordsPerPage, currentPageListMin, currentPageListMax)
            setCurrentPagePosition(currentPage);
            setCurrentPageListMin(currentListMin);
            setCurrentPageListMax(currentListMax);
        }
    };

    const goToPreviousPage = () => {
        if (currentPagePosition === 1) return;

        let {currentPage, currentListMin, currentListMax} = usePreviousPaginator(currentPagePosition, recordsPerPage, currentPageListMin, currentPageListMax)
        setCurrentPagePosition(currentPage);
        setCurrentPageListMin(currentListMin);
        setCurrentPageListMax(currentListMax);
    };

    const handleOnItemPress = (item, isOpenEditable) => () => {
        console.log("item press", item);

        modal.openModal('BottomSheetModal', {
            content: <CaseFileBottomSheet caseItem={item} isOpenEditable={isOpenEditable}/>
        })
    };

    const handleOnCheckBoxPress = (caseItem) => () => {
        const {_id} = caseItem;
        let updatedCases = [...selectedCaseIds];

        if (updatedCases.includes(_id)) {
            updatedCases = updatedCases.filter(id => id !== caseItem._id)
        } else {
            updatedCases.push(caseItem._id);
        }

        setSelectedCaseIds(updatedCases);
    };

    const handleOnSelectAll = () => {
        const indeterminate = selectedCaseIds.length >= 0 && selectedCaseIds.length !== caseFiles.length;
        // console.log("Indeterminate: ", indeterminate)
        if (indeterminate) {
            const selectedAllIds = [...caseFiles.map(caseItem => caseItem._id)]
            setSelectedCaseIds(selectedAllIds)
            // todo insert all id's
        } else {
            setSelectedCaseIds([])
            // todo remove all i
        }

    };

    const handleDataRefresh = () => {
        fetchCaseFilesData()
    };

    const toggleActionButton = () => {
        setFloatingAction(true)
        modal.openModal("ActionContainerModal",
            {
                actions: getFabActions(),
                title: "CASE ACTIONS",
                onClose: () => {
                    setFloatingAction(false)
                }
            })
    }

    //######## Helper Functions

    const changeText = (text) => {
        setTextInput(text)
    };

    const fetchCaseFilesData = () => {
        setFetchingCaseFiles(true);
        getCaseFiles()
            .then(data => {
                setCaseFiles(data);
                setTotalPages(Math.ceil(data.length / recordsPerPage))
            })
            .catch(error => {
                console.log("failed to get case files", error);
            })
            .finally(_ => {
                setFetchingCaseFiles(false)
            })
    };

    const renderFn = (item) => {
        return <ListItem
            hasCheckBox={true}
            isChecked={selectedCaseIds.includes(item._id)}
            onCheckBoxPress={handleOnCheckBoxPress(item)}
            onItemPress={handleOnItemPress(item, false)}
            itemView={caseItem(item)}
        />
    };

    const getDate = (dates) => {
        let updatedDates = [...dates]
        let dateIndex = 0
        while (dateIndex < dates.length) {
            let earliestDate = moment.min(updatedDates)
            let isAfterToday = moment(earliestDate).isSameOrAfter(new Date())

            if (isAfterToday) {
                return earliestDate
            } else {
                updatedDates = updatedDates.filter(item => item !== earliestDate)
            }
            dateIndex += 1
        }
    }

    const caseItem = (item) => {
        const {
            caseNumber,
            patient = {},
            chargeSheet = {},
            staff = {},
            caseProcedures = [],
        } = item

        let name, physicianName;

        const {total = 0} = chargeSheet;
        let {leadPhysician} = staff

        patient ? name = `${patient.firstName} ${patient.surname}` : name = ""
        leadPhysician ? physicianName = `Dr. ${leadPhysician.surname}` : physicianName = ""

        const dates = caseProcedures.map(item => {
            const {appointment} = item
            const {startTime} = appointment
            return moment(startTime)
        })

        const nextVisit = getDate(dates)

        return (
            <>
                <View style={styles.item}>
                    <Text style={{color: "#718096", fontSize: 12}}>#{caseNumber}</Text>
                    <Text style={{color: "#3182CE", fontSize: 16}}>{name}</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.itemText}>$ {currencyFormatter(total)}</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.itemText}>{physicianName}</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.itemText}>{formatDate(nextVisit, "MMM DD, YYYY")}</Text>
                </View>
            </>
        )
    }

    const getFabActions = () => {

        const archiveCase = <ActionItem title={"Archive Case"} icon={<ArchiveIcon/>} onPress={() => {}}/>;
        const createNewCase = <ActionItem title={"New Case"} icon={<AddIcon/>} onPress={openCreateCaseFile}/>;

        return <ActionContainer
            floatingActions={[
                archiveCase,
                createNewCase
            ]}
            title={"CASE ACTIONS"}
        />
    };

    const openCreateCaseFile = () => {
        modal.closeModals('ActionContainerModal');
        // For some reason there has to be a delay between closing a modal and opening another.
        setTimeout(() => {

            modal
                .openModal(
                    'OverlayModal',
                    {
                        content: <CreateCaseDialogContainer
                            onCancel={() => setFloatingAction(false)}
                            onCreated={(item) => handleOnItemPress(item, true)()}
                        />,
                        onClose: () => setFloatingAction(false)
                    })
        }, 200)
    }

    // prepare case files to display
    let caseFilesToDisplay = [...caseFiles];
    caseFilesToDisplay = caseFilesToDisplay.slice(currentPageListMin, currentPageListMax);


    return (
        <View style={{flex: 1}}>

            <Page
                isFetchingData={isFetchingCaseFiles}
                onRefresh={handleDataRefresh}
                placeholderText={"Search by any heading or entry below"}

                changeText={changeText}
                inputText={textInput}
                routeName={routeName}
                listData={caseFilesToDisplay}

                listHeaders={listHeaders}
                itemsSelected={selectedCaseIds}
                onSelectAll={handleOnSelectAll}

                listItemFormat={renderFn}
            />


            <View style={styles.footer}>
                <View style={{alignSelf: "center", marginRight: 10}}>
                    <RoundedPaginator
                        totalPages={totalPages}
                        currentPage={currentPagePosition}
                        goToNextPage={goToNextPage}
                        goToPreviousPage={goToPreviousPage}
                    />
                </View>

                <FloatingActionButton
                    isDisabled={isFloatingActionDisabled}
                    toggleActionButton={toggleActionButton}
                />

            </View>
        </View>

    );
};

const mapStateToProps = (state) => ({
    caseFiles: state.caseFiles
});

const mapDispatcherToProp = {
    setCaseFiles
};

export default connect(mapStateToProps, mapDispatcherToProp)(withModal(CaseFiles));

const styles = StyleSheet.create({
    item: {
        flex: 1,
        //flexDirection:'row',
        alignItems: "flex-start",
        //justifyContent:'center',
    },
    itemText: {
        fontSize: 14,
        color: "#4E5664",
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
