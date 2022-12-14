import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { useTheme } from 'emotion-theming';
import styled, { css } from '@emotion/native';
import ListData from '../common/List/ListData';
import Data from '../common/Table/Data';
import Item from '../common/Table/Item';
import DataItem from '../common/List/DataItem';
import { formatDate } from '../../utils/formatter';

const ItemWrapper = styled.View`
    width:100%;
    height:76px;
    border-width: 1px;
    border-color: ${({ theme }) => theme.colors['--color-gray-500']};
    padding-bottom: 16px;
    padding-left:16px;
    padding-top:16px;
    padding-right:16px;
    margin-bottom : 12px;

    border-radius:8px;
    
`;

const TextItem = styled.Text(({ theme, color = '--color-gray-800', font = '--text-base-regular' }) => ({
    ...theme.font[font],
    color: theme.colors[color],
    paddingTop: 2
}));

function DoneAlertsList({ data = [] }) {
    const theme = useTheme();

    const listItem = ({ title, closedOn, body }) => (
        <ItemWrapper>
            <View style={styles.header}>
                <TextItem font={title === 'System' && '--text-base-bold'} color={'--color-gray-800'}>{title}</TextItem>
                <TextItem 
                color="--color-gray-500"
                >
                    {`${formatDate(closedOn, 'MMMM DD, YYYY')} `}
                </TextItem>

            </View>
            <TextItem>
                {body}
            </TextItem>
        </ItemWrapper>
    );

    const renderItem = item => (
        <View style={styles.itemHolder}>
            <Item
                hasCheckBox={false}
                isDisabled={true}
                itemView={listItem(item)}
            />
        </View>
    );

    return (
        <Data
            data={data}
            listItemFormat={renderItem}
        />
    );
}

const styles = StyleSheet.create({
    itemHolder: {
        margin: 25,
        width: '100%',
        marginLeft: 0

    } ,
    header:{
      flexDirection:'row',
      justifyContent:'space-between'
    }
})

DoneAlertsList.propTypes = { data: PropTypes.array.isRequired, };
DoneAlertsList.defaultProps = {};


export default DoneAlertsList;
