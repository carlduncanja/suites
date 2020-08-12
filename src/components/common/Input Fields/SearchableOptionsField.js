import React, {useRef, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text, TextInput, FlatList, TouchableOpacity, SafeAreaView} from "react-native";
import IconButton from "../Buttons/IconButton";
import RemoveIcon from "../../../../assets/svg/removeIcon";
import ClearIcon from "../../../../assets/svg/clearIcon";

const optionsStyles = {
    optionsContainer: {
        backgroundColor: "rgba(255, 255, 255, 0)"
    }
};

function SearchableOptionsField({
                                    text,
                                    label,
                                    options,
                                    oneOptionsSelected,
                                    onChangeText,
                                    onClear,
                                    value,
                                    isPopoverOpen = () => {
                                    },
                                    handlePopovers = () => {
                                    },
                                    backgroundColor = "#FFFFFF",
                                    borderColor = "#E3E8EF",
                                    hasError = false,
                                    errorMessage = ""
                                }) {

    const textInputRef = useRef();

    const [selectedValue, setSelectedValue] = useState(value);

    useEffect(() => {
        setSelectedValue(value);
    }, [value])

    // console.log("selected value", value);

    const onOptionPress = (option) => {

        setSelectedValue(option);
        if (textInputRef) {
            textInputRef.current.clear();
        }

        oneOptionsSelected(option)
    };

    const onClearPress = () => {
        setSelectedValue(false);
        onClear()
    };

    const renderOptions = ({item}) => {
        return <TouchableOpacity style={{flex: 1, marginBottom: 16}} onPress={() => onOptionPress(item)}>
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
            <View style={[styles.inputFieldWrapper, {backgroundColor: backgroundColor}]}>

                <TextInput
                    style={[styles.inputField, {borderColor: hasError ? 'red' : borderColor, height: 32}]}
                    value={text}
                    editable={!selectedValue}
                    onChangeText={(value) => {
                        onChangeText(value);
                        handlePopovers(true)
                    }}
                    ref={textInputRef}
                />

                {
                    (selectedValue ) &&

                    <View style={styles.valueBox}>
                        <Text numberOfLines = {1} style={{padding: 3, paddingLeft: 5, marginRight: 5}}>{selectedValue.name}</Text>
                    </View>
                }


                {
                    (selectedValue) &&

                    <TouchableOpacity
                        style={styles.clearIcon}
                        onPress={onClearPress}
                    >
                        <ClearIcon/>
                    </TouchableOpacity>

                }

                {
                    hasError && <View style={styles.errorView}>
                        <Text style={{fontSize: 10, color: 'red'}}>{errorMessage}</Text>
                    </View>
                }


                {

                    (!selectedValue && text && isPopoverOpen)
                        ?
                        <View style={styles.suggestionContainer}>

                            {
                                options.length === 0 ?
                                    <View style={{marginBottom:10, marginTop:10}}>
                                        <Text style={{color:'#718096',fontSize:14}}>No Suggestions Found</Text>
                                    </View>

                                    :
                                <FlatList
                                    keyExtractor={(item, index) => index + ''}
                                    data={options}
                                    renderItem={renderOptions}
                                />
                            }

                        </View>
                        : null
                }
            </View>
        </View>
    );
}

SearchableOptionsField.propTypes = {};
SearchableOptionsField.defaultProps = {};

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
        height: 32,
        justifyContent:'center'
        // borderRadius: 8,
        // height: 32
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
        zIndex: 1,
    },
    optionText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#323843',
        backgroundColor: '#FFFFFF'
    },
    inputField: {
        // flex: 1,
        borderWidth: 1,
        borderColor: '#E3E8EF',
        borderRadius: 8,
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
        top:3,
        bottom:3,
        // marginTop:10,
        // paddingBottom:4,
        // margin: 3.5,
        marginLeft: 10,
        position: 'absolute',
        width :'80%',
        // height :32
    },
    clearIcon: {
        position: 'absolute',
        right: 0,
        margin: 8,
    },
    errorView: {
        paddingTop: 3,
        paddingLeft: 15

    }
});

export default SearchableOptionsField;
