import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import ReportHeader from './ReportHeader'
import ReportHeaderSummary from './ReportHeaderSummary';
import ReportDetails from './ReportDetails';
import BillingDetails from './BillingDetails';
import InvoiceBillingDetails from './InvoiceBillingDetails'
import SvgIcon from '../../../assets/SvgIcon';
import { SuitesContext } from '../../../contexts/SuitesContext';
import { withModal } from 'react-native-modalfy';

const Rectangle = () =>{
    return(
        <View
            style={{
                height:1,
                backgroundColor:"#CCD6E0",
                marginBottom:28,
                marginTop:20
            }}
        />
    )
}

const ReportPreview = (props) => {
    const suitesMethod = useContext(SuitesContext).methods
    const suitesState = useContext(SuitesContext).state
    const name = suitesState.overlayMenu.selectedMenuItemTabs[suitesState.overlayMenu.selectedMenuItemCurrentTab]

    const { modal: {closeModal, closeModals, currentModal}} = props
    return ( 
        <View style={{flex:1, backgroundColor:'#FFFFFF'}}>
            <ReportHeader/>
            <View style={{padding:25}}>
                <ReportHeaderSummary/>
                {Rectangle()}
                <ReportDetails/>
                {name === 'Quotation' ?
                    <BillingDetails/>
                    :
                    <InvoiceBillingDetails/>
                }
            </View>
            <TouchableOpacity style={styles.button} onPress={()=>{suitesMethod.closePreview();closeModals(currentModal)}} activeOpacity={1}>
                <Text style={[styles.buttonText,{marginRight:10}]}>Close Preview</Text>
                <SvgIcon iconName="exit" strokeColor="#FFFFFF"/>
            </TouchableOpacity>
        </View>
    );
}
 
export default withModal(ReportPreview);

const styles = StyleSheet.create({
    button:{
        justifyContent:'flex-end',
        alignItems:'center',
        alignSelf:"center",
        backgroundColor:'#4E5664',
        borderRadius:29,
        padding:8,
        paddingLeft:12,
        paddingRight:12,
        position:'absolute',
        bottom:15,
        flexDirection:'row'
    },
    buttonText:{
        color:'#FFFFFF',
        fontSize:16
    }
})