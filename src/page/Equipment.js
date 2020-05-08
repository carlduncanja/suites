import React, {useState, useEffect} from "react";
import {View, Text, StyleSheet, FlatList} from "react-native";

import Page from '../components/common/Page/Page';
import RoundedPaginator from '../components/common/Paginators/RoundedPaginator';
import FloatingActionButton from '../components/common/FloatingAction/FloatingActionButton';
import EquipmentBottomSheet from '../components/Equipment/EquipmentBottomSheet';
import LongPressWithFeedback from "../components/common/LongPressWithFeedback";
import ActionContainer from "../components/common/FloatingAction/ActionContainer";
import ActionItem from "../components/common/ActionItem";
import CreateEquipmentDialog from '../components/Equipment/CreateEquipmentDialogContainer';

import WasteIcon from "../../assets/svg/wasteIcon";
import AddIcon from "../../assets/svg/addIcon";
import AssignIcon from "../../assets/svg/assignIcon";
import EditIcon from "../../assets/svg/editIcon";

import {useNextPaginator, usePreviousPaginator, checkboxItemPress, selectAll} from '../helpers/caseFilesHelpers';

import {connect} from 'react-redux';
import {setEquipment} from "../redux/actions/equipmentActions";
import {getEquipment, getEquipmentTypes} from "../api/network";

import {withModal} from 'react-native-modalfy';
import {formatDate} from '../utils/formatter';

import CollapsibleListItem from "../components/common/List/CollapsibleListItem";
import ActionIcon from "../../assets/svg/ActionIcon";
import IconButton from "../components/common/Buttons/IconButton";
import ActionCollapseIcon from "../../assets/svg/actionCollapseIcon";
import SvgIcon from "../../assets/SvgIcon";

const Equipment = (props) => {

    // ############# Const data
    const recordsPerPage = 15;
    const listHeaders = [
        {
            name: "Assigned",
            alignment: "flex-start",
            flex: 2

        },
        {
            name: "Quantity",
            alignment: "center",
            flex: 1
        },
        {
            name: "Status",
            alignment: "center",
            flex: 1
        },
        {
            name: "Available on",
            alignment: "center",
            flex: 1
        },
        {
            name: "Actions",
            alignment: "center",
            flex: 1
        }
    ];
    const floatingActions = []

    //  ############ Props
    const {equipment, setEquipment, navigation, modal} = props;

    //  ############ State
    const [isFetchingData, setFetchingData] = useState(false);
    const [isFloatingActionDisabled, setFloatingAction] = useState(false)

    const [totalPages, setTotalPages] = useState(0);
    const [currentPageListMin, setCurrentPageListMin] = useState(0)
    const [currentPageListMax, setCurrentPageListMax] = useState(recordsPerPage)
    const [currentPagePosition, setCurrentPagePosition] = useState(1)

    const [selectedEquipmentIds, setSelectedEquipmentIds] = useState([])
    const [equipmentTypes, setEquipmentTypes] = useState([])

    // ############# Lifecycle methods

    useEffect(() => {
        console.log("equipments: ", equipment);
        if (!equipmentTypes.length) {
            fetchEquipmentData()
        }
        setTotalPages(Math.ceil(equipment.length / recordsPerPage))
    }, []);

    // ############# Event Handlers

    const handleDataRefresh = () => {
        fetchEquipmentData()
    };

    const handleOnSelectAll = () => {
        let updatedEquipmentList = selectAll(equipment, selectedEquipmentIds)
        setSelectedEquipmentIds(updatedEquipmentList)
    }

    const handleOnCheckBoxPress = (item) => () => {
        const {id} = item;
        let updatedEquipmentList = checkboxItemPress(item, id, selectedEquipmentIds)

        setSelectedEquipmentIds(updatedEquipmentList)
    }

    const handleOnItemPress = (item, isOpenEditable) => {
        modal.openModal('BottomSheetModal', {
            content: <EquipmentBottomSheet equipment={item} isOpenEditable={isOpenEditable}/>
        })
    }

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

    const toggleActionButton = () => {
        setFloatingAction(true)
        modal.openModal("ActionContainerModal",
            {
                actions: getFabActions(),
                title: "EQUIPMENT ACTIONS",
                onClose: () => {
                    setFloatingAction(false)
                }
            }
        )
    }

    // ############# Helper functions
    const fetchEquipmentData = () => {
        setFetchingData(true)
        getEquipmentTypes()
            .then(data => {
                setEquipmentTypes(data)
            })
            .catch(error => {
                console.log("Failed to get equipment types", error)
            })
        getEquipment()
            .then(data => {
                setEquipment(data);
                setTotalPages(Math.ceil(data.length / recordsPerPage))
            })
            .catch(error => {
                console.log("failed to get equipment", error);
            })
            .finally(_ => {
                setFetchingData(false)
            })
    };

    const renderEquipmentFn = (item) => {
        const equipments = item.equipments || []

        console.log(equipments);

        const viewItem = {
            name: item.name,
            quantity: item.equipments.length,
            status: equipments.length === 1 ? "Available" : item.equipments.length > 1 ? "Multiple" : "Unavailable",
            nextAvailable: new Date(2020, 12, 12)
        };


        return <CollapsibleListItem
            hasCheckBox={true}
            isChecked={selectedEquipmentIds.includes(item._id)}
            onCheckBoxPress={handleOnCheckBoxPress(item)}
            onItemPress={() => handleOnItemPress(item, false)}
            render={(collapse, isCollapsed) => equipmentGroupView(viewItem, collapse, isCollapsed)}
        >
            <FlatList
                data={renderChildView(equipments)}
                keyExtractor={(item, index) => "" + index}
                ItemSeparatorComponent={() => <View
                    style={{flex: 1, margin: 18, marginLeft: 10, borderColor: "#E3E8EF", borderWidth: .5}}/>
                }
                renderItem={({item}) => {
                    const equipmentGroup = item.items || []

                    // console.log("render children equipment item", item);
                    const equipmentItem = {
                        assigmentName: item.id,
                        quantity: equipmentGroup.length,
                        status: '...',
                        dateAvailable: new Date()
                    }

                    const onActionPress = () => {
                    }

                    return equipmentItemView(equipmentItem, onActionPress)
                }}
            />

        </CollapsibleListItem>
    };

    const renderChildView = (equipments = []) => {
        const assignmentGroupedEquipments = {};

        console.log("render children equipments", equipments);

        // group equipment by assignment
        equipments.forEach(item => {
            const assignmentName = item.assigment && !item.assigment.name
            if (!assignmentName) {
                return assignmentGroupedEquipments[item.name] = [item]
            }
            if (assignmentGroupedEquipments[assignmentName]) {
                assignmentGroupedEquipments[assignmentName].push(item);
            } else {
                assignmentGroupedEquipments[assignmentName] = [item];
            }
        })

        console.log("render children groups", assignmentGroupedEquipments);

        const data = Object.keys(assignmentGroupedEquipments).map(item => ({
            id: item,
            items: assignmentGroupedEquipments[item] || []
        }));
        return data;
    }

    const getStatusColor = (status) => {
        return status === 'Unavailable' ? '#C53030'
            : status === 'Multiple' ? '#6B46C1'
                : status === 'Available' ? '#4E5664'
                    : '#4E5664'
    };

    const equipmentItemView = ({assigmentName, quantity, status, dateAvailable}, onActionPress) => (
        <View style={{flexDirection: 'row'}}>
            <View style={{width: 40}}/>
            <View style={{flex: 2, flexDirection: 'row', alignment: "flex-start"}}>
                <SvgIcon iconName="doctorArrow" strokeColor="#718096"/>
                <Text style={{color: "#3182CE", fontSize: 16, marginLeft: 18}}>{assigmentName}</Text>
            </View>
            <View style={{flex: 1, alignItems: 'center'}}>
                <Text style={{fontSize: 16, color: '#4E5664'}}>{quantity}</Text>
            </View>
            <View style={{flex: 1, alignItems: 'center'}}>
                <Text style={{fontSize: 14, color: getStatusColor(status)}}>{status}</Text>
            </View>
            <View style={{flex: 1, alignItems: 'center'}}>
                <Text style={{fontSize: 14, color: '#4E5664'}}>{formatDate(dateAvailable, "DD/MM/YYYY")}</Text>
            </View>
            <View style={{flex: 1, alignItems: 'center'}}>
                <IconButton
                    Icon={<ActionIcon/>}
                    onPress={onActionPress}
                />
            </View>
        </View>
    );


    const equipmentGroupView = (item, onActionPress, isCollapsed) => <>
        <View style={{flex: 2, flexDirection: 'row', ...styles.rowBorderRight}}>
            <Text style={{fontSize: 16, color: '#323843'}}>{item.name}</Text>
        </View>
        <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={{fontSize: 16, color: '#4E5664'}}>{item.quantity}</Text>
        </View>
        <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={{fontSize: 14, color: getStatusColor(item.status)}}>{item.status}</Text>
        </View>
        <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={{fontSize: 14, color: '#4E5664'}}>{formatDate(item.nextAvailable, "DD/MM/YYYY")}</Text>
        </View>
        <View style={{flex: 1, alignItems: 'center'}}>
            <IconButton
                Icon={isCollapsed ? <ActionIcon/> : <ActionCollapseIcon/>}
                onPress={onActionPress}
            />
        </View>
    </>

    const getFabActions = () => {

        const deleteAction =
            <LongPressWithFeedback pressTimer={700} onLongPress={() => {
            }}>
                <ActionItem title={"Hold to Delete"} icon={<WasteIcon/>} onPress={() => {
                }} touchable={false}/>
            </LongPressWithFeedback>;
        const assignEquipment = <ActionItem title={"Assign Equipment"} icon={<AssignIcon/>} onPress={() => {
        }}/>;
        const editGroup = <ActionItem title={"Edit Group"} icon={<EditIcon/>} onPress={() => {
        }}/>;
        const createEquipment = <ActionItem title={"Add Equipment"} icon={<AddIcon/>} onPress={openEquipmentDialog}/>;

        return <ActionContainer
            floatingActions={[
                deleteAction,
                assignEquipment,
                editGroup,
                createEquipment
            ]}
            title={"EQUIPMENT ACTIONS"}
        />

    };

    const openEquipmentDialog = () => {
        modal.closeModals('ActionContainerModal');

        // For some reason there has to be a delay between closing a modal and opening another.
        setTimeout(() => {

            modal
                .openModal(
                    'OverlayModal',
                    {
                        content: <CreateEquipmentDialog
                            onCancel={() => setFloatingAction(false)}
                            onCreated={(item) => handleOnItemPress(item, true)}
                            equipmentTypes={equipmentTypes}
                        />,
                        onClose: () => setFloatingAction(false)
                    })
        }, 200)
    }
    // ############# Prepare list data

    let equipmentToDisplay = [...equipmentTypes];
    equipmentToDisplay = equipmentToDisplay.slice(currentPageListMin, currentPageListMax);

    return (
        <View style={{flex: 1}}>
            <Page
                isFetchingData={isFetchingData}
                onRefresh={handleDataRefresh}
                placeholderText={"Search by Assigned Equipment"}
                // changeText={changeText}
                // inputText={textInput}
                routeName={"Equipment"}
                listData={equipmentToDisplay}

                listHeaders={listHeaders}
                itemsSelected={selectedEquipmentIds}
                onSelectAll={handleOnSelectAll}

                listItemFormat={renderEquipmentFn}
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
    )
}

const mapStateToProps = (state) => {
    const equipment = state.equipment.map(item => {
        return {
            ...item
        }
    })
    return {equipment}
};

const mapDispatcherToProp = {
    setEquipment
};

export default connect(mapStateToProps, mapDispatcherToProp)(withModal(Equipment))

const styles = StyleSheet.create({
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
    rowBorderRight: {
        borderRightColor: "#E3E8EF",
        borderRightWidth: 1,
        marginRight: 20,
        flex: 2
    }

})
