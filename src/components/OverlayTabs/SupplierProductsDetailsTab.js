import React,{ useState,useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Record from '../common/Information Record/Record';
import ResponsiveRecord from '../common/Information Record/ResponsiveRecord';
import Row from '../common/Row';
import LineDivider from '../common/LineDivider';

import { transformToSentence } from "../../utils/formatter";
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';

const LineDividerContainer = styled.View`
    margin-bottom : ${ ({theme}) => theme.space['--space-32']};
`;

const SupplierProductsDetailsTab = ({product, isEdit}) => {

    const theme = useTheme();

    const {
        sku,
        name,
        inventoryVariant = {},
        unitPrice = 0
    } = product

    const [fields, setFields] = useState({
        sku,
        name,
        inventoryVariant,
        unitPrice,
    })

    // hello?



    return(
        <>
            <Row>
                <Record
                    recordTitle={'Product Name'}
                    recordValue={fields['name']}
                />
            </Row>

            <Row>
                <Record
                    recordTitle={'SKU'}
                    recordValue={fields['sku']}
                />

                <Record
                    recordTitle={"Inventory Reference"}
                    recordValue={fields['inventoryVariant'].name}
                    valueColor={'--color-blue-600'}
                />

                <Record
                    recordTitle={"Inventory Reference"}
                    recordValue={fields['unitPrice']}
                />
            </Row>
        </>
    )
}

SupplierProductsDetailsTab.propTypes = {};
SupplierProductsDetailsTab.defaultProps = {};

export default SupplierProductsDetailsTab;

