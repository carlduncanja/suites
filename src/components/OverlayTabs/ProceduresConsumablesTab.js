import React,{ useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Table from '../common/Table/Table';
import Item from '../common/Table/Item';
import RoundedPaginator from '../common/Paginators/RoundedPaginator';
import FloatingActionButton from '../common/FloatingAction/FloatingActionButton';
import ActionContainer from "../common/FloatingAction/ActionContainer";
import ActionItem from "../common/ActionItem";
import IconButton from "../common/Buttons/IconButton";
import AddNew from '../../../assets/svg/addNewIcon';
import AddIcon from "../../../assets/svg/addIcon";

import { currencyFormatter } from '../../utils/formatter'
import {useNextPaginator, usePreviousPaginator, checkboxItemPress, selectAll} from '../../helpers/caseFilesHelpers';
import NumberChangeField from "../common/Input Fields/NumberChangeField";
import { withModal } from "react-native-modalfy";
import AddItemDialog from "../Procedures/AddItemDialog";

const ProceduresConsumablesTab = ({consumablesData, isEditMode, modal, handleUpdate}) => { 

    const recordsPerPage = 10
    const [consumables, setConsumbales] = useState(consumablesData)
    const [checkBoxList, setCheckboxList] = useState([])
    const [isFloatingActionDisabled, setFloatingAction] = useState(false);

    const [totalPages, setTotalPages] = useState(0);
    const [currentPageListMin, setCurrentPageListMin] = useState(0)
    const [currentPageListMax, setCurrentPageListMax] = useState(recordsPerPage)
    const [currentPagePosition, setCurrentPagePosition] = useState(1)

    useEffect(()=>{
        setTotalPages(Math.ceil(consumables.length / recordsPerPage))
    },[])

    const onQuantityChange = (item) => (action) =>  {

    }
    const onAmountChange = (item) => (value) => {

    }

    const headers = [
        {
            name :"Item Name",
            alignment: "flex-start"
        },
        {
            name :"Type",
            alignment: "center"
        },
        {
            name :"Quantity",
            alignment: "center"
        },
        {
            name :"Unit Price",
            alignment: "flex-end"
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
        let updatedList = selectAll(consumables, checkBoxList)
        setCheckboxList(updatedList)
    }

    const handleOnCheckBoxPress = (item) => () => {
        const {_id} = item;
        let updatedProcedures = checkboxItemPress(item, _id, checkBoxList)
        setCheckboxList(updatedProcedures)
    }

    const toggleActionButton = () => {
        setFloatingAction(true)
        modal.openModal("ActionContainerModal",
            {
                actions: getFabActions(),
                title: "PROCEDURES ACTIONS",
                onClose: () => {
                    setFloatingAction(false)
                }
            })
    }
 
    const listItem = (item) => {
        const { inventory = {}, amount = 0 } = item
        const { name = "", unitPrice = 0, type = "Test_Type" } = inventory
        return (
            <>
                <View style={styles.item}>
                    <Text style={[styles.itemText,{color:"#3182CE"}]}>{name}</Text>
                </View>
                <View style={[styles.item,{alignItems:'center'}]}>
                    <Text style={styles.itemText}>{type}</Text>
                </View>
                { isEditMode ?
                    <View style={[styles.item,{alignItems:'center'}]}>
                        <NumberChangeField 
                            value={amount} 
                            onChangePress = {onQuantityChange(item)}
                            onAmountChange = {onAmountChange(item)}
                        />
                    </View>
                    :
                    <View style={[styles.item,{alignItems:'center'}]}>
                        <Text style={styles.itemText}>{amount}</Text>
                    </View>
                
                }
            
                <View style={[styles.item,{alignItems:'flex-end'}]}>
                    <Text style={styles.itemText}>$ {currencyFormatter(unitPrice)}</Text>
                </View>
                
            </>
        )
        
    }
 
    const renderProcedureFn = (item) => {
        return <Item
            hasCheckBox={true}
            isChecked={checkBoxList.includes(item._id)}
            onCheckBoxPress={handleOnCheckBoxPress(item)}
            onItemPress={() => {}}
            itemView={listItem(item)}
        />
    }

    const getFabActions = () => {
        const addItem = <ActionItem title={"Add Item"} icon={<AddIcon/>} onPress={openAddItem}/>;
        return <ActionContainer
            floatingActions={[
                addItem
            ]}
            title={"PROCEDURES ACTIONS"}
        />
    }

    const openAddItem = () => {
        modal.closeModals('ActionContainerModal');

        // For some reason there has to be a delay between closing a modal and opening another.
        setTimeout(() => {

            modal
                .openModal(
                    'OverlayModal',
                    {
                        content: <AddItemDialog
                            onCancel={() => setFloatingAction(false)}
                            onCreated={handleUpdate}
                        />,
                        onClose: () => setFloatingAction(false)
                    })
        }, 200)
    }

    let dataToDisplay = [...consumables];
    dataToDisplay = dataToDisplay.slice(currentPageListMin, currentPageListMax);

    return (
        <>
            <Table
                isCheckbox = {true}
                data = {dataToDisplay}
                listItemFormat = {renderProcedureFn}
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
                        isDisabled={isFloatingActionDisabled}
                        toggleActionButton={toggleActionButton}
                    />
                </View>

        </>

    )
}

export default withModal(ProceduresConsumablesTab)

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
    addNew:{
        flexDirection:'row',
        height:40,
        margin:15,
        marginBottom:30,
        padding:10,
        borderColor:'#CCD6E0',
        borderRadius:4,
        borderWidth:1,
        justifyContent:'space-between',
        alignItems:'center',
    },
    
})
