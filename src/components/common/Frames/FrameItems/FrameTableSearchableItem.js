import React, {useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList} from "react-native";
import styled from '@emotion/native'
import {useTheme} from "emotion-theming";
import ClearIcon from "../../../../../assets/svg/clearIcon";


const FrameTableItemWrapper = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
  margin-right: 20px;
`


const TitleContainer = styled.View`
  align-items: flex-start;
  justify-content: center;
  margin-right: 10px;
  min-width: 70px;
`

const Title = styled.Text(({theme}) => ({
    ...theme.font['--text-base-regular'],
    color: theme.colors['--color-gray-600']
}))


const ValueContainer = styled.View(({theme, enabled = {}}) => ({
    // ...theme.font['--text-base-regular'],
    flex: 1,
    flexDirection: 'column',
    color: theme.colors['--color-gray-900'],
    backgroundColor: enabled ? theme.colors['--default-shade-white'] : theme.colors['--color-gray-100'],
    borderColor: theme.colors['--color-gray-400'],
    borderWidth: 1,
    borderRadius: 4,
    height: 32,
    justifyContent: 'center',
    ...(enabled ? shadow : {})
}))

const Value = styled.TextInput(({theme}) => ({
    ...theme.font['--text-base-regular'],
    padding: 4,
    paddingLeft: 12,
    paddingRight: 12,
    color: theme.colors['--color-gray-900']
}))

const FrameTableSearchableItem = ({
                            text,
                            label,
                            options,
                            enabled = false,
                            oneOptionsSelected,
                            onChangeText,
                            onClear,
                            value,
                            isPopoverOpen = () => {
                            },
                            handlePopovers = () => {
                            },
                            hasError = false,
                            errorMessage = ""
                        }) => {

    const textInputRef = useRef();
    const theme = useTheme();

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
        <FrameTableItemWrapper>
            {
                !!label &&
                <TitleContainer theme={theme}>
                    <Title
                        theme={theme}>{label.charAt(0).toUpperCase().concat(label.substring(1, label.length))}</Title>
                </TitleContainer>
            }

            <ValueContainer theme={theme} enabled={enabled}>
                {
                    (enabled && !!selectedValue)
                        ? <>
                            <View style={styles.valueBox}>
                                <Text numberOfLines={1}
                                      style={{padding: 3, paddingLeft: 5, marginRight: 5}}>{selectedValue.name}</Text>
                            </View>

                            <TouchableOpacity
                                style={styles.clearIcon}
                                onPress={onClearPress}
                            >
                                <ClearIcon/>
                            </TouchableOpacity>
                        </>
                        : <TextInput
                            style={{
                                padding: 4,
                                paddingLeft: 12,
                                paddingRight: 12,
                            }}
                            value={
                                selectedValue?.name || text
                            }
                            editable={enabled}
                            onChangeText={(value) => {
                                onChangeText(value);
                                handlePopovers(true)
                            }}
                            ref={textInputRef}
                        />
                }

                {
                    hasError && <View style={styles.errorView}>
                        <Text style={{fontSize: 10, color: 'red'}}>{errorMessage}</Text>
                    </View>
                }

                {
                    (!selectedValue && !!text && !!isPopoverOpen)
                        ?
                        <View style={styles.suggestionContainer}>

                            {
                                options.length === 0 ?
                                    <View style={{marginBottom: 10, marginTop: 10}}>
                                        <Text style={{color: '#718096', fontSize: 14}}>No Suggestions Found</Text>
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

            </ValueContainer>


        </FrameTableItemWrapper>
    );
}

export default FrameTableSearchableItem

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
        justifyContent: 'center'
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
        // flex: 1,
        top: 35,
        padding: 12,
        paddingTop: 2,
        paddingBottom: 2,
        width: '100%',
        maxHeight: 300,
        borderRadius: 8,
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
        top: 3,
        bottom: 3,
        // marginTop:10,
        // paddingBottom:4,
        // margin: 3.5,
        marginLeft: 10,
        position: 'absolute',
        width: '80%',
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


const shadow = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0.2,
        height: 1.5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
    zIndex: 3,
};
