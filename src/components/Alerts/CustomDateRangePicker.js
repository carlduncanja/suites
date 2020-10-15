import React from 'react';
import {useTheme} from 'emotion-theming';
import styled, {css} from '@emotion/native';

const PickerWrapper = styled.View`
`;
const PickerContainer = styled.View``;

function CustomDateRangePicker() {
    const theme = useTheme();

    return (
        <PickerWrapper>
            <PickerContainer>

            </PickerContainer>
        </PickerWrapper>
    );
}

export default CustomDateRangePicker;
