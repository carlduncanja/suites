import React, {useState, useEffect} from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
} from "react-native";

import Page from "../../components/common/Page/Page";
import RoundedPaginator from "../../components/common/Paginators/RoundedPaginator";
import FloatingActionButton from "../../components/common/FloatingAction/FloatingActionButton";
import LongPressWithFeedback from "../../components/common/LongPressWithFeedback";
import ActionContainer from "../../components/common/FloatingAction/ActionContainer";
import ActionItem from "../../components/common/ActionItem";
import CreateEquipmentDialog from "../../components/Equipment/CreateEquipmentDialogContainer";
import Item from "../../components/common/Table/Item";
import NavPage from "../../components/common/Page/NavPage";
import _, {isEmpty, concat} from "lodash";
import DataItem from "../../components/common/List/DataItem";
import WasteIcon from "../../../assets/svg/wasteIcon";
import AddIcon from "../../../assets/svg/addIcon";
import AssignIcon from "../../../assets/svg/assignIcon";
import EditIcon from "../../../assets/svg/editIcon";
import MultipleShadowsContainer from '../../components/common/MultipleShadowContainer';
import ContentDataItem from "../../components/common/List/ContentDataItem";
import RightBorderDataItem from "../../components/common/List/RightBorderDataItem";
import CollapsedIcon from "../../../assets/svg/closeArrow";
import ActionIcon from "../../../assets/svg/dropdownIcon";
import {
    useNextPaginator,
    usePreviousPaginator,
    checkboxItemPress,
    selectAll,
} from "../../helpers/caseFilesHelpers";

import {connect} from "react-redux";
import {setEquipment} from "../../redux/actions/equipmentActions";
import {getEquipment, getEquipmentTypes} from "../../api/network";

import {withModal} from "react-native-modalfy";
import {formatDate} from "../../utils/formatter";
import {numberFormatter} from "../../utils/formatter";
import CollapsibleListItem from "../../components/common/List/CollapsibleListItem";
import IconButton from "../../components/common/Buttons/IconButton";
import ActionCollapseIcon from "../../../assets/svg/actionCollapseIcon";
import SvgIcon from "../../../assets/SvgIcon";
import CreateEquipmentTypeDialogContainer from "../../components/Equipment/CreateEquipmentTypeDialogContainer";
import ListItem from "../../components/common/List/ListItem";
import styled, {css} from '@emotion/native';
import {useTheme} from 'emotion-theming';
import {LONG_PRESS_TIMER} from '../../const';


const QuantityWrapper = styled.View`
    flex:1;
    align-items: center; 
   
`;
const QuantityContainer = styled.View`
    height : 24px;
    width : 28px;
    background-color : ${({theme, isCollapsed}) => isCollapsed === false ? theme.colors['--color-gray-100'] : theme.colors['--default-shade-white']};
    border-radius : 4px;
    align-items: center;
    justify-content: center;
`;

const GroupEquipmentView = styled.TouchableOpacity`
  flex:1;
  flex-direction:row;
  align-items : center;

`;


const QuantityText = styled.Text(({theme, isCollapsed}) => ({
    ...theme.font['--text-base-regular'],
    color: isCollapsed === false ? theme.colors['--color-gray-500'] : theme.colors['--color-gray-700'],
}));
const shadows = [
    {
        shadowColor: 'black',
        shadowOffset: {width: 1, height: 0},
        shadowOpacity: 0.06,
        shadowRadius: 2
    },
    {
        shadowColor: 'black',
        shadowOffset: {width: 1, height: 0},
        shadowOpacity: 0.1,
        shadowRadius: 3
    },
]
const Equipment = (props) => {
    const theme = useTheme();
    // ############# Const data
    const recordsPerPage = 10;
    const listHeaders = [

        {
            name: "Item ID",
            alignment: "center",
            flex: .5,
        },
        {
            name: "Status",
            alignment: "center",
            flex: 1.3,
        },
        {
            name: "In Stock",
            alignment: "center",
            flex: 1,
        },

        {
            name: "Assigned",
            alignment: "center",
            flex: 2,
        },
    ];
    const floatingActions = [];

    //  ############ Props
    const {equipment, setEquipment, navigation, modal} = props;

    //  ############ State
    const [isFetchingData, setFetchingData] = useState(false);
    const [isFloatingActionDisabled, setFloatingAction] = useState(false);
    const [groupSelected, setGroupSelected] = useState({});
    const [selectedChildEquipment, setSelectedChildEquipment] = useState({});
    const [totalPages, setTotalPages] = useState(1);
    const [currentPageListMin, setCurrentPageListMin] = useState(0);
    const [currentPageListMax, setCurrentPageListMax] = useState(recordsPerPage);
    const [currentPagePosition, setCurrentPagePosition] = useState(1);
    const [isNextDisabled, setNextDisabled] = useState(false);
    const [isPreviousDisabled, setPreviousDisabled] = useState(true);
    const [groupNameSelected, setGroupNameSelected] = useState({});
    const [shown, setisShown] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [searchResults, setSearchResult] = useState([]);
    const [searchQuery, setSearchQuery] = useState({});
    let groupNameChoice = {};
    const [assignments, setAssignments] = useState([]);
    const [selectedEquipmentIds, setSelectedEquipmentIds] = useState([]);
    const [selectedTypesIds, setSelectedTypesIds] = useState([]);
    const [equipmentTypes, setEquipmentTypes] = useState([]);

    const [expandedItems, setExpandedItems] = useState([])


    // ############# Lifecycle methods

    useEffect(() => {
        if (!equipmentTypes.length) {
            fetchEquipmentData(currentPagePosition);
        }
        setTotalPages(Math.ceil(equipmentTypes.length / recordsPerPage));
    }, []);

    useEffect(() => {
        if (!searchValue) {
            // empty search values and cancel any out going request.
            setSearchResult([]);
            fetchEquipmentData(1);
            if (searchQuery.cancel) searchQuery.cancel();
            return;
        }

        // wait 300ms before search. cancel any prev request before executing current.

        const search = _.debounce(fetchEquipmentData, 300);

        setSearchQuery((prevSearch) => {
            if (prevSearch && prevSearch.cancel) {
                prevSearch.cancel();
            }
            return search;
        });

        search();
        setCurrentPagePosition(1);
    }, [searchValue]);
    // ############# Event Handlers

    const onSearchInputChange = (input) => {
        setSearchValue(input);
    };

    const handleDataRefresh = () => {
        fetchEquipmentData();
    };

    const handleOnSelectAll = () => {
        console.log("Equipment Types: ", equipmentTypes);
        let updatedEquipmentList = selectAll(equipmentTypes, selectedTypesIds);
        setSelectedTypesIds(updatedEquipmentList);

        // const indeterminate = selectedTypesIds.length >= 0 && selectedTypesIds.length !== equipmentTypes.length;
        // if (indeterminate) {
        //     const selectedAllIds = [...equipmentTypes.map(caseItem => caseItem.id)];
        //     setSelectedTypesIds(selectedAllIds)
        // } else {
        //     setSelectedTypesIds([])
        // }
    };

    const handleOnCheckBoxPress = (item) => () => {
        const {_id} = item;
        console.log("Id:", item);
        let updatedEquipmentList = checkboxItemPress(item, _id, selectedTypesIds);

        setGroupSelected(item);
        setSelectedTypesIds(updatedEquipmentList);

    };

    const handleOnItemCheckboxPress = (item) => {
        setSelectedChildEquipment(item);
        const {_id} = item;
        let updatedEquipments = [...selectedEquipmentIds];

        if (updatedEquipments.includes(_id)) {
            updatedEquipments = updatedEquipments.filter((id) => id !== item._id);
        } else {
            updatedEquipments.push(item._id);
        }

        setSelectedEquipmentIds(updatedEquipments);
    };

    const onCollapseView = (key) => {
        if (expandedItems.includes(key)) {
            setExpandedItems(expandedItems.filter(item => item !== key))
        } else {
            setExpandedItems([...expandedItems, key])
        }
    }

    const handleOnItemPress = (item, addedInfo, isOpenEditable, type) => {

        props.navigation.navigate("EquipmentItemPage", {
            initial: false,
            equipment: item,
            info: addedInfo,
            isOpenEditable: isOpenEditable,
            group: type,
            onCreated: handleDataRefresh
        });
    };

    const goToNextPage = () => {
        if (currentPagePosition < totalPages) {
            let {currentPage, currentListMin, currentListMax} = useNextPaginator(
                currentPagePosition,
                recordsPerPage,
                currentPageListMin,
                currentPageListMax
            );
            setCurrentPagePosition(currentPage);
            setCurrentPageListMin(currentListMin);
            setCurrentPageListMax(currentListMax);
            fetchEquipmentData(currentPage);
        }
    };

    const goToPreviousPage = () => {
        if (currentPagePosition === 1) return;

        let {currentPage, currentListMin, currentListMax} = usePreviousPaginator(
            currentPagePosition,
            recordsPerPage,
            currentPageListMin,
            currentPageListMax
        );
        setCurrentPagePosition(currentPage);
        setCurrentPageListMin(currentListMin);
        setCurrentPageListMax(currentListMax);
        fetchEquipmentData(currentPage);
    };

    const toggleActionButton = () => {
        setFloatingAction(true);
        modal.openModal("ActionContainerModal", {
            actions: getFabActions(),
            title: "EQUIPMENT ACTIONS",
            onClose: () => {
                setFloatingAction(false);
            },
        });
    };

    // ############# Helper functions
    const fetchEquipmentData = (pagePosition) => {

        let currentPosition = pagePosition ? pagePosition : 1;
        setCurrentPagePosition(currentPosition)

        setFetchingData(true);
        getEquipmentTypes(searchValue, recordsPerPage, currentPosition)
            .then((equipmentTypesInfo) => {
                const {data = [], pages = 0} = equipmentTypesInfo;

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

                setEquipmentTypes(data);
                data.length === 0 ? setTotalPages(1) : setTotalPages(pages);
            })
            .catch((error) => {
                console.log("Failed to get equipment types", error);
                setTotalPages(1)
                setPreviousDisabled(true)
                setNextDisabled(true)
            });

        getEquipment()
            .then((data) => {
                setEquipment(data);
            })
            .catch((error) => {
                console.log("failed to get equipment", error);
            })
            .finally((_) => {
                setFetchingData(false);
            });
    };

    const renderEquipmentFn = (item) => {
        const equipments = item.equipments || [];
        let assignments;


        assignments = equipments?.map(x => {
            return x?.assignments?.map(assigned => assigned)
        })


        let asArray = [];

        //asArray = [[...equipments.map(x => x.assignments)]];


        const concatAssignments = [].concat.apply([], assignments);

        //console.log("concat has", concatAssignments);


        //const filtered = [...concatAssignments.filter(assigned => assigned.equipment === item._id)];

        const viewItem = {
            name: item.name,
            _id: item._id,
            equipments: equipments,
            suppliers: item.suppliers,
            description: item.description,
            quantity: item.equipments.length,
            nextAvailable: new Date(2020, 12, 12),
        };


        return (
            <CollapsibleListItem
                hasCheckBox={true}
                isChecked={selectedTypesIds.includes(item._id)}
                onCheckBoxPress={handleOnCheckBoxPress(item)}
                // onItemPress={() => handleOnItemPress(item, false)}
                onItemPress={() => gotoGroupDetails(item)}
                collapsed={!expandedItems.includes(item.name)}
                onCollapsedEnd={() => onCollapseView(item.name)}
                render={(collapse, isCollapsed) =>
                    equipmentGroupView(viewItem, collapse, isCollapsed)
                }
            >
                <FlatList
                    data={renderChildView(equipments)}
                    keyExtractor={(item, index) => "" + index}
                    ItemSeparatorComponent={() => (
                        <View
                            style={{
                                flex: 1,
                                marginLeft: 10,
                                borderColor: "#E3E8EF",
                                borderWidth: 0.5,
                            }}
                        />
                    )}
                    renderItem={({item}) => {
                        const equipmentGroup = item.items || [];


                        groupNameChoice = viewItem;


                        const childAssignments = item.items[0].assignments;


                        const equipmentItem = {
                            assigmentName: item.id,
                            description: viewItem.description,
                            quantity: equipmentGroup.length,
                            assignment: isEmpty(childAssignments) ? "Not currently assigned" : childAssignments,
                            status:
                                isEmpty(childAssignments) || childAssignments.length <= 1
                                    ? "Available"
                                    : childAssignments.length >= 2 && childAssignments.length <= 5
                                    ? "Multiple"
                                    : "Unavailable",
                            dateAvailable: viewItem.nextAvailable,
                        };

                        const onActionPress = () => {
                            console.log("Clicked group")
                        };

                        let pressItem = item.items[0];
                        let addedInfo = equipmentItem;
                        //setGroupNameSelected(viewItem);

                        return renderItemView(equipmentItem, addedInfo, pressItem, onActionPress);

                    }}
                />
            </CollapsibleListItem>
        );
    };

    const renderChildView = (equipments = []) => {
        const assignmentGroupedEquipments = {};

        // console.log("render children equipments", equipments);

        // group equipment by assignment
        equipments.forEach((item) => {
            // console.log("EEq Item: ", item)
            const assignmentName = item.assignment && !item.assignment.name;
            if (!assignmentName) {
                return (assignmentGroupedEquipments[item.name] = [item]);
            }
            if (assignmentGroupedEquipments[assignmentName]) {
                assignmentGroupedEquipments[assignmentName].push(item);
            } else {
                assignmentGroupedEquipments[assignmentName] = [item];
            }
        });

        // console.log("render children groups", assignmentGroupedEquipments);

        const data = Object.keys(assignmentGroupedEquipments).map((item) => ({
            id: item,
            items: assignmentGroupedEquipments[item] || [],
        }));
        return data;
    };

    const renderItemView = (item, addedInfo, actionItem, onActionPress) => {
        let {_id} = actionItem;
        return (
            <Item
                itemView={equipmentItemView(item, onActionPress)}
                hasCheckBox={true}
                isChecked={selectedEquipmentIds.includes(_id)}
                onCheckBoxPress={() => handleOnItemCheckboxPress(actionItem)}
                onItemPress={() => handleOnItemPress(actionItem, addedInfo, false, groupNameChoice)}
            />
        );
    };

    const equipmentItemView = (
        {assigmentName, quantity, status, dateAvailable, assignment},
        onActionPress
    ) => (

        <>

            <DataItem text={assigmentName} flex={.2} color="--color-blue-600" fontStyle="--text-sm-medium"/>
            <DataItem text={status} flex={.25} color="--color-gray-800" fontStyle="--text-sm-regular"/>
            <DataItem text={quantity} flex={.2} color="--color-gray-800" fontStyle="--text-sm-regular"/>
            {Array.isArray(assignment) ? assignment?.map(item =>
                <DataItem text={item.type === "physician" ? item.physician : item.theatre} flex={.1} align="center"
                          color="--color-gray-800" fontStyle="--text-sm-regular"/>
            ) : <DataItem text={assignment} flex={.3} align="center" color="--color-gray-800"
                          fontStyle="--text-sm-regular"/>
            }
        </>


    );

    const gotoGroupDetails = (item) => {
        props.navigation.navigate("EquipmentGroupDetailsPage", {data: item, onCreated: handleDataRefresh})
    }

    const equipmentGroupView = (item, onActionPress, isCollapsed) => (
        <>
            <DataItem text={item.name} flex={1.8} color="--color-gray-800" fontStyle="--text-base-regular"/>
            <QuantityWrapper>
                <MultipleShadowsContainer shadows={shadows}>
                    <QuantityContainer theme={theme} isCollapsed={isCollapsed}>
                        <QuantityText theme={theme} isCollapsed={isCollapsed}>{item.quantity}</QuantityText>
                    </QuantityContainer>
                </MultipleShadowsContainer>
            </QuantityWrapper>
            {/*<View style={{flex: .9}}/>*/}
            <View style={{flex: 1.7}}/>
            <ContentDataItem
                align="center"
                flex={.5}
                content={
                    <IconButton
                        Icon={isCollapsed ? <ActionIcon/> : <CollapsedIcon/>}
                        onPress={onActionPress}
                    />
                }
            />
        </>
    );

    const gotoAddEquipment = () => {
        modal.closeAllModals();
        navigation.navigate("AddEquipmentPage", {equipment: groupSelected, onCreated: handleDataRefresh})
    }

    const gotoAssignEquipment = () => {
        modal.closeAllModals();
        navigation.navigate("AssignEquipmentPage", {equipment: selectedChildEquipment, onCreated: handleDataRefresh});
    }

    const getFabActions = () => {
        const deleteAction = (
            <LongPressWithFeedback pressTimer={LONG_PRESS_TIMER.MEDIUM} onLongPress={() => {
            }}>
                <ActionItem
                    title={"Hold to Delete"}
                    icon={<WasteIcon/>}
                    onPress={() => {
                    }}
                    touchable={false}
                />
            </LongPressWithFeedback>
        );
        const assignEquipment = (
            <ActionItem
                disabled={isEmpty(selectedChildEquipment) ? true : false}
                touchable={isEmpty(selectedChildEquipment) ? false : true}
                title={"Assign Equipment"}
                icon={<AssignIcon/>}
                onPress={gotoAssignEquipment}
            />
        );
        const editGroup = (
            <ActionItem title={"Edit Group"} icon={<EditIcon/>} onPress={() => {
            }}/>
        );
        const createEquipmentType = (
            <ActionItem
                title={"Create Equipment Type"}
                icon={<AddIcon/>}
                onPress={openEquipmentTypeDialog}
            />
        );
        const createEquipment = (
            <ActionItem
                title={"Add Equipment"}
                icon={<AddIcon/>}
                touchable={selectedTypesIds.length === 1 ? true : false}
                disabled={selectedTypesIds.length === 1 ? false : true}
                onPress={selectedTypesIds.length === 1 ? gotoAddEquipment : () => {
                    console.log(selectedTypesIds.length)
                }}
            />
        );

        return (
            <ActionContainer
                floatingActions={[
                    deleteAction,
                    assignEquipment,
                    editGroup,
                    createEquipmentType,
                    createEquipment,
                ]}
                title={"EQUIPMENT ACTIONS"}
            />
        );
    };

    const openEquipmentDialog = () => {
        modal.closeModals("ActionContainerModal");

        // For some reason there has to be a delay between closing a modal and opening another.
        setTimeout(() => {
            modal.openModal("OverlayModal", {
                content: (
                    <CreateEquipmentDialog
                        onCancel={() => setFloatingAction(false)}
                        onCreated={(item) => handleOnItemPress(item, true)}
                        equipmentTypes={equipmentTypes}
                    />
                ),
                onClose: () => setFloatingAction(false),
            });
        }, 200);
    };

    const openEquipmentTypeDialog = () => {
        modal.closeModals("ActionContainerModal");

        // For some reason there has to be a delay between closing a modal and opening another.
        setTimeout(() => {
            modal.openModal("OverlayModal", {
                content: (
                    <CreateEquipmentTypeDialogContainer
                        onCancel={() => setFloatingAction(false)}
                        onCreated={() => {
                            handleDataRefresh();
                        }}
                        // onCreated={(item) => handleOnItemPress(item, true)}
                    />
                ),
                onClose: () => setFloatingAction(false),
            });
        }, 200);
    };
    // ############# Prepare list data

    let equipmentToDisplay = [...equipmentTypes];
    // equipmentToDisplay = equipmentToDisplay.slice(currentPageListMin, currentPageListMax);

    return (
        <NavPage
            isFetchingData={isFetchingData}
            onRefresh={handleDataRefresh}
            placeholderText={"Search by Assignment, Status, Parent Name"}
            changeText={onSearchInputChange}
            inputText={searchValue}
            routeName={"Equipment"}
            listData={equipmentToDisplay}
            listHeaders={listHeaders}
            itemsSelected={selectedTypesIds}
            onSelectAll={handleOnSelectAll}
            listItemFormat={renderEquipmentFn}
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
    );
};

// const mapStateToProps = (state) => {
//     const equipment = state.equipment.map(item => {
//         return {
//             ...item,
//             // id: item._id
//         }
//     })
//     return {equipment}
// };

const mapStateToProps = (state) => ({
    equipmentTypes: state.equipmentTypes,
});

const mapDispatcherToProp = {
    // setEquipmentTypes,
    setEquipment,
};

export default connect(
    mapStateToProps,
    mapDispatcherToProp
)(withModal(Equipment));

const styles = StyleSheet.create({
    footer: {
        flex: 1,
        alignSelf: "flex-end",
        flexDirection: "row",
        position: "absolute",
        bottom: 0,
        marginBottom: 20,
        right: 0,
        marginRight: 30,
    },
    rowBorderRight: {
        borderRightColor: "#E3E8EF",
        borderRightWidth: 1,

        // marginRight: 20,
        // flex: 2
    },
});
