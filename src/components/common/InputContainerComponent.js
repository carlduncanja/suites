import React from 'react';
import { useTheme } from 'emotion-theming';
import styled, { css } from '@emotion/native';

/**
 *
 * @param label
 * @param onChangeText
 * @param value
 * @param placeholder
 * @param keyboardType
 * @param onClear
 * @param hasError
 * @param backgroundColor
 * @returns {*}
 * @constructor
 */

const InputFieldWrapper = styled.View`
    flex:1;
    position: relative;
    min-height: 32px;
`;

const InputFieldContainer = styled.View`
    width : 100%;
    flex-direction: row;
    align-items: center;
`;

function InputContainerComponent({
    children
}) {

    const theme = useTheme();

    return (
        <InputFieldWrapper>
            <InputFieldContainer>
                {children}
            </InputFieldContainer>
        </InputFieldWrapper>
    );
}

InputContainerComponent.propTypes = {};
InputContainerComponent.defaultProps = {};

export default InputContainerComponent;
