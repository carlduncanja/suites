import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';
import styled, { css } from '@emotion/native';
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
    {
        name: 'Product',
        alignment: 'flex-start',
    }
];


const SectionContainer = styled.View`
    display : flex;
    margin-bottom : ${({ theme }) => theme.space['--space-40']};
`;

const SectionText = styled.Text(({ theme }) => ({
    ...theme.font['--text-xl-medium'],
    color: theme.colors['--color-gray-800'],
    marginBottom: 24,
}));


function InventorySuppliersTab({ variantId = '', parentId }) {

    const theme = useTheme();
    const modal = useModal();

    const [suppliers, setSuppliers] = useState([]);

    useEffect(() => {
        getVariantSupplierProducts(variantId)
            .then(results => {
                const { data = [] } = results;
                setSuppliers(data);
                console.log('Suppliers: ', data);
            })
            .catch(error => {
                console.log('Failed to get variant suppliers', error)
                //TODO handle error cases.
            })
    }, [])

    const suppliersListItem = ({ supplier, inventoryVariant }) => {
        const { name = '', email = '', phone = '' } = supplier;
        const { product = '' } = inventoryVariant;
        return (
            <>
                <DataItem fontStyle="--text-base-regular" color="--color-gray-800" text={name} />
                <TouchableDataItem fontStyle="--text-base-regular" text={phone} isPhone={true} />
                <TouchableDataItem flex={1.5} fontStyle="--text-base-regular" text={email} isEmail={true} />
                <TouchableDataItem fontStyle="--text-base-regular" text={product} />
            </>)
    };

    const renderSupplierItem = (item) => {
        return <Item
            itemView={suppliersListItem(item)}
            hasCheckBox={false}
            onItemPress={() => { }}
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
                hasPaginator={false}
                hasActionButton={true}
                hasActions={false}
            />

        </>

    );
}


InventorySuppliersTab.propTypes = {};
InventorySuppliersTab.defaultProps = {};

export default InventorySuppliersTab;
