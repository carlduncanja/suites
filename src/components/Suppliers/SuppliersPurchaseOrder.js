import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {useModal, withModal} from 'react-native-modalfy';
import { TextInput } from 'react-native-gesture-handler';
import { useTheme } from 'emotion-theming';
import styled, { css } from '@emotion/native';
import PickListCard from '../CaseFiles/PickList/PickListCard';
import DeleteIcon from '../../../assets/svg/wasteIcon';
import RightArrow from '../../../assets/svg/rightArrow';
import NumberChangeField from '../common/Input Fields/NumberChangeField';
import LeftArrow from '../../../assets/svg/leftArrow';

import IconButton from '../common/Buttons/IconButton';
import CartCard from '../common/CartCard';
import AddOverlayDialog from '../common/AddOverlayDialog';
import DataItem from '../common/List/DataItem';
import ContentDataItem from '../common/List/ContentDataItem';
import OptionsField from '../common/Input Fields/OptionsField';
import { MenuOption, MenuOptions } from 'react-native-popup-menu';

const Row = styled.View`
    /* width : 100%; */
    height : 20px;
    flex-direction : row;
    margin-bottom : ${({ theme }) => theme.space['--space-24']};
    margin-top: 10px;
`;

const headers = [
    {
        name: 'Product',
        alignment: 'flex-start',
        flex: 2.5,
    },
    {
        name: 'Quantity',
        alignment: 'center',
        flex: 1.2
    },
    {
        name: 'Unit',
        alignment: 'center',
        flex: 2
    },
    {
        name: 'Actions',
        alignment: 'flex-end',
        flex: 1
    }
];

const UNIT_TYPES = {
    pack: 'pack',
    box: 'box'
};

const InputFieldContainer = styled.View`
    width : 100%;
    flex-direction: row;
    align-items: center;
`;

const SuppliersPurchaseOrder = ({ details, onUpdateItems, onClearPress, onListFooterPress }) => {
    const modal = useModal();
    const theme = useTheme();
    const { closeModals } = modal;
    const [purchaseOrders, setPurchaseOrders] = useState(details);
    const [fields, setFields] = useState({ orderFrequency: 'biweekly'});
    const [errorFields, setErrorFields] = useState({});
    const [orderFrequency, setOrderFrequency] = useState('Bi-Weekly');
    const [isFrequency, setIsFrequency] = useState(true);

    const onNumberArrowChange = id => operation => {
        const findIndex = purchaseOrders.findIndex(obj => obj._id === id);
        // const objQuantity = Object.assign(...purchaseOrders).amount || 1;
        const objQuantity = purchaseOrders[findIndex].amount || 1;
        // console.log("Quantity: ", typeof objQuantity, objQuantity);
        const updatedObj = {
            ...purchaseOrders[findIndex],
            amount: operation === 'sub' ? objQuantity === 1 ? objQuantity : objQuantity - 1 : objQuantity + 1
        };

        const updatedArray = [
            ...purchaseOrders.slice(0, findIndex),
            updatedObj,
            ...purchaseOrders.slice(findIndex + 1),
        ];
        setPurchaseOrders(updatedArray);
        onUpdateItems(updatedArray);
    };

    const onChangeField = id => value => {
        const findIndex = purchaseOrders.findIndex(obj => obj._id === id);
        const objQuantity = purchaseOrders[findIndex].amount || 1;
        const updatedObj = {
            ...purchaseOrders[findIndex],
            amount: value === 0 ? 1 : parseInt(value) || '1'
        };
        const updatedArray = [
            ...purchaseOrders.slice(0, findIndex),
            updatedObj,
            ...purchaseOrders.slice(findIndex + 1),
        ];
        setPurchaseOrders(updatedArray);
        onUpdateItems(updatedArray);
    };

    const onDeletePress = id => {
        const filteredArray = purchaseOrders.filter(obj => obj._id !== id);
        setPurchaseOrders(filteredArray);
        onUpdateItems(filteredArray);
    };

    const onClearItems = () => {
        setPurchaseOrders([]);
        onClearPress();
    };

    const onFooterPress = () => {
        const isValid = validateOrder();

        if (!isValid) {
            return;
        }

        let updatedPurchaseOrders = purchaseOrders.map(order => ({
            ...order,
            productId: order?._id,
            unit: 'pack'
        }));

        const repeating = isFrequency;
        const repeatingType = fields.orderFrequency;
        productUnits.map(item => {
            let findOrder = updatedPurchaseOrders.find(x => x._id === item._id);
            findOrder.unit = item.selected;
        });

        onListFooterPress({
            purchaseOrders: updatedPurchaseOrders,
            deliveryDate: fields.deliveryDate,
            repeating,
            repeatingType
        });
    };

    const validateOrder = () => {
        let isValid = true;
        const requiredFields = ['deliveryDate'];

        const errorObj = { ...errorFields } || {};

        for (const requiredField of requiredFields) {
            if (!fields[requiredField]) {
                // console.log(`${requiredField} is required`)
                isValid = false;
                errorObj[requiredField] = 'Value is required.';
            } else {
                delete errorObj[requiredField];
            }
        }

        setErrorFields(errorObj);
        console.log('Error obj: ', errorObj);

        return isValid;
    };

    const onFieldChange = fieldName => value => {
        const updatedFields = { ...fields };
        setFields({
            ...updatedFields,
            [fieldName]: value
        });

        const updatedErrors = { ...errorFields };
        delete updatedErrors[fieldName];
        setErrorFields(updatedErrors);
    };

    const [productUnits, setProductUnits] = useState([]);
    
    const listItemFormat = item => {
        const newUnit = productUnits.filter(result => result._id !== item._id);
        const findUnit = productUnits.filter(result => result._id === item._id);
        let defaultUnit = 'pack';

        if (findUnit.length > 0) {
            defaultUnit = findUnit[0].selected;
        }

        return (
            
            <Row theme={theme}>
                <DataItem
                    text={item?.name}
                    fontStyle="--text-base-medium"
                    color="--color-gray-800"
                    flex={2}
                />
                <NumberChangeField
                    onChangePress={onNumberArrowChange(item?._id)}
                    onAmountChange={onChangeField(item?._id)}
                    value={item.amount.toString()}
                    align="center"
                    flex={2}
                />

                <ContentDataItem
                    align="flex-end"
                    flex={1}
                    content={(
                        <InputFieldContainer>
                            <OptionsField
                                align="center"
                                text={defaultUnit[0].toUpperCase() + defaultUnit.slice(1)}
                                oneOptionsSelected={value => {                                
                                    newUnit.push({_id: item?._id, selected: value})
                                    setProductUnits(newUnit);
                                }}
                                menuOption={(
                                    <MenuOptions>
                                        <MenuOption value="pack" text="Pack"/>
                                        <MenuOption value="box" text="Box"/>
                                    </MenuOptions>
                                )}
                            />
                        </InputFieldContainer>
                    )}
                />

                <ContentDataItem
                    align="flex-end"
                    flex={1.3}
                    content={(
                        <IconButton
                            Icon={<DeleteIcon />}
                            onPress={() => onDeletePress(item?._id)}
                        />
                    )}
                />
            </Row>
        );
    };

    return (
        <CartCard
            title="Cart"
            closeModal={() => closeModals('OverlayInfoModal')}
            listItemFormat={listItemFormat}
            headers={headers}
            isCheckBox={false}
            onBackPress={() => {
                navigation.navigate('purchase-order');
            }}
            data={purchaseOrders}
            onFooterPress={onFooterPress}
            onClearPress={onClearItems}
            hasSearch={false}
            footerTitle="COMPLETE ORDERS"
            onDateChange={onFieldChange}
            errors={errorFields}
            fields={fields}
            onFieldChange={onFieldChange}
            isFrequency={isFrequency}
            setIsFrequency={setIsFrequency}
        />

    );
};

export default SuppliersPurchaseOrder;

const styles = StyleSheet.create({
    listDataContainer: {
        height: 26,
        // marginBottom : 50,
        flexDirection: 'row',
        backgroundColor: 'red',
        // justifyContent:'space-between'
    }

});
