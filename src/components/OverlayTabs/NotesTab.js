import React,{ useState } from "react";
import { View, StyleSheet } from "react-native";
import FrameCard from '../common/Frames/FrameCards/FrameCard';
import NotesIcon from '../../../assets/svg/notes';
import { withModal } from "react-native-modalfy";

const NotesTab = ({modal, notesData}) => {
    // const { notes } = notesData

    return (
        <>
            <FrameCard
                frameColor = "#DD6B20"
                titleBackgroundColor = "#FFFAF0"
                frameBorderColor = "#FBD38D"
                frameTitle = "Notes"
                cardInformation = {[notesData]}
                icon = {NotesIcon}
            />
        </>
    )
}

export default withModal(NotesTab)

const styles = StyleSheet.create({
    
})