import React,{ useState, useEffect, useContext } from "react";
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
import Footer from '../../components/common/Page/Footer';
import { PageContext } from "../../contexts/PageContext";
import DataItem from "../common/List/DataItem";
import { useTheme } from 'emotion-theming';


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
];

const ProceduresConsumablesTab = ({consumablesData, modal, handleInventoryUpdate, onAddInventory}) => {

    const { pageState } = useContext(PageContext);
    const { isEditMode } = pageState;

    const theme = useTheme();

    const recordsPerPage = 10
    const [checkBoxList, setCheckboxList] = useState([])
    const [isFloatingActionDisabled, setFloatingAction] = useState(false);

    const [totalPages, setTotalPages] = useState(0);
    const [currentPageListMin, setCurrentPageListMin] = useState(0)
    const [currentPageListMax, setCurrentPageListMax] = useState(recordsPerPage)
    const [currentPagePosition, setCurrentPagePosition] = useState(1)

    useEffect(()=>{
        setTotalPages(Math.ceil(consumablesData.length / recordsPerPage))
    },[])

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
        let updatedList = selectAll(consumablesData, checkBoxList)
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
        
        const { inventory = {}, amount = 0 } = item || {}
        const { name = "", unitPrice = 0, type = "n/a" } = inventory || {}

        return (
            <>
                <DataItem text = {name} color = {'--color-blue-600'} fontStyle = {'--text-base-medium'}/>
                <DataItem text = {type} align = "center" fontStyle = {'--text-base-regular'}/>

                { isEditMode ?

                    <View style={[styles.item,{alignItems:'center'}]}>
                        <NumberChangeField
                            value={amount === 0 ? "" : amount.toString()}
                            onChangePress = {onQuantityChange(item)}
                            onAmountChange = {onAmountChange(item)}
                        />
                    </View>
                    :
                    <DataItem text = {amount} align = "center" fontStyle = {'--text-base-regular'}/>
                }

                <DataItem text = {`$ ${currencyFormatter(unitPrice)}`} align = "flex-end" fontStyle = {'--text-base-regular'}/>
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

    const onQuantityChange = (item) => (action) =>  {
        const updatedObj = {
            ...item,
            amount: action === 'add' ? parseInt(item.amount) + 1 : parseInt(item.amount) - 1
        };

        const updatedData = consumablesData.map(item => {
            return item._id === updatedObj._id ?
                {...updatedObj}
                :
                {...item}
        })

        handleInventoryUpdate(updatedData)

    } 

    const onAmountChange = (item) => (value) => {
        const updatedObj = {
            ...item,
            amount: value
        };

        const updatedData = consumablesData.map(item => {
            return item._id === updatedObj._id ?
                {...updatedObj}
                :
                {...item}
        })

        handleInventoryUpdate(updatedData)
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
                            itemType = {'Consumables'}
                            onCancel={() => setFloatingAction(false)}
                            onCreated={onAddInventory}
                        />,
                        onClose: () => setFloatingAction(false)
                    })
        }, 200)
    }

    let dataToDisplay = [...consumablesData];
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

            <Footer
                totalPages={totalPages}
                currentPage={currentPagePosition}
                goToNextPage={goToNextPage}
                goToPreviousPage={goToPreviousPage}
                isDisabled={isFloatingActionDisabled}
                toggleActionButton={toggleActionButton}
                hasPaginator = {true}
                hasActionButton = {true}
                hasActions = {true}
                isNextDisabled = {false}
                isPreviousDisabled = {false}
            />
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
        // marginBottom: 20,
        right: 0,
        // marginRight: 30,
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
