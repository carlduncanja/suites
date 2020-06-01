import React, {useState, useEffect} from "react";
import {View, Text, StyleSheet} from "react-native";
import SearchableOptionsField from "../../common/Input Fields/SearchableOptionsField";
import DateInputField from "../../common/Input Fields/DateInputField";
import _ from "lodash";
import {getProcedures, getTheatres} from "../../../api/network";
import moment from 'moment';
import TimeInputField from "../../common/Input Fields/TimeInputField";

const ProcedureTab2 = ({
                           onProcedureInfoChange,
                           procedureInfo
                       }) => {

    // const [procedure, setProcedure] = useState(undefined)
    // const [location, setLocation] = useState(undefined)

    const [searchProcedureValue, setSearchProcedureValue] = useState('')
    const [searchProcedureResult, setSearchProcedureResult] = useState([])
    const [searchProcedureQuery, setSearchProcedureQuery] = useState({})

    const [searchLocationValue, setSearchLocationValue] = useState('')
    const [searchLocationResult, setSearchLocationResult] = useState([])
    const [searchLocationQuery, setSearchLocationQuery] = useState({})

    const {
        startTime,
        endTime,
        location,
        procedure,
        date
    } = procedureInfo || {};

    useEffect(() => {
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

    }, [searchProcedureValue])

    useEffect(() => {
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

    }, [searchLocationValue])

    const fetchProcedures = () => {

        getProcedures(searchProcedureValue, 5)
            .then((data = []) => {
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
                setSearchLocationResult(data || []);
            })
            .catch(error => {
                // TODO handle error
                console.log("failed to get procedures");
                setSearchLocationResult([]);
            })

    }

    const handleInfoChange = (fieldName) => (value) => {
        onProcedureInfoChange({
            ...procedureInfo,
            [fieldName]: value,
        })
    }

    const handleProcedure = (value) => {
        const procedure = value ? {
            _id: value._id,
            name: value.name,
        } : value

        handleInfoChange("procedure")(procedure)
        setSearchProcedureResult([])
        setSearchProcedureQuery(undefined);
    }

    const handleLocationChange = (value) => {
        const location = value ? {
            _id: value._id,
            name: value.name
        } : value

        handleInfoChange('location')(location);
        setSearchLocationResult([])
        setSearchLocationQuery(undefined)
    }

    const onDateUpdate = (date) => {
        // update the date for start and end time.
        const newDate = moment(date);

        console.log("onDateUpdate", newDate, startTime, endTime)

        const newStartTime = startTime ? moment(startTime).year(newDate.year()).month(newDate.month()).date(newDate.date()) : undefined
        const newEndTime = endTime ? moment(endTime).year(newDate.year()).month(newDate.month()).date(newDate.date()) : undefined

        console.log("onDateUpdate", newDate, newStartTime, newEndTime)

        // update procedure
        onProcedureInfoChange({
            ...procedureInfo,
            date: date,
            startTime: newStartTime && newStartTime.toDate(),
            endTime: newEndTime && newEndTime.toDate()
        })
    }

    const onDateClear = () => {
        onProcedureInfoChange({
            ...procedureInfo,
            date: undefined
        })
    }


    const onTimeUpdate = (field) => (dateTime) => {
        console.log("onTimeUpdated: date time ", dateTime);

        let newTime  = moment(dateTime);
        if (date) {
            // change update the date;
            const dateMoment = new moment(date);
            newTime.year(dateMoment.year()).month(dateMoment.month()).date(dateMoment.date())
        }

        onProcedureInfoChange({
            ...procedureInfo,
            [field]: newTime.toDate()
        })

        console.log("onTimeUpdated", procedureInfo);
    }

    const onTimeClear = (field) => () => {
        onProcedureInfoChange({
            ...procedureInfo,
            [field]: undefined
        })
    }

    console.log("procedure tab", procedureInfo);


    return (
        <View style={styles.sectionContainer}>
            <View style={styles.row}>
                <View style={styles.inputWrapper}>
                    <SearchableOptionsField
                        label={"Procedure"}
                        value={procedure}
                        text={searchProcedureValue}
                        oneOptionsSelected={handleProcedure}
                        onChangeText={value => setSearchProcedureValue(value)}
                        onClear={handleProcedure}
                        options={searchProcedureResult}
                        handlePopovers={() => {
                            console.log("handle popovers");
                        }}
                        isPopoverOpen={searchProcedureQuery}
                    />
                </View>
                <View style={styles.inputWrapper}>
                    <SearchableOptionsField
                        label={"Location"}
                        value={location}
                        text={searchLocationValue}
                        oneOptionsSelected={handleLocationChange}
                        onChangeText={value => setSearchLocationValue(value)}
                        onClear={handleLocationChange}
                        options={searchLocationResult}
                        handlePopovers={() => {
                        }}
                        isPopoverOpen={searchLocationQuery}
                    />
                </View>

            </View>

            <View style={[styles.row, {zIndex: -1}]}>

                <View style={styles.inputWrapper}>
                    <DateInputField
                        label={"Date"}
                        onDateChange={onDateUpdate}
                        value={date}
                        onClear={onDateClear}
                        placeholder="DD/MM/YYYY"
                    />
                </View>

            </View>

            <View style={[styles.row, {zIndex: -2}]}>

                <View style={[styles.inputWrapper]}>
                    <TimeInputField
                        label={"Start Time"}
                        onDateChange={onTimeUpdate("startTime")}
                        value={startTime}
                        onClear={onTimeClear("startTime")}
                        placeholder="HH:MM"
                    />

                </View>

                <View style={styles.inputWrapper}>
                    <TimeInputField
                        label={"End Time"}
                        onDateChange={onTimeUpdate("endTime")}
                        value={endTime}
                        onClear={onTimeClear("endTime")}
                        placeholder="HH:MM"
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
