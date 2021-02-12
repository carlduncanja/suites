import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { SetArchivedCases } from '../../redux/actions/archiveCaseActions';
import { connect } from "react-redux";
import { useModal } from 'react-native-modalfy';
import { useTheme } from "emotion-theming";
import styled, { css } from '@emotion/native';
import { selectAll, checkboxItemPress, useNextPaginator, usePreviousPaginator, } from "../../helpers/caseFilesHelpers";
import { getArchivedCaseFiles } from "../../api/network";
import { withModal } from "react-native-modalfy";

import NavPage from "../../components/common/Page/NavPage";
import ListItem from "../../components/common/List/ListItem";
import Button from '../../components/common/Buttons/Button';
import ConfirmationComponent from "../../components/ConfirmationComponent";
import ActionItem from "../../components/common/ActionItem";
import ActionContainer from "../../components/common/FloatingAction/ActionContainer";
import RestoreIcon from "../../../assets/svg/RestoreIcon";

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
    border: 1px solid ${({theme}) => theme.colors['--accent-button']};
    background-color: ${({theme}) => theme.colors['--accent-button']};
    box-sizing: border-box;
    border-radius: 6px;
    padding-top: 2px;
`;

const ArchiveCasesPage = ({archivedCases, SetArchivedCases, navigation, route}) => {
    const modal = useModal();
    const theme = useTheme();
    const {archivedCaseItem} = route.params;
    const recordsPerPage = 10;

    const [isFetchingData, setFetchingData] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [selectedArchivedCases, setSelectedArchivedCases] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPageListMin, setCurrentPageListMin] = useState(0)
    const [currentPageListMax, setCurrentPageListMax] = useState(recordsPerPage)
    const [currentPagePosition, setCurrentPagePosition] = useState(1);
    const [isNextDisabled, setNextDisabled] = useState(true);
    const [isPreviousDisabled, setPreviousDisabled] = useState(true);
    const [isFloatingActionDisabled, setFloatingAction] = useState(false);

    useEffect(() => {
        if (!archivedCases.length) fetchArchivedCases(currentPagePosition)
        setTotalPages(Math.ceil(archivedCases.length / recordsPerPage))
    }, []);

    const handleErrorDisplayingData = () => {
        modal.closeModals('ConfirmationModal');
        setTimeout(() => {
            navigation.navigate('CaseFiles');
        }, 200);
    }

    const fetchArchivedCases = (pagePosition) => {
        const currentPosition = pagePosition || 1;
        setCurrentPagePosition(currentPosition);

        setFetchingData(true);
        getArchivedCaseFiles(searchValue, recordsPerPage, currentPosition)
            .then(caseResult => {
                const {data = [], pages = 0} = caseResult;

                if (pages === 1) {
                    setPreviousDisabled(true);
                    setNextDisabled(true);
                } else if (currentPosition === 1 && pages > 1) {
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
                SetArchivedCases(data);
                setTotalPages(pages);
                // data.length === 0 ? setTotalPages(1) : setTotalPages(pages);
            })
            .catch(error => {
                console.log('failed to get case files', error);
                setTotalPages(1);
                setPreviousDisabled(true);
                setNextDisabled(true);

                modal.openModal("ConfirmationModal", {
                    content: (
                        <ConfirmationComponent
                            isError={true}//boolean to show whether an error icon or success icon
                            isEditUpdate={false}//use this specification to either get the confirm an edit or update
                            onCancel={() => handleErrorDisplayingData( )}
                            onAction={() => handleErrorDisplayingData() }
                            message="Data could not be displayed"//general message you can send to be displayed
                        />
                    )
                })
            })
            .finally(_ => {
                setFetchingData(false);
            });
    }

    const onCloseArchivePage = () => {
        navigation.navigate('CaseFiles');
    }

    const goToNextPage = () => {
        if (currentPagePosition < totalPages) {
            let { currentPage, currentListMin, currentListMax } = useNextPaginator(currentPagePosition, recordsPerPage, currentPageListMin, currentPageListMax)
            setCurrentPagePosition(currentPage);
            setCurrentPageListMin(currentListMin);
            setCurrentPageListMax(currentListMax);
            fetchArchivedCases(currentPage);
            setNextDisabled(false);
        }
    };

    const goToPreviousPage = () => {
        if (currentPagePosition === 1) return;

        let { currentPage, currentListMin, currentListMax } = usePreviousPaginator(currentPagePosition, recordsPerPage, currentPageListMin, currentPageListMax)
        setCurrentPagePosition(currentPage);
        setCurrentPageListMin(currentListMin);
        setCurrentPageListMax(currentListMax);
        fetchArchivedCases(currentPage)

    };

    const onSearchInputChange = (input) => {
        setSearchValue(input)
    }

    const handleOnSelectAll = () => {
        let updatedCases = selectAll(archivedCases, selectedArchivedCases);
        setSelectedArchivedCases(updatedCases);
    }

    const handleOnCheckBoxPress = (item) => () => {
        const { _id } = item;
        let updatedCases = checkboxItemPress(_id, selectedArchivedCases);
        setSelectedArchivedCases(updatedCases);
    }

    // const caseFileArchiveItem = (item) => {
    //     const { caseNumber, patient = {}, chargeSheet = {}, staff = {}, caseProcedures = [],} = item;
        

    //     return (
    //         <>
    //         </>
    //     )
    // };

    const renderArchiveFn = (item) => {
        const { _id, } = item;
        return (
            <ListItem
                isArchive={true}
                hasCheckBox={true}
                isChecked={selectedArchivedCases.includes(item._id)}
                onCheckBoxPress={handleOnCheckBoxPress(item)}
                onItemPress={() => {}}
                itemView={archivedCaseItem(item)}
            />
        )
    }

    const getFabActions = () => {
        const restoreCase = <ActionItem title={"Restore Case"} icon={<RestoreIcon />} onPress={() => { }} />;
        const restoreAllCases = <ActionItem title={"Restore all Cases"} icon={<RestoreIcon />} onPress={() => { }} />;


        return <ActionContainer
            floatingActions={[
                restoreCase,
                restoreAllCases
            ]}
            title="CASE FILES ACTIONS"
        />
    }

    const toggleActionButton = () => {
        setFloatingAction(true)
        modal.openModal("ActionContainerModal",
            {
                actions: getFabActions(),
                title: "CASE FILES ACTIONS",
                onClose: () => {
                    setFloatingAction(false)
                }
            })
    }
    

    return (
        <NavPage
            isFetchingData={isFetchingData}
            onRefresh={() => fetchArchivedCases(currentPagePosition) }
            placeholderText={"Search by Case ID, Patient, Staff"}
            changeText={onSearchInputChange}
            inputText={searchValue}
            routeName={"Archived Case Files"}
            listData={[...archivedCases]}
            TopButton={() => (
                <ButtonContainer theme={theme}>
                    <Button
                        title="Close Archive"
                        color={theme.colors['--color-white']}
                        font="--text-sm-regular"
                        buttonPress={onCloseArchivePage}
                    />
                </ButtonContainer>
            )}

            listHeaders={listHeaders}
            listItemFormat={renderArchiveFn}
            itemsSelected={selectedArchivedCases}
            onSelectAll={handleOnSelectAll}

            
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
    )
}

const mapStateToProps = (state) => ({
    archivedCases : state.archivedCases
});

const mapDispatcherToProp = {
    SetArchivedCases
}

export default connect(mapStateToProps, mapDispatcherToProp)(ArchiveCasesPage);