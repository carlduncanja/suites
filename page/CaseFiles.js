import React, { useContext } from 'react';
import {StyleSheet, View} from 'react-native';
import Page from '../components/common/Page/Page';
import { CaseFileContextProvider } from '../contexts/CaseFileContext';
import { SuitesContextProvider } from "../contexts/SuitesContext";
import TestTransformAnimation from "../TestTransformAnimation";
import Overlay from '../components/common/Overlay/Overlay';

const CaseFiles = () => {
    return ( 
        <SuitesContextProvider>
            <CaseFileContextProvider>
                <Overlay/>
                {/* <Page/>                 */}
                {/* <TestTransformAnimation/> */}
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

