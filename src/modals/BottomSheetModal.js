import React, { useContext, useRef, useState, useEffect, useCallback } from 'react';
import {
    View,
    TouchableWithoutFeedback,
    StyleSheet,
    Dimensions
} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { SuitesContext } from '../contexts/SuitesContext';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const BottomSheetModal = (props) => {
    const {
        modal: {
            closeModal,
            params
        }
    } = props;

    const [state] = useContext(SuitesContext);
    const dimensions = Dimensions.get('window');
    const scroll = useRef();
    const bottomSheetRef = useRef(null);

    const snapPoints = ['25%', '50%', '90%'];

    useEffect(() => {
        // Open modal on mount
        if (bottomSheetRef.current) {
            bottomSheetRef.current.expand();
        }
    }, []);

    const closeBottomSheet = () => {
        if (bottomSheetRef.current) {
            bottomSheetRef.current.close();
        }
    };

    const handleSheetChanges = useCallback((index) => {
        if (index === -1) {
            closeModal();
        }
    }, [closeModal]);

    const renderContent = () => {
        return (
            <View style={styles.contentContainer}>
                {params.content}
            </View>
        );
    };

    return (
        <KeyboardAwareScrollView
            ref={scroll}
            onKeyboardWillShow={() => scroll?.current?.scrollToPosition(0, 200)}
            extraScrollHeight={100}
        >
            <View style={[styles.modalContainer, { width: dimensions.width, height: state.pageMeasure.height }]}>
                <TouchableWithoutFeedback onPress={closeBottomSheet}>
                    <View style={styles.shadowContainer} />
                </TouchableWithoutFeedback>
                <BottomSheet
                    ref={bottomSheetRef}
                    index={0}
                    snapPoints={snapPoints}
                    onChange={handleSheetChanges}
                >
                    {renderContent()}
                </BottomSheet>
            </View>
        </KeyboardAwareScrollView>
    );
};

export default BottomSheetModal;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        alignItems: 'flex-end',
    },
    shadowContainer: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#000',
        opacity: 0.3,
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    bottomSheetContent: {
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14,
        minHeight: 150,
    },
    contentContainer: {
        height: '100%',
        width: '100%',
        backgroundColor: 'white',
    },
});
