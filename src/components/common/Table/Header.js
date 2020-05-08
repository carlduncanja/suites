import React, {Component, useContext, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {CheckedBox, PartialCheckbox} from '../Checkbox/Checkboxes';
import Checkbox from '../Checkbox/Checkbox';
import CheckBoxComponent from "../Checkbox";

const Header = ({headers, toggleHeaderCheckbox, isIndeterminate, checked, isCheckbox}) => {
    return (
        <View style={styles.headersContainer}>
            {
                isCheckbox &&
                <View style={{marginRight: 20}}>
                    <CheckBoxComponent
                        isIndeterminate={isIndeterminate}
                        onPress={toggleHeaderCheckbox}
                        isCheck={checked}
                    />
                </View>
            }

            {headers.map((header, index) => {
                return (
                    <View style={[styles.item, {alignItems: header.alignment, flex: header.flex || 1}, header.styles]} key={index}>
                        <Text style={styles.headerText}>{header.name}</Text>
                    </View>
                )
            })}
        </View>
    );
}

export default Header;

const styles = StyleSheet.create({
    headersContainer: {
        //flex:1,
        marginLeft: 10,
        flexDirection: 'row',
        //width:'100%'
    },
    item: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    headerText: {
        fontSize: 16,
        color: '#718096'
    }
});
