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
import SearchableOptionsField from "../../Input Fields/SearchableOptionsField";
import styled from "@emotion/native";
import _ from "lodash";
import {useTheme} from "emotion-theming";
import DateInputField2 from "../../InputFields/DateInputField2";
import InputUnitField from "../../Input Fields/InputUnitFields";
import OptionsField from "../../Input Fields/OptionsField";
import {MenuOption, MenuOptions} from "react-native-popup-menu";
import TextButton from "../../Buttons/TextButton";


const RowWrapper = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: ${({theme}) => theme.space['--space-16']};
`


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

    const theme = useTheme();
    const [hasRecovery, setRecovery] = useState(!!recoveryAppointment);

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

                <RowWrapper theme={theme}>
                    <OptionsField
                        label={"Recovery"}
                        enabled={isEdit}
                        text={hasRecovery ? 'Yes' : 'No'}
                        oneOptionsSelected={(value) => {
                            setRecovery(value)
                        }}
                        menuOption={<MenuOptions>
                            <MenuOption value={true} text='Yes'/>
                            <MenuOption value={false} text='No'/>
                        </MenuOptions>}
                    />

                    <View style={{width: 20}}/>
                    <View style={{flex: 1}}/>

                </RowWrapper>
                {
                    // recoveryAppointment &&
                    // <AppointmentView isEdit={isEdit} appointment={recoveryAppointment}/>
                }

            </View>
            <View style={{flexDirection: "row", justifyContent: "flex-end", marginTop: 10}}>

                {
                    isEdit && isUpdated &&
                    <View style={{padding: 8, marginRight: 8, height: 30}}>
                        <TextButton
                            title="Save"
                            buttonPress={onSavePress}
                        />
                    </View>
                }

                <View style={{padding: 8, height: 30}}>
                    <TextButton
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
    const theme = useTheme();
    const {duration = {}, location, startTime} = fields;
    const {name = ""} = location || {}

    const onDurationUpdated = (duration) => {
        // validate num
        if (isNaN(+duration)) return;

        onFieldsUpdated({
            ...fields,
            duration,
        })
    }

    const onStartTimeUpdated = (date) => {
        const newStartTime = moment(date)
        onFieldsUpdated({
            ...fields,
            startTime: newStartTime.toDate(),
        })
    }

    const onLocationFieldUpdated = (location) => {
        onFieldsUpdated({
            ...fields,
            location
        })
    }

    const [searchLocationValue, setSearchLocationValue] = useState("");
    const [searchLocationResult, setSearchLocationResult] = useState([]);
    const [searchLocationQuery, setSearchLocationQuery] = useState({});

    useEffect(() => {

        console.log('search location change', searchLocationValue)

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
                const {data = [], pages} = locationsInfo;
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

        setSearchLocationValue("");

        setSearchLocationResult([]);
        setSearchLocationQuery({});

        onLocationFieldUpdated(location);
    };

    return (
        <View>
            <RowWrapper theme={theme} style={{zIndex: 2}}>
                <SearchableOptionsField
                    title="Location"
                    selectable={true}
                    enabled={isEdit}
                    label="Location"
                    value={location}
                    text={searchLocationValue}
                    oneOptionsSelected={handleLocationChange}
                    onChangeText={(value) => {
                        setSearchLocationValue(value)
                    }}
                    onClear={handleLocationChange}
                    options={searchLocationResult}
                />

                <View style={{width: 24}}/>

                <View style={{flex: 1}}>

                    <DateInputField
                        enabled={isEdit}
                        label="Date"
                        value={moment(startTime).toDate()}
                        format={"MMM/DD/YYYY"}
                        mode={"date"}
                        onDateChange={onStartTimeUpdated}
                        placeholder="MMM/D/YYYY"
                    />

                    {/*    EDIT DATE    */}

                </View>

            </RowWrapper>

            <RowWrapper theme={theme}>
                <View style={{flex: 1}}>

                    <DateInputField
                        enabled={isEdit}
                        label="Time"
                        value={moment(startTime).toDate()}
                        format={"h:mm A"}
                        mode={"time"}
                        onDateChange={onStartTimeUpdated}
                        placeholder="HH:MM"
                    />

                    {/*    EDIT TIME    */}

                </View>

                <View style={{width: 24}}/>

                <View style={{flex: 1}}>

                    <InputUnitField
                        label={"Duration"}
                        onChangeText={onDurationUpdated}
                        value={duration}
                        enabled={isEdit}
                        units={['hrs']}
                        keyboardType="number-pad"
                        errorMessage="Input estimated time (hours)."
                    />
                </View>

            </RowWrapper>
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


