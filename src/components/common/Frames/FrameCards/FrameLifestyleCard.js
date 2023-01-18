import React, { useState} from 'react';
import { View, Text, StyleSheet, } from "react-native";
import FrameTitle from '../FrameTitle';
import FrameLifestyleContent from '../FrameContents/FrameLifestyleContent';
import FrameItem from '../FrameItems/FrameItem';
import { transformToSentence } from '../../../../hooks/useTextEditHook'
import { ScrollView } from 'react-native-gesture-handler';
import AddIcon from '../../../../../assets/svg/addIcon';

const FrameLifestyleCard = (props) => {
    console.log(props.cardInformation)
    
    const [addMode, setAddMode] = useState(false) 

    const toggleAddOption = (value) => {
        setAddMode(value)
    }
    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <FrameTitle
                    color={props.frameColor}
                    borderColor={props.frameBorderColor}
                    backgroundColor={props.titleBackgroundColor}
                    icon={props.icon}
                    frameTitle={props.frameTitle}
                />
            </View>
            <View style={styles.content} >
                {props.cardInformation.map((categorieInformation, index) => {
                    return (
                        <View>
                            <Text style={styles.titleName}>{transformToSentence(categorieInformation.name)}</Text>
                            <FrameLifestyleContent cardInformation={categorieInformation} />
                        </View>
                    )
                })}
                {props.isEditMode ?

                    addMode ?
                        null
                        :
                        <View>
                            <FrameItem itemContent="Add New item" icon={<AddIcon />} isEditMode={props.isEditMode} onPressButton={() => { toggleAddOption(true) }} />
                        </View>
                    :
                    null

                }
            </View>
        </View>
    );
}

export default FrameLifestyleCard;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F8FAFB',
    },
    title: {
        width: '100%'
    },
    content: {
        width: '100%',
        padding: 15,
        borderWidth: 1,
        borderColor: '#CCD6E0',
        borderTopWidth: 0,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,


    },
    titleName: {
        marginLeft: 2,
        color: "#4E5664",
        fontSize: 16,
        fontWeight: 'bold'
    }
})
