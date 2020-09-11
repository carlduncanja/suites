import React, {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import moment from 'moment';
import styled, {css} from '@emotion/native';
import {useTheme} from 'emotion-theming';
import {SuitesContext} from '../../../contexts/SuitesContext';
import {CaseFileContext} from '../../../contexts/CaseFileContext';
import {formatDate, currencyFormatter} from '../../../utils/formatter';

const BillingWrapper = styled.View`
    width : 100%;
    height : 154px;
    border : 0;
    border-bottom-color : ${({theme}) => theme.colors['--color-gray-400']};
    border-bottom-width : 1px;
    margin-bottom : ${({theme}) => theme.space['--space-24']};
`;
const BillingContainer = styled.View`
    height : 130px;
    width : 100%;
    flex-direction : row;
    justify-content : space-between;
`;

const ContentContainer = styled.View`
    flex : 1;
    height : 100%;
    justify-content : space-between;
    flex-direction : column;
    align-items : ${({align}) => align};
`;

const ContentHeading = styled.Text(({theme}) => ({
    ...theme.font['--text-base-regular'],
    color: theme.colors['--color-gray-600']
}));

const ContentItem = styled.Text(({theme}) => ({
    ...theme.font['--text-base-medium'],
    color: theme.colors['--color-gray-800']
}));

const BillingDescriptionContainer = styled.View`
    height : 44px;
    justify-content : space-between;
    align-self : ${({align}) => (align || 'flex-start')};
`;

function ReportHeaderSummary({
    billedTo = '',
    address = {}, 
    billedFor = '',
    reportNumber = '',
    reportDate = '',
    type = '',
    purchaseOrderNo = '',
    total
}) {
    const {
        city = '',
        country = '',
        line1 = '',
        line2 = '',
        parish = '',
        postalCode = ''
    } = address;

    const theme = useTheme();

    return (
        <BillingWrapper theme={theme}>
            <BillingContainer theme={theme}>

                <ContentContainer align="flex-start">
                    <ContentHeading theme={theme}>Billed To</ContentHeading>

                    <ContentItem theme={theme}>{billedTo}</ContentItem>
                    <ContentItem theme={theme}>{line1}</ContentItem>
                    <ContentItem theme={theme}>{line2 || parish}</ContentItem>
                    <ContentItem theme={theme}>{postalCode || city}</ContentItem>

                </ContentContainer>

                <ContentContainer>

                    {
                        type === 'Quotation' ? (
                            <>
                                <BillingDescriptionContainer>
                                    <ContentHeading theme={theme}>Quotation #</ContentHeading>
                                    <ContentItem theme={theme}>{reportNumber}</ContentItem>
                                </BillingDescriptionContainer>

                                <BillingDescriptionContainer>
                                    <ContentHeading theme={theme}>For</ContentHeading>
                                    <ContentItem theme={theme}>{billedFor.join(',')}</ContentItem>
                                </BillingDescriptionContainer>
                            </>
                        ) : (
                            <>
                                <BillingDescriptionContainer>
                                    <ContentHeading theme={theme}>Invoice No</ContentHeading>
                                    <ContentItem theme={theme}>{reportNumber}</ContentItem>
                                </BillingDescriptionContainer>

                                {
                                    purchaseOrderNo !== '' &&
                                    <BillingDescriptionContainer>
                                        <ContentHeading theme={theme}>Purchase Order No</ContentHeading>
                                        <ContentItem theme={theme}>{purchaseOrderNo}</ContentItem>
                                    </BillingDescriptionContainer>
                                }

                            </>
                        )}

                </ContentContainer>

                <ContentContainer align="flex-end">

                    <BillingDescriptionContainer align="flex-end">
                        <ContentHeading theme={theme} style={{textAlign: 'right'}}>Date</ContentHeading>
                        <ContentItem theme={theme}>{formatDate(reportDate, 'DD/MM/YYYY')}</ContentItem>
                    </BillingDescriptionContainer>

                    <BillingDescriptionContainer align="flex-end">
                        <ContentHeading theme={theme} style={{textAlign: 'right'}}>Total</ContentHeading>
                        <ContentItem theme={theme}>$ {currencyFormatter(total)}</ContentItem>
                    </BillingDescriptionContainer>

                </ContentContainer>

            </BillingContainer>
        </BillingWrapper>
    );
}

export default ReportHeaderSummary;
