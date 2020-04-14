import React from 'react';
import { View, StyleSheet,Text } from 'react-native'
import FloatingActionButton from './FloatingActionButton';

const FloatingActionComponent = ({isDisabled, toggleActionButton}) => {
    return (
        <View>
            <FloatingActionButton
                isDisabled = {isDisabled}
                toggleActionButton = {toggleActionButton}
            />
        </View>
    )
}

export default FloatingActionComponent

const styles = StyleSheet.create({

})