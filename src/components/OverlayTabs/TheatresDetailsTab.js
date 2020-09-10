import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet} from "react-native";
import moment from "moment";
import {formatDate} from '../../utils/formatter';
import InputField2 from "../common/Input Fields/InputField2";
import TextArea from "../common/Input Fields/TextArea";
import SearchableOptionsField from "../common/Input Fields/SearchableOptionsField";

const UiData = {
    description: "",
    id: "ST0921",
    name: "ICU Theatre 3",
    status: "In Use",
    statusColor: "#ED8936",

    physician: "Dr. H. Mansingh",
    availableOn: new Date(2020, 12, 13, 23, 0),
};

function TheatresDetailsTab({
                                description = "",
                                id = "--",
                                name = "--",
                                status = "Available",
                                statusColor = "black",
                                isEditMode = true,
                                physician = "--",
                                availableOn = "--",
                            }) {

    const [fields, setFields] = useState({});
    const onFieldChange = () => {

    }


    return (
        <View style={styles.container}>
            <View style={[styles.row]}>
                <View style={[styles.item]}>
                    <Text style={styles.textLabel}>Description</Text>


                    {
                        !isEditMode
                            ? <Text
                                style={[styles.textDefault, {color: description ? "#1D2129" : "#A0AEC0"}]}>{description ? description : "No description available."}</Text>
                            : <View style={{height: 70, justifyContent: 'center'}}>
                                <TextArea
                                    onChangeText={onFieldChange('description')}
                                    value={fields['description']}
                                    multiline={true}
                                    numberOfLines={4}
                                    onClear={() => onFieldChange('description')('')}
                                />
                            </View>
                    }

                </View>
                <View style={{flex: 1}}/>
            </View>

            <View style={styles.row}>
                <View style={[styles.item]}>

                    <Text style={styles.textLabel}>ID</Text>
                    {
                        !isEditMode
                            ? <Text style={styles.textDefault}>{id}</Text>
                            : <InputField2
                                value={id}
                                enabled={false}
                            />
                    }


                </View>

                <View style={[styles.item]}>
                    <Text style={styles.textLabel}>Theatre Name</Text>

                    {
                        !isEditMode
                            ? <Text style={styles.textDefault}>{name}</Text>
                            : <InputField2
                                value={name}
                                enabled={false}
                            />
                    }

                </View>

                <View style={[styles.item]}>
                    <Text style={styles.textLabel}>Status</Text>
                    <Text style={[styles.textDefault, {color: statusColor}]}>{status}</Text>
                </View>
            </View>

            <View style={styles.row}>
                <View style={[styles.item]}>
                    <Text style={styles.textLabel}>Physician</Text>

                    <Text style={[styles.textDefault, styles.textLink]}>{physician}</Text>
                </View>

                <View style={[styles.item]}>
                    <Text style={styles.textLabel}>Available On</Text>

                    <Text style={styles.textDefault}>{availableOn}</Text>

                </View>

                <View style={styles.item}/>
            </View>
        </View>
    );
}

TheatresDetailsTab.propTypes = {};
TheatresDetailsTab.defaultProps = {};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 24,
        // paddingTop: 32
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 32
    },
    item: {
        flex: 1,
        flexDirection: 'column',
        marginRight: 20,
    },
    textLabel: {
        color: "#718096",
        marginBottom: 12,
        fontSize: 16,
        fontWeight: 'normal',
    },
    textDefault: {
        color: "#323843",
        fontSize: 16,
        fontWeight: 'normal',
    },
    textLink: {
        color: "#3182CE"
    }
});

export default TheatresDetailsTab;
