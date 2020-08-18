import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";

import Page from '../../components/common/Page/Page';
import ListItem from "../../components/common/List/ListItem";
import RoundedPaginator from "../../components/common/Paginators/RoundedPaginator";
import FloatingActionButton from "../../components/common/FloatingAction/FloatingActionButton";
import CaseFileBottomSheet from "../../components/CaseFiles/CaseFileBottomSheet";
import ActionContainer from "../../components/common/FloatingAction/ActionContainer";
import ActionItem from "../../components/common/ActionItem";
import CreateCaseDialogContainer from "../../components/CaseFiles/CreateCaseDialogContainer";

import AddIcon from "../../../assets/svg/addIcon";
import ArchiveIcon from "../../../assets/svg/archiveIcon";
import DraftItem from "../../components/common/List/DraftItem";

import { connect } from "react-redux";
import { setCaseFiles } from "../../redux/actions/caseFilesActions";
import { getCaseFiles } from "../../api/network";
import { isEmpty, forEach } from "lodash";
import _ from "lodash";


import {
    useNextPaginator,
    usePreviousPaginator,
    selectAll,
    checkboxItemPress,
} from "../../helpers/caseFilesHelpers";
import { currencyFormatter } from "../../utils/formatter";
import { SuitesContext } from "../../contexts/SuitesContext";

import { useModal, withModal } from "react-native-modalfy";
import moment from "moment";

import { formatDate } from "../../utils/formatter";
import caseFiles from "../../../data/CaseFiles";
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
import Footer from "../../components/common/Page/Footer";
import NavPage from "../../components/common/Page/NavPage";
import Data from "../../components/common/Table/Data";
import DataItem from "../../components/common/List/DataItem";
import MultipleTextDataItem from "../../components/common/List/MultipleTextDataItem";
import patient from "../../../assets/svg/newCasePatient";

const listHeaders = [
    {
        name: "Patient",
        alignment: "flex-start",
    },
    {
        name: "Balance",
        alignment: "flex-start",
    },
    {
        name: "Staff",
        alignment: "flex-start",
    },
    {
        name: "Next Visit",
        alignment: "flex-start",
    },
];

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
        draft = {},

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

    const routeName = route.name;

    const [searchValue, setSearchValue] = useState("");
    const [searchResults, setSearchResult] = useState([]);
    const [searchQuery, setSearchQuery] = useState({});

    // pagination
    const [totalPages, setTotalPages] = useState(0);
    const [currentPagePosition, setCurrentPagePosition] = useState(1);
    const [currentPageListMin, setCurrentPageListMin] = useState(0);
    const [currentPageListMax, setCurrentPageListMax] = useState(recordsPerPage);

    //######## Life Cycle Methods
    useEffect(() => {
        if (!caseFiles.length) {
            fetchCaseFilesData(currentPagePosition);
        }
        setTotalPages(Math.ceil(caseFiles.length / recordsPerPage));
    }, []);

    useEffect(() => {

        if (!searchValue) {
            // empty search values and cancel any out going request.
            setSearchResult([]);
            fetchCaseFilesData(1)
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

        search()
        setCurrentPagePosition(1)
    }, [searchValue]);

    //######## Event Handlers

    const goToNextPage = () => {
        if (currentPagePosition < totalPages) {
            let { currentPage, currentListMin, currentListMax } = useNextPaginator(currentPagePosition, recordsPerPage, currentPageListMin, currentPageListMax)
            setCurrentPagePosition(currentPage);
            setCurrentPageListMin(currentListMin);
            setCurrentPageListMax(currentListMax);
            fetchCaseFilesData(currentPage)
            setNextDisabled(false)
        }
    };

    const goToPreviousPage = () => {
        if (currentPagePosition === 1) { return };
        let { currentPage, currentListMin, currentListMax } = usePreviousPaginator(currentPagePosition, recordsPerPage, currentPageListMin, currentPageListMax)
        setCurrentPagePosition(currentPage);
        setCurrentPageListMin(currentListMin);
        setCurrentPageListMax(currentListMax);
        fetchCaseFilesData(currentPage)
    };

    const handleOnItemPress = (item, isOpenEditable) => () => {
        console.log("what is tapped is:", item);

        isEmpty(item.patient.medicalInfo) ? navigation.navigate("CreateCase", { initial: false, draftItem: item }) :
            navigation.navigate('Case Files', {
                screen: 'Case',
                initial: false,
                params: { caseId: item._id, isEdit: isOpenEditable }
            });
    };

    const handleOnCheckBoxPress = (caseItem) => () => {
        const { _id } = caseItem;
        let updatedCases = checkboxItemPress(caseItem, _id, selectedCaseIds)
        setSelectedCaseIds(updatedCases);
    };

    const handleOnSelectAll = () => {
        let updatedCases = selectAll(caseFiles, selectedCaseIds);
        setSelectedCaseIds(updatedCases)
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
        setSearchValue(text)
    };

    const fetchCaseFilesData = (pagePosition) => {

        let currentPosition = pagePosition ? pagePosition : 1;
        setCurrentPagePosition(currentPosition);

        setFetchingCaseFiles(true);
        getCaseFiles(searchValue, recordsPerPage, currentPosition)
            .then(caseResult => {
                const { data = [], pages = 0 } = caseResult

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
                    setPreviousDisabled(false)
                } else {
                    setNextDisabled(true);
                    setPreviousDisabled(true);
                }
                setCaseFiles(data);
                data.length === 0 ? setTotalPages(0) : setTotalPages(pages);
            })
            .catch(error => {
                console.log("failed to get case files", error);
            })
            .finally(_ => {
                setFetchingCaseFiles(false)
            })
    };



    const renderFn = (item) => {


        // console.log("what's pssed to render?", item.patient);

        return (<>

            <ListItem

                hasCheckBox={true}
                isChecked={selectedCaseIds.includes(item._id)}
                onCheckBoxPress={handleOnCheckBoxPress(item)}
                onItemPress={handleOnItemPress(item, false)}
                itemView={isEmpty(item.patient.medicalInfo) ? renderDraft(item) : caseItem(item)}//add ternary here to account for draft
            //items passed here should be deciphered whether it is a draft or not

            />
            {/* */}


        </>

        )
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

    const renderDraft = (item) => {

        console.log("rendering the draft item");

        return (<DraftItem text={`${item.patient.firstName} ${item.patient.surname}`} />)




    }

    const caseItem = (item) => {

        //console.log("being passed in tempdraft is", item);

        const {
            caseNumber,
            patient = {},
            chargeSheet = {},
            staff = {},
            caseProcedures = [],
        } = item || {}

        let name, physicianName;
        // console.log("Item: ", item.chargeSheet)

        const { total = 0 } = item.chargeSheet || {}
        let { leadPhysician } = staff

        patient ? name = `${patient.firstName} ${patient.surname}` : name = ""
        leadPhysician ? physicianName = `Dr. ${leadPhysician.surname}` : physicianName = ""

        const dates = caseProcedures.map(item => {
            const { appointment } = item
            const { startTime } = appointment
            return moment(startTime)
        })

        const nextVisit = getDate(dates)

        return (
            <>
                <MultipleTextDataItem
                    primaryText={`# ${caseNumber}`}
                    secondaryText={name}
                />
                <DataItem text={`$ ${currencyFormatter(total)}`} />
                <DataItem text={physicianName} />
                <DataItem text={formatDate(nextVisit, "MMM DD, YYYY") || 'n/a'} />
            </>




        )
    }

    const getFabActions = () => {
        const archiveCase = <ActionItem title={"Archive Case"} icon={<ArchiveIcon />} onPress={() => {
        }} />;
        const createNewCase = <ActionItem title={"New Case"} icon={<AddIcon />} onPress={openCreateCaseFile} />;

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
        props.navigation.navigate('Case Files', { screen: 'CreateCase', initial: false, params: { draftItem: null } });
    }

    // prepare case files to display
    let caseFilesToDisplay = [...caseFiles];

    return (
        <>

            <NavPage
                isFetchingData={isFetchingCaseFiles}
                onRefresh={handleDataRefresh}
                placeholderText={"Search by Case ID, Patient, Staff"}
                changeText={changeText}
                inputText={searchValue}
                routeName={"Case Files"}
                listData={caseFilesToDisplay}

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


        </>
        // <CaseFilesWrapper>
        //     <CaseFilesContainer>
        //         <Page
        //             isFetchingData={isFetchingCaseFiles}
        //             onRefresh={handleDataRefresh}
        //             placeholderText={"Search by any heading or entry below"}
        //             changeText={changeText}
        //             inputText={searchValue}
        //             routeName={routeName}
        //             listData={caseFilesToDisplay}

        //             listHeaders={listHeaders}
        //             itemsSelected={selectedCaseIds}
        //             onSelectAll={handleOnSelectAll}
        //             listItemFormat={renderFn}
        //         />

        //         <Footer
        //             totalPages={totalPages}
        //             currentPage={currentPagePosition}
        //             goToNextPage={goToNextPage}
        //             goToPreviousPage={goToPreviousPage}
        //             isDisabled={isFloatingActionDisabled}
        //             toggleActionButton={toggleActionButton}
        //             hasPaginator = {true}
        //             hasActionButton = {true}
        //             hasActions = {true}
        //             isNextDisabled = {isNextDisabled}
        //             isPreviousDisabled = {isPreviousDisabled}
        //         />
        //     </CaseFilesContainer>
        // </CaseFilesWrapper>
    );
};

const mapStateToProps = (state) => {
    let caseFiles = state.caseFiles;

    //console.log("what i'm gonna render in the cases draft is", state.draft);

    const tempDraft = [

        {
            id: 10,
            patient: {
                firstName: "Treston",
                middleName: "Sire",
                surname: "G"
            }

        },
        {
            id: 5,
            patient: {
                firstName: "Sally",
                middleName: "Samantha",
                surname: "Gordon"
            }
        },

    ];

    //console.log("what is in temp draft is", tempDraft.patient.firstName);




    if (!isEmpty(state.draft)) {
        console.log("what draft is being passed to case files", state.draft);
        caseFiles = [...state.draft, ...caseFiles];
    }

    // if (!isEmpty(state.draft)) {
    //   console.log(state.draft.name);
    //   const draftCase = {
    //     patient: state.draft.patient,
    //     chargeSheet: {},
    //     staff: state.draft.staff,
    //     caseProcedures: state.draft.caseProcedures,
    //   };
    //
    //   caseFiles = [...caseFiles, draftCase];
    // }

    return {
        caseFiles,
    };
};

const mapDispatcherToProp = {
    setCaseFiles
};

export default connect(mapStateToProps, mapDispatcherToProp)(CaseFiles);

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
