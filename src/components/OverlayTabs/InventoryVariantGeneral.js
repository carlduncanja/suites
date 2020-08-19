import React from 'react';
import { View } from 'react-native';

import Record from '../common/Information Record/Record';
import ComponentRecord from '../common/Information Record/ComponentRecord';
import ListTextRecord from '../common/Information Record/ListTextRecord';
import Row from '../common/Row';

import LevelIndicator from "../common/LevelIndicator/LevelIndicator";


import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming'; 
import { currencyFormatter } from '../../utils/formatter';
import Footer from '../common/Page/Footer';

const VariantGeneralWrapper = styled.View`
    flex:1;
`;
const VariantGeneralContainer = styled.View`
    height : 100%;
    width : 100%;
`;

function InventoryVariantGeneral({ inventoryVariant = {}, selectedData = {} }){

    const { name = "", inventoryGroup = {}, unitCost = 0, storageLocations = [], sku = "" } = inventoryVariant;
    const { description = "", category = [], unitOfMeasurement = "", } = inventoryGroup;
    const { stock = 0, levels = {} } = selectedData;
    let suppliers = [];

    return(
        <VariantGeneralWrapper>
            <VariantGeneralContainer>

                <>
                    <Row>
                        <Record
                            recordTitle = "Description"
                            recordValue = {description}
                            flex = {0.8}
                        />
                    </Row>

                    <Row>
                        <Record
                            recordTitle = "SKU"
                            recordValue = {sku}
                        />

                        <ListTextRecord
                            recordTitle = "Category"
                            values = {category}
                        />

                        <Record
                            recordTitle = "Last Received"
                            recordValue = {"n/a"}
                        />
                    </Row>

                    <Row>
                        <Record
                            recordTitle = "In-stock"
                            recordValue = {stock}
                        />
                        
                        <ComponentRecord
                            recordTitle = "Capacity"
                            content = {
                                <LevelIndicator
                                    max={levels.max}
                                    min={0}
                                    level={stock}
                                    ideal={levels.ideal}
                                    critical={levels.critical}
                                />
                            }
                        />

                        <Record
                            recordTitle = "Next Re-stock"
                            recordValue = {"n/a"}
                        />
                    </Row>

                    <Row>
                        <Record
                            recordTitle = "Unit"
                            recordValue = {unitOfMeasurement}
                        />

                        <Record
                            recordTitle = "Unit Price"
                            recordValue = {`$ ${currencyFormatter(unitCost)}`}
                        />

                        <ListTextRecord
                            recordTitle = "Suppliers"
                            values = {suppliers}
                        />
                    </Row>
                </>

                <Footer
                    hasActions = {false}
                    hasPaginator = {false}
                    hasActionButton = {true}
                />
            </VariantGeneralContainer>
        </VariantGeneralWrapper>
    )
}

export default InventoryVariantGeneral
