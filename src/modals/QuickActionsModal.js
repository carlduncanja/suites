import React, {useContext} from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Dimensions, TouchableWithoutFeedback} from "react-native";
import {SuitesContext} from '../contexts/SuitesContext';
import ActionContainer from '../components/common/FloatingAction/ActionContainer';
import * as Animatable from 'react-native-animatable';
import ActionItem from "../components/common/ActionItem";
import {useNavigation} from '@react-navigation/native';
import AddIcon from "../../assets/svg/addIcon";


const QuickActionsModal = (props) => {
    const dimensions = Dimensions.get("window");

    const {
        modal: {
            closeModal,
            closeModals,
            currentModal,
            getParams
        }
    } = props;

    const navigation = useNavigation();

    const actionConfigs = {
        schedule: {},
        caseFile: {
            key: 'create',
            title: 'Create Case File',
            performAction: () => navigation.navigate('Case Files', {screen: 'CreateCase', initial: false})
        },
        theatre: {},
        inventory: {},
        equipment: {},
        order: {},
        supplier: {},
        invoice: {},
        storage: {},
        physician: {},
        procedure: {},
        alert: {},
        help: {},
        settings: {}
    }

    const isQuickActionPermitted = action => {
        // todo: check permission level of currently logged in user to see if quick action can be authorized
    }

    const getActions = () => {
        let actions = [];
        Object.keys(actionConfigs).map(sectionConfig => {
            if (actionConfigs[sectionConfig].key) {
                const actionConfig = actionConfigs[sectionConfig];
                const quickAction = <ActionItem
                    key={actionConfig.key}
                    icon={<AddIcon/>}
                    title={actionConfig.title}
                    onPress={() => {
                        closeModals(currentModal)
                        actionConfig.performAction();
                    }}/>
                actions.push(quickAction)
            }
        })

        return actions;

        // const createCaseAction = <ActionItem key={"create"} icon={<AddIcon/>} title={"Create Case File"} onPress={() => {
        //     closeModals(currentModal);
        //     navigation.navigate("Case Files", {screen: "CreateCase", initial: false})
        // }}/>
        //
        // return [createCaseAction]
    }


    return (
        <View style={[{width: dimensions.width, height: dimensions.height}]}>
            <TouchableWithoutFeedback
                onPress={() => {
                    closeModals(currentModal);
                }}
            >
                <View style={styles.modalContainer}>

                    <Animatable.View animation={"zoomIn"} duration={400}>
                        <ActionContainer
                            title={"QUICK ACTIONS"}
                            floatingActions={[getActions()]}
                        />
                    </Animatable.View>

                </View>
            </TouchableWithoutFeedback>
        </View>
    );
};

export default QuickActionsModal;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.3)",
        alignItems: "center",
        justifyContent: 'center',
        // ...StyleSheet.absoluteFillObject,
    },
    actionContainer: {
        backgroundColor: 'white',
        minWidth: 219,
        borderRadius: 8,
    }
})
