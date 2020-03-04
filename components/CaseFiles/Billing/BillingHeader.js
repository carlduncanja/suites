import React, { useContext } from 'react';
import { View, Text, StyleSheet } from "react-native";
import { SuitesContext } from '../../../contexts/SuitesContext';

const BillingHeader = (props) => {
    const suitesMethods= useContext(SuitesContext).methods
    // let transformToSentence = (word) =>{
    //     let newWord = word.replace(/([A-Z])/g, " $1")
    //     return newWord.charAt(0).toUpperCase() + newWord.slice(1);
    // }
    return ( 
        <View style={styles.container}>
            {
                 Object.keys(props.header).map((key,index)=>{
                    return(
                        <View key={index} >
                            <Text style={styles.title}>{suitesMethods.transformToSentence(key)}</Text>
                            {key === 'total' ?
                                <View style={{flexDirection:'row'}}>
                                    {props.header[key].discount === true && <Text style={styles.discount}>(discount applied)</Text>} 
                                    <Text style={[styles.text,{fontSize:14}]}>{props.header[key].value}</Text>
                                </View>
                                :
                                <Text style={[styles.text,{fontSize:14}]}>{props.header[key]}</Text>
                            }

                            
                            
                        </View>
                    )
                })
            }

        </View>
       
    );
}
 
export default BillingHeader;

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:25
    },
    title:{
        color:'#718096',
        fontSize:16,
        marginBottom:10,
        alignSelf:'flex-end'
    },
    discount:{
        color:'#0CB0E7',
        fontSize:14
    },
    text:{
        color:'#4A5568',
        fontWeight:'600',
    },

})