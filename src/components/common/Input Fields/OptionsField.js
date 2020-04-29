import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text} from "react-native";
import {Menu, MenuOption, MenuOptions, MenuTrigger} from "react-native-popup-menu";
import DropDownIcon from "../../../../assets/svg/dropDown";


function OptionsField({oneOptionsSelected, text, label, menuOption}) {
    return (
        <View style={styles.container}>
            <Text style={[
                styles.textLabel, {
                    marginRight: label ? 20 : 0
                }
            ]}>
                {label}
            </Text>
            <Menu onSelect={oneOptionsSelected} style={{flex: 1}}>
                <MenuTrigger>
                    <View style={styles.inputField}>
                        <Text>{text}</Text>
                        <DropDownIcon/>
                    </View>
                </MenuTrigger>
                {
                    menuOption
                }
            </Menu>
        </View>
    );
}

OptionsField.propTypes = {};
OptionsField.defaultProps = {};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center'
    },
    textLabel: {
        fontSize: 12,
        color: '#718096',
        fontWeight: '500',
    },
    inputWrapper: {
        alignItems: 'center',
    },
    inputField: {
        // flex: 1,
        width: '100%',
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: '#E3E8EF',
        borderRadius: 4,
        paddingLeft: 10,
        paddingRight: 10,
        height: 32,
    }
});

export default OptionsField;
