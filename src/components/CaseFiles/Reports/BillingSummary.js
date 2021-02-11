import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
import { currencyFormatter } from '../../../utils/formatter';
import DataItem from '../../common/List/DataItem';

const BillingDetailsWrapper = styled.View`
    width : 100%;
    align-items : flex-end;
`;
const BillingDetailsContainer = styled.View`
    width : 245px;
    flex-direction : column;
    justify-content : space-evenly;
`;

const DataRow = styled.View`
    width : 100%;
    height : 18px;
    margin-bottom : ${ ({theme}) => theme.space['--space-12']};
    flex-direction : row;
    justify-content : space-between;
`;

const BillingDetails = ({subtotal = 0, discount = 0, tax = 0, total = 0}) => {
    const theme = useTheme();

    const billingDetails = [
        {
            name: 'Balance',
            value: `$ ${currencyFormatter(subtotal)}`
        },
        {
            name: 'Discount',
            value: `-$ ${currencyFormatter(discount)}`
        },
        {
            name: 'Tax',
            value: `${tax * 100}%`
        },
        {
            name: 'Total Due',
            value: `$ ${currencyFormatter(total)}`
        }
    ];
    return (
        <BillingDetailsWrapper>
            <BillingDetailsContainer>

                {
                    billingDetails.map((detail, index) => (
                        <DataRow theme={theme} key={index}>
                            <DataItem text={detail.name} fontStyle="--text-base-medium" color="--color-blue-600"/>
                            <DataItem text={detail.value} align="flex-end" fontStyle="--text-lg-regular" color="--color-gray-800"/>
                        </DataRow>
                    ))
                }

            </BillingDetailsContainer>
        </BillingDetailsWrapper>
    );
};

export default BillingDetails;

const styles = StyleSheet.create({container: {marginRight: 20}});
