import React, {useRef, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text, TextInput, FlatList, TouchableOpacity, SafeAreaView} from "react-native";
import IconButton from "../Buttons/IconButton";
import RemoveIcon from "../../../../assets/svg/removeIcon";
import ClearIcon from "../../../../assets/svg/clearIcon";
import InputLabelComponent from '../InputLablel';
import InputContainerComponent from '../InputContainerComponent';
import InputErrorComponent from '../InputErrorComponent';

import styled, {css} from '@emotion/native';
import {useTheme} from 'emotion-theming';
import MultipleShadowsContainer from '../MultipleShadowContainer';

import Styled from "@emotion/native";
import {shadow} from "../../../styles";

const optionsStyles = {
    optionsContainer: {
        backgroundColor: "rgba(255, 255, 255, 0)"
    }
};

const shadows = [
    {
        shadowColor: 'black',
        shadowOffset: {width: 10, height: 0},
        shadowOpacity: 0.1,
        shadowRadius: 15
    },
    {
        shadowColor: 'black',
        shadowOffset: {width: 4, height: 0},
        shadowOpacity: 0.05,
        shadowRadius: 6
    },
]

const IconContainer = styled.View`
    position: absolute;
    height: 100%;
    right : 0;
`;

const InputWrapper = styled.View`
    flex: 1;
    position : relative;
    height: 32px;
`;
const InputContainer = styled.View`
    height : 100%;
    flex-direction : row;
    align-items : center;
`;

const Label = styled.Text(({theme, label}) => ({
    ...theme.font['--text-xs-medium'],
    color: theme.colors['--color-gray-600'],
    marginRight: label ? 20 : 0,
}));

const Input = styled.TextInput`
    /* flex:1; */
    padding: ${({theme}) => theme.space['--space-4']};
    /* paddingLeft: 12, */
    padding-right: ${({theme}) => theme.space['--space-12']};
    /* width : 85%; */
    padding-left : ${({theme}) => theme.space['--space-12']};
`;

const SuggestionsContainer = styled.View`
    width : 100%;
    max-height: 300px;
    position: absolute;
    top: 5px;
    border-radius : 8px;
    border : 1px solid ${({theme}) => theme.colors['--color-gray-400']};
    background-color : ${({theme}) => theme.colors['--default-shade-white']};
    z-index : 1;
`;

const NoSuggestionsContainer = styled.View`
    margin : ${({theme}) => theme.space['--space-10']} ${({theme}) => theme.space['--space-6']} ;
`;

const InputText = styled.Text(({theme, fontStyle, textColor}) => ({
    ...theme.font[fontStyle],
    color: theme.colors[textColor]
}));

const OptionContainer = styled.TouchableOpacity`
    width : 100%;
    height : 32px;
    padding-left: ${({theme}) => theme.space['--space-12']};
    padding-right: ${({theme}) => theme.space['--space-12']};
    background-color : ${({theme, backgroundColor}) => theme.colors[backgroundColor]};
    justify-content: center;

`;

const ValueContainer = styled.View`
    flex: 1;
    display : flex;
    position : absolute;
    top : 3;
    bottom : 3;
    flex-direction : row;
    margin-left : 10px;
    /* alignSelf: 'center', */
    align-items: center;
    padding-right: ${({theme}) => theme.space['space-4']};
    width : 80%;
`;
/* border : 1px solid ${ ({theme}) => theme.colors['--color-red-300']};
   background-color : ${ ({theme}) => theme.colors['--color-red-100']};
   border-radius: 2px; */

const LabelContainer = Styled.View(({theme, label}) => ({
    // ...theme.font['--text-xs-medium'],
    // color: theme.colors['--color-gray-600'],
    minWidth: 70,
    marginRight: label ? 20 : 0
}));

const TextInputWrapper = styled.View`
    flex:1;
    height : 32px;
`;
const TextInputContainer = styled.View`
    position: relative;
    height : 100%;
    width : 100%;
    border-width: 1px;
    border-color: ${({theme, hasError}) => hasError ? theme.colors['--color-red-600'] : theme.colors['--color-gray-300']};
    background-color : ${({theme, backgroundColor, enabled}) => enabled ? theme.colors['--default-shade-white'] : backgroundColor ? theme.colors[backgroundColor] : theme.colors['--default-shade-white']};
    border-radius: 4px;
    justify-content : center;
    /* box-shadow : ${({isFocussed, theme}) => isFocussed ? theme.shadow['--shadow-lg'] : null}; */
`;

// const ValueContainer = styled.View(({theme, enabled = {}}) => ({
//     // ...theme.font['--text-base-regular'],
//     flex: 1,
//     flexDirection: 'column',
//     color: theme.colors['--color-gray-900'],
//     backgroundColor: enabled ? theme.colors['--default-shade-white'] : theme.colors['--color-gray-100'],
//     borderColor: theme.colors['--color-gray-300'],
//     borderWidth: 1,
//     borderRadius: 4,
//     height: 32,
//     justifyContent: 'center',
// }));

function SearchableOptionsField({
                                    text,
                                    label,
                                    options,
                                    oneOptionsSelected,
                                    onChangeText,
                                    onClear,
                                    enabled = true,
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
        return <OptionContainer onPress={() => onOptionPress(item)} theme={theme}>
            <InputText numberOfLines={1} theme={theme} textColor="--color-gray-800"
                       fontStyle="--text-sm-regular">{item?.name || ""}</InputText>
        </OptionContainer>
    };

    return (
        <InputContainerComponent>
            {
                label &&
                <LabelContainer>
                    <InputLabelComponent label={label}/>
                </LabelContainer>
            }

            <TextInputWrapper theme={theme} enabled={enabled}>
                <TextInputContainer>

                    {
                        (enabled && !!selectedValue)

                            // true
                            ? <>
                                <ValueContainer>
                                    <InputText numberOfLines={1} fontStyle="--text-sm-regular"
                                               textColor="--color-gray-700">{selectedValue?.name || ""}</InputText>
                                </ValueContainer>

                                <IconContainer>
                                    <IconButton
                                        Icon={<ClearIcon/>}
                                        onPress={onClearPress}
                                    />
                                </IconContainer>
                            </>
                            :
                            <View>
                                <Input
                                    theme={theme}
                                    onChangeText={(value) => {
                                        onChangeText(value);
                                        handlePopovers(true)
                                    }}
                                    editable={enabled}
                                    value={selectedValue?.name || text}
                                    ref={textInputRef}
                                />

                                {
                                    hasError &&
                                    <View style={{position: 'absolute'}}>
                                        <InputErrorComponent errorMessage={errorMessage}/>
                                    </View>
                                }

                            </View>

                    }

                    {

                        (!selectedValue && text && isPopoverOpen)
                            ?
                            <MultipleShadowsContainer shadows={shadows}>
                                <SuggestionsContainer theme={theme}>
                                    {
                                        options.length === 0 ?

                                            <NoSuggestionsContainer theme={theme}>
                                                <InputText theme={theme} textColor="--color-gray-300"
                                                           fontStyle="--text-xs-medium">No Suggestions Found</InputText>
                                            </NoSuggestionsContainer>

                                            :

                                            <FlatList
                                                keyExtractor={(item, index) => index + ''}
                                                data={options}
                                                renderItem={renderOptions}
                                            />
                                    }

                                </SuggestionsContainer>
                            </MultipleShadowsContainer>
                            : null
                    }
                </TextInputContainer>
            </TextInputWrapper>

        </InputContainerComponent>


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
        top: 35,
        padding: 12,
        paddingTop: 8,
        paddingBottom: 2,
        width: '100%',
        maxHeight: 300,
        borderRadius: 4,
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
        // backgroundColor: '#FFFFFF'
    },
    inputField: {
        // flex: 1,
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

export default SearchableOptionsField;
