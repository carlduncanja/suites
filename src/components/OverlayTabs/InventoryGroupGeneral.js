import React from 'react';
import { View } from 'react-native';

import Record from '../common/Information Record/Record';
import ListTextRecord from '../common/Information Record/ListTextRecord';
import Row from '../common/Row';

import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming'; 

function InventoryGroupGeneral({ inventoryGroup = {} }){

    const { description = "", categories = []} = inventoryGroup

    return(
        <>
            <Row>
                <Record
                    recordTitle = "Description"
                    recordValue = {description}
                    flex = {0.8}
                />
            </Row>

            <Row>
                <ListTextRecord
                    recordTitle = "Category"
                    values = {categories}
                />
            </Row>
        </>
    )
}

export default InventoryGroupGeneral
