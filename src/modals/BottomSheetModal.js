import React, {useContext, useRef, useState, useEffect} from 'react';
import {
    View,
    TouchableWithoutFeedback,
    StyleSheet,
    Dimensions
} from "react-native";
import Animated from 'react-native-reanimated'
import {SuitesContext} from '../contexts/SuitesContext';
import BottomSheet from 'reanimated-bottom-sheet'

const BottomSheetModal = (props) => {
    const [state] = useContext(SuitesContext);

    const bottomSheetRef = useRef();
    const [fall] = useState(new Animated.Value(1));
    const initialSnap = 2;

    const {modal: {closeModal, closeModals, currentModal, closeAllModals, params}} = props;

    useEffect(() => {
        if (bottomSheetRef) bottomSheetRef.current.snapTo(0);
    }, []);

    const getSnapPoints = () => {
        // return [ dimensions.height || 500 * .5,  0]
        const {height} = Dimensions.get("window");
        return [height - 100, height - 200, 0]
    };

    const closeBottomSheet = () => {
        bottomSheetRef.current.snapTo(initialSnap);
    };

    const onCloseEnd = () => {
        console.log("on close end");
        closeModal()
    };

    const onOpenEnd = () => {

    };

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

    const renderShadow = () => {
        const animatedShadowOpacity = fall.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0.7, 0.5, 0]
        });

        return (
            <TouchableWithoutFeedback
                onPress={closeBottomSheet}
            >
                <Animated.View
                    pointerEvents={'auto'}
                    style={[
                        styles.shadowContainer,
                        {
                            opacity: animatedShadowOpacity,
                        },
                    ]}
                />
            </TouchableWithoutFeedback>
        )
    };

    return (
        <View style={{width: state.pageMeasure.width, height: state.pageMeasure.height}}>
            {renderShadow()}
            <BottomSheet
                ref={bottomSheetRef}
                snapPoints={getSnapPoints()}
                initialSnap={initialSnap}
                callbackNode={fall}
                borderRadius={14}
                renderContent={renderContent()}
                onCloseEnd={onCloseEnd}
                onOpenEnd={onOpenEnd}
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
};

export default BottomSheetModal;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: '#000',
        opacity: 0.3
        // alignItems:"flex-end",
        // justifyContent:'flex-end',

    },
    shadowContainer: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#000',
    }

});
