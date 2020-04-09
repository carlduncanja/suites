import React, {useContext} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {withModal} from 'react-native-modalfy';
import CheckBoxComponent from "../Checkbox";


/**
 *
 * @param itemView
 * @param hasCheckBox
 * @param isChecked
 * @param onCheckBoxPress
 * @param onItemPress
 * @returns {*}
 * @constructor
 */
const ListItem = ({
                      itemView,
                      hasCheckBox,
                      isChecked,
                      onCheckBoxPress,
                      onItemPress
                  }) => {

    return (
        <TouchableOpacity onPress={onItemPress}>
            <View style={styles.container}>
                <View style={{alignSelf: 'center', justifyContent: 'center', padding: 10}}>
                    <CheckBoxComponent
                        isCheck={isChecked}
                        onPress={onCheckBoxPress}
                    />
                </View>
                {
                    itemView
                }
            </View>
        </TouchableOpacity>
    );
};

export default ListItem


ListItem.propTypes = {};
ListItem.defaultProps = {};


const styles = StyleSheet.create({
    container: {
        // flex:1,
        flexDirection: 'row',
        // flexWrap:'wrap',
        alignItems: 'center',
        //justifyContent:'center',
        // padding:10,
        paddingBottom: 8,
        paddingTop: 8,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#E3E8EF",
        width: '100%',
        marginBottom: 10,
        // justifyContent:'center'
    },
})
