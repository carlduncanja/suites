import React, { useState } from 'react';
import { View, Text, StyleSheet } from "react-native";
import Dropdown from '../../Dropdown';
import OptionsField from '../../Input Fields/OptionsField';
import { transformToSentence } from '../../../../utils/formatter';
import { MenuOptions, MenuOption } from 'react-native-popup-menu';

const FrameSelectItem = ({ title, value, isEdiMode = false, options = [], onOneSelected = () => { } }) => { 
    
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{title}</Text>
            </View>
            <View style={[styles.valueContainer, { marginLeft: title == 'Unit' ? 30 : -15 }]}>
                {isEdiMode ?
                    <OptionsField
                        text={transformToSentence(value)}
                        oneOptionsSelected={(value)=>onOneSelected(value)}
                        menuOption={(
                            <MenuOptions>
                                {options.map((option, index) => {
                                    return (
                                        <MenuOption value={option} text={option} />
                                    )
                                })

                                }
                            </MenuOptions>
                        )}
                    />

                    :
                    <Dropdown selectedValue={value} />
                }
            </View>
        </View>
    );
}

export default FrameSelectItem;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        margin:10,
        marginRight:20

    },
    titleContainer: {
        marginRight: 20,
        // width:'32%',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    title: {
        color: '#718096',
        fontSize: 16
    },
    valueContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderColor: "#CCD6E0",
        borderWidth: 1,
        borderRadius: 4,
        padding: 4,
    },
    value: {
        color: "#1D2129",
        fontSize: 16
    }
})