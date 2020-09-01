import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import ReportHeader from './ReportHeader';
import ReportHeaderSummary from './ReportHeaderSummary';
import ReportDetails from './ReportDetails';
import BillingSummary from './BillingSummary';
import { CaseFileContext } from '../../../contexts/CaseFileContext';
import {caseActions} from '../../../redux/reducers/caseFilesReducer';
import { formatAmount } from '../../../helpers/caseFilesHelpers';
import { currencyFormatter } from '../../../utils/formatter';

import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
import DataItem from '../../common/List/DataItem';


const ReportPreviewWrapper = styled.View`
    margin : 0;
    flex : 1;
`;

const ReportPreviewContainer = styled.View`
    height : 100%;
    width : 100%;
    background-color : ${ ({theme}) => theme.colors['--default-shade-white']};
`;
const ContentWrapper = styled.ScrollView`
    flex : 1;
    padding : ${ ({theme}) => `${theme.space['--space-30']} ${theme.space['--space-32']}`};
`

const ContentContainer = styled.ScrollView`
    height : 100%;
    width : 100%;
`;

const ItemRow = styled.View`
    flex-direction : row;
    width  : 100%;
    padding: 0px ${ ({theme}) => theme.space['--space-16']};
    height : 48px;
    align-items : center;
`


const Rectangle = () => (
    <View 
        style={{
            height: 1,
            backgroundColor: '#CCD6E0',
            marginBottom: 28,
            marginTop: 20
        }}
    />
);

const ReportPreview = ({type = '', details = {}, reportDetails }) => {

    const theme = useTheme();
    const { billingDetails = {}, customerDetails = {}, createdAt = '', amountDue = 0 } = details;
    const { address = {}, email = '', name = '', phone = '', billedFor = 'Medical Supplies' } = customerDetails;

    const reportNumber = type === 'Invoice' ? details.invoiceNumber : details.quotationNumber;
    const purchaseOrderNumber = details.purchaseOrderNumber || '';
    const { procedures = [], discount = 0, hasDiscount = false, tax = 0} = reportDetails;
    const total = hasDiscount ? (amountDue - (amountDue * discount)) * (1 + tax) : (amountDue) * (1 + tax);
    const formatDiscount = amountDue * discount;

    console.log('ReportDetails: ', reportDetails);

    const headers = [
        {
            name: 'Item Name',
            alignment: 'flex-start'
        },
        {
            name: 'Quanity',
            alignment: 'flex-start'
        },
        {
            name: 'Unit Price',
            alignment: 'center'
        },
        {
            name: 'Total',
            alignment: 'flex-end'
        }
    ];

    const listItemFormat = item => {
        const total = item?.cost || 0 * item?.amount || 0;
        return (
            <ItemRow>
                <DataItem text = {item?.name} fontStyle = {"--text-base-regular"} color = {"--color-gray-700"} />
                <DataItem text = {item?.amount} fontStyle = {"--text-base-regular"} color = {"--color-gray-700"} />
                <DataItem text = {`$ ${currencyFormatter(item.cost)}`} align = {"center"} fontStyle = {"--text-base-regular"} color = {"--color-gray-700"} />
                <DataItem text = {`$ ${currencyFormatter(total)}`} align = {"flex-end"} fontStyle = {"--text-lg-regular"} color = {"--color-gray-700"} />
            </ItemRow>
        );
    };

    return (
        <ReportPreviewWrapper>
            <ReportPreviewContainer theme = {theme}>

                <ReportHeader/>

                <ContentWrapper theme = {theme}>
                    <ContentContainer>

                        <ReportHeaderSummary
                            billedTo={name}
                            address={address}
                            billedFor={billedFor}
                            reportNumber={reportNumber}
                            total={amountDue}
                            type={type}
                            reportDate={createdAt}
                            purchaseOrderNo={purchaseOrderNumber}
                        />

                        <ReportDetails
                            reportList={procedures}
                            listItemFormat={listItemFormat}
                            headers={headers}
                        />

                        <BillingSummary
                            subtotal={amountDue}
                            discount={hasDiscount ? formatDiscount : 0}
                            tax={tax}
                            total={total}
                        />
                       

                    </ContentContainer>
                </ContentWrapper>
                
            </ReportPreviewContainer>
        </ReportPreviewWrapper>
    );
};

export default ReportPreview;

const styles = StyleSheet.create({
    textContainer: {flex: 1, },
    text: {
        color: '#4E5664',
        fontSize: 16
    }
});
