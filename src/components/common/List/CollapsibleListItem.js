import React from 'react';
import {View, StyleSheet, TouchableOpacity, Animated} from 'react-native';
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
const CollapsibleListItem = ({
                      itemView,
                      hasCheckBox,
                      isChecked,
                      onCheckBoxPress,
                      onItemPress,
                      secondaryView
                  }) => {

    return (
        <TouchableOpacity onPress={onItemPress}>

            <View style={styles.container}>


                <View style={styles.list}>
                    <View style={{alignSelf: 'center', justifyContent: 'center', padding: 10, marginRight: 10}}>
                        <CheckBoxComponent
                            isCheck={isChecked}
                            onPress={onCheckBoxPress}
                        />
                    </View>
                    {
                        itemView
                    }
                </View>
                <Animated.View style={{flexDirection: 'column'}}>
                    <View/>

                    {
                        secondaryView
                    }
                </Animated.View>
            </View>

        </TouchableOpacity>
    );
};

export default CollapsibleListItem

CollapsibleListItem.propTypes = {};
CollapsibleListItem.defaultProps = {};

const styles = StyleSheet.create({
    container: {
        // flex:1,
        flexDirection: 'column',
        // flexWrap:'wrap',
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
    list: {
        flexDirection: 'row',
        alignItems: 'center',
    }
});
