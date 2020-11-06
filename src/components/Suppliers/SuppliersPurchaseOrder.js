import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { withModal } from 'react-native-modalfy';
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

const Row = styled.View`
    /* width : 100%; */
    height : 20px;
    flex-direction : row;
    margin-bottom : ${({ theme }) => theme.space['--space-24']};

`;

const SuppliersPurchaseOrder = ({ details, onUpdateItems, onClearPress, onListFooterPress, modal }) => {
    const { closeModals } = modal;
    const theme = useTheme();
    const [purchaseOrders, setPurchaseOrders] = useState(details);
    const [fields, setFields] = useState({});
    const [errorFields, setErrorFields] = useState({});

    const headers = [
        {
            name: 'Product',
            alignment: 'flex-start',
            flex: 2,
        },
        {
            name: 'Quantity',
            alignment: 'center',
            flex: 1
        },
        {
            name: 'Unit',
            alignment: 'center',
            flex: 1
        },
        {
            name: 'Actions',
            alignment: 'flex-end',
            flex: 1
        }
    ];

    const onNumberArrowChange = id => operation => {
        console.log("what's in id?", id)
        const findIndex = purchaseOrders.findIndex(obj => obj._id === id);
        const objQuantity = Object.assign(...purchaseOrders).amount || 1;

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
        console.log('Change');
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

        const updatedPurchaseOrders = purchaseOrders.map(order => ({
            ...order,
            productId: order?._id
        }));
        console.log('UpdatedPurchase order: ', updatedPurchaseOrders);
        onListFooterPress({
            purchaseOrders: updatedPurchaseOrders,
            deliveryDate: fields.deliveryDate
        });
        // onUpdateItems(purchaseOrders)
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
        console.log('Field:', fieldName, value);
        const updatedFields = { ...fields };
        setFields({
            ...updatedFields,
            [fieldName]: value
        });

        const updatedErrors = { ...errorFields };
        delete updatedErrors[fieldName];
        setErrorFields(updatedErrors);
    };

    const listItemFormat = item => {
        //const { _id = '', name = '', amount = 1, unit = 'n/a' } = item;
        console.log("item has", item)
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
                />

                <DataItem
                    text={item?.unit}
                    fontStyle="--text-sm-regular"
                    color="--color-gray-800"
                    align="center"
                />

                <ContentDataItem
                    align="flex-end"
                    content={(
                        <IconButton
                            Icon={<DeleteIcon />}
                            onPress={() => onDeletePress(item?._id)}
                        />
                    )}
                />

                {/* <View style={{flex:1,alignItems:'center', flexDirection:'row', justifyContent:'space-between'}}> */}
                {/* <NumberChangeField
                        onChangePress = {onNumberArrowChange(_id)}
                        onAmountChange = {onChangeField(_id)}
                        value = {amount.toString()}
                    /> */}
                {/* <IconButton
                        Icon = {<LeftArrow strokeColor="#CCD6E0"/>}
                        onPress = {()=>onNumberArrowChange('subtract')(_id)}
                    />
                    <View style={{padding:5, paddingLeft:8, paddingRight:8, borderColor:'#CCD6E0', borderWidth:1}}>
                        <TextInput
                            value = {quantity.toString()}
                            onChangeText = {(value)=>onChangeField(_id)(value)}
                        />
                        <Text style={[styles.dataText,{color:"#4A5568"}]}>{item.quantity}</Text>
                    </View>
                    <IconButton
                        Icon = {<RightArrow strokeColor="#CCD6E0"/>}
                        onPress = {()=>onNumberArrowChange('add')(_id)}
                    />  */}
                {/* </View>
                <View style={{flex:1,alignItems:'flex-end'}}>
                    <IconButton
                        Icon = {<DeleteIcon/>}
                        onPress = {()=>onDeletePress(_id)}
                    />

                </View> */}
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
            data={purchaseOrders}
            onFooterPress={onFooterPress}
            onClearPress={onClearItems}
            hasSearch={false}
            footerTitle="COMPLETE ORDERS"
            onDateChange={onFieldChange}
            errors={errorFields}
            fields={fields}
        />

    );
};

export default withModal(SuppliersPurchaseOrder);

const styles = StyleSheet.create({
    listDataContainer: {
        height: 26,
        // marginBottom : 50,
        flexDirection: 'row',
        backgroundColor: 'red',
        // justifyContent:'space-between'
    }

});
