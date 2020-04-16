import React, {useState, useEffect, useContext} from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Page from '../components/common/Page/Page';
import ListItem from "../components/common/List/ListItem";
import RoundedPaginator from '../components/common/Paginators/RoundedPaginator';
import FloatingActionButton from '../components/common/FloatingAction/FloatingActionButton';
import Navigation from '../components/CaseFiles/navigation/ContentNavigationStack';

import {connect} from 'react-redux';
import {setCaseFiles} from "../redux/actions/caseFilesActions";
import {getCaseFiles} from "../api/network";

import { useNextPaginator, usePreviousPaginator } from '../helpers/caseFilesHelpers';
import SvgIcon from '../../assets/SvgIcon';
import {SuitesContext} from '../contexts/SuitesContext';
import {appActions} from '../redux/reducers/suitesAppReducer';

import { withModal } from 'react-native-modalfy';

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
    const floatingActions = [
        {
            "actionId":"archiveCase",
            "action":"archiveItem",
            "actionName":"Archive Case",
            "disabled":true
        },
        {
            "actionId":"newCase",
            "action":"newItem",
            "actionName":"New Case",
            "disabled":false
        }

    ]

    const overlayMenu = [
        {
            "menuItemName":"Patient",
            "overlayTabs":["Details","Insurance","Diagnosis","Patient Risk"]
        },
        {
            "menuItemName":"Medical Staff",
            "overlayTabs":["Details"]
        },
        {
            "menuItemName":"Medical History",
            "overlayTabs":["General","Family History","Lifestyle","Other"]
        },
        {
            "menuItemName":"Procedures",
            "overlayTabs":["Details"]
        },
        {
            "menuItemName":"Charge Sheet",
            "overlayTabs":["Consumables","Equipment","Billing","Quotation","Invoices"]
        }
    ]

    //######## Props

    const {
        // Redux props
        caseFiles,
        setCaseFiles,
        navigation,
        modal
    } = props;

    //######## States
    const [state, dispatch] = useContext(SuitesContext);
    const [textInput, setTextInput] = useState("");
    const [selectedCaseIds, setSelectedCaseIds] = useState([]);
    const [isFetchingCaseFiles, setFetchingCaseFiles] = useState(false);
    const routeName = navigation.state.routeName;

    // pagination
    const [totalPages, setTotalPages] = useState(0);
    const [currentPagePosition, setCurrentPagePosition] = useState(1);
    const [currentPageListMin, setCurrentPageListMin] = useState(0);
    const [currentPageListMax, setCurrentPageListMax] = useState(recordsPerPage);

    //floatingAction
    const [actionButtonState, setActionButtonState] = useState(false)

    //overlayMenu
    const initialCurrentTabs = overlayMenu[0].overlayTabs
    const initialSelectedTab = initialCurrentTabs[0]
    

    const svg = {
        newItem : <SvgIcon iconName = "newItem" strokeColor = "#38A169"/>,
        newItemDisabled : <SvgIcon iconName = "newItem" strokeColor = "#A0AEC0"/>,
        archive : <SvgIcon iconName = "archiveItem" strokeColor = "#104587"/>,
        archiveDisabled : <SvgIcon iconName = "archiveItem" strokeColor = "#A0AEC0"/>,
    }

    //######## Life Cycle Methods
    useEffect(() => {
        if (!caseFiles.length) {
            fetchCaseFilesData()
        }
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

    const overlayContent = (item) => <Navigation 
        item = {item} 
        overlayMenu = {overlayMenu}
        handleOverlayMenuPress = {handleOverlayMenuPress}
        selectedTab = {initialSelectedTab}
    />

    const handleOnItemPress = (item) => {
        // TODO open modal. with props instead of state
        const overlayId = item.id
        const overlayTitle = item.caseFileDetails.title
        
        modal.openModal('BottomSheetModal',{ 
            content : overlayContent(item), 
            overlayId, 
            overlayTitle, 
            initialCurrentTabs, 
            initialSelectedTab,
            controlTabChange
        })
    
    };

    const handleOverlayMenuPress = (selectedMenuItem) => {
        const selectedMenu = overlayMenu.filter(item => item.menuItemName === selectedMenuItem)
        const currentTabs = selectedMenu[0].overlayTabs
        const selectedTab = currentTabs[0]
        dispatch({
            type : appActions.OVERLAYMENUCHANGE,
            newState: {
                currentTabs : currentTabs,
                selectedTab : selectedTab
            }
        })
        // setCurrentTabs(currentTabs)
        // setSelectedTab(selectedTab)
    }

    const controlTabChange = (tab) => {
        if (state.slideOverlay.slideOverlayButtonEdit === false){
            dispatch({
                type : appActions.OVERLAYTABCHANGE,
                newState :{
                    selectedTab: tab
                }
            })
            // setSelectedTab(tab)
        }
    }

    const handleOnCheckBoxPress = (caseItem) => () => {
        const {id} = caseItem;
        let updatedCases = [...selectedCaseIds];

        if (updatedCases.includes(id)) {
            updatedCases = updatedCases.filter(id => id !== caseItem.id)
        } else {
            updatedCases.push(caseItem.id);
        }

        setSelectedCaseIds(updatedCases);
    };

    const handleOnSelectAll = () => {
        const indeterminate = selectedCaseIds.length >= 0 && selectedCaseIds.length !== caseFiles.length;
        // console.log("Indeterminate: ", indeterminate)
        if (indeterminate) {
            const selectedAllIds = [...caseFiles.map( caseItem => caseItem.id )]
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
        setActionButtonState(!actionButtonState)
        modal.openModal("ActionContainerModal",{ floatingActions, title : "CASE ACTIONS" })
        // dispatch({
        //     type: appActions.TOGGLEACTIONBUTTON,
        //     newState: !state.floatingActions.actionButtonState
        // })
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
            isChecked={selectedCaseIds.includes(item.id)}
            onCheckBoxPress={handleOnCheckBoxPress(item)}
            onItemPress={() => handleOnItemPress(item)}
            itemView={caseItem(item)}
        />
    };

    const caseItem = (item) => <>
        <View style={styles.item}>
            <Text style={{color: "#718096", fontSize: 12}}>{item.id}</Text>
            <Text style={{color: "#3182CE", fontSize: 16}}>{item.name}</Text>
        </View>
        <View style={styles.item}>
            <Text style={styles.itemText}>{item.balance}</Text>
        </View>
        <View style={styles.item}>
            <Text style={styles.itemText}>{item.staff}</Text>
        </View>
        <View style={styles.item}>
            <Text style={styles.itemText}>{item.nextVisit}</Text>
        </View>
    </>;

   
    // prepare case files to display
    let caseFilesToDisplay = [...caseFiles];
    const start = (currentPagePosition - 1) * currentPageListMax;
    const end = start + currentPageListMax;
    // console.log("Start end: ", currentPageListMin, currentPageListMax)
    // caseFilesToDisplay = caseFilesToDisplay.slice(start, end);
    caseFilesToDisplay = caseFilesToDisplay.slice(currentPageListMin, currentPageListMax);


    return (
        <View style={{flex:1}}>

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
                    isDisabled = {actionButtonState}
                    toggleActionButton = {toggleActionButton}
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
