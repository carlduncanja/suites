import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from 'react-native';
import CNRichTextEditor, { CNToolbar, getInitialObject, getDefaultStyles, convertToHtmlString, convertToObject } from "react-native-cn-richtext-editor";
import Icon from 'react-native-vector-icons/Octicons';
import { isEmpty } from "lodash";
import { array } from "prop-types";

const TextEditor = ({ onFieldChange }) => {

    const defaultStyles = getDefaultStyles();

    const [selectedTag, setSelectedTag] = useState(['body'])
    const [selectedStyles, setSelectedStyles] = useState([])
    const [value, setValue] = useState([getInitialObject()]);
    const [textEntered, setTextEntered] = useState('')

    // console.log("Default: ", defaultStyles)

    const customStyles = { ...defaultStyles, body: { fontSize: 14 }, ol: { fontSize: 14 }, ul: { fontSize: 14 } }

    const handleSelectedStyleChange = (styles) => {
        setSelectedStyles(styles)
        //console.log("Style: ", styles)
    }

    useEffect(() => {
        console.log("aMOUNT OF SELECTED STYLEAS:", selectedStyles.length);
    }, [selectedStyles])



    const handleValueChange = (value = []) => {
        console.log("Value:", value)

        value.map(item => {
            if (selectedStyles.length === 0) {
                setTextEntered(item.content[0].text)
            } else
                if (selectedStyles.length === 1) {
                    setTextEntered(item.content[0].text + item.content[1]?.text)
                } else
                    if (selectedStyles.length === 2) {
                        setTextEntered(item.content[0].text + item.content[1]?.text + item.content[2]?.text)
                    } else
                        if (selectedStyles.length === 3) {
                            setTextEntered(item.content[0].text + item.content[1]?.text + item.content[2]?.text + item.content[3]?.text)
                        }
        })



        console.log("Text entered has:", textEntered);

        return (textEntered);
    }



    return (
        <View style={styles.container}>
            <View style={{ minHeight: 35 }}>

                <CNToolbar
                    style={{
                        height: 35,
                        borderWidth: 0,
                        borderBottomWidth: 1,
                        borderRadius: 0,
                        borderTopLeftRadius: 4,
                        borderTopRightRadius: 4,
                        alignItems: "center",
                        justifyContent: "flex-start"
                    }}
                    iconSetContainerStyle={{
                        // flexGrow: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginRight: 10
                    }}
                    size={16}
                    iconSet={[
                        {
                            type: 'tool',
                            iconArray: [{
                                toolTypeText: 'bold',
                                buttonTypes: 'style',
                                iconComponent:
                                    <Text style={[styles.toolbarButton, styles.boldButton]}>
                                        B
                                        </Text>
                            }]
                        },
                        {
                            type: 'tool',
                            iconArray: [{
                                toolTypeText: 'italic',
                                buttonTypes: 'style',
                                iconComponent:
                                    <Text style={[styles.toolbarButton, styles.italicButton]}>
                                        I
                                        </Text>
                            }]
                        },
                        {
                            type: 'tool',
                            iconArray: [{
                                toolTypeText: 'underline',
                                buttonTypes: 'style',
                                iconComponent:
                                    <Text style={[styles.toolbarButton, styles.underlineButton]}>
                                        U
                                        </Text>
                            }]
                        },
                        {
                            type: 'tool',
                            iconArray: [{
                                toolTypeText: 'lineThrough',
                                buttonTypes: 'style',
                                iconComponent:
                                    <Text style={[styles.toolbarButton, styles.lineThroughButton]}>
                                        T
                                        </Text>
                            }]
                        },
                        {
                            type: 'tool',
                            iconArray: [
                                {
                                    toolTypeText: 'ol',
                                    buttonTypes: 'tag',
                                    iconComponent:
                                        <View>
                                            <Icon name="list-ordered" size={20} />
                                        </View>
                                }
                            ]
                        },
                        {
                            type: 'tool',
                            iconArray: [
                                {
                                    toolTypeText: 'ul',
                                    buttonTypes: 'tag',
                                    iconComponent:
                                        <View >
                                            <Icon name="list-unordered" size={20} />
                                        </View>
                                }
                            ]
                        }

                    ]}
                    selectedTag={selectedTag}
                    selectedStyles={selectedStyles}
                    onStyleKeyPress={(toolType) => { editor.applyToolbar(toolType); console.log("Type", toolType) }}
                />
            </View>

            <View style={styles.main}>
                <CNRichTextEditor
                    ref={input => editor = input}
                    onSelectedTagChanged={(tag) => { setSelectedTag(tag) }}
                    onSelectedStyleChanged={(styles) => { handleSelectedStyleChange(styles) }}
                    value={value}
                    style={{
                        backgroundColor: '#FFFFFF',
                        padding: 10
                    }}
                    styleList={customStyles}
                    onValueChanged={(value) => onFieldChange(handleValueChange(value))}
                />
            </View>
        </View>
    )
}

export default TextEditor

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: "#CCD6E0",
        borderRadius: 4
    },
    main: {
        // flex: 1,
        // marginTop: 10,
        // paddingLeft: 30,
        // paddingRight: 30,
        // paddingBottom: 1,
        alignItems: 'stretch',
        minHeight: 100
    },
    toolbarButton: {
        //fontSize: 20,
        color: "black",
        //width: 28,
        //height: 28,
        textAlign: 'center'
    },
    italicButton: {
        fontStyle: 'italic',
        fontFamily: "Times New Roman"
    },
    boldButton: {
        fontWeight: 'bold'
    },
    underlineButton: {
        textDecorationLine: 'underline'
    },
    lineThroughButton: {
        textDecorationLine: 'line-through'
    },
})