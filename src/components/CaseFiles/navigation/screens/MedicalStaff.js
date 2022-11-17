import React, { useContext } from 'react';
import { SuitesContext } from '../../../../contexts/SuitesContext';
import { Details } from '../../OverlayPages/MedicalStaff'
import { View, Text } from 'react-native';
import ConfirmationCheckBoxComponent from '../../../../components/ConfirmationCheckBoxComponent';
import ConfirmationComponent from '../../../../components/ConfirmationComponent';
import { deleteCaseStaff, addCaseStaff } from '../../../../api/network'

const MedicalStaff = ({
    staff,
    selectedTab,
    isEditMode,
    modal, 
    caseId,
    refreshData = () => { },
}) => {

    const handleEdit = () => {
        console.log("handle edit")
    }

    const handleDelete = (data) => {
        openDeletionConfirm(caseId, data);

    }

    const handleAdd = (id) => {
        addCaseStaff(caseId, { "staffId": id })
            .then(data => {
                modal.openModal(
                    'ConfirmationModal', {
                    content: <ConfirmationComponent
                        isError={false}
                        isEditUpdate={false}
                        onAction={() => {
                            modal.closeModals('ConfirmationModal');
                            setTimeout(() => {
                                //refreshData(caseId)
                            }, 200)
                            refreshData()
                        }}
                    />,
                    onClose: () => {
                        modal.closeModal('ConfirmationModal')
                        refreshData()
                    }
                }
                );
            })
            .catch(error => {
                openErrorConfirmation();
                setTimeout(() => {
                    modal.closeModals('ActionContainerModal');
                }, 200)
                console.log('failed to add this staff list', error)
            })


    }

    const openDeletionConfirm = (caseID, data) => {

        modal.openModal(
            'ConfirmationModal',
            {
                content: <ConfirmationCheckBoxComponent
                    isError={false}
                    isEditUpdate={true}
                    onCancel={() => modal.closeModals('ConfirmationModal')}
                    onAction={() => {
                        modal.closeModals('ConfirmationModal');
                        removeStaffcall(caseID, data);
                    }}
                    // onAction = { () => confirmAction()}
                    message="Do you want to delete these item(s)?"
                />,
                onClose: () => {
                    modal.closeModals('ConfirmationModal');
                }
            }
        );
    };

    const removeStaffcall = (caseId, data) => {
        deleteCaseStaff(caseId, { "staffId": data })
            .then(data => {
                modal.openModal(
                    'ConfirmationModal', {
                    content: <ConfirmationComponent
                        isError={false}
                        isEditUpdate={false}
                        onAction={() => {
                            modal.closeModals('ConfirmationModal');
                            setTimeout(() => {
                                //refreshData(caseId)
                            }, 200)
                            refreshData()
                        }}
                    />,
                    onClose: () => {
                        modal.closeModal('ConfirmationModal')
                        refreshData()
                    }
                }
                );
            })
            .catch(error => {
                openErrorConfirmation();
                setTimeout(() => {
                    modal.closeModals('ActionContainerModal');
                }, 200)
                console.log('failed to delete these item(s)', error)
            })


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




    return (
        selectedTab === 'Details' ?
            <Details tabDetails={staff} isEditMode={isEditMode} handleEdit={handleEdit} onDelete={handleDelete} onAction={handleAdd} />
            :
            <Details tabDetails={staff} isEditMode={isEditMode} onDelete={handleDelete} onAction={handleAdd}/>
    );
}

export default MedicalStaff;

