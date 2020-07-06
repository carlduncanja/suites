import React, { useState } from 'react';
import { View, StyleSheet,Text } from 'react-native'
import FloatingActionButton from './FloatingActionButton';
import { withModal } from 'react-native-modalfy';

const FloatingActionComponent = ({actionContent, modal}) => {

    const [isDisabled, setIsDisabled] = useState(false)

    const toggleActionButton = () => {
        setIsDisabled(!isDisabled)
        modal.openModal("ActionContainerModal",{ actionContent })
    }

    return (
        <View>
            <FloatingActionButton
                isDisabled = {isDisabled}
                toggleActionButton = {toggleActionButton}
            />
        </View>
    )
}

export default withModal(FloatingActionComponent) 

const styles = StyleSheet.create({

})