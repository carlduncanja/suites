import React, {useEffect, useState, useContext} from 'react';

import styled, { css } from "@emotion/native";
import _ from "lodash";
import {useTheme} from "emotion-theming";
import InputUnitField from "../../Input Fields/InputUnitFields";
import OptionsField from "../../Input Fields/OptionsField";
import InputField2 from "../../Input Fields/InputField2";
import Row from '../../Row';
import {MenuOption, MenuOptions} from "react-native-popup-menu";
import TextButton from "../../Buttons/TextButton";
import BrokenLineDivider from "../../BrokenLineDivider";
import { PageContext } from '../../../../contexts/PageContext';
import { currencyFormatter } from '../../../../utils/formatter';

const ContentWrapper = styled.View`
    width : 100%;
`;

const ContentContainer = styled.View`
    width : 100%;
    border-width : 1px;
    background-color: ${ ({theme}) => theme.colors['--default-shade-white']};
    border-color : ${ ({theme}) => theme.colors['--color-gray-300']};
    border-top-width : 0px;
    border-bottom-left-radius : 8px;
    border-bottom-right-radius : 8px;
    padding : ${ ({theme}) => theme.space['--space-16']};
    padding-bottom : ${ ({theme}) => theme.space['--space-32']};

`;

export const RowWrapper = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom : ${ ({theme}) => theme.space['--space-16']};
`

export const FieldContainer = styled.View` 
    flex : 1;
    margin-right: ${({theme}) => theme.space['--space-16']};
`


const FrameInsurerContent = ({
        fields = {}
    }) => {
    
    const { pageState } = useContext(PageContext);
    const { isEditMode } = pageState;
    console.log("Edit mode: ", isEditMode);
    const theme = useTheme();

    return (
        <ContentWrapper theme = {theme}>
            <ContentContainer theme = {theme}>
                
                <RowWrapper theme = {theme}>
                    <InputField2
                        enabled = {isEditMode}
                        value = {fields.name}
                        label = "Insurer"
                        onChangeText = {() => {}}
                        onClear = {()=>{}}
                        backgroundColor = '--default-shade-white'
                    />
                </RowWrapper>

                <RowWrapper theme = {theme}>

                    <FieldContainer theme = {theme}>
                        <InputField2
                            enabled = {isEditMode}
                            value = {fields.patient}
                            label = "Insured"
                            onChangeText = {() => {}}
                            onClear = {()=>{}}
                            backgroundColor = '--default-shade-white'
                        />
                    </FieldContainer>
                    
                    <InputField2
                        enabled = {isEditMode}
                        value = {fields.policyNumber}
                        label = "Policy #"
                        onChangeText = {() => {}}
                        onClear = {()=>{}}
                        backgroundColor = '--default-shade-white'

                    />
                </RowWrapper>

                <RowWrapper theme = {theme}>

                    <InputField2
                        enabled = {isEditMode}
                        value = {`$ ${currencyFormatter(fields.coverageLimit)}`}
                        label = "Coverage"
                        onChangeText = {() => {}}
                        onClear = {()=>{}}
                        backgroundColor = '--default-shade-white'

                    />
                    
                    <FieldContainer/>
                    {/* <FieldContainer theme = {theme} flex = {1}>
                        <InputField2
                            enabled = {false}
                            value = {`$ ${currencyFormatter(fields.coverageLimit)}`}
                            label = "Coverage"
                            onChangeText = {() => {}}
                            onClear = {()=>{}}
                            backgroundColor = '--default-shade-white'
                        />
                    </FieldContainer>

                    <FieldContainer /> */}

                </RowWrapper>

            </ContentContainer>
        </ContentWrapper>
        
    );  
}

export default FrameInsurerContent;




