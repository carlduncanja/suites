import React,{ useContext } from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { Physicians, Nurses } from '../../OverlayCardFrames';
import { SuitesContext } from '../../../../contexts/SuitesContext';

const Details = () => {
    return ( 
        <View>
            <Physicians/>
            <Nurses/>
        </View>
       
    );
}
 
export default Details;