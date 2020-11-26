import React, { useContext } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SuitesContext } from '../../../../contexts/SuitesContext'
import BillingCard from '../../Billing/BillingCard';
import billingHeader from '../../Billing/BillingHeader';
import BillingHeader from '../../Billing/BillingHeader';

const Billing = () => {
    const [state] = useContext(SuitesContext)
    const header = state.slideOverlay.slideOverlayTabInfo.header
    const list = state.slideOverlay.slideOverlayTabInfo.list
    return ( 
        <View>
            <View style={styles.billingHeader}>
                <BillingHeader header={header}/>
            </View>
            <View style={styles.contentHeader}>
                <Text style={styles.header}>Charge</Text>
                <Text style={styles.header}>Cost</Text>
            </View>
            <ScrollView>
                {
                Object.keys(list).map((key,index)=>{
                    return(
                        <View key={index}>
                            <BillingCard
                                title = {key}
                                billingContent = {list[key]}
                            />
                        </View>
                        
                    )
                    
                })
            }
            </ScrollView>
            
        </View>
    );
}
 
export default Billing;

const styles = StyleSheet.create({
    contentHeader:{
        backgroundColor:'#EEF2F6',
        flexDirection:'row',
        justifyContent:"space-between",
        padding:12,
        paddingLeft:6,
        paddingRight:6
    },
    header:{
        fontSize:14,
        color:'#718096'
    },
})
