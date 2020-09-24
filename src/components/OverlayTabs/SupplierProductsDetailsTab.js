import React, {useState, useEffect, useContext} from "react";
import {View, Text, StyleSheet} from "react-native";
import Record from '../common/Information Record/Record';
import ResponsiveRecord from '../common/Information Record/ResponsiveRecord';
import Row from '../common/Row';
import LineDivider from '../common/LineDivider';

import {transformToSentence} from "../../utils/formatter";
import styled, {css} from '@emotion/native';
import {useTheme} from 'emotion-theming';
import {PageContext} from "../../contexts/PageContext";
import {Input} from "react-native-elements";
import InputLabelComponent from "../common/InputLablel";
import SearchableOptionsField from "../common/Input Fields/SearchableOptionsField";

const LineDividerContainer = styled.View`
    margin-bottom : ${({theme}) => theme.space['--space-32']};
`;


const InputWrapper = styled.View`
    flex: 1;
    height: 46px;
    //position: relative;
    //flex-direction: column;
    //align-items: flex-start;
    //justify-content: flex-start;
    //z-index: ${({zIndex}) => zIndex};
    margin-right: 8px;
`


const RowWrapper = styled.View`
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    margin-top: ${({theme}) => theme.space['--space-20']};
    margin-bottom: ${({theme}) => theme.space['--space-20']};
    z-index: ${({zIndex}) => zIndex};
`


const SupplierProductsDetailsTab = ({product, isEdit}) => {

    const pageState = useContext(PageContext)
    const theme = useTheme();

    const {isEditMode} = pageState;


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

    return (
        <View style={{flexDirection: "column"}}>
            <Row theme={theme}>
                <InputWrapper>
                    <Record
                        recordTitle={'Product Name'}
                        recordValue={fields['name']}
                        editMode={isEdit}
                    />
                </InputWrapper>

                <InputWrapper/>
                <InputWrapper/>
            </Row>

            <Row>
                <InputWrapper>
                    <Record
                        recordTitle={'SKU'}
                        recordValue={fields['sku']}
                        editMode={isEdit}
                    />
                </InputWrapper>


                <InputWrapper>

                    {
                        isEdit
                            ? <InputWrapper>
                                <InputLabelComponent label={"Inventory Reference"}/>
                                <SearchableOptionsField
                                    value={fields['inventoryVariant'].name}
                                />
                            </InputWrapper>
                            : <Record
                                recordTitle={"Inventory Reference"}
                                recordValue={fields['inventoryVariant'].name}
                                valueColor={'--color-blue-600'}
                            />
                    }
                </InputWrapper>

                <InputWrapper>
                    <Record
                        recordTitle={"Unit Price"}
                        recordValue={fields['unitPrice']}
                        editMode={isEdit}
                    />
                </InputWrapper>
            </Row>
        </View>
    )
}

SupplierProductsDetailsTab.propTypes = {};
SupplierProductsDetailsTab.defaultProps = {};

export default SupplierProductsDetailsTab;

