import React,{ useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import InputField2 from "../../common/Input Fields/InputField2";
import SearchableOptionsField from "../../common/Input Fields/SearchableOptionsField";
import DateInputField from "../../common/Input Fields/DateInputField";
import DateInputField2 from "../../common/Input Fields/DateInputField2";
import MultipleSelectionsField from "../../common/Input Fields/MultipleSelectionsField";
import _ from "lodash";
import {getProcedures, getTheatres} from "../../../api/network";
import moment, { min } from 'moment';
import { formatDate } from "../../../utils/formatter";

import { MenuOptions, MenuOption } from 'react-native-popup-menu';
import DateInput from "../../common/Input Fields/DateInput";
import TimePickerField from "../../common/Input Fields/TimePicker";

const ProcedureTab2 = ({onFieldChange, fields}) =>{

    const [procedureValues ,setProcedureValues] = useState({
        procedure : '',
        startTime : '',
        endTime : '', 
        location : '',
    })

    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const [date, setDate] = useState('')

    const [momentDate, setMomentDate] = useState('')

    const [searchProcedureValue, setSearchProcedureValue] = useState('') 
    const [searchProcedureResult, setSearchProcedureResult] = useState([])
    const [searchProcedureQuery, setSearchProcedureQuery] = useState({})

    const [searchLocationValue, setSearchLocationValue] = useState('')
    const [searchLocationResult, setSearchLocationResult] = useState([])
    const [searchLocationQuery, setSearchLocationQuery] = useState({})

    useEffect(()=>{
        if (!searchProcedureValue) {
            // empty search values and cancel any out going request.
            setSearchProcedureResult([]);
            if (searchProcedureQuery.cancel) searchProcedureQuery.cancel();
            return;
        }

        // wait 300ms before search. cancel any prev request before executing current.

        const search = _.debounce(fetchProcedures, 300);

        setSearchProcedureQuery(prevSearch => {
            if (prevSearch.cancel) {
                prevSearch.cancel();
            }
            return search;
        });

        search()

    },[searchProcedureValue])

    useEffect(()=>{
        if (!searchLocationValue) {
            // empty search values and cancel any out going request.
            setSearchLocationResult([]);
            if (searchLocationQuery.cancel) searchLocationQuery.cancel();
            return;
        }

        // wait 300ms before search. cancel any prev request before executing current.

        const search = _.debounce(fetchLocations, 300);

        setSearchLocationQuery(prevSearch => {
            if (prevSearch.cancel) {
                prevSearch.cancel();
            }
            return search;
        });

        search()
        
    },[searchLocationValue])

    const fetchProcedures = () => {

        getProcedures(searchProcedureValue, 5)
            .then((data = []) => {
                // console.log("Dta: ", data)
                // const results = data.map(item => ({
                //     name: `Dr. ${item.surname}`,
                //     ...item
                // }));
                setSearchProcedureResult(data || []);

            })
            .catch(error => {
                // TODO handle error
                console.log("failed to get procedures");
                setSearchProcedureResult([]);
            })
    };

    const fetchLocations = () => {
        getTheatres(searchLocationValue, 5)
        .then((data = []) => {
            // const results = data.map(item => ({
            //     name: `Dr. ${item.surname}`,
            //     ...item
            // }));
            setSearchLocationResult(data || []);

        })
        .catch(error => {
            // TODO handle error
            console.log("failed to get procedures");
            setSearchLocationResult([]);
        })
        
    }

    const handleProcedure = (fieldName) => (value) => {
        console.log("Field: ", fieldName, value);
        (fieldName === 'procedure' || fieldName === 'location') ? value = value._id : value = value
        setProcedureValues({
            ...procedureValues,
            [fieldName] : value
        })
    }

    const onConfirm = (field) => (hour, minute) => {
        console.log("Confirm:", momentDate, hour, minute)
        let date = momentDate !== "" ? moment(momentDate + ' ' + `${hour-5}:${minute}`) : moment(new Date() + ' ' + `${hour-5}:${minute}`)
        console.log("Date:", date)
        // if(momentDate !== ""){
        //     let startDate = moment(momentDate + ' ' + `${hour-5}:${minute}`)
        //     // let startDate = moment(momentDate + ' ' + `${hour}:${minute}`,'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm')
        // }
        field === 'startTime' ? setStartTime(`${hour}:${minute}`) : setEndTime(`${hour}:${minute}`)
        setProcedureValues({
            ...procedureValues,
            [field] : date
        })
        onFieldChange({
            ...procedureValues,
            [field] : date
        })
    }

    const handleDate = (date) => {
        let dateInstance = new Date(moment(date).toISOString());
        let dateRegex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}/g
        if ((dateRegex.test(date) && dateInstance instanceof Date) || !date) {
            setMomentDate(date)
        }
        setDate(date)
    }

    return (

        <View style={styles.sectionContainer}>

            <View style={styles.row}>

                <View style={styles.inputWrapper}>
                    <SearchableOptionsField
                        label={"Procedure"}
                        text={searchProcedureValue}
                        oneOptionsSelected={(value) => {handleProcedure('procedure')(value)}}
                        onChangeText={value => setSearchProcedureValue(value)}
                        onClear={() => {
                            handleProcedure('procedure')('')
                            // onFieldChange('procedure')('');
                            setSearchProcedureValue('');
                        }}
                        options={searchProcedureResult}
                        // handlePopovers = {(value)=>handlePopovers(value)('physician')}
                        handlePopovers = {()=>{}}
                        isPopoverOpen = {true}
                    />
                </View>
                <View style={styles.inputWrapper}>
                    <SearchableOptionsField
                        label={"Location"}
                        text={searchLocationValue}
                        oneOptionsSelected={(value) => {handleProcedure('location')(value)}}
                        onChangeText={value => setSearchLocationValue(value)}
                        onClear={() => {
                            handleProcedure('location')('');
                            setSearchLocationValue('');
                        }}
                        options={searchLocationResult}
                        // handlePopovers = {(value)=>handlePopovers(value)('physician')}
                        handlePopovers = {()=>{}}
                        isPopoverOpen = {true}
                    />
                </View>

            </View>
            
            <View style={[styles.row,{zIndex:-1}]}>

                <View style={styles.inputWrapper}>
                    <InputField2
                        label={"Date"}
                        onChangeText={(value) => { handleDate(value)}}
                        value={date}
                        onClear={() =>setDate('')}
                        keyboardType = "number-pad"
                        placeholder = "DD/MM/YYYY"
                    />
                </View>

            </View>

            <View style={[styles.row, {zIndex:-2}]}>

                <View style={[styles.inputWrapper]}>
                    <TimePickerField
                        refValue = {'startPicker'}
                        time = {startTime}
                        onConfirm = {onConfirm('startTime')}
                        label = "Start Time"
                    />
                </View>

                <View style={styles.inputWrapper}>
                    <TimePickerField
                        refValue = {'endPicker'}
                        time = {endTime}
                        onConfirm = {onConfirm('endTime')}
                        label = "End Time"
                    />
                </View>
           
            </View>

        </View>
    )
}

export default ProcedureTab2

const styles = StyleSheet.create({
    sectionContainer: {
        height: 260,
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
});