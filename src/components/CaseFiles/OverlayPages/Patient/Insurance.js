import React, { } from 'react';
import { View, StyleSheet } from "react-native";
import Card from '../../../common/CardList/Card';
import { currencyFormatter } from '../../../../utils/formatter'; 
import Record from '../../../common/Information Record/Record';
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
import Row from '../../../common/Row';

const Insurance = ({tabDetails}) => { 
    const theme = useTheme();
    const {name, coverageLimit, policyNumber} = tabDetails

    const InsuranceWrapper = styled.View`
        width: 100%;
        height: 100%;
    `;
    const InsuranceContainer = styled.View`
        width: 100%;
        height: 100%;
    `;

    const Divider = styled.View`
        height : 1px;
        width : 100%;
        background-color: ${theme.colors['--color-gray-400']};
        border-radius : 2px;
        margin-bottom : ${theme.space['--space-20']};
    `;

    return(
        <InsuranceWrapper>
            <InsuranceContainer>

                <Row>
                    <Record
                        recordTitle = "Primary Insurer"
                        recordValue = {name}
                    />
                </Row>
                    
                <Divider/>

                <Row>
                    <Record
                        recordTitle = "Coverage Limit"
                        recordValue = {`$ ${currencyFormatter(coverageLimit)}`}
                    />
                </Row>
                <Row>
                    <Record
                        recordTitle = "Policy Number"
                        recordValue = {policyNumber}
                    />
                </Row>

            </InsuranceContainer>
        </InsuranceWrapper>
    )

        
 
    
}
 
export default Insurance;

const styles = StyleSheet.create({
    container: {
        flex:1,
        marginBottom:15
    }
})