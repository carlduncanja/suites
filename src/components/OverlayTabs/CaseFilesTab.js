import React,{ useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import List from '../common/List/List';
import ListItem from '../common/List/ListItem';
import DataItem from '../common/List/DataItem';
import LongPressWithFeedback from '../common/LongPressWithFeedback';
import FloatingActionButton from '../common/FloatingAction/FloatingActionButton';
import ActionContainer from '../common/FloatingAction/ActionContainer';
import ActionItem from '../common/ActionItem';
import RoundedPaginator from '../common/Paginators/RoundedPaginator';

import WasteIcon from '../../../assets/svg/wasteIcon';
import AddIcon from '../../../assets/svg/addIcon';
import AssignIcon from '../../../assets/svg/assignIcon';

import {useNextPaginator, usePreviousPaginator} from '../../helpers/caseFilesHelpers';
import { withModal } from 'react-native-modalfy';
import moment from 'moment';
import { formatDate, currencyFormatter } from '../../utils/formatter';



const headers = [
    {
        name: 'Patient',
        alignment: 'flex-start',
        flex: 2,
    },
    {
        name: 'Balance',
        alignment: 'flex-start'
    },
    {
        name: 'Status',
        alignment: 'flex-start'
    },
    {
        name: 'Next Visit',
        alignment: 'flex-start'
    }
]

const testData = [
    {
        patientId: '#3502193850',
        patientName: 'Alexis Scott',
        balance: '340000.67',
        status: 'Closed',
        nextVisit: new Date(2019, 10, 21)
    }
]

const CaseFilesTab = ({cases}) => {

    const recordsPerPage = 10;
    console.log('Cases: ', cases);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPageListMin, setCurrentPageListMin] = useState(0);
    const [currentPageListMax, setCurrentPageListMax] = useState(recordsPerPage);
    const [currentPagePosition, setCurrentPagePosition] = useState(1);

    const [selectedIds, setSelectedIds] = useState([])
    const [isFloatingActionDisabled, setIsFloatingActionDisabled] = useState(false);
    const [isIndeterminate, setIsIndeterminate] = useState(false)

    const data = cases.map( item =>{
        return {
            id: item.patient,
            name: item.name,
            balance: 2560.90,
            status: 'Closed',
            nextVisit: new Date(2019, 10, 21)
        }
    })

    useEffect(()=>{
        setTotalPages(Math.ceil(data.length / recordsPerPage))
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

    const onSelectAll = () => {
        const indeterminate = selectedIds.length >= 0 && selectedIds.length !== data.length;
        setIsIndeterminate(indeterminate)
        if (indeterminate) {
            const selectedAllIds = [...data.map( item => item.id )]
            setSelectedIds(selectedAllIds)
        } else {
            setSelectedIds([])
        }
    }

    const handleOnCheckBoxPress = (item) => () =>  {
        const { id } = item;
        let updatedCases = [...selectedIds];

        if (updatedCases.includes(id)) {
            updatedCases = updatedCases.filter(id => id !== item.id)
        } else {
            updatedCases.push(item.id);
        }
        
        setSelectedIds(updatedCases);
    }

    const renderListFn = (item) =>{
        return <ListItem
            hasCheckBox={true}
            isChecked={selectedIds.includes(item.id)}
            onCheckBoxPress={handleOnCheckBoxPress(item)}
            onItemPress={() => {}}
            itemView={listItemFormat(item)}
        />
    }

    const listItemFormat = item => (
        <>
            <DataItem flex={2} fontStyle="--text-sm-regular" color="--color-gray-700" text={`#${item?.id}`}/>
            <DataItem flex={1} fontStyle="--text-sm-medium" color="--color-gray-700" text={`$${currencyFormatter(item?.balance)}`}/>
            <DataItem flex={1} fontStyle="--text-sm-regular" color={item.status === 'Closed' ? '--color-orange-600' : '--color-blue-600'} text={item?.status}/>
            <DataItem flex={1} fontStyle="--text-sm-regular" color="--color-gray-700" text={formatDate(item?.nextVisit, 'MMM DD, YYYY')}/>
        
            {/* <View style={{flex: 1}}>
            <Text style={{color: '#718096', fontSize: 12}}>{item.id}</Text>
            {/* <Text style={{color: '#3182CE', fontSize: 16}}>{item.name}</Text> 
        </View>
        <View style={{flex: 1}}>
            <Text style={{fontSize: 14, color: '#4E5664'}}>{item.balance}</Text>
        </View>
        <View style={{flex: 1}}>
            <Text style={{fontSize: 14, color: item.status === 'Closed'? '#DD6B20' : '#3182CE'}}>{item.status}</Text>
        </View>
        <View style={{flex: 1}}>
            <Text style={{fontSize: 14, color: '#4E5664'}}>{formatDate(item.nextVisit,'MMM DD, YYYY')}</Text>
        </View> */}
        </>
    );

    let dataToDisplay = [...data];
    dataToDisplay = dataToDisplay.slice(currentPageListMin, currentPageListMax);

    return (
        <View style={{ flex: 1}}>
            <List
                listData={dataToDisplay}
                listHeaders={headers}
                itemsSelected={selectedIds}
                isCheckbox={true}
                onSelectAll={onSelectAll}
                listItemFormat={renderListFn}
            />
            <View style={styles.footer}>
                <View style={{alignSelf: 'center', marginRight: 10}}>
                    <RoundedPaginator
                        totalPages={totalPages}
                        currentPage={currentPagePosition}
                        goToNextPage={goToNextPage}
                        goToPreviousPage={goToPreviousPage}
                    />
                </View>
            </View>
         
        </View>
    )
}

export default withModal(CaseFilesTab) 

const styles = StyleSheet.create({
    footer: {
        flex: 1,
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        right: 0,
        // marginBottom: 20,
        // marginRight: 30,
    }
})
