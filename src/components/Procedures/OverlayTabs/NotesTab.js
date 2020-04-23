import React,{ useState } from "react";
import { View, StyleSheet } from "react-native";
import FrameCard from '../../common/Frames/FrameCards/FrameCard';

import FloatingActionButton from "../../common/FloatingAction/FloatingActionButton";
import ActionContainer from "../../common/FloatingAction/ActionContainer";

import { withModal } from "react-native-modalfy";

const NotesTab = ({modal}) => {
    const notes = []

    const [isFloatingActionDisabled, setIsFloatingActionDisabled] = useState(false);

    const toggleActionButton = () =>{
        setIsFloatingActionDisabled(true);
        modal.openModal("ActionContainerModal",
            {
                actions: getFloatingActions(),
                title: "PROCEDURE ACTIONS",
                onClose: () => {
                    setIsFloatingActionDisabled(false)
                }
            })
    }

    getFloatingActions = () =>{
        return <ActionContainer
            floatingActions={[

            ]}
            title={"PROCEDURE ACTIONS"}
        />
    }

    return (
        <>
            <FrameCard
                frameColor = "#DD6B20"
                titleBackgroundColor = "#FFFAF0"
                frameBorderColor = "#FBD38D"
                frameTitle = "Notes"
                cardInformation = {notes}
                frameIconName = ""
                iconFillColor = "#ED8936"
            />
            <View style={styles.footer}>
                <FloatingActionButton
                    isDisabled = {isFloatingActionDisabled}
                    toggleActionButton = {toggleActionButton}
                />
            </View>
        </>
    )
}

export default withModal(NotesTab)

const styles = StyleSheet.create({
    footer:{
        flex: 1,
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        right: 0,
        marginBottom: 20,
        marginRight: 30,
    }
})