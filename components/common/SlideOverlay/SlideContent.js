import React,{ useContext} from 'react';
import { View, Text, StyleSheet, SectionList } from 'react-native';
import { SuitesContext } from '../../../contexts/SuitesContext';
import Lifestyle from '../../CaseFiles/OverlayPages/MedicalHistory/Lifestyle';

const SllideContent = () => {
    const suitesState = useContext(SuitesContext).state
    return ( 
        <View>
            <Lifestyle/>
        </View>
    );
}
 
export default SllideContent;

