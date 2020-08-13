import React, {Component, useEffect, useState} from 'react';
import {View, Text, StyleSheet, Modal, TextInput} from 'react-native';
import FrameTableItem from '../FrameItems/FrameTableItem';
import FrameCheckboxItem from '../FrameItems/FrameCheckboxItem';
import moment from "moment";
import Button from '../../Buttons/Button';
import {withModal} from 'react-native-modalfy';
import {formatDate} from '../../../../utils/formatter';
import {Input} from "react-native-elements";
import InputField from "../../Input Fields/InputField";
import InputField2 from "../../Input Fields/InputField2";
import InputFrameItem from "../FrameItems/InputFrameItem";
import DateInput from "../../Input Fields/DateInput";
import DateInputField from "../../Input Fields/DateInputField";
import FrameTableDateItem from "../FrameItems/FrameTableDateItem";


/**
 *
 * @param isEdit
 * @param appointmentField
 * @param onAppointmentUpdate
 * @return {*}
 * @constructor
 */
const AppointmentFields = ({isEdit, fields, onFieldsUpdated}) => {
    const {duration, location, startTime} = fields;
    const {name = ""} = location

    const onDurationUpdated = (duration) => {
        // validate num
        if (isNaN(+duration)) return;

        onFieldsUpdated({
            ...fields,
            duration,
        })
    }

    const onStartTimeUpdated = (_, date) => {
        const newStartTime = moment(date)

        onFieldsUpdated({
            ...fields,
            startTime: newStartTime.toDate(),
        })
    }

    return (
        <View>

            <FrameTableItem title="Location" value={name}/>

            <View style={styles.dateContainer}>
                <View style={{flex: 1}}>

                    <FrameTableDateItem
                        enabled={isEdit}
                        title="Date"
                        onDateChange={() => {
                        }}
                        value={moment(startTime).toDate()}
                        format={"MMM/DD/YYYY"}
                        mode={"date"}
                        handleOnDateChange={onStartTimeUpdated}
                        placeholder="MMM/D/YYYY"
                    />

                    {/*    EDIT DATE    */}

                </View>
                <View style={{width: 120}}>

                    <FrameTableDateItem
                        enabled={isEdit}
                        title=""
                        onDateChange={() => {
                        }}
                        value={moment(startTime).toDate()}
                        format={"h:mm A"}
                        mode={"time"}
                        handleOnDateChange={onStartTimeUpdated}
                        placeholder="HH:MM"
                    />

                    {/*    EDIT TIME    */}

                </View>
                <View style={{flex: 1}}>
                    <FrameTableItem
                        selectable={false}
                        enabled={isEdit}
                        editable={isEdit}
                        title="Duration"
                        value={duration || ""}
                        onChangeValue={onDurationUpdated}
                    />
                </View>
            </View>
        </View>
    )
}

const getAppointmentDurations = ({startTime, endTime}) => moment.duration(moment(endTime).diff(moment(startTime))).asHours()

const getAppointmentFields = ({location, startTime, endTime}) => {
    return {
        location,
        startTime,
        duration: getAppointmentDurations({startTime, endTime})
    }
}

const FrameProcedureContent = ({details, onOpenPickList, isEdit}) => {
    const {appointment, procedure, recovery} = details
    const recoveryAppointment = recovery?.appointment || false

    const [appointmentFields, setAppointmentFields] = useState(getAppointmentFields(appointment));

    const onAppointmentFieldsUpdate = (data) => setAppointmentFields(data)

    return (
        <View style={styles.container}>
            <View style={{paddingBottom: 10, borderBottomColor: "#CCD6E0", borderBottomWidth: 1}}>

                {
                    <AppointmentFields
                        isEdit={isEdit}
                        fields={appointmentFields}
                        onFieldsUpdated={onAppointmentFieldsUpdate}
                    />
                }
                <View style={styles.recovery}>
                    <FrameCheckboxItem title="Recovery" status={!!recoveryAppointment}/>
                </View>
                {
                    // recoveryAppointment &&
                    // <AppointmentView isEdit={isEdit} appointment={recoveryAppointment}/>
                }

            </View>
            <View style={{flexDirection: "row", justifyContent: "flex-end", marginTop: 10}}>

                {
                    isEdit &&
                    <View style={{marginRight: 8, padding: 8, borderRadius: 8, backgroundColor: "#E3E8EF", height: 30}}>
                        <Button
                            backgroundColor="#E3E8EF"
                            color="#718096"
                            title="Save"
                            buttonPress={() => {
                            }}
                        />
                    </View>
                }

                <View style={{padding: 8, borderRadius: 8, backgroundColor: "#E3E8EF", height: 30}}>
                    <Button
                        backgroundColor="#E3E8EF"
                        color="#718096"
                        title="View Picklist"
                        buttonPress={() => onOpenPickList(procedure)}
                    />
                </View>
            </View>
        </View>
    );
}

export default FrameProcedureContent;

const styles = StyleSheet.create({
    container: {
        padding: 16,
        borderWidth: 1,
        borderColor: '#CCD6E0',
        borderTopWidth: 0,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8
    },
    dateContainer: {
        flexDirection: 'row'
    },
})


