import React, { useContext, useRef, useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Animated, Button, TouchableWithoutFeedback, Dimensions } from "react-native";
import { SuitesContext } from '../contexts/SuitesContext';
import { withModal } from 'react-native-modalfy';
import BottomSheet from 'reanimated-bottom-sheet'
import SlideOverlay from '../components/common/SlideOverlay/SlideOverlay'; 

const BottomSheetModal = (props) => {
    const [state] = useContext(SuitesContext)

    const bottomSheetRef = useRef();
    const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
    const [fall] = useState(new Animated.Value(1));
    const initialSnap = 2

    const { modal: {closeModal, closeModals, currentModal, closeAllModals, params }} = props

    useEffect(()=>{
        // setTimeout(()=>{
            if (bottomSheetRef) bottomSheetRef.current.snapTo(0);
        // },500)
    },[])

    const getSnapPoints = () => {
        // return [ dimensions.height || 500 * .5,  0]
        const {height} = Dimensions.get("window")
        return [height - 100 ,height-200, 0]
    };

    const handleClose = () => {
        bottomSheetRef.current.snapTo(initialSnap);
        setTimeout(()=>{
            closeAllModals(currentModal)
        },500)
    }

    const renderContent = () => () => {
        return <View style={{
            height: '100%',
            width: '100%',
            backgroundColor: 'white',
            zIndex: 5
        }}>
            {params.content}
            {/* <SlideOverlay 
                overlayContent = {params.content}
                overlayId = {params.overlayId}
                overlayTitle = {params.overlayTitle}
                initialCurrentTabs = {params.initialCurrentTabs}
                initialSelectedTab = {params.initialSelectedTab}
                onTabPressChange = {params.controlTabChange}
            /> */}
        </View>
    }; 

    const renderShadow = () =>{
        const animatedShadowOpacity = fall.interpolate({
            inputRange : [0,0.5,1],
            outputRange : [1,0.3,0.5]
        })

        return (
            <TouchableWithoutFeedback
                onPress={() => {handleClose()}}
            >
                <Animated.View
                    pointerEvents={isBottomSheetVisible ? 'auto' : 'none'}
                    style={[
                        styles.shadowContainer,
                        {
                            opacity: animatedShadowOpacity,
                            
                        },
                    ]}
                />
            </TouchableWithoutFeedback>
        )
    }

    return ( 
        <View style={{width:state.pageMeasure.width, height: state.pageMeasure.height}}>

            {renderShadow()}
            
            <BottomSheet
                ref={bottomSheetRef}
                snapPoints={getSnapPoints()}
                initialSnap={initialSnap}
                callbackNode={fall}
                borderRadius={14}
                renderContent={renderContent()}
                onCloseEnd={() => setBottomSheetVisible(false)}
                onOpenEnd={() => setBottomSheetVisible(true)}
                renderHeader={() =>
                    <View
                        style={{
                            height: 8,
                            alignSelf: 'center',
                            width: 50,
                            backgroundColor: 'white',
                            borderRadius: 4,
                            marginBottom: 14
                        }}
                    />
                }
            />
        </View>
            
    );
}
 
export default BottomSheetModal ;

const styles = StyleSheet.create({
    modalContainer:{
        flex:1,
        backgroundColor:'#000',
        opacity:0.3
        // alignItems:"flex-end",
        // justifyContent:'flex-end',

    },
    shadowContainer:{
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#000',
    }
    
})