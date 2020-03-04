import React, { useContext, useEffect } from 'react';
import {StyleSheet, View, Easing} from 'react-native';
import Page from '../components/common/Page/Page';
import { CaseFileContextProvider } from '../contexts/CaseFileContext';
import { SuitesContextProvider } from "../contexts/SuitesContext";
import TransparentScreenModal from '../components/common/TransparentScreenModal';
import OverlaySlidePanelModal from '../components/common/SlideOverlay/OverlaySlidePaneModal';
import { ModalProvider, createModalStack } from 'react-native-modalfy';

const CaseFiles = () => {
    const modalConfig = {
       // TransparentScreenModal : TransparentScreenModal,
        OverlaySlidePanelModal : OverlaySlidePanelModal
        // NewItemOverlayModal : NewItemOverlayModal,
        // ReportPreviewModal : ReportPreview
    }

    const defaultOptions = {
        backdropOpacity:0.3,
        position:'top',
        containerStyle:{
            flex: 1,
        }
    }
    const stack = createModalStack(modalConfig, defaultOptions)
    
    return (
        
            <SuitesContextProvider>
            <CaseFileContextProvider>
                <ModalProvider stack={stack}>
                    <Page/>     
                </ModalProvider>         
            </CaseFileContextProvider>
        </SuitesContextProvider>
        
    );
}
 
export default CaseFiles;
