import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import FrameTitle from '../FrameTitle'
import FrameProcedureContent from '../FrameContents/FrameProcedureContent';
import styled from "@emotion/native/";
import IconButton from "../../Buttons/IconButton";
import WasteIcon from "../../../../../assets/svg/wasteIcon";

const ProcedureCardWrapper = styled.View`
   flex: 1
`

const ProcedureCardContainer = styled.View`
   flex: 1
`
const ProcedureCardHeader = styled.View`
  height: 41px;
  width: 100%;
`

const ProcedureCardContent = styled.View`
  // background-color: ${({theme}) => {
    theme.colors['--color-default-white']
}};
`

const FrameProcedureCard = ({
                                procedureData = {},
                                icon,
                                onOpenPickList,
                                onRemoveProcedure,
                                isEdit,
                                onProcedureUpdate
                            }) => {

    const {appointment = {}} = procedureData
    const {title = "__", subject = "__"} = appointment

    return (
        <ProcedureCardWrapper>
            <ProcedureCardContainer>

                <ProcedureCardHeader>
                    <FrameTitle
                        color="#718096"
                        borderColor="#E3E8EF"
                        backgroundColor="#F8FAFB"
                        icon={icon}
                        frameTitle={`${title} - ${subject}`}
                        ActionComponent={
                            <IconButton
                                Icon={<WasteIcon strokeColor={!isEdit ? "#B3BDC6" : "#C53030" }/>}
                                onPress={onRemoveProcedure}
                                disabled={isEdit}
                            />
                        }
                    />
                </ProcedureCardHeader>

                <ProcedureCardContent>
                    <FrameProcedureContent
                        isEdit={isEdit}
                        details={procedureData}
                        onOpenPickList={onOpenPickList}
                    />
                </ProcedureCardContent>

            </ProcedureCardContainer>
        </ProcedureCardWrapper>
    );
}

export default FrameProcedureCard;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F8FAFB',
    },
    title: {
        width: '100%'
    },
    content: {
        width: '100%'
    }
})
