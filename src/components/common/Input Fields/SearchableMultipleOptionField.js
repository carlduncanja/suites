import React, {useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text, TextInput, FlatList, TouchableOpacity} from "react-native";
import IconButton from "../Buttons/IconButton";
import RemoveIcon from "../../../../assets/svg/removeIcon";
import ClearIcon from "../../../../assets/svg/clearIcon";

const optionsStyles = {
    optionsContainer: {
        backgroundColor: "rgba(255, 255, 255, 0)"
    }
};

function SearchableMultipleOptionField ({text, label, options, onChangeText, onClear, onPressResultItem}) {

    const textInputRef = useRef();

    const [selectedValue, setSelectedValue] = useState(false);

    const onClearPress = () => {
        onClear()
    };


    const renderOptions = ({item}) => {
        return <TouchableOpacity style={{flex: 1, marginBottom: 16}} onPress={() => onPressResultItem(item)}>
            <Text style={styles.optionText}>{item.name}</Text>
        </TouchableOpacity>
    };


    return (
        <View style={styles.container}>
            <Text style={[
                styles.textLabel, {
                    marginRight: label ? 20 : 0
                }
            ]}>
                {label}
            </Text>
            <View style={styles.inputFieldWrapper}>

                <TextInput
                    style={styles.inputField}
                    value={text}
                    editable={true}
                    onChangeText={onChangeText}
                    ref={textInputRef}
                />


                {/* {

                    selectedValue &&
                    <View style={styles.valueBox}>
                        <Text style={{padding: 3, paddingLeft: 5, marginRight: 5}}>{selectedValue.name}</Text>
                    </View>

                } */}


                {
                    text !== "" &&
                    <TouchableOpacity
                        style={styles.clearIcon}
                        onPress={onClearPress}
                    >
                        <ClearIcon/>
                    </TouchableOpacity>
                }


                {
                    ( text !== "")
                        ? <View style={styles.suggestionContainer}>
                            <FlatList
                                keyExtractor={(item, index) => index + ''}
                                data={options}
                                renderItem={renderOptions}
                            />
                        </View>
                        : null
                }
            </View>
        </View>
    );
}

SearchableMultipleOptionField.propTypes = {};
SearchableMultipleOptionField.defaultProps = {};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        height: 32,
    },
    inputFieldWrapper: {
        position: 'relative',
        flex: 1,
        flexDirection: 'column',
    },
    textLabel: {
        fontSize: 12,
        color: '#718096',
        fontWeight: '500',
    },
    suggestionContainer: {
        position: 'absolute',
        top: 35,
        padding: 12,
        paddingTop: 8,
        paddingBottom: 2,
        width: '100%',
        maxHeight: 300,
        borderRadius: 8,
        // border: 1px solid #CCD6E0;
        borderWidth: 1,
        borderColor: '#CCD6E0',
        backgroundColor: '#FFFFFF',
        shadowColor: "#000",
        shadowOffset: {
            width: 0.5,
            height: 2.5,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
        elevation: 10,
        zIndex: 10,
    },
    optionText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#323843',
        backgroundColor: '#FFFFFF'
    },
    inputField: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#E3E8EF',
        borderRadius: 4,
        height: 32,
        padding: 10,
        paddingTop: 2,
        paddingBottom: 2,
    },
    valueBox: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        paddingRight: 3,
        borderColor: '#FEB2B2',
        borderWidth: 1,
        backgroundColor: '#FFF5F5',
        borderRadius: 2,
        zIndex: 2,
        left: 0,
        margin: 3.5,
        marginLeft: 10,
        position: 'absolute',
    },
    clearIcon: {
        position: 'absolute',
        right: 0,
        margin: 8,
    }
});

export default SearchableMultipleOptionField;
