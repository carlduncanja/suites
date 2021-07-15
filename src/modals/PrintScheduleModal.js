import React, {useContext} from 'react';
import {View, StyleSheet, TouchableOpacity, Dimensions, Easing, Text} from "react-native";
import {SuitesContext} from '../contexts/SuitesContext';
import ReportPreview from '../components/CaseFiles/Reports/ReportPreview';
import {withModal} from 'react-native-modalfy';
import {SimpleAnimation} from 'react-native-simple-animations';
import SvgIcon from '../../assets/SvgIcon'

const {width} = Dimensions.get("window");

const PrintScheduleModal = (props) => {

    const {
        modal: {
            closeModals, currentModal, params: {
                content, onClose = () => {
                }
            }
        }
    } = props

    let closePreview = () => {
        closeModals(currentModal);
        onClose();
    }


    return (
        <SimpleAnimation duration={2000} direction="left" fade={false} delay={1000} movementType="slide"
                         easing={Easing.ease}>
            <View style={{flex: 1, width: width}}>
                {content}
            </View>
            <TouchableOpacity style={styles.button}
                              onPress={() => closePreview()}
                              activeOpacity={1}
            >
                <Text style={[styles.buttonText, {marginRight: 10}]}>Close Preview</Text>
                <SvgIcon iconName="exit" strokeColor="#FFFFFF"/>
            </TouchableOpacity>

        </SimpleAnimation>
    );
}

export default PrintScheduleModal;

const styles = StyleSheet.create({
    modalContainer: {
        //flex:1,
        backgroundColor: 'yellow',
        alignItems: "flex-end",
        justifyContent: 'flex-end',
    },
    positionContainer: {},
    button: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        alignSelf: "center",
        backgroundColor: '#4E5664',
        borderRadius: 29,
        padding: 8,
        paddingLeft: 12,
        paddingRight: 12,
        position: 'absolute',
        bottom: 15,
        flexDirection: 'row'
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16
    },
})
