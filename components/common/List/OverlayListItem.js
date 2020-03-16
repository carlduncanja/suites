import React, {useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SuitesContext } from '../../../contexts/SuitesContext';
import SvgIcon from '../../../assets/SvgIcon';
import { withModal } from 'react-native-modalfy';
import { CaseFileContext } from '../../../contexts/CaseFileContext';
import { caseActions } from '../../../reducers/caseFilesReducer';
import { getList } from '../../../hooks/useListHook';

openModal = (props) => {
    const { modalToOpen, modal } = props
    modal.openModal(modalToOpen)
}

const OverlayListItem = (props) => {
    const [appState, dispatchApp] = useContext(SuitesContext)
    const [state, dispatch] = useContext(CaseFileContext)

    const toggleCheckbox = (listItemId) => {
        dispatchApp({
            type: appActions.TOGGLECHECKBOX,
            newState : {
                checkedItemStatus : true,
                checkedItemsList : appState.list.checkedItemsList.includes(listItemId) ? 
                    appState.list.checkedItemsList.filter(listItem => listItem !== listItemId)
                    :
                    [...appState.list.checkedItemsList,listItemId]
            }
        })
    }
   
    const openReportAction=(id)=>{
        const selectedItem = appState.slideOverlay.slideOverlayTabInfo.filter(info => id === info.list.id)
        const preview=selectedItem[0].preview
        const consumables = preview.quotationDetails.consumablesTable
        
        dispatch({
            type: caseActions.SETREPORTDETAILS,
            newState:{
                reportStatus : true,
                reportInformation : preview,
                reportConsumablesList : getList(consumables.data,consumables.headers),
                reportConsumablesListHeaders : consumables.headers
            }
        })
    }

    return ( 
       
        <View style={styles.container}>
            <TouchableOpacity style={{alignSelf:'center', justifyContent:'center'}} onPress={()=>toggleCheckbox(props.fields.recordId)}>
                {props.checkbox}
            </TouchableOpacity>

            <View style={{flex:1,flexDirection:"row", marginLeft:10}}>
                {props.fields.recordInformation.map((field,index)=>{                        
                    return typeof field === 'object'? 
                        Object.keys(field).map((key,index)=>{
                            return key === 'id'?
                                <Text style={[styles.itemText,{color:'#718096'}]} key={index}>{field[key]}</Text>
                                    :
                                    key === 'actions'?
                                        <TouchableOpacity 
                                            style={[styles.item,{flex:1,}]} 
                                            key={index} 
                                            onPress={()=>{
                                                this.openModal(props);
                                                openReportAction(props.fields.recordId)
                                            }}> 
                                            <SvgIcon iconName = "actions"/>
                                        </TouchableOpacity>
                                        
                                        :
                                        <Text style={{fontSize:16, color:'#3182CE'}} key={index}>{field[key]}</Text>
                        })
                        
                    :                            
                        index === 0 ?
                            <View style={[styles.item,{flex:1, alignItems:"stretch"}]} key={index}>
                                <Text style={[styles.itemText,{color:"#3182CE"}]}>{field}</Text>
                            </View>
                            :
                                <View style={[styles.item,{flex:1}]} key={index}>
                                    <Text style={styles.itemText}>{field}</Text>
                                </View>
                })}
            </View>
        </View>
    );
}
 
export default withModal(OverlayListItem);

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row',
        //flexWrap:'wrap',
        alignItems:'flex-start',
        justifyContent:'center',
        padding:10,
        backgroundColor:'#FFFFFF',
        width:'100%',
        marginBottom:10
    },
    item:{
        
        alignItems:"flex-start",
        justifyContent:'center',
    },
    itemText:{
        fontSize:14,
        color:"#4A5568",
    }
})