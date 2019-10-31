import React, { Component } from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Svg,{Path} from 'react-native-svg';

export default class NavigationTab extends Component {
    render() {
        const icon = (name) => {
            return(
                name === 'schedule'?
                    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M15 20L17 22L22 17" stroke="#CBD5E0" stroke-miterlimit="10" stroke-linecap="square"/>
                        <Path d="M10 22H1V4H23V12" stroke="#CBD5E0" stroke-miterlimit="10" stroke-linecap="square"/>
                        <Path d="M7 1V4" stroke="#CBD5E0" stroke-miterlimit="10" stroke-linecap="square"/>
                        <Path d="M17 1V4" stroke="#CBD5E0" stroke-miterlimit="10" stroke-linecap="square"/>
                        <Path d="M1 8H23" stroke="#CBD5E0" stroke-miterlimit="10"/>
                    </Svg>
                
                    :
                    
                    name === 'case files' ?
                        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path d="M1 9H23" stroke="#CBD5E0" stroke-miterlimit="10" stroke-linecap="square"/>
                            <Path d="M21 22H3C2.46957 22 1.96086 21.7893 1.58579 21.4142C1.21071 21.0391 1 20.5304 1 20V2H9L11 5H23V20C23 20.5304 22.7893 21.0391 22.4142 21.4142C22.0391 21.7893 21.5304 22 21 22Z" stroke="#CBD5E0" stroke-miterlimit="10" stroke-linecap="square"/>
                        </Svg>
                    
                        :
                        name === 'patients' ?
                            <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <Path d="M18.999 17.8571C20.851 18.4021 22 19.1611 22 20.0001C22 21.6571 17.523 23.0001 12 23.0001C6.477 23.0001 2 21.6571 2 20.0001C2 19.1611 3.149 18.4021 5 17.8581" stroke="#CBD5E0" stroke-miterlimit="10" stroke-linecap="square"/>
                                <Path d="M14 20H10V15H8V10C8 8.895 8.895 8 10 8H14C15.105 8 16 8.895 16 10V15H14V20Z" stroke="#CBD5E0" stroke-miterlimit="10" stroke-linecap="square"/>
                                <Path d="M12 6C10.895 6 10 5.105 10 4C10 2.895 10.895 2 12 2C13.105 2 14 2.895 14 4C14 5.105 13.105 6 12 6Z" stroke="#CBD5E0" stroke-miterlimit="10" stroke-linecap="square"/>
                            </Svg>
                        
                            :

                            name === 'inventory' ?
                                <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M22 1H2V23H22V1Z" stroke="#CBD5E0" stroke-miterlimit="10" stroke-linecap="square"/>
                                    <Path d="M12 1V23" stroke="#CBD5E0" stroke-miterlimit="10" stroke-linecap="square"/>
                                    <Path d="M12 15H2" stroke="#CBD5E0" stroke-miterlimit="10" stroke-linecap="square"/>
                                    <Path d="M6 19H8" stroke="#CBD5E0" stroke-miterlimit="10" stroke-linecap="square"/>
                                    <Path d="M17 5V8" stroke="#CBD5E0" stroke-miterlimit="10" stroke-linecap="square"/>
                                </Svg>
                            
                                :

                                name === 'delivery' ?
                                    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path d="M20 20V23H16V20" stroke="#CBD5E0" stroke-miterlimit="10" stroke-linecap="square"/>
                                        <Path d="M8 20V23H4V20" stroke="#CBD5E0" stroke-miterlimit="10" stroke-linecap="square"/>
                                        <Path d="M20 12V1H4V12L2 14V20H22V14L20 12Z" stroke="#CBD5E0" stroke-miterlimit="10" stroke-linecap="square"/>
                                        <Path d="M7.5 11.5V8.5H16.5V11.5H7.5Z" fill="#CBD5E0" stroke="#CBD5E0"/>
                                        <Path d="M1 8V10" stroke="#CBD5E0" stroke-miterlimit="10" stroke-linecap="square"/>
                                        <Path d="M23 8V10" stroke="#CBD5E0" stroke-miterlimit="10" stroke-linecap="square"/>
                                        <Path d="M6.5 16C6.5 16.2761 6.27614 16.5 6 16.5C5.72386 16.5 5.5 16.2761 5.5 16C5.5 15.7239 5.72386 15.5 6 15.5C6.27614 15.5 6.5 15.7239 6.5 16Z" fill="#A0AEC0" stroke="#CBD5E0"/>
                                        <Path d="M18.5 16C18.5 16.2761 18.2761 16.5 18 16.5C17.7239 16.5 17.5 16.2761 17.5 16C17.5 15.7239 17.7239 15.5 18 15.5C18.2761 15.5 18.5 15.7239 18.5 16Z" fill="#A0AEC0" stroke="#CBD5E0"/>
                                        <Path d="M4 5H20" stroke="#CBD5E0" stroke-miterlimit="10"/>
                                    </Svg>

                                    : 

                                    name === 'equipments'?
                                        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <Path d="M7.8152 16V23H19.8152V17" stroke="#CBD5E0" stroke-miterlimit="10" stroke-linecap="square"/>
                                            <Path d="M19.8152 17C21.4721 17 22.8152 15.6569 22.8152 14C22.8152 12.3431 21.4721 11 19.8152 11C18.1583 11 16.8152 12.3431 16.8152 14C16.8152 15.6569 18.1583 17 19.8152 17Z" stroke="#CBD5E0" stroke-miterlimit="10" stroke-linecap="square"/>
                                            <Path d="M10.8152 2H13.6152C14.2152 2 14.7152 2.5 14.6152 3.1L13.0152 14.2C12.9152 15.2 12.0152 15.9 11.0152 15.9H4.51521C3.51521 15.9 2.71521 15.2 2.51521 14.2L1.01521 3.1C0.915206 2.5 1.31521 2 2.01521 2H4.81521" stroke="#CBD5E0" stroke-miterlimit="10" stroke-linecap="square"/>
                                            <Path d="M4.8152 1V3" stroke="#CBD5E0" stroke-miterlimit="10" stroke-linecap="square"/>
                                            <Path d="M10.8152 1V3" stroke="#CBD5E0" stroke-miterlimit="10" stroke-linecap="square"/>
                                        </Svg>
                                    
                                        :

                                        name === 'alerts' ?
                                            <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <Path d="M19.6364 11V8C19.6364 6.14348 18.8318 4.36301 17.3997 3.05025C15.9676 1.7375 14.0253 1 12 1C9.97471 1 8.03237 1.7375 6.60027 3.05025C5.16818 4.36301 4.36364 6.14348 4.36364 8V11C4.36364 14.3 1.09091 15.1 1.09091 17C1.09091 18.7 5.34545 20 12 20C18.6545 20 22.9091 18.7 22.9091 17C22.9091 15.1 19.6364 14.3 19.6364 11Z" stroke="#CBD5E0" stroke-miterlimit="10" stroke-linecap="square"/>
                                                <Path d="M9.74862 22.4498C10.468 22.4831 11.2178 22.5 12 22.5C12.7822 22.5 13.532 22.4831 14.2514 22.4498C14.0867 22.6583 13.8857 22.845 13.653 23.0017C13.1778 23.3216 12.5987 23.497 12 23.497C11.4013 23.497 10.8222 23.3216 10.347 23.0017C10.1143 22.845 9.91327 22.6583 9.74862 22.4498Z" stroke="#CBD5E0"/>
                                            </Svg>

                                            :
                                            null
                                        
            )
        }
        return (
            <View style={styles.container}>      
                {this.props.tabSelectedBool === true ? 
                    this.props.tabSelected.tabSelected === this.props.tabName ? 
                        <View>
                            <Svg width={12} height={12} viewBox="0 0 12 12" style={{alignSelf:"flex-end"}}>
                                <Path
                                    fill-rule="evenodd" 
                                    clip-rule="evenodd" 
                                    d="M12 12V0C12 6.62742 6.62742 12 0 12H12Z" 
                                    fill="white"
                                />
                            </Svg>
                            <TouchableOpacity style={[styles.navTag,styles.selectedNavTag]} onPress={e => this.props.onPressTab(e,this.props.tabName)}>
                                {icon (this.props.tabName)}
                                <Text style={[styles.navText,styles.selectedNavText]}>{this.props.tabName.toUpperCase()}</Text>
                            </TouchableOpacity>  
                            <Svg width="12" height="12" viewBox="0 0 12 12" style={{alignSelf:"flex-end"}}>
                                <Path 
                                    fill-rule="evenodd" 
                                    clip-rule="evenodd" 
                                    d="M12 0H0C6.62742 0 12 5.37258 12 12V0Z" 
                                    fill="white"/>
                            </Svg>
                        </View>

                        :
                    
                        <TouchableOpacity style={styles.navTag} onPress={e => this.props.onPressTab(e,this.props.tabName)}>
                            {icon (this.props.tabName)}
                            <Text style={styles.navText}>{this.props.tabName.toUpperCase()}</Text>
                        </TouchableOpacity>
                    :

                    <TouchableOpacity style={styles.navTag} onPress={e => this.props.onPressTab(e,this.props.tabName)}>
                        {icon (this.props.tabName)}
                        <Text style={styles.navText}>{this.props.tabName.toUpperCase()}</Text>
                    </TouchableOpacity>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'column',
        width:'100%',
        marginTop:10,
        marginLeft:8,
    },
    navTag:{
        flexDirection:'column',
        alignItems:'center',
        width:'100%',
        paddingBottom:15,
        paddingTop:10,
    },
    selectedNavTag:{
        backgroundColor:'white',
        borderBottomLeftRadius:10,
        borderTopLeftRadius:10,
    },
    navIcon:{
        height: 20,
        width: 20,
        borderColor:'white',
        borderWidth:1,
        borderRadius:20/2,
    },
    selectedNavIcon:{
        borderColor:'#3182CE',
    },
    navText:{
        fontSize:12,
        marginTop:3,
        color:'#fff',
    },
    selectedNavText:{
       color:'#3182CE',
    },
})