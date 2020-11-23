import React, { useContext, useRef } from "react";
import { View, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { SuitesContext } from "../contexts/SuitesContext";

const ConfirmationModal = (props) => {
    const [state] = useContext(SuitesContext);
    const dimensions = Dimensions.get("window");

    const {
        modal: { closeModal, closeModals, currentModal, closeAllModals, params },
    } = props;

    const { content = <View />, onClose = () => { } } = params;
    const scroll = useRef();

    return (
        <View
            style={[{ width: state.pageMeasure.width, height: state.pageMeasure.height }]}
        >
            <TouchableOpacity
                onPress={() => {
                    closeModals(currentModal);
                    onClose();
                }}
                
                activeOpacity={1}
                style={[styles.modalContainer]}
            />
            <View style={styles.positionContainer}>{content}</View>
        </View>
    );
};

export default ConfirmationModal;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.3)",

    },
    positionContainer: {

        // height: 250,
        // position: "absolute",
        // bottom: 490,
        // left: 155,

        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center'


    },
});
