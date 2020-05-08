import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import CheckBoxComponent from "../Checkbox";
import Collapsible from 'react-native-collapsible';
import PropTypes from 'prop-types';


/**
 *
 * @param hasCheckBox{bool}
 * @param isChecked{bool}
 * @param onCheckBoxPress{function}
 * @param onItemPress{function}
 * @param childView{node}
 * @param render{function} function to render item view that take collapse a s call back.
 * @returns {*}
 * @constructor
 */
const CollapsibleListItem = ({
                                 hasCheckBox,
                                 isChecked,
                                 onCheckBoxPress,
                                 onItemPress,
                                 childView,
                                 render,
                                 children
                             }) => {

    const [isCollapsed, setCollapsed] = useState(true);

    const collapse = () => {
        console.log("collapse press")
        setCollapsed(!isCollapsed);
    }

    return (
        <TouchableOpacity onPress={onItemPress}>
            <View style={styles.container}>
                <View style={styles.list}>
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
                        render(collapse, isCollapsed)
                    }
                </View>
                <Collapsible collapsed={isCollapsed}>
                    <View style={styles.divider}/>
                    {
                        !isCollapsed &&
                        <View style={[styles.childContent]}>

                            {children}

                        </View>
                    }
                </Collapsible>
            </View>
        </TouchableOpacity>
    );
};

export default CollapsibleListItem

CollapsibleListItem.propTypes = {
    hasCheckBox: PropTypes.bool,
    isChecked: PropTypes.bool,
    onCheckBoxPress: PropTypes.func,
    onItemPress: PropTypes.func,
    childView: PropTypes.node,
    render: PropTypes.func
};
CollapsibleListItem.defaultProps = {};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        width: '100%',
        paddingBottom: 8,
        marginBottom: 10,
        paddingTop: 8,
        borderRadius: 8,
        borderWidth: 1,
        backgroundColor: '#FFFFFF',
        borderColor: "#E3E8EF",
    },
    divider: {
        // flex: 1,
        width: '100%',
        height: 2,
        borderBottomWidth: 1,
        borderBottomColor: "#E3E8EF",
        marginBottom: 20
    },
    list: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    childContent: {
        flex: 1,
        flexDirection: 'column',
        marginBottom: 6,
        // padding: 8,
        // marginTop: 0
    }
});
