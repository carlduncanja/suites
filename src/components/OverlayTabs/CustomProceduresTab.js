import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

import Table from '../common/Table/Table';
import Footer from '../common/Page/Footer';
import LongPressWithFeedback from "../common/LongPressWithFeedback";
import FloatingActionButton from "../common/FloatingAction/FloatingActionButton";
import ActionItem from "../common/ActionItem";
import ActionContainer from '../common/FloatingAction/ActionContainer';
import RoundedPaginator from '../common/Paginators/RoundedPaginator';
import ConfirmationComponent from '../ConfirmationComponent';
import ConfirmationCheckBoxComponent from '../../components/ConfirmationCheckBoxComponent';
import { removeProcedures } from '../../api/network'

import WasteIcon from "../../../assets/svg/wasteIcon";
import AddIcon from "../../../assets/svg/addIcon";
import AssignIcon from "../../../assets/svg/assignIcon";

import { useNextPaginator, usePreviousPaginator } from "../../helpers/caseFilesHelpers";
import { useTheme } from 'emotion-theming';
import { withModal, useModal } from "react-native-modalfy";
import { LONG_PRESS_TIMER } from '../../const';
import DataItem from "../common/List/DataItem";
import Item from "../common/Table/Item";

const headers = [
    {
        name: 'Procedure',
        alignment: 'flex-start',
        flex: 2.5
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

const CustomProceduresTab = ({ selectedPhysician, procedures, setSelectedPhysician, id, fetchPhysician = () => {}}) => {

    const recordsPerPage = 10;
    const modal = useModal();
    const theme = useTheme();

    const [totalPages, setTotalPages] = useState(0);
    const [currentPageListMin, setCurrentPageListMin] = useState(0);
    const [currentPageListMax, setCurrentPageListMax] = useState(recordsPerPage);
    const [currentPagePosition, setCurrentPagePosition] = useState(1);

    const [selectedIds, setSelectedIds] = useState([])
    const [isFloatingActionDisabled, setIsFloatingActionDisabled] = useState(false);
    const [isIndeterminate, setIsIndeterminate] = useState(false)

    const [data, setData] = useState( () => {
            const itemContainer = []
            selectedPhysician.procedures.map(item => {
                const recovery = item.hasRecovery ? "Yes" : "No";
                if(item.custom) {
                    itemContainer.push( {
                        id: item._id,
                        procedure: item.name,
                        theatre: "Operating Room 1",
                        recovery: recovery,
                        duration: item.duration,
                    });
                }
            });

            return itemContainer;
        }
    );

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
            onCheckBoxPress={() => handleOnCheckBoxPress(item)}
            onItemPress={() => { }}
            itemView={listItemFormat(item)}
        />
            ;
    };

    const listItemFormat = item => (
        <>
            <DataItem flex={2.5}  text={item?.procedure} color="--color-blue-600" fontStyle="--text-base-medium" />
            <DataItem flex={1.8}  text={item?.theatre} color="--color-blue-600" fontStyle="--text-base-medium" />
            <DataItem flex={1.24}  text={item.recovery} color={RECOVERY_COLORS[item.recovery]} fontStyle="--text-base-medium" />
            <DataItem flex={0.5}  text={`${item.duration} hrs`} color="--color-gray-800" fontStyle="--text-base-regular" />

           
        </>
    );

    const toggleActionButton = () => {
        setIsFloatingActionDisabled(true)
        modal.openModal("ActionContainerModal", {
            actions: getFabActions(),
            title: "CUSTOM PROCEDURE ACTIONS",
            onClose: () => {
                setIsFloatingActionDisabled(false);
            },

        });

    }

    const getFabActions = () => {
        const isDisabled = selectedIds.length === 0;
        const deleteAction = (
            <View style={{ borderRadius: 6, flex: 1, overflow: 'hidden' }}>
                <LongPressWithFeedback
                    pressTimer={LONG_PRESS_TIMER.LONG}
                    onLongPress={removeCustomProcedureLongPress}
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
            title="CUSTOM PROCEDURE ACTIONS"
        />;

    }

    const removeCustomProcedureLongPress = () => {
        if (selectedIds.length > 0) {
            openDeletionConfirm({ ids: [...selectedIds] });
            fetchPhysician(id);
        }
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
                        setTimeout(() => {
                            modal.closeModals('ActionContainerModal')
                        }, 200)
                    }}
                    onAction={() => {
                        removeCustomProcedure(data)
                        modal.closeModals('ConfirmationModal');
                    }}
                    message="Do you want to delete these item(s)"
                />,
                onClose: () => {
                    modal.closeModals('ConfirmationModal');
                    modal.closeModals('ActionContainerModal')

                }
            }
        );
    } 

    function updatePage() {
        const container = [];
        procedures.map((item, index) => {
            if (selectedIds[index] !== item._id) {
                container.push(item);
            }
        });

        const clonePhysician = selectedPhysician;
        clonePhysician.procedures = container;
        setSelectedPhysician(clonePhysician, 
            setData(
                selectedPhysician.procedures.map(item => {
                    const recovery = item.hasRecovery ? "Yes" : "No";
                    return {
                        id: item._id,
                        procedure: item.name,
                        theatre: "Operating Room 1",
                        recovery: recovery,
                        duration: item.duration,
                    };
                })
            ));
        
    }

    const removeCustomProcedure =(data)=>{
        // here
        removeProcedures(data)
        .then(_=>{
            modal.openModal(
                'ConfirmationModal', {
                content: <ConfirmationComponent
                    isError={false}
                    isEditUpdate={false}
                    onAction={() => {
                        modal.closeModals('ConfirmationModal');
                        updatePage();
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
            
            setSelectedIds([]);
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
            <Table
                data={dataToDisplay}
                listItemFormat={renderItem}
                headers={headers}
                isCheckbox={true}
                toggleHeaderCheckbox={onSelectAll}
                itemSelected={selectedIds}

            />
            <Footer
                hasActions={true}
                totalPages={totalPages}
                currentPage={currentPagePosition}
                goToNextPage={goToNextPage}
                goToPreviousPage={goToPreviousPage}
                toggleActionButton={toggleActionButton}
            />
            
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
