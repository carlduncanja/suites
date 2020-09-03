import React, {useContext} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import styled, {css} from '@emotion/native';
import {useTheme} from 'emotion-theming';
import Table from '../../common/Table/Table';
import {CaseFileContext} from '../../../contexts/CaseFileContext';
import {formatAmount} from '../../../helpers/caseFilesHelpers';
import {currencyFormatter} from '../../../utils/formatter';

import Header from '../../common/Table/Header';
import Data from '../../common/Table/Data';

const ReportDetailsContainer = styled.View`
    width : 100%;
    border-bottom-width : 1px;
    border-bottom-color : ${({theme}) => theme.colors['--color-gray-400']};
    padding-bottom : ${({theme}) => theme.space['--space-24']};
    margin-bottom : ${({theme}) => theme.space['--space-32']};
`;

const DetailsWrapper = styled.View`
    flex : 1;
    width : 100%;
    margin-bottom : ${({theme}) => theme.space['--space-16']};
`;

const DetailItemWrapper = styled.View`
    width : 100%;
    height : 48px;
    padding : 0px ${({theme}) => theme.space['--space-16']};
    background-color : ${({backgroundColor}) => backgroundColor};
`;
const DetailItemContainer = styled.View`
    width : 100%;
    height : 100%;
    flex-direction : row;
    align-items : center;
    justify-content : space-between;
`;

const DetailText = styled.Text(({theme, fontStyle}) => ({
    ...theme.font[fontStyle],
    color: theme.colors['--color-gray-700']
}));

const HeadersWrapper = styled.View`
    width : 100%;
    border-bottom-width : 1px;
    border-bottom-color : ${({theme}) => theme.colors['--color-gray-400']};
    margin-bottom : ${({theme}) => theme.space['--space-16']};
`;
const HeadersContainer = styled.View`
    width : 100%;
    padding : ${({theme}) => theme.space['--space-16']};
    padding-top : 0px;
`;

function ReportDetails({reportList, reportTable, listItemFormat, headers}) {
    const theme = useTheme();
    const physiciansArray = [];
    const proceduresArray = [];
    const servicesArray = [];
    const equipmentsArray = [];
    let inventoriesArray = [];

    reportList.map(item => {
        console.log('watch the item here nuh please', item);
        const {physicians = [], services = [], procedures = [], inventories = [], equipments = []} = item;
        physicians.map(physician => {
            physiciansArray.push({
                name: physician.name || '',
                cost: physician.unitPrice * physician.quantity || 0
            });
        });
        procedures.map(procedure => {
            proceduresArray.push({
                name: procedure.name || '',
                cost: procedure.unitPrice * procedure.quantity || 0
            });
        });
        services.map(service => {
            servicesArray.push({
                name: service.name || '',
                cost: service.unitPrice * service.quantity || 0
            });
        });

        equipments.map(equipment => {
            equipmentsArray.push({
                name: equipment.name || '',
                cost: equipment.unitPrice * equipment.amount || 0
            });
        });

        inventoriesArray = [...inventories, ...equipments];
        // console.log("In:", inventories)
    });

    const costList = [...physiciansArray, ...proceduresArray, ...servicesArray];

    return (
        <ReportDetailsContainer theme={theme}>
            <DetailsWrapper theme={theme}>
                {
                    costList.map((detail, index) => (
                        <DetailItemWrapper
                            theme={theme}
                            backgroundColor={index % 2 === 0 ? theme.colors['--color-gray-100'] : theme.colors['--default-shade-white']}
                        >
                            <DetailItemContainer>
                                <DetailText theme={theme} fontStyle="--text-base-regular">{detail?.name}</DetailText>
                                <DetailText
                                    theme={theme}
                                    fontStyle="--text-lg-regular"
                                >
                                    $ {currencyFormatter(detail?.cost || 0)}
                                </DetailText>
                            </DetailItemContainer>
                        </DetailItemWrapper>
                    ))
                }
            </DetailsWrapper>

            <HeadersWrapper theme={theme}>
                <HeadersContainer theme={theme}>
                    <Header
                        headers={headers}
                        isCheckbox={false}
                    />
                </HeadersContainer>
            </HeadersWrapper>

            <Data
                data={inventoriesArray}
                listItemFormat={listItemFormat}
            />

        </ReportDetailsContainer>
    );
}

export default ReportDetails;

const styles = StyleSheet.create({
    container: {
        //flex:1,
        height: 400
    },
    summaryDetails: {
        // flex: 1,
        marginBottom: 20
    },
    summaryItem: {
        flexDirection: 'row',
        padding: 14,
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: 'space-between'
    },
    detailText: {
        color: '#4E5664',
        fontSize: 16
    },
    consumablesDetails: {
        //flex:1,
    }
});
