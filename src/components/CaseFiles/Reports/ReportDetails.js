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

/**
 *
 * @param reportData
 * @param reportList
 * @param listItems
 * @param listItemFormat
 * @param headers
 * @return {JSX.Element}
 * @constructor
 */
function ReportDetails({reportData = {}, reportList = [], listItemFormat, headers}) {
    const theme = useTheme();

    const test = {
        "_id": {"$oid": "6112ae5e806c1410729db4b1"},
        "customerDetails": {
            "address": {
                "line1": "23 Ruthven Road",
                "line2": "",
                "city": "Kingston",
                "parish": "Kingston 8"
            }, "email": "julie.brown@gmail.com", "phone": "8764287313", "name": "Denton Brown"
        },
        "billingDetails": {"subTotal": 239442.864, "tax": 0.2, "amountDue": 299303.58},
        "status": "open",
        "amountPaid": 0,
        "caseId": {"$oid": "610031dc170ed0f634c2037d"},
        "type": "case-file",
        "lineItems": [],
        "invoiceNumber": "IN-000015",
        "amountDue": 299303.58,
        "total": 299303.58,
        "chargeSheet": {"$oid": "610031dc170ed0f634c20382"},
        "equipmentList": [{
            "quantity": 3,
            "_id": {"$oid": "6112ae5e806c1410729db4b2"},
            "type": "equipment",
            "unitPrice": 3984.43,
            "name": "Stethoscope",
            "itemRef": {"$oid": "5ea059269c2d1f6e55deb714"},
            "itemType": "Stethoscope"
        }, {
            "quantity": 3,
            "_id": {"$oid": "6112ae5e806c1410729db4b3"},
            "type": "equipment",
            "unitPrice": 14123.43,
            "name": "MRI",
            "itemRef": {"$oid": "5ea058fb706b105f13cc93d2"},
            "itemType": "MRI"
        }],
        "inventoryList": [{
            "quantity": 7,
            "_id": {"$oid": "6112ae5e806c1410729db4b4"},
            "type": "inventory",
            "unitPrice": 450,
            "name": "Agents",
            "itemRef": {"$oid": "5ea055cc2860a68d405ed940"},
            "itemType": "Anaesthesia"
        }, {
            "quantity": 13,
            "_id": {"$oid": "6112ae5e806c1410729db4b5"},
            "type": "inventory",
            "unitPrice": 560,
            "name": "Atracurium",
            "itemRef": {"$oid": "5ea0575eb2a8f9c992c8abad"},
            "itemType": "Anaesthesia"
        }, {
            "quantity": 23,
            "_id": {"$oid": "6112ae5e806c1410729db4b6"},
            "type": "inventory",
            "unitPrice": 5850,
            "name": "Atropine",
            "itemRef": {"$oid": "5ea0575eb2a8f9c992c8abb0"},
            "itemType": "Anaesthesia"
        }],
        "proceduresBillableItems": [{
            "caseProcedureId": {"$oid": "610031dc170ed0f634c20380"},
            "procedureId": {"$oid": "5ea060219a60bdf9e4b15783"},
            "procedureName": "Amniocentesis",
            "lineItems": [{
                "quantity": 1,
                "_id": {"$oid": "610031dc170ed0f634c2038e"},
                "name": "Dr. Dave Bobberman",
                "unitPrice": 100000,
                "type": "physician"
            }],
            "total": 299303.58,
            "inventories": [{
                "quantity": 7,
                "_id": {"$oid": "6112ae5e806c1410729db4b8"},
                "type": "inventory",
                "unitPrice": 450,
                "name": "Agents",
                "itemRef": {"$oid": "5ea055cc2860a68d405ed940"},
                "itemType": "Anaesthesia"
            }, {
                "quantity": 13,
                "_id": {"$oid": "6112ae5e806c1410729db4b9"},
                "type": "inventory",
                "unitPrice": 560,
                "name": "Atracurium",
                "itemRef": {"$oid": "5ea0575eb2a8f9c992c8abad"},
                "itemType": "Anaesthesia"
            }, {
                "quantity": 23,
                "_id": {"$oid": "6112ae5e806c1410729db4ba"},
                "type": "inventory",
                "unitPrice": 5850,
                "name": "Atropine",
                "itemRef": {"$oid": "5ea0575eb2a8f9c992c8abb0"},
                "itemType": "Anaesthesia"
            }],
            "equipments": [{
                "quantity": 3,
                "_id": {"$oid": "6112ae5e806c1410729db4bb"},
                "type": "equipment",
                "unitPrice": 3984.43,
                "name": "Stethoscope",
                "itemRef": {"$oid": "5ea059269c2d1f6e55deb714"},
                "itemType": "Stethoscope"
            }, {
                "quantity": 3,
                "_id": {"$oid": "6112ae5e806c1410729db4bc"},
                "type": "equipment",
                "unitPrice": 14123.43,
                "name": "MRI",
                "itemRef": {"$oid": "5ea058fb706b105f13cc93d2"},
                "itemType": "MRI"
            }]
        }]
    };

    const {
        inventoryList = [],
        equipmentList = [],
        proceduresBillableItems = []
    } = reportData;

    console.log("report data", reportData);

    /**
     * Merge Equipment and inventory items used for procedure(s)
     */
    const lineItems = [...inventoryList, ...equipmentList];

    /**
     * Get procedure(s) cost.
     * TODO physician and service.
     */

    let costList = proceduresBillableItems.reduce((acc, item) => {
        acc.push({
            name: item.procedureName,
            cost: item.total,
        })
        return acc;
    }, [])

    return (
        <ReportDetailsContainer theme={theme}>

            {/* Invoice Procedure, Physician & Services Cost */}
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

            {/* Line Items Header */}
            <HeadersWrapper theme={theme}>
                <HeadersContainer theme={theme}>
                    <Header
                        headers={headers}
                        isCheckbox={false}
                    />
                </HeadersContainer>
            </HeadersWrapper>

            {/* Invoice Line Items */}
            <Data
                data={lineItems}
                listItemFormat={listItemFormat}
            />

        </ReportDetailsContainer>
    );
}

export default ReportDetails;

const ReportDetailsContainer = styled.View`
  width: 100%;
  border-bottom-width: 1px;
  border-bottom-color: ${({theme}) => theme.colors['--color-gray-400']};
  padding-bottom: ${({theme}) => theme.space['--space-24']};
  margin-bottom: ${({theme}) => theme.space['--space-32']};
`;

const DetailsWrapper = styled.View`
  flex: 1;
  width: 100%;
  margin-bottom: ${({theme}) => theme.space['--space-16']};
`;

const DetailItemWrapper = styled.View`
  width: 100%;
  height: 48px;
  padding: 0px ${({theme}) => theme.space['--space-16']};
  background-color: ${({backgroundColor}) => backgroundColor};
`;

const DetailItemContainer = styled.View`
  width: 100%;
  height: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const DetailText = styled.Text(({theme, fontStyle}) => ({
    ...theme.font[fontStyle],
    color: theme.colors['--color-gray-700']
}));

const HeadersWrapper = styled.View`
  width: 100%;
  border-bottom-width: 1px;
  border-bottom-color: ${({theme}) => theme.colors['--color-gray-400']};
  margin-bottom: ${({theme}) => theme.space['--space-16']};
`;

const HeadersContainer = styled.View`
  width: 100%;
  padding: ${({theme}) => theme.space['--space-16']};
  padding-top: 0;
`;
