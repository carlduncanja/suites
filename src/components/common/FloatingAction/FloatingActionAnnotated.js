import React, {Component, useContext} from 'react';
import {TouchableOpacity, StyleSheet, View, Text} from 'react-native';
import SvgIcon from '../../../../assets/SvgIcon'
import {withModal} from 'react-native-modalfy';
import MultipleShadowsContainer from '../MultipleShadowContainer';

import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';

const ActionButtonWrapper = styled.TouchableOpacity`
    height : 48px;
    width : 48px;
`;
const ActionButtonContainer = styled.View`
    height : 100%;
    width : 100%;
    border-radius : 24px;
    background-color : ${ ({theme}) => theme.colors['--default-shade-white']};
    justify-content : center;
    align-items : center;
`;

const shadows = [
    {
        shadowColor: 'black',
        shadowOffset: { width: 10, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 15
      },
      {
        shadowColor: 'black',
        shadowOffset: { width: 4, height: 0 },
        shadowOpacity: 0.05,
        shadowRadius: 6
      },
]

function FloatingActionAnnotated ({toggleActionButton, icon, value, showValue = true}) {
    const Icon = icon
    const theme = useTheme();
    return (
        <>
            <MultipleShadowsContainer shadows = {shadows}>
                <ActionButtonWrapper onPress = {()=>{toggleActionButton();}}>
                    <ActionButtonContainer>
                        <Icon/>
                    </ActionButtonContainer>
                </ActionButtonWrapper>
            </MultipleShadowsContainer>
            

            {/* <TouchableOpacity
                style={[styles.container, styles.shadow, {
                    // backgroundColor: isDisabled ?  "#A0AEC0" : "#4299E1"
                }]}
                onPress={() => {
                    toggleActionButton();
                }}
            >
                <Icon/>
            </TouchableOpacity> */}
            { 
                showValue &&
                <View style={styles.valueBox}>
                    <Text style={styles.textStyle}>{value}</Text>
                </View>
            }
        </>

    );
}

export default withModal(FloatingActionAnnotated);

const styles = StyleSheet.create({
    container: {
        height: 48,
        width: 48,
        borderRadius: 30,
        // borderWidth:1,
        // borderColor:'#E3E8EF',
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center'
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 1,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 25
    },
    valueBox: {
        position: 'absolute',
        height: 20,
        width: 30,
        borderRadius: 4,
        // padding:10,
        backgroundColor: '#F56565',
        left: 35,
        bottom: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textStyle: {
        fontSize: 10,
        color: '#FFFFFF',
        fontWeight: '500'
    }
})
