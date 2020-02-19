import React,{ useContext } from 'react';
import { View, Text, StyleSheet, ScrollView} from 'react-native';
import { Physicians, Nurses } from '../../OverlayCardFrames';
import { SuitesContext } from '../../../../contexts/SuitesContext';

const Details = () => {
    return ( 
        <ScrollView>
            <Physicians/>
            <Nurses/>
        </ScrollView>
       
    );
}
 
export default Details;