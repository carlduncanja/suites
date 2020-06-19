import React,{ useState,useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

import Equipment from '../CaseFiles/OverlayPages/ChargeSheet/Equipment';
import Button from "../common/Buttons/Button";
import Table from '../common/Table/Table';
import Item from '../common/Table/Item';
import RoundedPaginator from '../common/Paginators/RoundedPaginator';
import FloatingActionButton from "../common/FloatingAction/FloatingActionButton";
import LongPressWithFeedback from "../common/LongPressWithFeedback";
import ActionContainer from "../common/FloatingAction/ActionContainer";
import ActionItem from "../common/ActionItem";
import WasteIcon from "../../../assets/svg/wasteIcon";
import AddIcon from "../../../assets/svg/addIcon";

import { currencyFormatter } from '../../utils/formatter';
import {useNextPaginator, usePreviousPaginator, checkboxItemPress, selectAll} from '../../helpers/caseFilesHelpers';
import { withModal } from "react-native-modalfy";

const ProceduresEquipmentTab = ({modal, equipmentsData}) => {

    const recordsPerPage = 10
    const [equipments, setEquipments] = useState(equipmentsData)
    const [isFloatingActionDisabled, setFloatingAction] = useState(false)
    const [checkBoxList, setCheckboxList] = useState([])
    
    const [totalPages, setTotalPages] = useState(0);
    const [currentPageListMin, setCurrentPageListMin] = useState(0)
    const [currentPageListMax, setCurrentPageListMax] = useState(recordsPerPage)
    const [currentPagePosition, setCurrentPagePosition] = useState(1)

    useEffect(()=>{
        setTotalPages(Math.ceil(equipments.length / recordsPerPage))
    },[])


    const headers = [
        {
            name :"Item Name",
            alignment: "flex-start",
            flex:2,
        },
        {
            name :"Type",
            alignment: "flex-start",
            flex:1,
        },
        {
            name :"Unit Price",
            alignment: "flex-end",
            flex:1
        }
    ] 

    // ###### EVENT HANDLERS

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

    const handleOnSelectAll = () => {
        const indeterminate = checkBoxList.length >= 0 && checkBoxList.length !== equipments.length;
        if (indeterminate) {
            const selectedAllIds = [...equipments.map(item => item.equipment._id)];
            setCheckboxList(selectedAllIds)
        } else {
            setCheckboxList([])
        }

    }

    const handleOnCheckBoxPress = (item) => () => {
        const { equipment = {} } = item;
        const { _id } = equipment

        let updatedEquipments = [...checkBoxList];

        if (updatedEquipments.includes(_id)) {
            updatedEquipments = updatedEquipments.filter(id => id !== _id)
        } else {
            updatedEquipments.push(_id);
        }

        setCheckboxList(updatedEquipments)
    }

    const listItem = (item) => {
        const { equipment = {} } = item
        const { name = "", type = {} } =equipment
        return (
            <>
                <View style={[styles.item,{flex:2}]}>
                    <Text style={[styles.itemText,{color:"#3182CE"}]}>{name}</Text>
                </View>
                <View style={[styles.item,{alignItems:'flex-start'}]}>
                    <Text style={styles.itemText}>{type.name}</Text>
                </View>
                <View style={[styles.item,{alignItems:'flex-end'}]}>
                    <Text style={styles.itemText}>$ {currencyFormatter(type.unitPrice)}</Text>
                </View>      
            </>
        )
    }

    const renderEquipmentFn = (item) => {
        const { equipment = {} } = item
        const { _id } = equipment
       
        return <Item
            hasCheckBox={true}
            isChecked={checkBoxList.includes(_id)}
            onCheckBoxPress={handleOnCheckBoxPress(item)}
            onItemPress={() => {}}
            itemView={listItem(item)}
        />
    }

    const toggleActionButton = () => {
        setFloatingAction(true)
        modal.openModal("ActionContainerModal",
            {
                actions: getFabActions(),
                title: "PROCEDURE ACTIONS",
                onClose: () => {
                    setFloatingAction(false)
                }
            })
    }

    const getFabActions = () => {

        const deleteAction =
            <LongPressWithFeedback pressTimer={700} onLongPress={() => {}}>
                <ActionItem title={"Hold to Delete"} icon={<WasteIcon/>} onPress={() => {}} touchable={false}/>
            </LongPressWithFeedback>;
        const addItem = <ActionItem title={"Add Item"} icon={<AddIcon/>} onPress={ openAddItem }/>;


        return <ActionContainer
            floatingActions={[
                deleteAction,
                addItem
            ]}
            title={"PROCEDURE ACTIONS"}
        />
    };

    const openAddItem = () => {
    }

    let dataToDisplay = [...equipments];
    dataToDisplay = dataToDisplay.slice(currentPageListMin, currentPageListMax);


    return (
        <>
            <Table
                isCheckbox = {true}
                data = {dataToDisplay}
                listItemFormat = {renderEquipmentFn}
                headers = {headers}
                toggleHeaderCheckbox = {handleOnSelectAll} 
                itemSelected = {checkBoxList}
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
                    isDisabled = {isFloatingActionDisabled}
                    toggleActionButton = {toggleActionButton}
                />
            </View>
        </> 
    )
}

export default withModal(ProceduresEquipmentTab) 

const styles = StyleSheet.create({
    item:{
        flex:1,
    },
    itemText:{
        fontSize:16,
        color:"#4A5568",
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
})