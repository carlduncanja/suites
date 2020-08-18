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
import DateInputField from "../../Input Fields/DateInputField";
import FrameTableDateItem from "../FrameItems/FrameTableDateItem";
import {getTheatres, updateCaseProcedureAppointmentCall} from "../../../../api/network";
import LoadingComponent from "../../../LoadingComponent";
// import OptionSearchableField from "../../InputFields/OptionSearchableField";
import SearchableOptionsField from "../../Input Fields/SearchableOptionsField";
import FrameTableSearchableItem from "../FrameItems/FrameTableSearchableItem";
import _ from "lodash";


const getAppointmentFields = ({location, startTime, endTime}) => {
    return {
        location,
        startTime,
        duration: getAppointmentDurations({startTime, endTime})
    }
}

const FrameProcedureContent = ({
                                   isEdit,
                                   isUpdated,
                                   isUpdating,
                                   procedure,
                                   appointmentFields,
                                   recoveryAppointment,
                                   onSavePress,
                                   onOpenPickList,
                                   onAppointmentFieldsUpdate,
                               }) => {

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
                    isEdit && isUpdated &&
                    <View style={{marginRight: 8, padding: 8, borderRadius: 8, backgroundColor: "#E3E8EF", height: 30}}>
                        <Button
                            backgroundColor="#E3E8EF"
                            color="#718096"
                            title="Save"
                            buttonPress={onSavePress}
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


/**
 *
 * @param isEdit
 * @param appointmentField
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

    const [searchLocationValue, setSearchLocationValue] = useState(location);
    const [searchLocationResult, setSearchLocationResult] = useState([]);
    const [searchLocationQuery, setSearchLocationQuery] = useState({});

    useEffect(() => {
        if (!searchLocationValue) {
            // empty search values and cancel any out going request.
            setSearchLocationResult([]);
            if (searchLocationQuery.cancel) searchLocationQuery.cancel();
            return;
        }

        // wait 300ms before search. cancel any prev request before executing current.

        const search = _.debounce(fetchLocations, 300);

        setSearchLocationQuery((prevSearch) => {
            if (prevSearch && prevSearch.cancel) {
                prevSearch.cancel();
            }
            return search;
        });

        search();
    }, [searchLocationValue]);

    const fetchLocations = () => {
        getTheatres(searchLocationValue, 5)
            .then((locationsInfo) => {
                const { data = [], pages } = locationsInfo;
                setSearchLocationResult(data || []);
            })
            .catch((error) => {
                // TODO handle error
                console.log("failed to get procedures");
                setSearchLocationResult([]);
            });
    };

    const handleLocationChange = (value) => {
        const location = value
            ? {
                _id: value._id,
                name: value.name,
            }
            : value;

        setSearchLocationValue(location);

        setSearchLocationResult([]);
        setSearchLocationQuery(undefined);
    };

    return (
        <View>
            <View style={{zIndex: 2}}>
                <FrameTableSearchableItem
                    title="Location"
                    selectable={true}
                    enabled={isEdit}
                    onChangeValue={handleLocationChange}
                    label="Location"
                    value={searchLocationValue}
                    text={searchLocationQuery}
                    oneOptionsSelected={handleLocationChange}
                    onChangeText={(value) => setSearchLocationQuery(value)}
                    onClear={handleLocationChange}
                    options={searchLocationResult}
                />
            </View>

            <View style={styles.dateContainer}>
                <View style={{flex: 1}}>

                    <FrameTableDateItem
                        enabled={isEdit}
                        title="Date"
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


const styles = StyleSheet.create({
    container: {
        position: 'relative',
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


