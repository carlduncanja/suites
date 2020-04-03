import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Modal, TouchableHighlight } from "react-native";
import FrameProcedureCard from '../../../common/Frames/FrameCards/FrameProcedureCard';
import { SuitesContext } from '../../../../contexts/SuitesContext';
import PickListCard from '../../PickList/PickListCard';

const Details = ({tabDetails}) => {
    const [state] = useContext(SuitesContext)
    const [modalVisible, setModalVisible] = useState(false)
    const [selectedModalInformation, setSelectedModalInformation] = useState([])
    const [modalInformation, setModalInformation] = useState([])
    const [selectedTab,setSelectedTab] = useState("Consumables")

    const onOpenPickList = (details) =>{
        setModalVisible(true)
        setModalInformation(details)
        setSelectedModalInformation(details.consumables)
    }

    const setModalData = (currentPickData) => {
        currentPickData === "Equipment" ?
            setSelectedModalInformation(modalInformation.equipments)
            :
            setSelectedModalInformation(modalInformation.consumables)
        setSelectedTab(currentPickData)
    }

    const closeModal = () =>{setModalVisible(false)}

    const information = state.slideOverlay.slideOverlayTabInfo
    return ( 
        <ScrollView style={{flex:1}}>
            {tabDetails.map((item,index)=>{
                return(
                    <View key={index} style={styles.procedureContainer}>
                        <FrameProcedureCard information = {item} onOpenPickList={onOpenPickList}/>
                    </View>
                )
            })}
            {
            modalVisible &&
            <View style={[styles.pickListContainer,{}]}>
                <View style={{ height:450, width:500, backgroundColor:"#FFFFFF", alignSelf:'center',borderRadius:8 }}>
                    <PickListCard 
                        closeModal = {closeModal}
                        data = {selectedModalInformation}
                        onPressTab = {setModalData}
                        selectedTab = {selectedTab}
                    /> 
                </View>
                {/* <TouchableHighlight>
                    <View
                        pointerEvents={modalVisible ? 'auto' : 'none'}
                        style={[
                            styles.shadowContainer,
                            {
                                opacity: .5,
                            },
                        ]}
                    />
                    <Modal
                        animationType = "slide"
                        transparent = {true}
                        visible = {modalVisible}
                        onRequestClose = {()=>closeModal()}
                    >
                        <View style={{backgroundColor:'red', height:500, width:500, alignSelf:'center',justifyContent:'center'}}>
                            <PickListCard 
                                closeModal = {closeModal}
                            /> 
                        </View>
                        
                    </Modal>
                </TouchableHighlight> */}
            </View>
            }
        </ScrollView>
        
    );
}
 
export default Details;

const styles = StyleSheet.create({
    procedureContainer:{
        marginBottom:15
    },
    shadowContainer:{
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#000',
    },
    pickListContainer:{
        ...StyleSheet.absoluteFillObject,
        zIndex:5,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#000'
    }
})