import React from 'react';
import {View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';


const ProgressIcon = ({icon, state}) => {

    let containerStyle = {};
    if (state === 'inactive') containerStyle = styles.inActive;
    else if (state === 'active') containerStyle = styles.active;
    else if (state === 'completed')  containerStyle = styles.completed;

    return (
        <View style={[
            styles.container,
            containerStyle
        ]}>
            {icon}
        </View>
    );
}

ProgressIcon.propTypes = {
    icon: PropTypes.element.isRequired,
    state: PropTypes.oneOf(['active', 'inactive', 'completed'])
};
ProgressIcon.defaultProps = {};


export default ProgressIcon;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFFFFF",
        borderRadius: 30,
        width: 48,
        height: 48,
        alignItems: 'center',
        justifyContent: "center",
        borderColor: '#B0C8D3',
        borderWidth: 4,
        padding: 10,
        marginRight: 10,
        marginLeft: 10,
    },
    inActive: {
        borderColor: '#E3E8EF',
        backgroundColor: "#EEF2F6",
    },
    completed: {
        borderColor: '#0CB0E7',
        margin: 0,
    },
    active: {
        shadowColor: "rgba(90,84,84,0.13)",
        shadowOffset: {
            width: 1,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 4
    }
})
