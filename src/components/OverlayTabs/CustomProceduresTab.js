import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

import Table from '../common/Table/Table';
import Footer from '../common/Page/Footer';
import LongPressWithFeedback from "../common/LongPressWithFeedback";
import FloatingActionButton from "../common/FloatingAction/FloatingActionButton";
import ActionContainer from "../common/FloatingAction/ActionContainer";
import ActionItem from "../common/ActionItem";
import RoundedPaginator from "../common/Paginators/RoundedPaginator";

import WasteIcon from "../../../assets/svg/wasteIcon";
import AddIcon from "../../../assets/svg/addIcon";
import AssignIcon from "../../../assets/svg/assignIcon";

import { useNextPaginator, usePreviousPaginator } from "../../helpers/caseFilesHelpers";

import { withModal } from "react-native-modalfy";
import DataItem from "../common/List/DataItem";
import Item from "../common/Table/Item";

const headers = [
    {
        name: 'Procedure',
        alignment: 'flex-start',
        flex: 2
    },
    {
        name: 'Theatre',
        alignment: 'flex-start',
        flex: 1.5
    },
    {
        name: 'Recovery',
        alignment: 'center',
        flex: 1,
    },
    {
        name: 'Duration',
        alignment: 'flex-end',
        flex: 1
    }
];

const testData = [
    {
        procedure: 'Coronary Bypass Graft',
        theatre: 'Operating Room 1',
        recovery: 'Yes',
        duration: 2
    },
    {
        procedure: 'Adenosine',
        theatre: 'Operating Room 1',
        recovery: 'No',
        duration: 3
    }
];

const CustomProceduresTab = ({ modal, procedures }) => {

    console.log('gun man deh on the back foot', procedures)
    const recordsPerPage = 10;

    const [totalPages, setTotalPages] = useState(0);
    const [currentPageListMin, setCurrentPageListMin] = useState(0);
    const [currentPageListMax, setCurrentPageListMax] = useState(recordsPerPage);
    const [currentPagePosition, setCurrentPagePosition] = useState(1);

    const [selectedIds, setSelectedIds] = useState([])
    const [isFloatingActionDisabled, setIsFloatingActionDisabled] = useState(false);
    const [isIndeterminate, setIsIndeterminate] = useState(false)

    const data = procedures.map(item => {
        const recovery = item.hasRecovery ? "Yes" : "No";
        return {
            id: item._id,
            procedure: item.name,
            theatre: "Operating Room 1",
            recovery: recovery,
            duration: item.duration,
        };
    });

    useEffect(() => {
        setTotalPages(Math.ceil(data.length / recordsPerPage));
    }, []);

    const goToNextPage = () => {
        if (currentPagePosition < totalPages) {
            let { currentPage, currentListMin, currentListMax } = useNextPaginator(currentPagePosition, recordsPerPage, currentPageListMin, currentPageListMax);
            setCurrentPagePosition(currentPage);
            setCurrentPageListMin(currentListMin);
            setCurrentPageListMax(currentListMax);
        }
    };

    const goToPreviousPage = () => {
        if (currentPagePosition === 1) return;

        let { currentPage, currentListMin, currentListMax } = usePreviousPaginator(currentPagePosition, recordsPerPage, currentPageListMin, currentPageListMax);
        setCurrentPagePosition(currentPage);
        setCurrentPageListMin(currentListMin);
        setCurrentPageListMax(currentListMax);
    };

    const onSelectAll = () => {
        const indeterminate = selectedIds.length >= 0 && selectedIds.length != data.length;
        setIsIndeterminate(indeterminate)
        if (indeterminate) {
            const selectedAllIds = [...data.map(item => item.id)]
            setSelectedIds(selectedAllIds)
        } else {
            setSelectedIds([])
        }

    }

    const handleOnCheckBoxPress = (item) => {
        console.log("i am pressed")
        const { id } = item;
        let updatedCases = [...selectedIds];

        if (updatedCases.includes(id)) {
            updatedCases = updatedCases.filter(id => id !== item.id)
        } 
        else {
            updatedCases.push(item.id);
        }
        
        setSelectedIds(updatedCases)
    }
  
     
    
     const RECOVERY_COLORS = {
        'Yes': '--color-green-600',
        'No': '--color-orange-500'
    };
    
    
    const renderItem = item => {
        return <Item
            hasCheckBox={true}
            isChecked={selectedIds.includes(item.id)}
            onCheckBoxPress={handleOnCheckBoxPress(item)}
            onItemPress={() => { }}
            itemView={listItemFormat(item)}
        />
            ;
    };

    const listItemFormat = item => (
        <>
            <DataItem flex={2} align="flex-start" text={item?.procedure} color="--color-blue-600" fontStyle="--text-base-medium" />
            <DataItem flex={1.5} align="flex-start" text={item?.theatre} color="--color-blue-600" fontStyle="--text-base-medium" />
            <DataItem flex={1} align="center" text={item.recovery} color={RECOVERY_COLORS[item.recovery]} fontStyle="--text-base-medium" />
            <DataItem flex={1} align="flex-end" text={`${item.duration} hrs`} color="--color-gray-800" fontStyle="--text-base-regular" />

            {/* <View style={{flexDirection: 'row', borderBottomColor: '#E3E8EF', borderBottomWidth: 1, marginBottom: 15, paddingBottom: 15}}>
                <View style={{flex: 1}}>
                    <Text style={{fontSize: 16, color: '#3182CE'}}>{item.procedure}</Text>
                </View>
                <View style={{flex: 1, alignItems: "flex-start"}}>
                    <Text style={{fontSize: 16, color: '#3182CE'}}>{item.theatre}</Text>
                </View>
                <View style={{flex: 1, alignItems: 'center'}}>
                    <Text style={{fontSize: 14, color: item.recovery === 'Yes'?'#38A169':'#ED8936'}}>{item.recovery}</Text>
                </View>
                <View style={{flex: 1, alignItems: 'flex-end'}}>
                    <Text style={{fontSize: 16, color: '#323843'}}>{`${item.duration} hrs`}</Text>
                </View>
            </View> */}
        </>
    );

    

    let dataToDisplay = [...data];
    dataToDisplay = dataToDisplay.slice(currentPageListMin, currentPageListMax);

    return (
        <>
            <Table
                data={dataToDisplay}
                listItemFormat={renderItem}
                headers={headers}
                isCheckbox={true}

            />
            <Footer
                hasActions={true}
                totalPages={totalPages}
                currentPage={currentPagePosition}
                goToNextPage={goToNextPage}
                goToPreviousPage={goToPreviousPage}
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
            </View> */}
        </>
    );
};

export default withModal(CustomProceduresTab);

const styles = StyleSheet.create({
    footer: {
        flex: 1,
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        right: 0,
        marginBottom: 20,
        marginRight: 30,
    }
});