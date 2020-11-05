import React, {useState, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import FrameNoteCard from '../common/Frames/FrameCards/FrameNoteCard';
import NotesIcon from '../../../assets/svg/notes';
import FrameNoteContent from '../common/Frames/FrameContents/FrameNoteContent';
import Footer from '../common/Page/Footer';

const NotesTab = ({
    notesData,
    updateNote = () => {
    }
}) => {
    const [notes, setNotes] = useState(notesData);

    const handleNotesUpdate = value => {
        console.log('Note: ', value);
        setNotes(value);
        updateNote(value);
    };

    return (
        <>
            <FrameNoteCard
                frameColor="#DD6B20"
                titleBackgroundColor="#FFFAF0"
                frameBorderColor="#FBD38D"
                frameTitle="Notes"
                cardInformation={notes}
                handleUpdate={handleNotesUpdate}
                icon={NotesIcon}
            />

            <Footer
                hasActionButton={true}
                hasActions={false}
                hasPaginator={false}
            />
        </>
    );
};

export default NotesTab;

const styles = StyleSheet.create({});
