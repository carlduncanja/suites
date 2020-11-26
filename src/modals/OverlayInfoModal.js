import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity ,TouchableWithoutFeedback} from "react-native";
import { SuitesContext } from '../contexts/SuitesContext';
import PickListCard from '../components/CaseFiles/PickList/PickListCard';

const OverlayInfoModal = (props) => {
    const [state] = useContext(SuitesContext)
    const [isPickListVisible, setIsPickListVisible] = useState(true)
    const { modal: {closeModal, closeModals, currentModal, closeAllModals, params }} = props

    const closePickListModal = () =>{
        closeModals(currentModal);
    }

    const renderShadow = () => {
        return (
            <TouchableWithoutFeedback
                onPress={() => {
                    closePickListModal();
                    setIsPickListVisible(false);
                }}
            >
                <View
                    pointerEvents={isPickListVisible ? 'auto' : 'none'}
                    style={[
                        styles.shadowContainer,
                        // {
                        //     opacity: animatedShadowOpacity,
                        // },
                    ]}
                />
            </TouchableWithoutFeedback>
        )
    };

    return ( 
        <View style={[styles.container,{width:state.pageMeasure.width, height: state.pageMeasure.height}]}>
            {renderShadow()}
            <View style={{
                display: 'flex',
                // height:600, 
                // width:600, 
                alignItems:'center',
                justifyContent:'center', 
                }}
            >
                {params.overlayContent}
            </View>
        </View> 
    );
}
 
export default OverlayInfoModal;

const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        justifyContent:'center',
        // backgroundColor:'yellow'
    },
    modalContainer:{
        flex:1,
        alignItems:"center",
        justifyContent:'center',
        backgroundColor:"rgba(0,0,0,0.3)",
    },
    shadowContainer: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#000',
        opacity: 0.3
    },
    
    positionContainer:{
        // position:'absolute',
        // flex:1,
        width:400,
        height:500,
        // alignSelf:'center',
        // justifyContent:'center',
        // backgroundColor:'green'
        // bottom:80,
        // right:40
    }
})