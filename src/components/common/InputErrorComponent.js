import React from 'react';
import {useTheme} from 'emotion-theming';
import styled, {css} from '@emotion/native';

/**
 * @param hasError
 * @returns {*}
 * @constructor
 */

const ErrorWrapper = styled.View`
    position : absolute;
    top : 34px;
`;

const ErrorContainer = styled.View`
    height : 100%;
    width : 100%;
    padding-left : 15px;
`;

const ErrorText = styled.Text(({theme}) => ({
    ...theme.font['--text-xs-regular'],
    color: theme.colors['--color-red-700']
}));

function InputErrorComponent({errorMessage = 'Error'}) {
    const theme = useTheme();

    return (
        <ErrorWrapper>
            <ErrorContainer>
                <ErrorText theme={theme}>{errorMessage}</ErrorText>
            </ErrorContainer>
        </ErrorWrapper>

    );
}

InputErrorComponent.propTypes = {};
InputErrorComponent.defaultProps = {};

export default InputErrorComponent;
