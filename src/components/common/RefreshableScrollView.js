import React, {useState} from 'react';
import {RefreshControl, ScrollView} from 'react-native';
import {useTheme} from 'emotion-theming';
import styled, {css} from '@emotion/native';

function RefreshableScrollView({
    refreshing = false,
    onRefresh = () => {
    },
    content = () => {
    }
}) {
    const theme = useTheme();

    return <ScrollView
        refreshControl={(
            <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
            />
        )}
    >
        {content}
    </ScrollView>;
}

export default RefreshableScrollView;
