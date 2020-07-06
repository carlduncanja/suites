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
        buttonIcon = <View/>,
        // handlePopovers = () =>{}
    } = props;


    return (

        <View style={styles.container}>
            <View style={styles.headingContainer}>
                <Text>{title}</Text>

                <TouchableOpacity onPress={onClose}>
                    <ClearIcon/>
                </TouchableOpacity>
            </View>


            <TouchableOpacity style={styles.footerButton} onPress={onPositiveButtonPress}>
                <View>
                    <Text style={styles.positiveText}>{positiveText}</Text>
                    {
                        buttonIcon
                    }
                </View>
            </TouchableOpacity>

            <TouchableOpacity 
                onPress={()=>{console.log("Touchaed"); 
                // handlePopovers(false)()
            }} 
                activeOpacity={1}
            >
                {props.children}
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
        position: 'relative',
        backgroundColor: "#FFFFFF",
        borderRadius: 8,
        maxWidth: 636,
        paddingBottom: 67,
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
        position: 'absolute',
        height: 57,
        width: '100%',
        bottom: 0,
        flexDirection: 'row',
        borderBottomRightRadius: 8,
        borderBottomLeftRadius: 8,
        borderTopWidth: 1,
        borderTopColor: '#E3E8EF',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 0,
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
