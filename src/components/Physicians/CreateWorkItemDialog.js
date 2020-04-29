import React,{ useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import OverlayDialog from "../common/Dialog/OverlayDialog";
import DialogTabs from "../common/Dialog/DialogTabs";
import InputField2 from "../common/Input Fields/InputField2";
import DropdownInputField from "../common/Input Fields/DropdownInputField";
import DateInputField from "../common/Input Fields/DateInputField";

import { formatDate } from '../../utils/formatter'
import {useModal} from "react-native-modalfy";
import InputUnitField from "../common/Input Fields/InputUnitFields";

/**
 * Component to handle the create storage process.
 *
 * @param onCancel
 * @param onCreated
 * @param addWorkItem
 * @returns {*}
 * @constructor
 */

const CreateWorkItemDialogContainer = () =>{

    const modal = useModal();
    const dialogTabs = ['Details'];
    const selectedIndex = 0;

    const [fields, setFields] = useState({
        location : 'Operating Room 1',
        // date : formatDate(new Date(),"DD/MM/YYYY").toString()
    });


    const onFieldChange = (fieldName) => (value) => {
        // console.log("Value: ", typeof value )
        setFields({
            ...fields,
            [fieldName]: value
        })
    };

    return (
        <OverlayDialog
            title={"New Work Item"}
            onPositiveButtonPress={()=>{}}
            onClose={()=>{}}
            positiveText={"DONE"}
        >
            <View style = {styles.container}>
                <DialogTabs
                    tabs = {dialogTabs}
                    tab = {selectedIndex}
                />
                <View style={styles.sectionContainer}>

                    <View style={styles.row}>

                        <View style={styles.inputWrapper}>
                            <InputField2 
                                label={"Task"}
                                onChangeText={onFieldChange('task')}
                                value={fields['task']}
                                onClear={() => onFieldChange('task')('')}
                            />
                        </View>
                        <View style={[styles.inputWrapper]}>
                            <DropdownInputField 
                                label={"Location"}
                                onSelectChange={onFieldChange('location')}
                                value={fields['location']}
                                dropdownOptions = {["Operating Room 1","Operating Room 2", "Operating Room 3", "Operating Room 4", "Operating Room 5"]}
                            />
                        </View>

                    </View>

                    <View style={styles.row}>
                        <View style={styles.inputWrapper}>
                            <DropdownInputField 
                                label={"Case"}
                                onSelectChange={onFieldChange('case')}
                                value={fields['case']}
                                dropdownOptions = {["Case 1","Case 2", "Case 3", "Case 4", "Case 5"]}
                            />
                        </View>

                        <View style={styles.inputWrapper}>
                            <InputField2 
                                label={"Date"}
                                onChangeText={(value) => {
                                    if (/^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}/g.test(value) || !value) {
                                        onFieldChange('date')(value)
                                    }}
                                }
                                value={fields['date']}
                                onClear={() => onFieldChange('date')('')}
                                placeholder = {"DD/MM/YYYY"}
                            />
                        </View>
                        
                    </View>
                
                    <View style={[styles.row]}>

                        <View style={styles.inputWrapper}>
                            <InputUnitField 
                                label={"Start"}
                                onChangeText={onFieldChange('startTime')}
                                value={fields['startTime']}
                                units = {['AM','PM']}
                                // onClear={() => onFieldChange('startTime')('')}
                            />
                        </View>
                        <View style={styles.inputWrapper}>
                            <InputUnitField 
                                label={"End"}
                                onChangeText={onFieldChange('endTime')}
                                value={fields['endTime']}
                                units = {['AM','PM']}
                                // onClear={() => onFieldChange('startTime')('')}
                            />
                        </View>

                    </View>

                </View>
            </View>
        </OverlayDialog>
    )
}

CreateWorkItemDialogContainer.propTypes = {}
CreateWorkItemDialogContainer.defaultProps = {}

export default CreateWorkItemDialogContainer

const styles = StyleSheet.create({
    container:{
        flex: 1,
        width: 636,
        flexDirection: 'column',
        backgroundColor: 'white',
    },
    sectionContainer: {
        height: 190,
        backgroundColor: '#FFFFFF',
        flexDirection: 'column',
        padding: 24,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    inputWrapper: {
        width: 260,
        flexDirection: 'row',
    }
})

