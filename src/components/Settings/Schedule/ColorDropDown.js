import React, { useState, useEffect, } from 'react';
import { View, Text, StyleSheet, Touchable } from 'react-native';
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
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';



const OptionContainer = styled.TouchableOpacity`
  width: 100%;
  height: 40px;
  padding-left: 4px;
  padding-right: 4px;
  background-color: "#FFFFF"
  justify-content: center;
  
`;


function ColorDropDown({
    isEditMode,
    item,
    onUpdate = () => { }
}) {

    const [dropDownActivated, setDropDownActivated] = useState(false)
    const [activateFlatList, setActivateFlatList] = useState(false)

    const colors = [
        { color: 'red' },
        { color: 'blue' },
        { color: 'teal' },
        { color: 'indego' },
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
            default:
                backgroundColor = "#757575";
                break
        }
        return backgroundColor
    }


    let backgroundColor = colorRender(item.color)

    const renderOptions = ({ item }) => {
        let backgroundColor = colorRender(item.color)

        return (<OptionContainer >
            <TouchableOpacity onPress={() => {
                onUpdate(backgroundColor)
            }}>
                <View style={[styles.box, { backgroundColor: backgroundColor, width: 120, height: 16 }]}></View>
            </TouchableOpacity>
        </OptionContainer>)
    }

    return (
        <View>
            <View style={styles.itemContianer}>
                <DataItem flex={2} align="flex-start" text={item?.name} color="--color-blue-600" fontStyle="--text-base-medium" />
                <View style={[styles.container, { justifyContent: isEditMode ? "space-between" : "center" }]}>
                    <View style={[styles.box, { backgroundColor: backgroundColor, width: isEditMode ? 94 : 120, height: 16 }]}></View>
                    {isEditMode ?
                        <View style={styles.iconContianer}>
                            <TouchableOpacity onPress={() => {
                                setDropDownActivated(!dropDownActivated)
                                setActivateFlatList(!activateFlatList)
                            }}>
                                {dropDownActivated ? <CollapsedIcon /> : <DropDownIcon />}
                            </TouchableOpacity>
                        </View> :
                        <View style={styles.iconContianer}></View>
                    }

                </View>
            </View>
            {activateFlatList ?
                <View style={styles.dropDown}>
                    <View style={styles.dropDownStyle}>
                        <FlatList
                            keyExtractor={(item, index) => `${index}`}
                            data={colors}
                            renderItem={renderOptions}
                        />
                    </View>
                </View>
                :
                null
            }
        </View>)


}
export default ColorDropDown
const styles = StyleSheet.create({
    itemContianer: {
        flexDirection: 'row',
        flex: 2,
        marginBottom: 24,
        justifyContent: "space-between",
        position: "relative",
        zIndex:-2


    },
    container: {
        //flex: 1,
        borderColor: "#E3E8EF",
        borderWidth: 1,
        width: 134,
        height: 32,
        //justifyContent: "space-between",
        flexDirection: "row"

    },
    box: {
        top: 8,
        bottom: 8,
        right: 4,
        left: 4

    },
    iconContianer: {
        justifyContent: "center",
        paddingRight: 8
    },
    dropDownStyle: {
        borderColor: "#E3E8EF",
        borderWidth: 1,
        flexDirection: "row",
        justifyContent: "center",
        position:"absolute",
        //zIndex: 5,
        width: 134,
        backgroundColor: "#FFFFFF",

    },
    dropDown: {
        zIndex: 1,
        flexDirection: 'row-reverse',
        backgroundColor: "#FFF",
        zIndex:2
    }

})