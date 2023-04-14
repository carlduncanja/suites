import React,{ useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Table from '../common/Table/Table';
import Item from '../common/Table/Item';
import LongPressWithFeedback from "../common/LongPressWithFeedback";
import WasteIcon from "../../../assets/svg/wasteIcon";
import RoundedPaginator from '../common/Paginators/RoundedPaginator';
import FloatingActionButton from '../common/FloatingAction/FloatingActionButton';
import ActionContainer from "../common/FloatingAction/ActionContainer";
import ActionItem from "../common/ActionItem";
import IconButton from "../common/Buttons/IconButton";
import AddNew from '../../../assets/svg/addNewIcon';
import AddIcon from "../../../assets/svg/addIcon";
import ConfirmationComponent from '../ConfirmationComponent';

import { currencyFormatter } from '../../utils/formatter'
import {useNextPaginator, usePreviousPaginator, checkboxItemPress, selectAll} from '../../helpers/caseFilesHelpers';
import NumberChangeField from "../common/Input Fields/NumberChangeField";
import { withModal } from "react-native-modalfy";
import AddItemDialog from "../Procedures/AddItemDialog";
import Footer from '../../components/common/Page/Footer';
import { PageContext } from "../../contexts/PageContext";
import DataItem from "../common/List/DataItem";
import { useTheme } from 'emotion-theming';
import {LONG_PRESS_TIMER} from '../../const';


const headers = [
    {
        name :"Item Name",
        alignment: "flex-start",
        flex: 1.5
    },
    {
        name :"Type",
        alignment: "center",
        flex: 1.6
    },
    {
        name :"Quantity",
        alignment: "center",
        flex: 2.2
    },
    {
        name :"Unit Price",
        alignment: "center",
        flex: 1.1
    }
];

const ProceduresConsumablesTab = ({consumablesData, procedureId, onAddInventory,modal, handleInventoryUpdate, onAddItems, handleConsumablesDelete, navigation}) => {

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
        let updatedProcedures = checkboxItemPress(_id, checkBoxList)
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
        const { name = "", unitCost = 0, type = "n/a" } = inventory || {}
        console.log("iTEM:", item);

        return (
            <>
                <DataItem flex={3} text = {name} color = {'--color-blue-600'} fontStyle = {'--text-base-medium'}/>
                
                { isEditMode ?
                
                    <DataItem flex={0.9} text = {type} align = "center" fontStyle = {'--text-base-regular'}/>

                 :
                    <DataItem flex={2.4} text = {type} align = "center" fontStyle = {'--text-base-regular'}/>

                 }

                { isEditMode ?

                    <View style={[styles.item,{alignItems:'center'}]}>
                        <NumberChangeField
                            value={amount === 0 ? "" : amount.toString()}
                            onChangePress = {onQuantityChange(item)}
                            onAmountChange = {onAmountChange(item)}
                        />
                    </View>
                    :
                    <DataItem flex={2} text = {amount} align = "center" fontStyle = {'--text-base-regular'}/>
                }
            
            { isEditMode ? 
            
                <DataItem flex={1} text = {`$ ${currencyFormatter(unitCost)}`} align = "flex-end" fontStyle = {'--text-base-regular'}/> :
                <DataItem flex={1} text = {`$ ${currencyFormatter(unitCost)}`} align = "flex-end" fontStyle = {'--text-base-regular'}/>
            }
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
        const deleteAction =
            <LongPressWithFeedback pressTimer={LONG_PRESS_TIMER.MEDIUM} onLongPress={deleteItems}>
                <ActionItem title={"Hold to Delete"} icon={<WasteIcon/>} onPress={() => {}} touchable={false}/>
            </LongPressWithFeedback>;
        const addItem = <ActionItem title={"Add Item"} icon={<AddIcon/>} onPress={openAddItem}/>;
        return <ActionContainer
            floatingActions={[
                deleteAction,
                addItem
            ]}
            title={"PROCEDURES ACTIONS"}
        />
    }

    const deleteItems = () => {
        let arr = [...consumablesData];
        let dataToDelete = [...checkBoxList];

        arr = arr.filter(item => !dataToDelete.includes(item?._id));

        confirmDelete(arr)

    }

    const confirmDelete = (data) =>{

        modal .openModal('ConfirmationModal',
        {
            content: <ConfirmationComponent
                isEditUpdate = {true}
                onCancel = {onConfirmCancel}
                onAction = {()=>onConfirmSave(data)}
                message = "Do you wish to delete these items?"
            />
            ,
            onClose: () => {modal.closeModals("ConfirmationModal")}
        })

    }

    const onClose = () =>{
        setTimeout(()=>{
            modal.closeModals('ConfirmationModal')
        },200)

        setTimeout(()=>{
            modal.closeModals('ActionContainerModal');
            setFloatingAction(false)
        },100)
    }

    const onConfirmCancel = () =>{
        onClose()
    }

    const onConfirmSave = (data) =>{
        handleConsumablesDelete(data)
        setCheckboxList([])
        onClose()
    }

    const openAddItem = () => {
        modal.closeModals('ActionContainerModal');

        navigation.navigate('AddItems', {
            screen: 'AddItems',
            initial: false,
            onCancel: () => {
                {
                    navigation.goBack();
                    setFloatingAction(false);
                }
            },
            onCreated: (data) => {
                {
                    navigation.goBack();
                    setFloatingAction(false);
                    onAddInventory(data);
                    // onAddItems(data);
                    // console.log("Created data: ", data)
                }
            },
            type : 'Consumables'
        });

        // For some reason there has to be a delay between closing a modal and opening another.
        // setTimeout(() => {

        //     modal
        //         .openModal(
        //             'OverlayModal',
        //             {
        //                 content: <AddItemDialog
        //                     itemType = {'Consumables'}
        //                     onCancel={() => setFloatingAction(false)}
        //                     onCreated={onAddInventory}
        //                 />,
        //                 onClose: () => setFloatingAction(false)
        //             })
        // }, 200)
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
        flex:3.7,
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
