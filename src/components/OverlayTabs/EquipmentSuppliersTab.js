import React, { useState, useEffect } from 'react';
import {View, StyleSheet, Text} from 'react-native';
import PropTypes from 'prop-types';
import styled, {css} from '@emotion/native';
import Table from '../common/Table/Table';
import { useTheme } from 'emotion-theming';
import Footer from '../common/Page/Footer';
import Item from '../common/Table/Item';
import DataItem from '../common/List/DataItem';
import TouchableDataItem from '../common/List/TouchableDataItem';
import { useModal } from 'react-native-modalfy';
import { getVariantSupplierProducts } from '../../api/network';

const Headings = [
    {
        name: 'Supplier',
        alignment: 'flex-start',
        flex: 2,
    },
    {
        name: 'Phone',
        alignment: 'flex-start',
    },
    {
        name: 'Email',
        alignment: 'flex-start',
        flex: 1.5
    },
   
];


const SectionContainer = styled.View`
    display : flex;
    margin-bottom : ${ ({theme}) => theme.space['--space-40']};
`;

const SectionText = styled.Text( ({theme}) => ({
    ...theme.font['--text-xl-medium'],
    color : theme.colors['--color-gray-800'],
    marginBottom : 24,
}));


function EquipmentSuppliersTab({suppliers = []}) {

    const theme = useTheme();
    const modal = useModal();


    const suppliersListItem = ({supplier, inventoryVariant}) => {
        const { name = '', email = '', phone = ''} = supplier;
        const { product = '' } = inventoryVariant;
        return (
        <>
            <DataItem flex={2} fontStyle = "--text-base-regular" color = "--color-gray-800" text = {name}/>
            <TouchableDataItem fontStyle = "--text-base-regular" text = {phone}/>
            <TouchableDataItem flex = {1.5} fontStyle = "--text-base-regular" text = {email}/>
        </>)
    };

    const renderSupplierItem = (item) => {
        return <Item
            itemView = {suppliersListItem(item)}
            hasCheckBox = {false}
            onItemPress = {()=>{}}
        />

    };

    return (
        <>

            <Table
                data={suppliers}
                listItemFormat={renderSupplierItem}
                headers={Headings}
                isCheckbox={false}
            />


            <Footer
                hasPaginator = {false}
                hasActionButton = {true}
                hasActions = {false}
            />

        </>

    );
}


EquipmentSuppliersTab.propTypes = {};
EquipmentSuppliersTab.defaultProps = {};

export default EquipmentSuppliersTab;
