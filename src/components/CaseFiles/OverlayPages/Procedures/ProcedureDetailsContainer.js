import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView, Modal, TouchableHighlight, Alert} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {useModal} from 'react-native-modalfy';
import styled from '@emotion/native';
import {useTheme} from 'emotion-theming';
import ProceduresPickList from '../../ProceduresPickList'
import ProcedureIcon from '../../../../../assets/svg/frameProcedures';
import {PageContext} from '../../../../contexts/PageContext';
import {removeCaseProcedureAppointment, updateCaseProcedureAppointmentCall} from '../../../../api/network';
import ConfirmationComponent from '../../../ConfirmationComponent';
import FrameProcedureCard from '../../../common/Frames/FrameCards/FrameProcedureCard';
import Table from '../../../common/Table/Table';
import DataItem from '../../../common/List/DataItem';
import { formatDate } from '../../../../utils/formatter';

const ArchivedProcedures = styled.View`
    flex: 1;
`;

const ArchivedTitle = styled.Text(({theme}) => ({
    ...theme.font['--text-xl-medium'],
    color: theme.colors['--color-gray-800'],
    marginBottom: 24,
}));

const ListItemWrapper = styled.View`
    display: flex;
    flex-direction: row;
`;

const archivedHeaders = [
    {
        name: 'Procedure',
        alignment: 'flex-start',
        flex: 2
    },
    {
        name: 'Location',
        alignment: 'flex-start',
        flex: 1.5
    },
    {
        name: 'Date',
        alignment: 'flex-start',
        flex: 1,
    },
    {
        name: 'Duration',
        alignment: 'flex-start',
        flex: 1
    }
];

const ProcedureDetailsContainer = ({tabDetails, caseId, proceduresBillableItems}) => {
    const modal = useModal();
    const {pageState, setPageState, fetchCase} = useContext(PageContext);
    const {isEditMode} = pageState;
    const filterArchivedAppointments = tabDetails.filter(item => item?.isInvoiced === true) || [];
    const filterAppointments = tabDetails.filter(item => item?.isInvoiced !== true) || [];
 
    useEffect(() => {
        setProcedureAppointment(filterAppointments);
        setArchivedProcedureAppointments(filterArchivedAppointments)
    }, [tabDetails])

    const [procedureAppointments, setProcedureAppointment] = useState(filterAppointments);
    const [archivedProcedureAppointments, setArchivedProcedureAppointments] = useState(filterArchivedAppointments);

    const setPageLoading = (isLoading) => {
        setPageState({
            ...pageState,
            isLoading,
            isEditMode: false
        })
    }
    

    // ############# Event Handlers

    const onOpenPickList = (details) => {
        // console.log("Details: ", details);
        
        const filterProcedures = proceduresBillableItems.filter( item => item?.caseProcedureId === details?._id);
        
        modal.openModal('OverlayInfoModal', {
            overlayContent: <ProceduresPickList
                details={details}
                pickListData = {filterProcedures[0]}
                tabs={['Consumables', 'Equipment']}
            />,
        })
    }

    const removeProcedureAppointment = (procedureId) => {
        let updated = [...procedureAppointments]
        updated = updated.filter(item => item._id !== procedureId)
        setProcedureAppointment(updated)
    }

    const handleRemoveProcedure = (procedure) => () => {
        if (!isEditMode) return;

        // removeProcedureCall(caseId, procedure._id)
        // return

        // bring up confirmation screen.
        modal.openModal('ConfirmationModal', {
            content: (
                <ConfirmationComponent
                    error={false}//boolean to show whether an error icon or success icon
                    isEditUpdate={true}
                    onCancel={() => {
                        modal.closeAllModals()
                    }}
                    onAction={() => {
                        modal.closeAllModals()
                        removeProcedureCall(caseId, procedure._id)
                    }}
                    message="Do you wish to remove this appointment?"//general message you can send to be displayed
                    action="Yes"
                />
            ),
            onClose: () => {
                console.log('Modal closed');
            },
        });
    }

    const removeProcedureCall = (caseId, procedureId) => {
        // REMOVE PROCEDURE CALL
        setPageLoading(true);
        removeCaseProcedureAppointment(caseId, procedureId)
            .then(_ => {
                removeProcedureAppointment(procedureId);
            })
            .catch(error => {
                console.log('Failed to remove case appointment', error);
            })
            .finally(_ => {
                fetchCase(caseId)
                setPageLoading(false);
            })
    }

    const archivedItemFormat = item => (
        <ListItemWrapper>
            <DataItem flex={2} align="flex-start" text={item?.procedure?.name} color="--color-blue-600" fontStyle="--text-base-regular"/>
            <DataItem flex={1.5} align="flex-start" text={item?.appointment?.location?.name} color="--color-blue-600" fontStyle="--text-base-regular"/>
            <DataItem flex={1} align="flex-start" text={formatDate(item.appointment?.startTime, 'DD/MM/YYYY')} color="--color-gray-800" fontStyle="--text-base-regular"/>
            <DataItem flex={1} align="flex-start" text={`${item.procedure?.duration} hrs`} color="--color-gray-800" fontStyle="--text-base-regular"/>
        </ListItemWrapper>
    );

    // ############# Data declaration

    return (
        <KeyboardAwareScrollView
            style={{flex: 1, backgroundColor: 'none'}}
            contentInset={{bottom: 300}}
            extraScrollHeight={200}
        >
            {
                procedureAppointments.map(item => (
                    <View key={item._id} style={styles.procedureContainer}>
                        <FrameProcedureCard
                            caseId={caseId}
                            procedureData={item}
                            icon={ProcedureIcon}
                            isEdit={isEditMode}
                            onOpenPickList={onOpenPickList}
                            onRemoveProcedure={handleRemoveProcedure(item)}
                        />
                    </View>
                ))
            }

            <ArchivedProcedures>
                <ArchivedTitle>Completed</ArchivedTitle>
                <Table
                    data={filterArchivedAppointments}
                    headers={archivedHeaders}
                    listItemFormat={archivedItemFormat}
                    isCheckbox={false}
                />
            </ArchivedProcedures>

        </KeyboardAwareScrollView>

    );
}

export default ProcedureDetailsContainer;

const styles = StyleSheet.create({
    procedureContainer: {
        marginBottom: 64,
        flex: 1,
    },
    shadowContainer: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#000',
    },
    pickListContainer: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000'
    }
})
