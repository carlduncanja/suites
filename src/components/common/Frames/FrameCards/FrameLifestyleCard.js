import React, { useState} from 'react';
import { View, Text, StyleSheet, } from "react-native";
import FrameTitle from '../FrameTitle';
import FrameLifestyleContent from '../FrameContents/FrameLifestyleContent';
import FrameItem from '../FrameItems/FrameItem';
import { transformToSentence } from '../../../../hooks/useTextEditHook'
import { ScrollView } from 'react-native-gesture-handler';
import AddIcon from '../../../../../assets/svg/addIcon';
import FrameAddLifestyle from '../FrameItems/FrameAddLifestyle';


const FrameLifestyleCard = (props) => {
    console.log(props.cardInformation)
    
    const [addMode, setAddMode] = useState(false) 
    const [substances,setSubtances] =useState(props.cardInformation)
    
    const toggleAddOption = (value) => {
        setAddMode(value)
    } 

    const createSubstanceAddition = (substance) =>{
        let newLifeStyleItem={
            "amount": 10,
            "frequency": "",
            "name": substance,
            "patient": "5eb5b1d50e90f7c743439106",
            "startDate": "1999-04-03T05:00:00.000Z",
            "type": "5ebc43d9379d63d71a48053e",
            "unit": "",
            "usage": "to calm nerves", 
        }  
         let newSubstanceArray = substances.slice() 
         newSubstanceArray.push(newLifeStyleItem) 
         setSubtances(newSubstanceArray)

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
                {substances.map((categorieInformation, index) => {
                    return (
                        <View>
                            <Text style={styles.titleName}>{transformToSentence(categorieInformation.name)}</Text>
                            <FrameLifestyleContent cardInformation={categorieInformation} />
                        </View>
                    )
                })}
                {props.isEditMode ?

                    addMode ?
                       <FrameAddLifestyle
                        title="New Item"
                        buttonTitle = "Add"
                        selectMessage={"Select " + props.frameTitle + " type"} 
                        onCancel={() => { toggleAddOption(false) } } 
                        onAction={(substanceName)=>{ 
                            createSubstanceAddition(substanceName)
                            toggleAddOption(false)
                        }}
                       />
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
