import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import {useModal, withModal} from 'react-native-modalfy';
import styled, { css } from '@emotion/native';
import {useTheme} from 'emotion-theming';
import BillingCaseProcedure from './BillingCaseProcedure';
import EditProcedure from './EditProcedure';
import SvgIcon from '../../../../assets/SvgIcon';
import {formatAmount} from '../../../helpers/caseFilesHelpers';
import {formatDate, currencyFormatter} from '../../../utils/formatter';

const BillingCardContainer = styled.ScrollView`
    padding-bottom: 100px;
`;

const BillingHeader = styled.View`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: ${({theme}) => theme.space['--space-24']};
`;

const RowItem = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const StackedRecord = styled.View`
    display: flex;
    align-items: ${({align = 'flex-start'}) => align};
`;

const ChargeHeader = styled.View`
    flex-direction: row;
    justify-content: space-between;
    background-color: ${({theme}) => theme.colors['--color-gray-200']};
    padding: ${({theme}) => `${theme.space['--space-12']} ${theme.space['--space-8']}`};
    margin-bottom: ${({theme}) => theme.space['--space-24']};
`;

const SectionHeaderContainer = styled.View`
    margin-bottom: ${({theme}) => theme.space['--space-16']};
`;

const SectionContainer = styled.View`
    margin-bottom: ${({theme}) => theme.space['--space-32']};
`;

const ProcedureContainer = styled.View`
    flex:1;
    flex-direction: column;
`;

const ProcedureHeaderContainer = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${({theme}) => theme.space['--space-12']};
`;

const ProcedureNameContainer = styled.View`
    flex-direction: row;
    align-items: center;
`;

const ProcedureIconContainer = styled.View`
    padding-right: ${({theme}) => theme.space['--space-14']};
`;

const ProcedureDetailsContainer = styled.View`
    margin-left: ${({theme}) => theme.space['--space-24']};
    margin-bottom: ${({theme}) => theme.space['--space-18']};
`;

const EditButtonItem = styled.TouchableOpacity`
    width: 100%;
    height: 40px;
    justify-content: flex-end;
    align-items: flex-end;
    margin-bottom: ${({theme}) => theme.space['--space-10']};
`;

const BillingText = styled.Text(({theme, font = '--text-base-regular', color = '--color-gray-600'}) => ({
    ...theme.font[font],
    color: theme.colors[color],
    paddingTop: 1,
}));

const BillingCaseCard = ({quotations, tabDetails, caseProcedures, paymentDetails,isEditMode, handleEditDone, onCaseProcedureBillablesChange}) => {
    const modal = useModal();
    const theme = useTheme();
    const {
        lastModified = '',
        procedures = []
    } = tabDetails;

    const {
        amountPaid = 0,
        total = 0,
        lineItems = [],
        amountDue
    } = paymentDetails;

    console.log('i fhgh jkj', quotations)

    const initialAmount = total


    //const outstandingBalance = amountDue;
    const payments = lineItems.filter(lineItem => lineItem.type === 'payment');
    const discounts = lineItems.filter(lineItem => lineItem.type === 'discount');

    

    // const [selectedProcedure, setSelectedProcedure] = useState(0);
    // const [updatedBilling, setUpdatedBilling] = useState([]);
    const [billingProcedures, setBillingProcedures] = useState(caseProcedures);
    // const [payments, setPayments] = useState([]);
    // const [discounts, setDiscounts] = useState([]);

    const totalDiscount = discounts.reduce((acc, curr) => acc + (curr.unitPrice || 0), 0);

    const outstandingBalance = amountDue - totalDiscount

    const getProcedureStatusArray = () => {
        const statusArray = procedures.map((procedure, index) => ({
            index,
            status: false
        }));
        return statusArray;
    };

    const [openDetailsArrayState, setOpenDetailsArrayState] = useState(getProcedureStatusArray());

    const getStatus = index => {
        const currentArray = openDetailsArrayState.filter(item => item.index === index);
        return currentArray[0].status;
    };

    const openProcedureDetails = index => {
        const selectedIndex = openDetailsArrayState.findIndex(obj => obj.index === index);
        const newObject = {...openDetailsArrayState[selectedIndex], status: !openDetailsArrayState[selectedIndex].status};
        const updatedArray = [
            ...openDetailsArrayState.slice(0, selectedIndex),
            newObject,
            ...openDetailsArrayState.slice(selectedIndex + 1)
        ];
        setOpenDetailsArrayState(updatedArray);
    };

    const onCreated = id => data => {
        const billingData = [...billingProcedures];
        const findIndex = billingData.findIndex(obj => obj.caseProcedureId === id);
        const selectedItem = billingData[findIndex];
        const updatedObj = {
            ...selectedItem,
            inventories: data.inventories,
            equipments: data.equipments,
            services: data.lineItems
        };
        const updatedData = [
            ...billingData.slice(0, findIndex),
            updatedObj,
            ...billingData.slice(findIndex + 1),
        ];

        const handleEditData = updatedData.map(item => ({
            caseProcedureId: item.caseProcedureId,
            inventories: item.inventories,
            equipments: item.equipments,
            lineItems: item.services
        }));

        setBillingProcedures(updatedData);
        onCaseProcedureBillablesChange(updatedData);
        // handleEditDone(handleEditData)
        modal.closeModals('OverlayInfoModal');
    };

    const openActionContainer = (name, consumables, equipments, services, caseProcedureId) => {
        modal.openModal('OverlayInfoModal', {
            overlayContent: <EditProcedure
                onCreated={onCreated(caseProcedureId)}
                procedureName={name}
                consumables={consumables}
                equipments={equipments}
                services={services}
                tabs={['Consumables', 'Equipments']}
            />,
        });
    };

    return (
        <BillingCardContainer
            // style={styles.container}
            // contentContainerStyle={{
            //     paddingBottom: 100
            // }}
        >

            <BillingHeader theme={theme}>
                
                <RowItem>
                    <StackedRecord>
                        <BillingText theme={theme} style={css`padding-bottom: ${theme.space['--space-12']};`}>Last Modified</BillingText>
                        <BillingText theme={theme} color="--color-gray-800" font="--text-base-medium">{formatDate(lastModified, 'DD/MM/YYYY')}</BillingText>
                    </StackedRecord>

                    <StackedRecord align="flex-end">
                        <BillingText theme={theme} style={css`padding-bottom: ${theme.space['--space-12']};`}>Adjusted Cost</BillingText>
                        {
                            total === initialAmount ?
                                <BillingText theme={theme} color="--color-gray-800" font="--text-base-medium">No Adjustments Yet</BillingText> :
                                (
                                    <BillingText theme={theme} color="--color-gray-800" font="--text-base-medium">
                                        <BillingText theme={theme} color="--accent-button" font="--text-base-medium">discount: </BillingText>
                                        {`$ ${currencyFormatter(totalDiscount)}) $ ${currencyFormatter(total - totalDiscount)}`}
                                    </BillingText>
                                )
                        }
                    </StackedRecord>

                </RowItem>

                <RowItem style={css`padding-top: ${theme.space['--space-32']};`}>
                    <StackedRecord>
                        <BillingText theme={theme} style={css`padding-bottom: ${theme.space['--space-12']};`}>Outstanding Balance</BillingText>
                        <BillingText theme={theme} color="--color-red-600" font="--text-lg-medium">$ {currencyFormatter(outstandingBalance)}</BillingText>
                    </StackedRecord>

                    <StackedRecord>
                        <BillingText theme={theme} style={css`padding-bottom: ${theme.space['--space-12']};`}>Initial Cost</BillingText>
                        <BillingText theme={theme} color="--color-gray-800" font="--text-base-medium">$ {currencyFormatter(initialAmount)}</BillingText>
                    </StackedRecord>

                </RowItem>
                
            </BillingHeader>

            <>
                <ChargeHeader>
                    <BillingText theme={theme} font="--text-sm-medium">Charge</BillingText>
                    <BillingText theme={theme} font="--text-sm-medium">Cost</BillingText>
                </ChargeHeader>

                <SectionContainer>
                    <SectionHeaderContainer theme={theme}>
                        <BillingText theme={theme} font="--text-xs-medium" color="--color-blue-500">PROCEDURE</BillingText>
                    </SectionHeaderContainer>

                    {
                        billingProcedures.map((item, index) => {
                            const {
                                procedure = {},
                                physicians = [],
                                equipments = [],
                                inventories = [],
                                services = [],
                                caseProcedureId = ''
                            } = item;
                            return (
                                
                                <>
                                    <ProcedureContainer>

                                        <ProcedureHeaderContainer
                                            theme={theme}
                                            onPress={() => openProcedureDetails(index)}
                                        >

                                            <ProcedureNameContainer>
                                                <ProcedureIconContainer theme={theme}>
                                                    {
                                                        getStatus(index) ?
                                                            <SvgIcon iconName="hideProcedure"/> :
                                                            <SvgIcon iconName="showProcedure"/>
                                                    }
                                                </ProcedureIconContainer>
                                                <BillingText theme={theme} color="--color-gray-700">{procedure.name}</BillingText>
                                            </ProcedureNameContainer>
                                            
                                            <BillingText theme={theme} color="--color-gray-700" font="--text-lg-regular">{`$ ${currencyFormatter(procedure.cost)}`}</BillingText>
                                        
                                        </ProcedureHeaderContainer>

                                        {
                                            getStatus(index) &&

                                            <ProcedureDetailsContainer theme={theme}>

                                                <BillingCaseProcedure
                                                    physicians={physicians}
                                                    equipments={equipments}
                                                    inventories={inventories}
                                                    services={services}
                                                />
                                                {
                                                    isEditMode && <EditButtonItem
                                                        activeOpacity={0.5}
                                                        onPress={() => {
                                                            openActionContainer(procedure.name, inventories, equipments, services, caseProcedureId);
                                                            // setSelectedProcedure(index)
                                                        }}
                                                    >
                                                        <BillingText theme={theme} color="--accent-button" font="--text-base-medium">Edit Procedure</BillingText>
                                                    </EditButtonItem>
                                                }
                                            </ProcedureDetailsContainer>
                                        }

                                    </ProcedureContainer>
                                </>
                            );
                        })}
                </SectionContainer>
                    
                {
                    payments.length > 0 &&
                    <SectionContainer theme={theme}>
                        <SectionHeaderContainer theme={theme}>
                            <BillingText theme={theme} font="--text-xs-medium" color="--color-blue-500">PAYMENTS</BillingText>
                        </SectionHeaderContainer>
                        
                        {
                            payments.map((payment, index) => {
                                return (
                                    <RowItem style={css`margin-left: ${theme.space['--space-24']}; padding-bottom: ${ index !== payments.length - 1 && theme.space['--space-18']};`} key={index}>
                                        <BillingText theme={theme} color="--color-gray-700" >{payment.name}</BillingText>
                                        <BillingText theme={theme} color="--color-gray-700" font="--text-lg-regular">- $ {currencyFormatter(payment.unitPrice)}</BillingText>
                                    </RowItem>
                                );
                            })
                        }
                    </SectionContainer>
                }

                {
                    discounts.length > 0 &&
                    <SectionContainer theme={theme}>
                        <SectionHeaderContainer theme={theme}>
                            <BillingText theme={theme} font="--text-xs-medium" color="--color-blue-500">DISCOUNTS</BillingText>
                        </SectionHeaderContainer>
                        {
                            discounts.map((discount, index) => {
                                return (
                                    <RowItem style={css`margin-left: ${theme.space['--space-24']}; padding-bottom: ${ index !== discounts.length - 1 && theme.space['--space-18']};`} key={index}>
                                        <BillingText theme={theme} color="--color-gray-700" >{discount.name}</BillingText>
                                        <BillingText theme={theme} color="--color-gray-700" font="--text-lg-regular">- $ {currencyFormatter(discount.unitPrice)}</BillingText>
                                    </RowItem>
                                );
                            })
                        }
                    </SectionContainer>

                }

            </>

        </BillingCardContainer>
    );
}

export default BillingCaseCard;

const styles = StyleSheet.create({
    container: {},
    headerContainer: {
        // flex:1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 25,
    },
    headerItem: {
        // justifyContent:'space-between',
        alignItems: 'flex-start'
    },
    headerTitle: {
        color: '#718096',
        fontSize: 16,
        marginBottom: 10,
    },
    headerValue: {
        color: '#4A5568',
        fontWeight: '600',
    },
    chargeContainer: {},
    chargeHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#EEF2F6',
        padding: 15,
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 25
    },
    chargeHeaderTitle: {
        fontSize: 14,
        color: '#718096'
    },
    procedureText: {
        color: '#4299E1',
        fontSize: 12,
        fontWeight: '500'
    },
    itemContainer: {
        // flex:1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6,
        alignItems: 'center'
    },
    editContainer: {
        // flex:1,
        width: '100%',
        height: 40,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginBottom: 10
    }
})
