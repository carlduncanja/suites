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
function ListItem({
        itemView = () => {},
        hasCheckBox = true,
        isChecked = false,
        onCheckBoxPress = ()=>{},
        onItemPress=() => {}
    }){

    const theme = useTheme();

    const ListItemWrapper = styled.TouchableOpacity`
        margin-bottom : ${theme.space['--space-12']};
        height : 46px;
        background-color: ${theme.colors['--default-shade-white']};
        flex-direction: row;
        border-radius: 8px;
        border-width: 1px;
        border-color: ${theme.colors['--color-gray-300']};
    `

    const ItemView = styled.View`
        flex:1;
        flex-direction: row;
        align-items: center;
    `
    return (
        <ListItemWrapper onPress={onItemPress}>
            <CheckBoxComponent
                isCheck={isChecked}
                onPress={onCheckBoxPress}
            />
            <ItemView>
                {itemView}
            </ItemView>
        </ListItemWrapper>
    );
};

export default ListItem

ListItem.propTypes = {};
ListItem.defaultProps = {};
