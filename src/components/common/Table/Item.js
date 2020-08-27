import React, {useContext} from 'react'; 
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {withModal} from 'react-native-modalfy';
import CheckBoxComponent from "../Checkbox";

import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';

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


const ItemWrapper = styled.TouchableOpacity` 
    height : 46px;
    width : 100%;
`;

const ItemContainer = styled.View`
    height: 100%;
    width: 100%;
    flex-direction: row;
    background-color: ${ ({theme}) => theme.colors['--default-shade-white']};
`;

const ItemView = styled.View`
    flex:1;
    flex-direction: row;
    align-items: center;
    border-bottom : 1px solid ${ ({theme}) => theme.colors['--color-gray-300']};
    margin-left : ${ ({hasCheckBox, theme}) => !hasCheckBox && theme.space['--space-48']};
`;
function Item({
        itemView = () => {},
        hasCheckBox = true,
        isChecked = false, 
        onCheckBoxPress = ()=>{},
        onItemPress=() => {}
    }){

    const theme = useTheme();

    
    return (
        <ItemWrapper onPress={onItemPress}>
            <ItemContainer theme = {theme}>
                {
                    hasCheckBox &&
                        <CheckBoxComponent
                            isCheck={isChecked}
                            onPress={onCheckBoxPress}
                        />
                }
                
                <ItemView theme = {theme} hasCheckBox = {hasCheckBox}>
                    {itemView}
                </ItemView>
            </ItemContainer>
            
        </ItemWrapper>
    );
};

export default Item

Item.propTypes = {};
Item.defaultProps = {};
