import React from 'react';
import { View } from 'react-native';

import Record from '../common/Information Record/Record';
import ListTextRecord from '../common/Information Record/ListTextRecord';
import Row from '../common/Row';

import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';

function EquipmentGroupGeneralTab({ equipmentGroup = {}, equipmentChildren = [] }) {


    const { description = "" } = equipmentGroup

    return (
        <>
            <Row>
                <Record
                    recordTitle="Description"
                    recordValue={description}
                    flex={0.8}
                />
            </Row>


        </>
    )
}

export default EquipmentGroupGeneralTab
