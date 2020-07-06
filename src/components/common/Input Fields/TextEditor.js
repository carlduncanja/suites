import React,{ useState } from "react";
import { View, StyleSheet, Text } from 'react-native';
import  CNRichTextEditor , { CNToolbar, getInitialObject , getDefaultStyles, convertToHtmlString, convertToObject  } from "react-native-cn-richtext-editor";
import Icon from 'react-native-vector-icons/Octicons';

const TextEditor = ({onFieldChange}) => {

    const defaultStyles = getDefaultStyles();

    const [selectedTag, setSelectedTag] = useState(['body'])
    const [selectedStyles, setSelectedStyles] = useState([])
    const [value, setValue] = useState([getInitialObject()])
   
    console.log("Default: ", defaultStyles)

    const customStyles = {...defaultStyles, body : {fontSize:14}, ol: {fontSize:14}, ul: {fontSize:14}}

    const handleSelectedStyleChange = (styles) => {
        setSelectedStyles(styles)
        // console.log("Style: ", styles)
    }
    const handleValueChange = (value) => {
        console.log("Value:", value)
        // let text = ""
        // value[0].content.map((item, index) => {
        //     item.NewLine ?
        //         console.log("Text Concat: ", `${item.text}.`)
        //         // text.concat(`${item.text}.`)
        //         :
        //         console.log("Text: ", item.text, item.NewLine, item.stype, index)
           
        // })
        
        // console.log("Value: ",value[0].content)
        setValue(value)
    }

    return (
        <View style={styles.container}>
            <View style={{minHeight: 35}}>
    
                <CNToolbar
                    style={{
                        height: 35, 
                        borderWidth:0, 
                        borderBottomWidth:1, 
                        borderRadius:0,
                        borderTopLeftRadius:4,
                        borderTopRightRadius:4,
                        alignItems:"center",
                        justifyContent:"flex-start"
                    }}
                    iconSetContainerStyle={{
                        // flexGrow: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginRight:10
                    }}
                        size={16}
                        iconSet={[
                            {
                                type: 'tool',
                                iconArray: [{
                                    toolTypeText: 'bold',
                                    buttonTypes: 'style',
                                    iconComponent:
                                        <Text style={[styles.toolbarButton,styles.boldButton]}>
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
                                            <Icon name = "list-ordered" size={20}/>
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
                                                <Icon name = "list-unordered" size={20}/>
                                            </View>
                                    }
                                ]
                            }
                            
                        ]}
                        selectedTag={selectedTag}
                        selectedStyles={selectedStyles}
                        onStyleKeyPress={(toolType)=>{editor.applyToolbar(toolType); console.log("Type", toolType)}}
                    />
                </View>
        
            <View style={styles.main}>
                <CNRichTextEditor                   
                    ref={input => editor = input}
                    onSelectedTagChanged={(tag)=>{setSelectedTag(tag)}}
                    onSelectedStyleChanged={(styles)=>{handleSelectedStyleChange(styles)}}
                    value={value}
                    style={{ 
                        backgroundColor : '#FFFFFF', 
                        padding:10
                    }}
                    styleList={customStyles}
                    onValueChanged={(value)=>handleValueChange(value)}
                />                        
            </View>
        </View>
    )
}

export default TextEditor

const styles = StyleSheet.create({
    container:{
        borderWidth:1,
        borderColor:"#CCD6E0",
        borderRadius:4
    },
    main: {
        // flex: 1,
        // marginTop: 10,
        // paddingLeft: 30,
        // paddingRight: 30,
        // paddingBottom: 1,
        alignItems: 'stretch',
        minHeight:100
    },
    toolbarButton: {
        //fontSize: 20,
        color:"black",
        //width: 28,
        //height: 28,
        textAlign: 'center'
    },
    italicButton: {
        fontStyle: 'italic',
        fontFamily:"Times New Roman"
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