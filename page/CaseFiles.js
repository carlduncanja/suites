import React, { useContext } from 'react';
import {StyleSheet, View} from 'react-native';
import Page from '../components/common/Page/Page';
import TestSlideanimation from '../TestSlideanimation';
import { CaseFileContextProvider } from '../contexts/CaseFileContext';
import { SuitesContextProvider, SuitesContext } from "../contexts/SuitesContext";
import Navigation from '../components/TabNavigation/NavigationStack';

const CaseFiles = () => {
    return ( 
        <SuitesContextProvider>
            <CaseFileContextProvider>
                <Page/>                
            </CaseFileContextProvider>
        </SuitesContextProvider>
        
        
    );
}
 
export default CaseFiles;

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        marginLeft:5,
        padding:15,
        backgroundColor:'#FAFAFA'
    },
    footer:{
        alignSelf:'flex-end', 
        flexDirection:'row', 
        position:'absolute', 
        bottom:0, 
        marginBottom:20, 
        right:0, 
        marginRight:30
    }
})

