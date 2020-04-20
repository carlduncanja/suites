import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text} from "react-native";


const backgroundColor = "#4E5664";
const idealColor = "#48BB78";
const idealColor2 = "#ECC94B";
const criticalColor = "#ED8936";


/**
 *
 * @param max {number}K
 * @param min {number}
 * @param ideal {number}LK
 * @param critical {number}
 * @param level {number}
 * @returns {*}
 * @constructor
 */
function LevelIndicator({max, min, ideal, critical, level}) {
    const calculateProgress = (max, level) => {
        const progress = level / max * 100;
        return Math.floor(progress)
    };

    const determineColor = (level) => {
        if (level >= ideal) return idealColor;
        else if (level < ideal && level > critical) return idealColor2;
        else if (level <= critical) return criticalColor;
        else if (!ideal && level > max * .5) return idealColor;
        else if (!critical && level < max * .25) return criticalColor;
        else if (!critical && level < max * .5) return idealColor2;
        else return idealColor2
    };

    const calculatedProgress = calculateProgress(max, level);
    const progress = `${calculatedProgress}%`;
    const color = determineColor(level);

    return (
        <View style={styles.container}>

            <Text style={styles.label}>{min}</Text>

            <View style={styles.progressContainer}>
                <View style={{flex: 1}}>
                    {/*  DIVIDERS  */}
                    <View style={styles.dividerContainer}>
                        <View style={[styles.divider, {}]}/>
                        <View style={[styles.divider, {}]}/>
                        <View style={[styles.divider, {}]}/>
                        <View style={[styles.divider, {}]}/>
                    </View>

                    {/*  PROGRESS  */}
                    <View style={{
                        position: 'absolute',
                        height: '100%',
                        backgroundColor: color,
                        width: progress
                    }}/>
                </View>
            </View>

            <Text style={styles.label}>{max}</Text>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    progressContainer: {
        width: 60,
        height: 4,
        borderRadius: 4,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor,
        overflow: 'hidden'
    },
    dividerContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        zIndex: 10,
    },
    divider: {
        height: "100%",
        width: 2,
        backgroundColor: "#E3E8EF"
    },
    label: {
        color: "#718096",
        fontSize: 12,
        fontWeight: "500",
    }
});


LevelIndicator.propTypes = {
    max: PropTypes.number.isRequired,
    min: PropTypes.number.isRequired,
    level: PropTypes.number.isRequired,
    ideal: PropTypes.number,
    critical: PropTypes.number,
};
LevelIndicator.defaultProps = {
    level: 0,
};

export default LevelIndicator;
