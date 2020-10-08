import React, { useContext } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { withModal } from 'react-native-modalfy';

import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
import CheckBoxComponent from '../Checkbox';

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

const ListItemWrapper = styled.TouchableOpacity`
    margin-bottom : ${ ({ theme }) => theme.space['--space-12']};
    height : 46px;
    width : 100%;
`;

const ListItemContainer = styled.View`
    height: 100%;
    width: 100%; 
    flex-direction: row;
    background-color: ${ ({ theme, isArchive }) => isArchive ? theme.colors['--color-gray-200'] : theme.colors['--default-shade-white']};
    border : 1px solid ${ ({ theme }) => theme.colors['--color-gray-300']};
    border-radius: 8px;
`;

const ItemView = styled.View`
    flex:1;
    flex-direction: row;
    align-items: center;
`;
function ListItem({
    isArchive = false,
    itemView = () => { },
    hasCheckBox = true,
    isChecked = false,
    onCheckBoxPress = () => { },
    onItemPress = () => { }
}) {
    const theme = useTheme();

    return (
        <ListItemWrapper onPress={onItemPress} theme={theme}>
            <ListItemContainer theme={theme} isArchive={isArchive}>
                <CheckBoxComponent
                    isCheck={isChecked}
                    onPress={onCheckBoxPress}
                />
                <ItemView >
                    {itemView}
                </ItemView>
            </ListItemContainer>

        </ListItemWrapper>
    );
}

export default ListItem;

ListItem.propTypes = {};
ListItem.defaultProps = {};
