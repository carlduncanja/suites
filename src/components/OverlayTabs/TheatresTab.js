import React,{ useState, useEffect  } from "react";
import { View, Text, StyleSheet} from "react-native";

import Table from '../common/Table/Table';
import FloatingActionButton from "../common/FloatingAction/FloatingActionButton";
import ActionContainer from "../common/FloatingAction/ActionContainer";
import RoundedPaginator from "../common/Paginators/RoundedPaginator";
import ActionItem from "../common/ActionItem";
import AddIcon from "../../../assets/svg/addIcon";
import AddItemDialog from '../Procedures/AddItemDialog';
import Footer from '../../components/common/Page/Footer';
import LongPressWithFeedback from "../common/LongPressWithFeedback";
import WasteIcon from "../../../assets/svg/wasteIcon";

import {useNextPaginator, usePreviousPaginator} from "../../helpers/caseFilesHelpers";
import { withModal } from "react-native-modalfy";
import {LONG_PRESS_TIMER} from '../../const';


const headers = [
    {
        name : 'Theatre',
        alignment : 'flex-start',
        flex:2
    },
    {
        name : 'Status',
        alignment : 'center'
    },
    {
        name : 'Recovery',
        alignment : 'center'
    },
    {
        name : 'Availability',
        alignment : 'flex-end'
    }
]

const testData = [
    {
        room : 'Operating Room 1',
        status : 'In Use',
        recovery : 'Yes',
        availability : 2
    },
    {
        room : 'Operating Room 2',
        status : 'In Use',
        recovery : 'Yes',
        availability : 2
    }
]

const TheatresTab = ({modal, theatresData, onAddTheatre}) => {

    const recordsPerPage = 10;
    const [isFloatingActionDisabled, setFloatingAction] = useState(false)

    const [totalPages, setTotalPages] = useState(0);
    const [currentPageListMin, setCurrentPageListMin] = useState(0);
    const [currentPageListMax, setCurrentPageListMax] = useState(recordsPerPage);
    const [currentPagePosition, setCurrentPagePosition] = useState(1);

    useEffect(()=>{
        setTotalPages(Math.ceil(theatresData.length / recordsPerPage))
    },[])

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

    const listItemFormat = (item) => {
        const { name = "", isRecovery = false, availability = 0, status = "Test_Status" } = item
        return (
            <>
                <View style={{flexDirection: 'row', borderBottomColor:'#E3E8EF', borderBottomWidth:1, marginBottom:15, paddingBottom:15}}>
                    <View style={{flex:2}}>
                        <Text style={{fontSize:16, color:'#3182CE'}}>{name}</Text>
                    </View>
                    <View style={{flex:1, alignItems:"center"}}>
                        <Text style={{fontSize:14, color:'#DD6B20'}}>{status}</Text>
                    </View>
                    <View style={{flex:1, alignItems:'center'}}>
                        <Text style={{fontSize:14, color:'#38A169'}}>{isRecovery ? 'Yes' : 'No'}</Text>
                    </View>
                    <View style={{flex:1, alignItems:'flex-end'}}>
                        <Text style={{fontSize:14, color:'#323843'}}>{availability} slots</Text>
                    </View>
                </View>
            </>
        )
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
        <LongPressWithFeedback pressTimer={LONG_PRESS_TIMER.MEDIUM} onLongPress={()=>{}}>
            <ActionItem title={"Hold to Delete"} icon={<WasteIcon/>} onPress={() => {}} touchable={false}/>
        </LongPressWithFeedback>;
        const addItem = <ActionItem title={"Add Item"} icon={<AddIcon/>} onPress={ openAddItem }/>;


        return <ActionContainer
            floatingActions={[
                // deleteAction,
                addItem
            ]}
            title={"PROCEDURE ACTIONS"}
        />
    };

    // const deleteItems = () =>{
    //     let arr = [...theatresData];
    //     let dataToDelete = [...checkBoxList];

    //     console.log("Arr: ", arr)
    //     console.log("Checked: ", checkBoxList)
    //     // arr = arr.filter(item => !dataToDelete.includes(item?.equipment?._id));

    //     // handleEquipmentDelete(arr)

    //     setTimeout(()=>{
    //         modal.closeModals('ActionContainerModal')
    //     },200)
    // }

    const openAddItem = () => {
        modal.closeModals('ActionContainerModal');

        // For some reason there has to be a delay between closing a modal and opening another.
        setTimeout(() => {

            modal
                .openModal(
                    'OverlayModal',
                    {
                        content: <AddItemDialog
                            itemType = "Theatres"
                            onCancel={() => setFloatingAction(false)}
                            onCreated={onAddTheatre}
                        />,
                        onClose: () => setFloatingAction(false)
                    })
        }, 200)
    }


    let dataToDisplay = [...theatresData];
    dataToDisplay = dataToDisplay.slice(currentPageListMin, currentPageListMax);

    return (
        <>
            <Table
                data = {dataToDisplay}
                listItemFormat = {listItemFormat}
                headers = {headers}
                isCheckbox = {false}
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

            {/* <View style={styles.footer}>
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
            </View> */}
        </>

    )
}

export default withModal(TheatresTab)

const styles = StyleSheet.create({
    footer : {
        flex: 1,
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        right: 0,
        // marginBottom: 20,
        // marginRight: 30,
    }
})
