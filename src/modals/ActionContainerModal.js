import React, {useContext} from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Dimensions} from "react-native";
import {SuitesContext} from '../contexts/SuitesContext';
import ActionContainer from '../components/common/FloatingAction/ActionContainer';
import {withModal} from 'react-native-modalfy';
import {CaseFileContext} from '../contexts/CaseFileContext';
import {appActions} from '../redux/reducers/suitesAppReducer';
import KeyboardShift from "../components/KeyboardShift";
import {emptyFn} from "../const";

const ActionContainerModal = (props) => {
    const [state, dispatch] = useContext(SuitesContext);
    const dimensions = Dimensions.get("window");


    const {
        modal: {
            closeModal,
            closeModals,
            currentModal,
            getParams
        }
    } = props;

    const params = getParams({
        actions: <View/>,
        onClose: emptyFn,
        position : 'right'
    });

    console.log(params);

    const {actions, onClose, position = 'right'} = getParams({
        actions: <View/>,
        onClose: emptyFn,
        position:'right'
    });

    return (
        <View style={[{width: dimensions.width, height: state.pageMeasure.height}]}>
            <TouchableOpacity
                onPress={() => {
                    closeModals(currentModal);
                    if (onClose) onClose()
                }}
                activeOpacity={1}
                style={styles.modalContainer}
            />
            <View style={[styles.positionContainer,
                {right : position === 'right' ? 40 : null, left : position === 'left' ? 120 : null}
                ]}>
                {
                    actions
                }
            </View>
        </View>
    );
};

export default ActionContainerModal;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.3)",
        alignItems: "flex-end",
        justifyContent: 'flex-end',
    },
    positionContainer: {
        position: 'absolute',
        bottom: 80,
    }
})
