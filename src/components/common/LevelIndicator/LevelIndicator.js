import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet} from "react-native";


const backgroundColor = "#4E5664";
const idealColor = "#48BB78";
const idealColor2 = "#ECC94B";
const critical = "#ED8936";


function LevelIndicator(props) {

    const {
        max,
        min,
        ideal,
        critical,
        level
    } = props;


    const progress = '100%';
    const color = idealColor;


    return (
        <View style={styles.container}>

            {/*  PROGRESS  */}
            <View style={{
                backgroundColor: color,
                height: '100%',
                width: progress
            }}/>

            {/*  DIVIDERS  */}
            <View style={styles.dividerContainer}>
                <View style={styles.divider}/>
                <View style={styles.divider}/>
                <View style={styles.divider}/>
                <View style={styles.divider}/>
            </View>

        </View>
    );
}

LevelIndicator.propTypes = {};
LevelIndicator.defaultProps = {};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        // flex: 1,
        width: 60,
        height: 4,
        borderRadius: 4,
        backgroundColor,
        overflow: 'hidden'
    },
    dividerContainer: {
        position: 'absolute',
        display: 'flex',
        flex: 1,
        // width: '100%',
        // height: '100%',
        // justifyContent: 'center',
        backgroundColor: "red"
    },
    divider: {
        height: "100%",
        width: 2,
        backgroundColor: "#E3E8EF"
    }
});


export default LevelIndicator;
