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
 * @param onPressDisabled
 * @returns {*}
 * @constructor
 */

const Item = ({
                  itemView,
                  hasCheckBox,
                  isChecked,
                  onCheckBoxPress,
                  onItemPress,
                  onPressDisabled = false,
              }) => {

    return (
        <TouchableOpacity onPress={onItemPress} disabled={onPressDisabled}>
            <View style={styles.container}>
                {
                    hasCheckBox &&
                    <View style={{alignSelf: 'center', justifyContent: 'center', padding: 10, marginRight: 10}}>
                        <CheckBoxComponent
                            isCheck={isChecked}
                            onPress={onCheckBoxPress}
                        />
                    </View>
                }
                {
                    itemView
                }
            </View>
        </TouchableOpacity>
    );
};

export default Item

Item.propTypes = {};
Item.defaultProps = {};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 8,
        paddingTop: 8,
        width: '100%',
    },
})
