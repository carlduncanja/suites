import React, {useState, useEffect} from "react";
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import SearchableOptionsField from "../../common/Input Fields/SearchableOptionsField";
import DateInputField from "../../common/Input Fields/DateInputField";
import _ from "lodash";
import {getProcedures, getTheatres} from "../../../api/network";
import moment from 'moment';
import InputField2 from "../../common/Input Fields/InputField2";
import SuggestedTimesPopover from "../../common/SuggestedTimesPopover";
import {useModal} from "react-native-modalfy";

const ProcedureTab = ({
                          onProcedureInfoChange,
                          procedureInfo,
                          errors,
                          onErrorUpdate
                      }) => {

    const modal = useModal();
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
        location,
        procedure,
        duration,
        category,
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
            if (prevSearch && prevSearch.cancel) {
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
            if (prevSearch && prevSearch.cancel) {
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
            duration: value.duration
        } : value

        // handleInfoChange("procedure")(procedure)

        onProcedureInfoChange({
            ...procedureInfo,
            ['procedure']: procedure,
            ['duration']: procedure && procedure.duration.toString(),
        })

        updateErrorField('procedure')(false)

        setSearchProcedureResult([])
        setSearchProcedureQuery(undefined);
    }

    const handleLocationChange = (value) => {
        const location = value ? {
            _id: value._id,
            name: value.name
        } : value

        handleInfoChange('location')(location);

        updateErrorField('location')(false)

        setSearchLocationResult([])
        setSearchLocationQuery(undefined)
    }

    const onDateUpdate = (date) => {
        // update the date for start and end time.
        const newDate = moment(date);

        console.log("onDateUpdate", newDate, startTime)

        const newStartTime = startTime ? moment(startTime).year(newDate.year()).month(newDate.month()).date(newDate.date()) : undefined

        console.log("onDateUpdate", newDate, newStartTime)

        // update procedure
        onProcedureInfoChange({
            ...procedureInfo,
            date: date,
            startTime: newStartTime && newStartTime.toDate(),
        })

        onErrorUpdate({
            ...errors,
            date: false,
            startTime: false
        })
    }

    const onDateClear = () => {
        onProcedureInfoChange({
            ...procedureInfo,
            date: undefined
        })

        updateErrorField('date')(false);
    }

    const updateErrorField = (field) => (value) => {
        onErrorUpdate({
            ...errors,
            [field]: value
        })
    }

    const onTimeUpdate = (field) => (dateTime) => {
        console.log("onTimeUpdated: date time ", dateTime);

        let newTime = moment(dateTime);
        if (date) {
            // change update the date;
            const dateMoment = new moment(date);
            newTime.year(dateMoment.year()).month(dateMoment.month()).date(dateMoment.date())
        }

        onProcedureInfoChange({
            ...procedureInfo,
            [field]: newTime.toDate()
        })

        updateErrorField(field)(false);

        console.log("onTimeUpdated", procedureInfo);
    }

    const onTimeClear = (field) => () => {
        onProcedureInfoChange({
            ...procedureInfo,
            [field]: undefined
        })
    }

    console.log("errors", errors);

    const handleSuggestedTimeSelected = (time) => {
        console.log("suggested time selected", time);
        modal.closeModals('BottomSheetModal');

        onTimeUpdate('startTime')(time);
    }

    const openModal = () => {
        modal.openModal('BottomSheetModal', {
            content: <SuggestedTimesPopover
                onTimeSelected={handleSuggestedTimeSelected}
                procedure={procedure._id}
                location={location._id}
                duration={duration}
                date={date}
            />,
            initialSnap: 2,
            snapPoints: [300, 200, 0]
        })
    }

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
                        hasError={errors['procedure']}
                        errorMessage={errors['procedure']}
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
                        hasError={errors['location']}
                        errorMessage={errors['location']}
                    />
                </View>
            </View>

            <View style={[styles.row, {zIndex: -2}]}>

                <View style={[styles.inputWrapper]}>
                    <InputField2
                        label={"Duration"}
                        onChangeText={handleInfoChange("duration")}
                        value={duration}
                        onClear={() => handleInfoChange("duration")('')}
                        placeholder={""}
                        keyboardType={'numeric'}
                        errorMessage={errors['duration']}
                        hasError={errors['duration']}
                    />

                </View>

                <View style={styles.inputWrapper}>
                    <InputField2
                        label={"Category"}
                        onChangeText={handleInfoChange("category")}
                        value={category}
                        onClear={handleInfoChange("category")}
                        placeholder={""}
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
                        mode={'date'}
                        format={"YYYY-MM-DD"}
                        errorMessage={errors['date']}
                        hasError={errors['date']}
                    />
                </View>

                <View
                    style={[styles.inputWrapper, {height: 110, flexDirection: "column", justifyContent: "flex-start"}]}>
                    <DateInputField
                        label={"Start Time"}
                        onDateChange={onTimeUpdate("startTime")}
                        value={startTime}
                        mode={'time'}
                        format={'hh:mm A'}
                        onClear={onTimeClear("startTime")}
                        placeholder="HH:MM"
                        errorMessage={errors['startTime']}
                        hasError={errors['startTime']}
                    />

                    {
                        // duration procedure location date

                        procedure && location && duration && date &&
                        <TouchableOpacity
                            onPress={openModal}
                            style={{
                                flex: 1,
                                marginLeft: 90,
                            }}
                        >

                            <Text style={styles.suggestedTimesText}>
                                Suggested Times
                            </Text>

                        </TouchableOpacity>
                    }
                </View>
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
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    inputWrapper: {
        width: 260,
        flexDirection: 'row',
    },
    suggestedTimesText: {
        color: '#3182CE',
        fontWeight: '500',
        fontSize: 14
    }
});
