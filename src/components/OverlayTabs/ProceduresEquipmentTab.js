import React,{ useState,useEffect, useContext } from "react";
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
import AddItemDialog from '../Procedures/AddItemDialog';
import Footer from '../../components/common/Page/Footer';
import ConfirmationComponent from '../ConfirmationComponent';


import { currencyFormatter } from '../../utils/formatter';
import {useNextPaginator, usePreviousPaginator, checkboxItemPress, selectAll} from '../../helpers/caseFilesHelpers';
import { withModal } from "react-native-modalfy";
import { PageContext } from "../../contexts/PageContext";
import {LONG_PRESS_TIMER} from '../../const';

const ProceduresEquipmentTab = ({modal, equipmentsData, handleEquipmentUpdate, onAddEquipment, handleEquipmentDelete, navigation, onAddItems}) => {

    const { pageState } = useContext(PageContext);
    const  { isEditMode } = pageState;

    const recordsPerPage = 10
    // const [equipments, setEquipments] = useState(equipmentsData)
    const [isFloatingActionDisabled, setFloatingAction] = useState(false)
    const [checkBoxList, setCheckboxList] = useState([])

    const [totalPages, setTotalPages] = useState(0);
    const [currentPageListMin, setCurrentPageListMin] = useState(0)
    const [currentPageListMax, setCurrentPageListMax] = useState(recordsPerPage)
    const [currentPagePosition, setCurrentPagePosition] = useState(1)

    useEffect(()=>{
        setTotalPages(Math.ceil(equipmentsData.length / recordsPerPage))
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
        const indeterminate = checkBoxList.length >= 0 && checkBoxList.length !== equipmentsData.length;
        if (indeterminate) {
            const selectedAllIds = [...equipmentsData.map(item => item.equipment._id)];
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
        console.log("Item List: ", item)
        const { equipment = {} } = item
        const { name = "", type = {}, unitPrice = 0 } =equipment || {}
        return (
            <>
                <View style={[styles.item,{flex:2}]}>
                    <Text style={[styles.itemText,{color:"#3182CE"}]}>{name}</Text>
                </View>
                <View style={[styles.item,{alignItems:'flex-start'}]}>
                    <Text style={styles.itemText}>{type?.name || 'n/a'}</Text>
                </View>
                <View style={[styles.item,{alignItems:'flex-end'}]}>
                    <Text style={styles.itemText}>$ {currencyFormatter(unitPrice)}</Text>
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
            <LongPressWithFeedback pressTimer={LONG_PRESS_TIMER.MEDIUM} onLongPress={deleteItems}>
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

    const deleteItems = () =>{
        let arr = [...equipmentsData];
        let dataToDelete = [...checkBoxList];

        arr = arr.filter(item => !dataToDelete.includes(item?.equipment?._id));

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
        handleEquipmentDelete(data)
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
                    onAddItems(data);
                    // console.log("Created data: ", data)
                }
            },
        });
        // For some reason there has to be a delay between closing a modal and opening another.
        // setTimeout(() => {

        //     modal
        //         .openModal(
        //             'OverlayModal',
        //             {
        //                 content: <AddItemDialog
        //                     itemType = "Equipments"
        //                     onCancel={() => setFloatingAction(false)}
        //                     onCreated={onAddEquipment}
        //                 />,
        //                 onClose: () => setFloatingAction(false)
        //             })
        // }, 200)
    }

    let dataToDisplay = [...equipmentsData];
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

            <Footer
                totalPages={totalPages}
                currentPage={currentPagePosition}
                goToNextPage={goToNextPage}
                goToPreviousPage={goToPreviousPage}
                isDisabled = {isFloatingActionDisabled}
                toggleActionButton = {toggleActionButton}
                hasPaginator = {true}
                hasActionButton = {true}
                hasActions = {true}
                isNextDisabled = {false}
                isPreviousDisabled = {false} 
            />

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
