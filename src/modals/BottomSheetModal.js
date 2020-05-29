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
    const {
        modal: {
            closeModal,
            closeModals,
            currentModal,
            closeAllModals,
            params
        }
    } = props;

    const [state] = useContext(SuitesContext);
    const dimensions = Dimensions.get("window");

    const bottomSheetRef = useRef();
    const [fall] = useState(new Animated.Value(1));

    const initialSnap = params.initialSnap || 2;
    const snapPoints = params.snapPoints || [dimensions.height - 100, dimensions.height - 200, 0];


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
            zIndex: 2
        }}>
            {params.content}
        </View>
    };

    const renderShadow = () => {
        const animatedShadowOpacity = fall.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0.3, 0.2, 0]
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
        <View style={[styles.modalContainer, {width: dimensions.width, height: state.pageMeasure.height}]}>
            {renderShadow()}

            <View style={[
                styles.bottomSheetContainer,
                {
                    flex: 1,
                    width: state.pageMeasure.width,
                }
            ]}>
                <TouchableWithoutFeedback onPress={closeBottomSheet}>
                    <View style={{...StyleSheet.absoluteFillObject,}}/>
                </TouchableWithoutFeedback>

                <BottomSheet
                    pointerEvents={'none'}
                    ref={bottomSheetRef}
                    snapPoints={snapPoints}
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
        </View>
    );
};

export default BottomSheetModal;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        alignItems: "flex-end",
        // justifyContent:'flex-end',
    },
    shadowContainer: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#000',
        // flex: 1
        width: '100%',
        height: '100%'
    },
    bottomSheetContainer: {
        alignItems: 'flex-end'
    }

});
