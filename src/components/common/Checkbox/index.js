import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, TouchableOpacity} from "react-native";
import Svg, {Path} from "react-native-svg";


const tickSVG = (<Svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path
        d="M9.4001 1.99998L8.0001 0.599976L4.0001 4.59998L2.0001 2.59998L0.600098 3.99998L4.0001 7.39998L9.4001 1.99998Z"
        fill="#48BB78"/>
</Svg>);

const indeterminateSvg = <Svg width="8" height="2" viewBox="0 0 8 2" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path d="M8 2H0V0H8V2Z" fill="#718096"/>
</Svg>;

function CheckBoxComponent({isCheck, isIndeterminate, onPress}) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.container}>
                {
                    isIndeterminate
                        ? indeterminateSvg
                        : isCheck
                            ? tickSVG
                            : <View/>
                }
            </View>
        </TouchableOpacity>
    );
}

CheckBoxComponent.propTypes = {};
CheckBoxComponent.defaultProps = {};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFFFFF",
        borderColor: "#CCD6E0",
        borderWidth: 1,
        borderRadius: 4,
        height: 16,
        width: 16,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default CheckBoxComponent;
