import React,{ useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import InputUnitField from "../../common/Input Fields/InputUnitFields";
import InputField2 from "../../common/Input Fields/InputField2";
import SearchableOptionsField from "../../common/Input Fields/SearchableOptionsField";
import DateInputField from "../../common/Input Fields/DateInputField";
import DateInputField2 from "../../common/Input Fields/DateInputField2";

import MultipleSelectionsField from "../../common/Input Fields/MultipleSelectionsField";
import _ from "lodash";
import {getProcedures, getTheatres} from "../../../api/network";
import moment from 'moment';
import { formatDate } from "../../../utils/formatter";

import { MenuOptions, MenuOption } from 'react-native-popup-menu';
import DatePicker from "react-native-datepicker";

const ProcedureTab = ({ onFieldChange, fields}) => {

    const [procedureValues ,setProcedureValues] = useState({
        procedure : '',
        startTime : '',
        endTime : '',
        location : '',
    })

    const [date, setDate] = useState("")
    const [duration, setDuration] = useState('')
    const [start, setStart] = useState('')
    const [end, setEnd] = useState('')

    const [searchProcedureValue, setSearchProcedureValue] = useState('')
    const [searchProcedureResult, setSearchProcedureResult] = useState([])
    const [searchProcedureQuery, setSearchProcedureQuery] = useState({})

    const [searchLocationValue, setSearchLocationValue] = useState('')
    const [searchLocationResult, setSearchLocationResult] = useState([])
    const [searchLocationQuery, setSearchLocationQuery] = useState({})

    const [searchCategoryValue, setSearchCategoryValue] = useState('')
    const [searchCategoryResult, setSearchCategoryResult] = useState([])
    const [searchCategoryQuery, setSearchCategoryQuery] = useState()

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
            if (prevSearch && prevSearch.cancel) {
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
            if (prevSearch && prevSearch.cancel) {
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

    const handleTimeChange = (value) => (unit)=>{
        console.log("Time: ", value, unit)
        if(unit === 'AM'){
            if (value < 11){
                newTime = moment(`${value}:00`,'h:mm a').format('h:mm a')
            }
        }else{
            newTime = moment(`${parseInt(value)+12}:00`,'h:mm a').format('h:mm a')
        }
        setStart(value)
        if(moment(date).isValid() && date !== ""){
            let newDate = moment(date).get('year')

            console.log("Valid: ", moment(date + " " + newTime))
        }
        console.log("New Time: ", newTime)
    }

    const handleDateValidation = (value) => {
        let dateRegex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}/g
        if (dateRegex.test(date) || !date) {
           setDate(value)
        }
        setDate(value)
    }
    const onDateChange = (type) => (value) => {
        console.log("Value: ", type, value)

        type === 'date' && setDate(value)
        type === 'start' && setStart(value)
        type === 'end' && setEnd(value)
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
                            setSearchValue('');
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
                            setSearchValue('');
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
                        onChangeText={(value) => {handleDateValidation(value)}}
                        value={date}
                        onClear={() =>handleDateValidation('')}
                        keyboardType = "number-pad"
                        placeholder = "DD/MM/YYYY"
                    />
                </View>

                <View style={styles.inputWrapper}>

                    <DateInputField2
                        label={"Start Time"}
                        onChangeText={handleTimeChange}
                        value={start}
                        units={['AM','PM']}
                        keyboardType="number-pad"
                    />
                </View>

                <View style={styles.inputWrapper}>
                    <InputUnitField
                        label={"Duration"}
                        onChangeText={(value) => {
                            if (/^\d{9}/g.test(value).toString() || !value) {
                                setDuration(value)
                            }
                        }}
                        value={duration}
                        units={['hrs']}
                        keyboardType="number-pad"
                    />
                </View>

                {/* <DateInputField
                    label = "Start Time"
                    mode = "time"
                    date = {start}
                    onChangeText = {(value)=>onDateChange('start')(value)}
                /> */}

                {/* <View style={styles.inputWrapper}>
                    <InputField2
                        label={"Date"}
                        onChangeText={(value) => {handleDateValidation(value)}}
                        value={date}
                        onClear={() =>handleProcedure('startTime')('')}
                        keyboardType = "number-pad"
                        placeholder = "DD/MM/YYYY"
                    />
                </View> */}


                {/* <View style={styles.inputWrapper}>
                    <InputUnitField
                        label={"Duration"}
                        onChangeText={(value) => {
                            if (/^\d{9}/g.test(value).toString() || !value) {
                                handleProcedure('duration')(value)
                            }
                        }}
                        value={procedureValues['duration']}
                        units={['hrs']}
                        keyboardType="number-pad"
                    />
                </View> */}

                {/* <View style={styles.inputWrapper}>
                    <MultipleSelectionsField
                        label={"Category"}
                        onOptionsSelected={onFieldChange('category')}
                        options = {searchCategoryResult}
                        searchText = {searchCategoryValue}
                        onSearchChangeText = {(value)=> setSearchCategoryValue(value)}
                        onClear={()=>{setSearchCategoryValue('')}}
                        // handlePopovers = {(value)=>handlePopovers(value)('category')}
                        handlePopovers = {()=>{}}
                        isPopoverOpen = {false}
                    />
                </View> */}

            </View>

            <View style={[styles.row, {zIndex:-2}]}>



                {/* <DateInputField
                    label = "End Time"
                    mode = "time"
                    date = {end}
                    onChangeText = {(value)=>onDateChange('end')(value)}
                /> */}

                {/* <View style={styles.inputWrapper}>
                    <InputUnitField
                        label={"Start Time"}
                        onChangeText={(value) => {
                            if (/^\d{9}/g.test(value).toString() || !value) {
                                // handleProcedure('startTime')(value)
                                console.log("Time: ", value)
                            }
                        }}
                        value={procedureValues['duration']}
                        units={['AM','PM']}
                        keyboardType="number-pad"
                    />
                </View> */}
                {/* <View style={styles.inputWrapper}>
                    <InputUnitField
                        label={"Duration"}
                        onChangeText={(value) => {
                            if (/^\d{9}/g.test(value).toString() || !value) {
                                handleProcedure('duration')(value)
                            }
                        }}
                        value={procedureValues['duration']}
                        units={['hrs']}
                        keyboardType="number-pad"
                    />
                </View> */}

            </View>

        </View>
    )
}

export default ProcedureTab

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
