import React,{ useContext } from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import PageTitle from './PageTitle';
import Search from '../Search';
import List from '../List/List';
import RoundedPaginator from '../Paginators/RoundedPaginator';
import FloatingActionButton from '../FloatingAction/FloatingActionButton';
import { SuitesContext } from '../../../contexts/SuitesContext';
import ActionContainer from '../FloatingAction/ActionContainer';
import OverlaySlidePanel from '../SlideOverlay/OverlaySlidePanel';
import Overlay from '../Overlay/Overlay'

const Page = () => {
    const suitesState = useContext(SuitesContext).state
    const suitesMethod = useContext(SuitesContext).methods

    return ( 
        <View style={{flex:1}}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={{marginBottom:25}} onLayout = {(event)=> suitesMethod.getSlideTop(event)}>
                        <PageTitle />
                    </View>
                    <View style={{marginBottom:30}}>
                        <Search/>
                    </View>
                </View>

                <View style={styles.list}>
                    <List/>
                </View>
            
                <View style={styles.footer}>
                    <View style={{alignSelf:"center", marginRight:10}}>
                        <RoundedPaginator />
                    </View>

                    {suitesState.actionButtonState === false ?
                        <FloatingActionButton fillColor="#FFFFFF" backgroundColor="#4299E1"/>
                        :
                        <View>
                            <FloatingActionButton fillColor="#FFFFFF" backgroundColor="#A0AEC0"/>
                            {/* {suitesState.openAction ? 
                                <View style={{position:'absolute', width:'100%',height:'100%',bottom:60,right:0, backgroundColor:'red'}}>
                                    <Overlay/>  
                                </View>
                                :  */}
                                <View style={{position:'absolute', bottom:60,right:0}}>
                                    <ActionContainer/>
                                </View>
                            {/* } */}
                        </View>
                    }
                </View>
            </View>
            
            {suitesState.overlayStatus && 
                <View style={{
                        flex:1,
                        position:'absolute',
                        justifyContent:"flex-end",
                        height:'100%', 
                        width:'100%',
                    }}
                >
                    <TouchableOpacity 
                        onPress={()=>suitesMethod.handleOverlayClose()} 
                        activeOpacity={1}
                        style={[StyleSheet.absoluteFill, {backgroundColor:'rgba(0,0,0,0.3)'}]}
                    />
                    <View style={{bottom:0}}>
                        <OverlaySlidePanel/> 
                    </View>
                    
                </View>
            }
        </View>
        
    );
}
 
export default Page;

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        marginLeft:5,
        padding:15,
        backgroundColor:'#FAFAFA'
    },
    header:{
    },
    list:{
        flex:1,
    },
    footer:{
        flex:1,
        alignSelf:'flex-end', 
        flexDirection:'row', 
        position:'absolute', 
        bottom:0, 
        marginBottom:20, 
        right:0, 
        marginRight:30,
    }
})