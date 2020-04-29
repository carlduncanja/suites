import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text, TouchableOpacity} from "react-native";
import ClearIcon from "../../../../assets/svg/clearIcon";

/**
 * Dialog component used in overlay modal.
 *
 * @param props
 * @returns {*}
 * @constructor
 */
function OverlayDialog(props) {
    const {
        title = " ",
        onClose = () => {
        },
        onPositiveButtonPress = () => {
        },
        positiveText = "DONE",
        buttonIcon = <View/>
    } = props;


    return (

        <View style={styles.container}>
            <View style={styles.headingContainer}>
                <Text>{title}</Text>

                <TouchableOpacity onPress={onClose}>
                    <ClearIcon/>
                </TouchableOpacity>
            </View>

            <View>
                {props.children}
            </View>

            <TouchableOpacity onPress={onPositiveButtonPress}>
                <View style={styles.footerButton}>
                    <Text style={styles.positiveText}>{positiveText}</Text>
                    {
                        buttonIcon
                    }
                </View>
            </TouchableOpacity>
        </View>

    );
}

OverlayDialog.propTypes = {
    title: PropTypes.string.isRequired,
    onClose: PropTypes.func,
    onPositiveButtonPress: PropTypes.func.isRequired,
    positiveText: PropTypes.string.isRequired
};
OverlayDialog.defaultProps = {};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFFFFF",
        borderRadius: 8,
        maxWidth: 636,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    headingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        paddingLeft: 12,
        paddingRight: 12,
        paddingTop: 8,
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#E3E8EF'
    },
    footerButton: {
        flex: 1,
        flexDirection: 'row',
        height: 57,
        borderTopWidth: 1,
        borderTopColor: '#E3E8EF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    positiveText: {
        fontSize: 16,
        marginRight: 10,
        marginLeft: 10,
        fontWeight: 'bold',
        color: "#3182CE",
    }
});

export default OverlayDialog;
