import React,{ useContext} from 'react';
import { View, Text, StyleSheet, SectionList } from 'react-native';

const SlideContent = ({overlayContent}) => {
    return ( 
        <View style={styles.container}> 
            {overlayContent}
        </View>
    ); 
}
 
export default SlideContent;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        //width:'100%',
        backgroundColor: '#fff',
    }
    
})