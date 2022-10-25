import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Modal } from 'react-native-paper';
import { useTheme } from 'emotion-theming';


import List from '../common/List/List';
import ListItem from '../common/List/ListItem';
import DataItem from '../common/List/DataItem';
import LongPressWithFeedback from '../common/LongPressWithFeedback';
import FloatingActionButton from '../common/FloatingAction/FloatingActionButton';
import ActionContainer from '../common/FloatingAction/ActionContainer';
import ActionItem from '../common/ActionItem';
import RoundedPaginator from '../common/Paginators/RoundedPaginator';
import ConfirmationComponent from '../ConfirmationComponent';

import WasteIcon from '../../../assets/svg/wasteIcon';
import AddIcon from '../../../assets/svg/addIcon';
import AssignIcon from '../../../assets/svg/assignIcon';

import { LONG_PRESS_TIMER } from '../../const';
import { deleteCaseFiles } from '../../api/network'
import { useNextPaginator, usePreviousPaginator } from '../../helpers/caseFilesHelpers';
import { withModal, useModal } from 'react-native-modalfy';

import { formatDate, currencyFormatter } from '../../utils/formatter';
import ConfirmationCheckBoxComponent from '../../components/ConfirmationCheckBoxComponent';
import Footer from '../common/Page/Footer';



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

const CaseFilesTab = ({ cases }) => {

    const recordsPerPage = 10;
    console.log('Cases: ', cases);
    const modal = useModal();
    const theme = useTheme();

    const [totalPages, setTotalPages] = useState(0);
    const [currentPageListMin, setCurrentPageListMin] = useState(0);
    const [currentPageListMax, setCurrentPageListMax] = useState(recordsPerPage);
    const [currentPagePosition, setCurrentPagePosition] = useState(1);

    const [selectedIds, setSelectedIds] = useState([])
    const [isFloatingActionDisabled, setIsFloatingActionDisabled] = useState(false);
    const [isIndeterminate, setIsIndeterminate] = useState(false)

    const data = cases.map(item => {
        return {
            id: item.patient,
            name: item.name,
            balance: 2560.90,
            status: 'Closed',
            nextVisit: new Date(2019, 10, 21)
        }
    })

    useEffect(() => {
        setTotalPages(Math.ceil(data.length / recordsPerPage))
    }, [])

    const goToNextPage = () => {
        if (currentPagePosition < totalPages) {
            let { currentPage, currentListMin, currentListMax } = useNextPaginator(currentPagePosition, recordsPerPage, currentPageListMin, currentPageListMax)
            setCurrentPagePosition(currentPage);
            setCurrentPageListMin(currentListMin);
            setCurrentPageListMax(currentListMax);
        }
    };

    const goToPreviousPage = () => {
        if (currentPagePosition === 1) return;

        let { currentPage, currentListMin, currentListMax } = usePreviousPaginator(currentPagePosition, recordsPerPage, currentPageListMin, currentPageListMax)
        setCurrentPagePosition(currentPage);
        setCurrentPageListMin(currentListMin);
        setCurrentPageListMax(currentListMax);
    };

    const onSelectAll = () => {
        const indeterminate = selectedIds.length >= 0 && selectedIds.length !== data.length;
        setIsIndeterminate(indeterminate)
        if (indeterminate) {
            const selectedAllIds = [...data.map(item => item.id)]
            setSelectedIds(selectedAllIds)
        } else {
            setSelectedIds([])
        }
    }

    const handleOnCheckBoxPress = (item) => () => {
        const { id } = item;
        let updatedCases = [...selectedIds];

        if (updatedCases.includes(id)) {
            updatedCases = updatedCases.filter(id => id !== item.id)
        } else {
            updatedCases.push(item.id);
        }

        setSelectedIds(updatedCases);
    }

    const renderListFn = (item) => {
        return <ListItem
            hasCheckBox={true}
            isChecked={selectedIds.includes(item.id)}
            onCheckBoxPress={handleOnCheckBoxPress(item)}
            onItemPress={() => { }}
            itemView={listItemFormat(item)}
        />
    }

    const listItemFormat = item => (
        <>
            <DataItem flex={2} fontStyle="--text-sm-regular" color="--color-gray-700" text={`#${item?.id}`} />
            <DataItem flex={1} fontStyle="--text-sm-medium" color="--color-gray-700" text={`$${currencyFormatter(item?.balance)}`} />
            <DataItem flex={1} fontStyle="--text-sm-regular" color={item.status === 'Closed' ? '--color-orange-600' : '--color-blue-600'} text={item?.status} />
            <DataItem flex={1} fontStyle="--text-sm-regular" color="--color-gray-700" text={formatDate(item?.nextVisit, 'MMM DD, YYYY')} />

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

    const getFabActions = () => {
        const isDisabled = selectedIds.length === 0;
        const deleteAction = (
            <View style={{ borderRadius: 6, flex: 1, overflow: 'hidden' }}>
                <LongPressWithFeedback
                    pressTimer={LONG_PRESS_TIMER.LONG}
                    onLongPress={removeCaseFileLongPress}
                    isDisabled={isDisabled}
                >
                    <ActionItem
                        title="Hold to Delete"
                        icon={<WasteIcon strokeColor={isDisabled ? theme.colors['--color-gray-600'] : theme.colors['--color-red-700']} />}
                        onPress={() => {
                        }}
                        touchable={false}
                        disabled={isDisabled}
                    />
                </LongPressWithFeedback>
            </View >
        );
        return <ActionContainer
            floatingActions={[
                deleteAction
            ]}
            title="CASE FILE ACTIONS"
        />;

    }

    const toggleActionButton = () => {
        setIsFloatingActionDisabled(true)
        modal.openModal("ActionContainerModal", {
            actions: getFabActions(),
            title: "CASE FILE ACTIONS",
            onClose: () => {
                setIsFloatingActionDisabled(false);
            },

        });
    }

    const removeCaseFileLongPress = () => {
        if (selectedIds.length > 0) openDeletionConfirm({ ids: [...selectedIds] });
        else openErrorConfirmation();
    }

    const openDeletionConfirm = data => {
        modal.openModal(
            'ConfirmationModal',
            {
                content: <ConfirmationCheckBoxComponent
                    isError={false}
                    isEditUpdate={true}
                    onCancel={() => {
                        modal.closeModals('ConfirmationModal');
                        setIsFloatingActionDisabled(false)
                    }}
                    onAction={() => {
                        removeCaseFile(data)
                        modal.closeModals('ConfirmationModal');
                    }}
                    message="Do you want to delete these item(s)"
                />,
                onClose: () => {
                    modal.closeModals('ConfirmationModal');

                }
            }
        );
    }

    const removeCaseFile = (data) => {
        
        console.log("the is that are selected",selectedIds)
        
        deleteCaseFiles(data)
        .then(_=>{
            modal.openModal(
                'ConfirmationModal', {
                content: <ConfirmationComponent
                    isError={false}
                    isEditUpdate={false}
                    onAction={() => {
                        modal.closeModals('ConfirmationModal');
                        setTimeout(() => {
                            modal.closeModals('ActionContainerModal')
                        }, 200)
                    }}
                />,
                onClose: () => {
                    modal.closeModal('ConfirmationModal')
                }
            }
            );
            setSelectedIds([])
        })
        .catch(error => {
            openErrorConfirmation();
            setTimeout(() => {
                modal.closeModals('ActionContainerModal');
            }, 200)
            console.log('failed to delete these item(s)', error)
        })
        .finally(_ => {
            setIsFloatingActionDisabled(false)
        });

    } 
    const openErrorConfirmation = () => {
        modal.openModal(
            'ConfirmationModal',
            {
                content: <ConfirmationComponent
                    isError={true}
                    isEditUpdate={false}
                    onCancel={() => modal.closeModals('ConfirmationModal')}
                />,
                onClose: () => {
                    modal.closeModals('ConfirmationModal');
                }
            }
        );
    };

    let dataToDisplay = [...data];
    dataToDisplay = dataToDisplay.slice(currentPageListMin, currentPageListMax);

    return (
        <>
            <List
                listData={dataToDisplay}
                listHeaders={headers}
                itemsSelected={selectedIds}
                isCheckbox={true}
                onSelectAll={onSelectAll}
                listItemFormat={renderListFn}
            />
            <Footer
                hasActions={true}
                hasPaginator={false}
                toggleActionButton={toggleActionButton}
            />
            {/* <View style={styles.footer}>
                <View style={{alignSelf: 'center', marginRight: 10}}>
                    <RoundedPaginator
                        totalPages={totalPages}
                        currentPage={currentPagePosition}
                        goToNextPage={goToNextPage}
                        goToPreviousPage={goToPreviousPage}
                    />
                </View>
            </View> */}

        </>
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
