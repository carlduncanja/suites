import React, {useContext} from 'react';
import {View, StyleSheet, TouchableOpacity, Dimensions} from "react-native";
import {SuitesContext} from '../contexts/SuitesContext';
import Overlay from '../components/common/Overlay/Overlay';
import {withModal} from 'react-native-modalfy'
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

const OverlayModal = (props) => {
    const [state] = useContext(SuitesContext);
    const dimensions = Dimensions.get("window");


    const {
        modal: {
            closeModal,
            closeModals,
            currentModal,
            closeAllModals,
            params
        }
    } = props;


    const {
        content = <View/>,
        onClose = () => {
        }
    } = params;


    return (
        <KeyboardAwareScrollView style={{backgroundColor: "rgba(0,0,0,0.3)"}}>
            <View style={[{width: dimensions.width, height: state.pageMeasure.height}]}>
                <TouchableOpacity
                    onPress={() => {
                        closeModals(currentModal);
                        onClose();
                    }}
                    activeOpacity={1}
                    style={[styles.modalContainer]}
                />
                <View style={styles.positionContainer}>
                    {/* <Overlay/> */}
                    {content}
                </View>
            </View>
        </KeyboardAwareScrollView>
    );
};

export default OverlayModal;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        alignItems: "flex-end",
        justifyContent: 'flex-end',
    },
    positionContainer: {
        position: 'absolute',
        bottom: 80,
        right: 26
    }
});
