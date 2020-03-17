import React, { useContext, useEffect } from 'react';
import {StyleSheet, View, Easing} from 'react-native';
import Page from '../components/common/Page/Page';
import { CaseFileContextProvider } from '../contexts/CaseFileContext';
import { useFormHook } from '../hooks/useFormHook'

const CaseFiles = () => {
    const dataTitles = ["firstName","lastName","gender"]
    return (
        <Page/>      
        // useFormHook(dataTitles)     
    );
}
 
export default CaseFiles;
