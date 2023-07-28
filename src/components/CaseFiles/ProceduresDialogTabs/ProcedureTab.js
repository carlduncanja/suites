import React, {useState, useEffect} from "react";
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import SearchableOptionsField from "../../common/Input Fields/SearchableOptionsField";
import DateInputField from "../../common/Input Fields/DateInputField";
import _ from "lodash";
import {getProcedures, getTheatres} from "../../../api/network";
import moment from "moment";
import InputField2 from "../../common/Input Fields/InputField2";
import SuggestedTimesPopover from "../../common/SuggestedTimesPopover";
import {useModal} from "react-native-modalfy";
import ScheduleDisplayComponent from "../../ScheduleDisplay/ScheduleDisplayComponent";
import styled from "@emotion/native";
import {useTheme} from "emotion-theming";
import InputUnitField from "../../common/Input Fields/InputUnitFields";

const ProcedureTab = ({
                          onProcedureInfoChange,
                          onProcedureSelected = () => {},
                          procedureInfo,
                          errors,
                          onErrorUpdate,
                      }) => {
    const modal = useModal();
    const theme = useTheme()
    // const [procedure, setProcedure] = useState(undefined)
    // const [location, setLocation] = useState(undefined)

    const [searchProcedureValue, setSearchProcedureValue] = useState("");
    const [searchProcedureResult, setSearchProcedureResult] = useState([]);
    const [searchProcedureQuery, setSearchProcedureQuery] = useState({});

    const [searchLocationValue, setSearchLocationValue] = useState("");
    const [searchLocationResult, setSearchLocationResult] = useState([]);
    const [searchLocationQuery, setSearchLocationQuery] = useState({});

    const {startTime, location, procedure, duration, category, date} =
    procedureInfo || {};

    useEffect(() => {
        if (!searchProcedureValue) {
            // empty search values and cancel any out going request.
            setSearchProcedureResult([]);
            if (searchProcedureQuery?.cancel) searchProcedureQuery?.cancel();
            return;
        }

        // wait 300ms before search. cancel any prev request before executing current.

        const search = _.debounce(fetchProcedures, 300);

        setSearchProcedureQuery((prevSearch) => {
            if (prevSearch && prevSearch?.cancel) {
                prevSearch?.cancel();
            }
            return search;
        });

        search();
    }, [searchProcedureValue]);

    useEffect(() => {
        if (!searchLocationValue) {
            // empty search values and cancel any out going request.
            setSearchLocationResult([]);
            if (searchLocationQuery?.cancel) searchLocationQuery.cancel();
            return;
        }

        // wait 300ms before search. cancel any prev request before executing current.

        const search = _.debounce(fetchLocations, 300);

        setSearchLocationQuery((prevSearch) => {
            if (prevSearch && prevSearch?.cancel) {
                prevSearch?.cancel();
            }
            return search;
        });

        search();
    }, [searchLocationValue]);

    const fetchProcedures = () => {
        getProcedures(searchProcedureValue, 5)
            .then((procedureInfo) => {
                const {data = [], pages} = procedureInfo;
                setSearchProcedureResult(data || []);
            })
            .catch((error) => {
                // TODO handle error
                console.log("failed to get procedures");
                setSearchProcedureResult([]);
            });
    };

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

    const handleInfoChange = (fieldName) => (value) => {
        onProcedureInfoChange({
            ...procedureInfo,
            [fieldName]: value,
        });
    };

    const handleProcedure = (value) => {
        const procedure = value
            ? {
                _id: value._id,
                name: value.name,
                duration: value.duration,
            }
            : value;

        onProcedureSelected(value);

        onProcedureInfoChange({
            ...procedureInfo,
            ["procedure"]: procedure,
            ["duration"]: procedure && procedure.duration.toString(),
        });

        updateErrorField("procedure")(false);

        setSearchProcedureValue('')
        setSearchProcedureResult([]);
        setSearchProcedureQuery(undefined);
    };

    const handleLocationChange = (value) => {
        const location = value
            ? {
                _id: value._id,
                name: value.name,
            }
            : value;

        handleInfoChange("location")(location);

        updateErrorField("location")(false);

        setSearchLocationValue('')
        setSearchLocationResult([]);
        setSearchLocationQuery(undefined);
    };

    const onDateUpdate = (date) => {
        // update the date for start and end time.
        const newDate = moment(date);

        console.log("onDateUpdate", newDate, startTime);

        const newStartTime = startTime
            ? moment(startTime)
                .year(newDate.year())
                .month(newDate.month())
                .date(newDate.date())
            : undefined;

        console.log("onDateUpdate", newDate, newStartTime);

        // update procedure
        onProcedureInfoChange({
            ...procedureInfo,
            date: date,
            startTime: newStartTime && newStartTime.toDate().toString(),
        });

        onErrorUpdate({
            ...errors,
            date: false,
            startTime: false,
        });
    };

    const onDateClear = () => {
        onProcedureInfoChange({
            ...procedureInfo,
            date: undefined,
        });

        updateErrorField("date")(false);
    };

    const updateErrorField = (field) => (value) => {
        onErrorUpdate({
            ...errors,
            [field]: value,
        });
    };

    const onTimeUpdate = (field) => (dateTime) => {
        console.log("onTimeUpdated: date time ", dateTime);

        let newTime = moment(dateTime);
        if (date) {
            // change update the date;
            const dateMoment = new moment(date);
            newTime
                .year(dateMoment.year())
                .month(dateMoment.month())
                .date(dateMoment.date());
        }

        onProcedureInfoChange({
            ...procedureInfo,
            [field]: newTime.toDate(),
        });

        updateErrorField(field)(false);

        console.log("onTimeUpdated", procedureInfo);
    };

    const onTimeClear = (field) => () => {
        onProcedureInfoChange({
            ...procedureInfo,
            [field]: undefined,
        });
    };

    const handleSuggestedTimeSelected = (time) => {
        console.log("suggested time selected", time);
        modal.closeModals("BottomSheetModal");

        onTimeUpdate("startTime")(time);
    };

    const openModal = () => {
        modal.openModal("BottomSheetModal", {
            content: (
                <SuggestedTimesPopover
                    onTimeSelected={handleSuggestedTimeSelected}
                    procedure={procedure._id}
                    location={location._id}
                    duration={duration}
                    date={date}
                />
            ),
            initialSnap: 2,
            snapPoints: [300, 200, 0],
        });
    };

    return (
        <View style={styles.sectionContainer}>
            <RowWrapper theme={theme} style={styles.row}>
                <InputWrapper style={styles.inputWrapper}>
                    <SearchableOptionsField
                        label={"Procedure"}
                        labelWidth={92}
                        value={procedure}
                        text={searchProcedureValue}
                        oneOptionsSelected={handleProcedure}
                        onChangeText={(value) => setSearchProcedureValue(value)}
                        onClear={handleProcedure}
                        options={searchProcedureResult}
                        handlePopovers={() => {
                            console.log("handle popovers");
                        }}
                        isPopoverOpen={searchProcedureQuery}
                        hasError={errors["procedure"]}
                        errorMessage={errors["procedure"]}
                    />
                </InputWrapper>
                <Space/>
                <InputWrapper style={styles.inputWrapper}>
                    <SearchableOptionsField
                        label={"Location"}
                        labelWidth={92}
                        value={location}
                        text={searchLocationValue}
                        oneOptionsSelected={handleLocationChange}
                        onChangeText={(value) => setSearchLocationValue(value)}
                        onClear={handleLocationChange}
                        options={searchLocationResult}
                        handlePopovers={() => {
                        }}
                        isPopoverOpen={searchLocationQuery}
                        hasError={errors["location"]}
                        errorMessage={errors["location"]}
                    />
                </InputWrapper>
            </RowWrapper>

            <RowWrapper theme={theme} style={[styles.row, {zIndex: -2}]}>
                <InputWrapper style={[styles.inputWrapper]}>
                    <InputUnitField
                        label={"Duration"}
                        labelWidth={92}
                        onChangeText={handleInfoChange("duration")}
                        value={duration}
                        onClear={() => handleInfoChange("duration")("")}
                        placeholder={""}
                        units={['hrs']}
                        keyboardType={"numeric"}
                        errorMessage={errors["duration"]}
                        hasError={errors["duration"]}
                    />
                </InputWrapper>
                <Space/>
                <InputWrapper style={styles.inputWrapper}>
                    <InputField2
                        label={"Category"}
                        labelWidth={92}
                        onChangeText={handleInfoChange("category")}
                        value={category}
                        onClear={handleInfoChange("category")}
                        placeholder={""}
                    />
                </InputWrapper>
            </RowWrapper>

            <RowWrapper theme={theme} style={[
                styles.row,
                {zIndex: -1, height: 90, alignItems: "flex-start"},
            ]}>
                <InputWrapper style={styles.inputWrapper}>
                    <DateInputField
                        label={"Date"}
                        labelWidth={92}
                        onDateChange={onDateUpdate}
                        value={date}
                        onClear={onDateClear}
                        placeholder="DD/MM/YYYY"
                        mode={"date"}
                        format={"YYYY-MM-DD"}
                        errorMessage={errors["date"]}
                        hasError={errors["date"]}
                    />
                </InputWrapper>
                <Space/>
                <InputWrapper style={[
                    // styles.inputWrapper,
                    {
                        flexDirection: "column",
                        // justifyContent: "flex-end",
                    },
                ]}>
                    <DateInputField
                        label={"Start Time"}
                        onDateChange={onTimeUpdate("startTime")}
                        value={startTime}
                        mode={"time"}
                        format={"hh:mm A"}
                        onClear={onTimeClear("startTime")}
                        placeholder="HH:MM"
                        errorMessage={errors["startTime"]}
                        hasError={errors["startTime"]}
                    />

                    <View style={{flex: 1.7}}>
                        {
                            // duration procedure location date
                            !(!procedure || !location || !duration || !date) && (
                                <TouchableOpacity
                                    onPress={openModal}
                                    style={{
                                        flex: 1,
                                        marginLeft: 90,
                                        marginTop: 5,
                                    }}
                                >
                                    <Text style={styles.suggestedTimesText}>Suggested Times</Text>
                                </TouchableOpacity>
                            )
                        }
                    </View>
                </InputWrapper>
            </RowWrapper>
        </View>
    );
};

export default ProcedureTab;

const Space = styled.View`
   width:  ${({theme}) => theme.space['--space-24']};
`;

const RowWrapper = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: ${({theme}) => theme.space['--space-20']};
    z-index: ${({zIndex}) => zIndex};
`

const InputWrapper = styled.View`
    flex: 1;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    z-index: ${({zIndex}) => zIndex};
`


const styles = StyleSheet.create({
    sectionContainer: {
        height: 230,
        backgroundColor: "#FFFFFF",
        flexDirection: "column",
        padding: 24,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 20,
    },
    inputWrapper: {
        width: 260,
        flexDirection: "row",
    },
    suggestedTimesText: {
        color: "#3182CE",
        fontWeight: "500",
        fontSize: 14,
    },
});
