import React, {useContext, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Modal, TouchableHighlight} from "react-native";
import FrameProcedureCard from '../../../common/Frames/FrameCards/FrameProcedureCard';
import {SuitesContext} from '../../../../contexts/SuitesContext';
import PickListCard from '../../PickList/PickListCard';
import {useModal, withModal} from 'react-native-modalfy';
import ProceduresPickList from '../../ProceduresPickList'
import ProcedureIcon from '../../../../../assets/svg/frameProcedures';
import {PageContext} from "../../../../contexts/PageContext";

const ProcedureDetailsContainer = ({tabDetails}) => {

    const modal = useModal();
    const {pageState} = useContext(PageContext);
    const {isEditMode} = pageState;

    // ############# Data declaration

    const onOpenPickList = (details) => {
        modal.openModal('OverlayInfoModal', {
            overlayContent: <ProceduresPickList
                details={details}
                tabs={["Consumables", "Equipment"]}
            />,
        })
    }


    const handleRemoveProcedure = (procedure) => () => {
        if (!isEditMode) return;

        // REMOVE PROCEDURE CALL
    }



    return (
        <ScrollView style={{flex: 1, paddingTop: 5}}>
            {
                tabDetails.map((item, index) => {
                    return (
                        <View key={index} style={styles.procedureContainer}>
                            <FrameProcedureCard
                                procedureData={item}
                                icon={ProcedureIcon}
                                isEdit={isEditMode}
                                onOpenPickList={onOpenPickList}
                                onRemoveProcedure={handleRemoveProcedure(item)}
                            />
                        </View>
                    )
                })
            }
        </ScrollView>

    );
}

export default ProcedureDetailsContainer;

const styles = StyleSheet.create({
    procedureContainer: {
        marginBottom: 25
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
