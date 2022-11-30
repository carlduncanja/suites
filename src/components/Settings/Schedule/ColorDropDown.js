import React, { useState, useEffect, } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';

import { getAppiontmentTypes, updateAppiontmentTypes } from '../../../api/network';

import DetailsPage from '../../common/DetailsPage/DetailsPage';
import TabsContainer from '../../common/Tabs/TabsContainerComponent';
import Table from '../../common/Table/Table';
import Item from '../../common/Table/Item';
import Footer from '../../common/Page/Footer';
import DataItem from '../../common/List/DataItem';
import InputUnitFields from '../../common/Input Fields/InputUnitFields';
import ContentDataItem from '../../common/List/ContentDataItem';
import ConfirmationComponent from '../../ConfirmationComponent';
import ConfirmationCheckBoxComponent from '../../ConfirmationCheckBoxComponent'
import DropDownIcon from "../../../../assets/svg/dropDown";
import CollapsedIcon from "../../../../assets/svg/closeArrow";
import { PageContext } from '../../../contexts/PageContext';
import Header from '../../common/Table/Header';
import { useModal } from 'react-native-modalfy';
import { FlatList } from 'react-native-gesture-handler';
import WhiteTickIcon from '../../../../assets/svg/whiteTickIcon';
import LineDivider from '../../common/LineDivider';


const OptionContainer = styled.TouchableOpacity`
  height: 32px;
  padding-right: 12px;
  
`;


function ColorDropDown({
    isEditMode,
    item,
    zIndecator,
    selectedId,
    FlatListActivator,
    onUpdate = () => { },
    onSelect = () => { }

}) {

    const [dropDownActivated, setDropDownActivated] = useState(selectedId === item._id ? true : false)
    const [activateFlatList, setActivateFlatList] = useState(selectedId === item._id ? true : false)

    const colors = [
        { color: 'red' },
        { color: 'blue' },
        { color: 'teal' },
        { color: 'indigo' },
        { color: 'orange' },
        { color: 'pink' },
        { color: 'green' },
        { color: 'yellow' },
    ]

    const colorRender = color => {
        let backgroundColor = ''
        switch (color) {
            case 'red':
                backgroundColor = "#E53E3E";
                break
            case 'yellow':
                backgroundColor = "#ED8936";
                break
            case 'blue':
                backgroundColor = "#3182CE";
                break
            case 'pink':
                backgroundColor = "#D53F8C";
                break
            case 'green':
                backgroundColor = "#38A169";
                break
            case 'indigo':
                backgroundColor = "#3949AB"
                break
            case 'orange':
                backgroundColor = "#FB8C00"
                break
            case 'teal':
                backgroundColor = "#00897B"
                break
            default:
                backgroundColor = "#757575";
                break
        }
        return backgroundColor
    }

    const renderOption = (id, currentSelected) => {
        let option = ''

        if (id > currentSelected) {
            option = true
        }
        else {
            option = false;
        }

        return option
    }



    let backgroundColor = colorRender(item.color)
    let styleRender = renderOption(item._id, selectedId)
    let comparisonColor = item.color

    const renderOptions = ({ item }) => {
        //console.log("we got the data",items)
        let backgroundColor = colorRender(item.color)
        let textColor = item.color
        return (<OptionContainer onPress={() => {
            onUpdate(textColor)
        }}>

            <View style={[styles.box, { backgroundColor: backgroundColor, width: 64, height: 32, justifyContent: "center", borderRadius: 4, alignItems: 'center' }]}>

                {textColor === comparisonColor ?
                    <View style={styles.tickContianier}>
                        <WhiteTickIcon></WhiteTickIcon>
                    </View>
                    :
                    null
                }
            </View>

        </OptionContainer>)
    }


    return (
        <>
            <View >

                <View style={[styles.itemContianer, {
                }]}>

                    <Text style={styles.appiontmentTypeTittle}>{item?.name}</Text>
                    {dropDownActivated ?
                        null
                        :
                        <View style={[styles.container, { justifyContent: isEditMode ? "space-between" : "center" }]}>
                            <View style={[styles.box, { backgroundColor: backgroundColor, width: isEditMode ? 90 : 120, height: 16 }]}></View>

                            {isEditMode ?

                                <View style={styles.iconContianer}>
                                    <TouchableOpacity onPress={() => {
                                        setDropDownActivated(!dropDownActivated)
                                        setActivateFlatList(!activateFlatList)
                                        onSelect(item._id)
                                    }}>
                                        {dropDownActivated ? <CollapsedIcon /> : <DropDownIcon />}
                                    </TouchableOpacity>
                                </View> :
                                <View style={styles.iconContianer}></View>
                            }

                        </View>
                    }

                </View>

            </View>
            {activateFlatList  && isEditMode?
                <View style={styles.dropDown}>
                    <View style={styles.dividerContainer}>
                        <View style={{ width: '94%',borderBottomColor:"#E3E8EF", borderBottomWidth:1,  }} >
                        </View>
                        <TouchableOpacity style={styles.dividerButton} 
                        onPress={()=>{
                            onSelect('')
                        }}
                        >
                            <CollapsedIcon />
                        </TouchableOpacity>
                    </View>

                    <DataItem align="flex-start" text={`Select a color to represent a ${item?.name} from below`} color="--color-gray-500" fontStyle="--text-base-medium" />
                    <FlatList
                        keyExtractor={(item, index) => `${index}`}
                        data={colors}
                        horizontal={true}
                        renderItem={renderOptions}
                        style={styles.dropDownStyle}
                    />
                </View>

                :
                null
            }

        </>)


}
export default ColorDropDown
const styles = StyleSheet.create({

    itemContianer: {
        flexDirection: 'row',
        flex: 2,
        marginBottom: 24,
        justifyContent: "space-between",
        top: 10

    },
    appiontmentTypeTittle:{
      color:'#3182CE',
      fontSize:16,

    },
    container: {
        borderColor: "#E3E8EF",
        borderWidth: 1,
        width: 134,
        height: 32,
        flexDirection: "row",
    },
    box: {
        top: 8,
        bottom: 8,
        right: 4,
        left: 4,
        position: "relative"
    },
    iconContianer: {
        justifyContent: "center",
        paddingRight: 8,
    },
    dropDownStyle: {
        marginBottom: 24,
        width: '100%',
        backgroundColor: "#FFFFFF",
        flex: 1,
    },
    dropDown: {
        borderBottomColor: "#E3E8EF",
        borderBottomWidth: 1,
        marginBottom: 24,
        marginTop:-30,
        height: 150
    },
    tickContianier: {
        borderColor: "#FFFFFF",
        width: "80%",
        height: '80%',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2
    },
    dividerContainer: {
        flexDirection: 'row',
        
    },
    dividerButton:{
        height:32,
        width:35.25,
        borderTopColor:"#E3E8EF",
        borderLeftColor:"#E3E8EF",
        borderTopWidth:1,
        borderLeftWidth:1,
        justifyContent:'center',
        alignItems:"center"
    }

})


//line 133
//                    width: item._id > selectedId && selectedId !== '' ? 324 : "100%",
