import React from 'react';
import styled, {css} from '@emotion/native';
import {useTheme} from 'emotion-theming';
import {Text} from 'react-native';

const DataItemWrapper = styled.View` 
    flex: ${({flex}) => flex.toString()};
    height: 100%;
`;
const DataItemContainer = styled.View` 
    display: flex;
    height:100%;
    justify-content: center;
    align-items: ${({align}) => align};
`;

function ContentDataItem({
    flex = 1, align = 'flex-start', content = () => {
    }
}) {
    const theme = useTheme();

    return (
        <DataItemWrapper flex={flex}>
            <DataItemContainer align={align}>
                {content}
            </DataItemContainer>
        </DataItemWrapper>
    );
}

export default ContentDataItem;
