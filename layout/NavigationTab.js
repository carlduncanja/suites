import React, { Component } from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Svg,{Path, Rect} from 'react-native-svg';


export default class NavigationTab extends Component {
    render() {
        const icon = (name, strokeColor) => {
            return(
                name === 'schedule'?
                    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M15 20L17 22L22 17" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                        <Path d="M10 22H1V4H23V12" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                        <Path d="M7 1V4" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                        <Path d="M17 1V4" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                        <Path d="M1 8H23" stroke={strokeColor} stroke-miterlimit="10"/>
                    </Svg>
                
                    :
                    
                    name === 'case files' ?
                        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path d="M1 9H23" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                            <Path d="M21 22H3C2.46957 22 1.96086 21.7893 1.58579 21.4142C1.21071 21.0391 1 20.5304 1 20V2H9L11 5H23V20C23 20.5304 22.7893 21.0391 22.4142 21.4142C22.0391 21.7893 21.5304 22 21 22Z" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                        </Svg>
                    
                        :
                        name === 'patients' ?
                            <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <Path d="M18.999 17.8571C20.851 18.4021 22 19.1611 22 20.0001C22 21.6571 17.523 23.0001 12 23.0001C6.477 23.0001 2 21.6571 2 20.0001C2 19.1611 3.149 18.4021 5 17.8581" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                                <Path d="M14 20H10V15H8V10C8 8.895 8.895 8 10 8H14C15.105 8 16 8.895 16 10V15H14V20Z" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                                <Path d="M12 6C10.895 6 10 5.105 10 4C10 2.895 10.895 2 12 2C13.105 2 14 2.895 14 4C14 5.105 13.105 6 12 6Z" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                            </Svg>
                        
                            :

                            name === 'theatres' ?

                                <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Rect x="4" y="21.5" width="16" height="2" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square" stroke-linejoin="round"/>
                                    <Rect x="10" y="17" width="4" height="4.5" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square" stroke-linejoin="round"/>
                                    <Path d="M2 17V13H22V17H2Z" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square" stroke-linejoin="round"/>
                                    <Path d="M8 5.5C8 4.39543 8.89543 3.5 10 3.5H14C15.1046 3.5 16 4.39543 16 5.5V6.5H8V5.5Z" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                                    <Path d="M12 3V1" stroke={strokeColor} stroke-linecap="round" stroke-linejoin="round"/>
                                </Svg>

                                :
                                name === 'inventory' ?
                                    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path d="M22 1H2V23H22V1Z" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                                        <Path d="M12 1V23" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                                        <Path d="M12 15H2" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                                        <Path d="M6 19H8" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                                        <Path d="M17 5V8" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                                    </Svg>
                                
                                    :

                                    name === 'delivery' ?
                                        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <Path d="M20 20V23H16V20" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                                            <Path d="M8 20V23H4V20" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                                            <Path d="M20 12V1H4V12L2 14V20H22V14L20 12Z" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                                            <Path d="M7.5 11.5V8.5H16.5V11.5H7.5Z" fill={strokeColor} stroke={strokeColor}/>
                                            <Path d="M1 8V10" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                                            <Path d="M23 8V10" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                                            <Path d="M6.5 16C6.5 16.2761 6.27614 16.5 6 16.5C5.72386 16.5 5.5 16.2761 5.5 16C5.5 15.7239 5.72386 15.5 6 15.5C6.27614 15.5 6.5 15.7239 6.5 16Z" fill="#A0AEC0" stroke={strokeColor}/>
                                            <Path d="M18.5 16C18.5 16.2761 18.2761 16.5 18 16.5C17.7239 16.5 17.5 16.2761 17.5 16C17.5 15.7239 17.7239 15.5 18 15.5C18.2761 15.5 18.5 15.7239 18.5 16Z" fill="#A0AEC0" stroke={strokeColor}/>
                                            <Path d="M4 5H20" stroke={strokeColor} stroke-miterlimit="10"/>
                                        </Svg>

                                        : 

                                        name === 'equipment'?
                                            <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <Path d="M7.8152 16V23H19.8152V17" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                                                <Path d="M19.8152 17C21.4721 17 22.8152 15.6569 22.8152 14C22.8152 12.3431 21.4721 11 19.8152 11C18.1583 11 16.8152 12.3431 16.8152 14C16.8152 15.6569 18.1583 17 19.8152 17Z" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                                                <Path d="M10.8152 2H13.6152C14.2152 2 14.7152 2.5 14.6152 3.1L13.0152 14.2C12.9152 15.2 12.0152 15.9 11.0152 15.9H4.51521C3.51521 15.9 2.71521 15.2 2.51521 14.2L1.01521 3.1C0.915206 2.5 1.31521 2 2.01521 2H4.81521" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                                                <Path d="M4.8152 1V3" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                                                <Path d="M10.8152 1V3" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                                            </Svg>
                                        
                                            :

                                            name === 'alerts' ?
                                                <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <Path d="M19.6364 11V8C19.6364 6.14348 18.8318 4.36301 17.3997 3.05025C15.9676 1.7375 14.0253 1 12 1C9.97471 1 8.03237 1.7375 6.60027 3.05025C5.16818 4.36301 4.36364 6.14348 4.36364 8V11C4.36364 14.3 1.09091 15.1 1.09091 17C1.09091 18.7 5.34545 20 12 20C18.6545 20 22.9091 18.7 22.9091 17C22.9091 15.1 19.6364 14.3 19.6364 11Z" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                                                    <Path d="M9.74862 22.4498C10.468 22.4831 11.2178 22.5 12 22.5C12.7822 22.5 13.532 22.4831 14.2514 22.4498C14.0867 22.6583 13.8857 22.845 13.653 23.0017C13.1778 23.3216 12.5987 23.497 12 23.497C11.4013 23.497 10.8222 23.3216 10.347 23.0017C10.1143 22.845 9.91327 22.6583 9.74862 22.4498Z" stroke={strokeColor}/>
                                                </Svg>

                                                :
                                                
                                                name === 'more' ?
                                                    <Svg width="22" height="4" viewBox="0 0 22 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <Path d="M11 4C12.1046 4 13 3.10457 13 2C13 0.89543 12.1046 0 11 0C9.89543 0 9 0.89543 9 2C9 3.10457 9.89543 4 11 4Z" fill={strokeColor}/>
                                                        <Path d="M2 4C3.10457 4 4 3.10457 4 2C4 0.89543 3.10457 0 2 0C0.89543 0 0 0.89543 0 2C0 3.10457 0.89543 4 2 4Z" fill={strokeColor}/>
                                                        <Path d="M20 4C21.1046 4 22 3.10457 22 2C22 0.89543 21.1046 0 20 0C18.8954 0 18 0.89543 18 2C18 3.10457 18.8954 4 20 4Z" fill={strokeColor}/>
                                                    </Svg>
                                                
                                                    :
                                                    null
                                        
            )
        }

        const svgRightCorner = (fillColor) => {
            return (
                <Svg width={12} height={12} viewBox="0 0 12 12" style={{alignSelf:"flex-end"}}>
                            <Path
                                fill-rule="evenodd" 
                                clip-rule="evenodd" 
                                d="M12 12V0C12 6.62742 6.62742 12 0 12H12Z" 
                                fill= {fillColor}
                            />
                        </Svg>
            )
        }

        const svgLeftCorner = (fillColor) => {
            return(
                <Svg width="12" height="12" viewBox="0 0 12 12" style={{alignSelf:"flex-end"}}>
                    <Path 
                        fill-rule="evenodd" 
                        clip-rule="evenodd" 
                        d="M12 0H0C6.62742 0 12 5.37258 12 12V0Z" 
                        fill={fillColor}
                    />
                </Svg>
            )
        }

        return (
            <View style={styles.container}>      
                {this.props.tabSelectedBool === true && this.props.tabSelected.tabSelected === this.props.tabName ?  
                    <View>
                        {
                            this.props.transparent === false ?
                                <View>
                                    {svgRightCorner("white")}
                                    <TouchableOpacity style={[styles.navTag,styles.selectedNavTag]} onPress={e => this.props.onPressTab(e,this.props.tabName)}>
                                        {icon (this.props.tabName, "#3182CE")}
                                        <Text style={[styles.navText,styles.selectedNavText]}>{this.props.tabName.toUpperCase()}</Text>
                                    </TouchableOpacity> 
                                    {svgLeftCorner("white")}
                                </View>
                                
                                :
                                <View>
                                    {svgRightCorner("#ababab")}
                                    <View>
                                        <TouchableOpacity style={[styles.navTag, styles.selectedNavTag]} onPress={e => this.props.onPressTab(e,this.props.tabName)}>
                                            {icon (this.props.tabName,"#718096")}
                                            <Text style={[styles.navText, styles.selectedNavText, {color:'#718096'}]}>{this.props.tabName.toUpperCase()}</Text>
                                        </TouchableOpacity>
                                        <View style={styles.overlay}/>
                                    </View>
                                    {svgLeftCorner("#ababab")}
                                </View>
               
                        }
                        
                    </View>
                    
                    :

                    this.props.transparent === true ?

                        <TouchableOpacity style={styles.navTag} onPress={e => this.props.onPressTab(e,this.props.tabName)}>
                            {icon (this.props.tabName, "#718096")}
                            <Text style={[styles.navText, {color:'#718096'}]}>{this.props.tabName.toUpperCase()}</Text>
                        </TouchableOpacity>

                        :

                        <TouchableOpacity style={styles.navTag} onPress={e => this.props.onPressTab(e,this.props.tabName)}>
                            {icon (this.props.tabName, "#CBD5E0")}
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
    },
    navTag:{
        flexDirection:'column',
        alignItems:'center',
        width:'100%',
        paddingBottom:20,
        paddingTop:14,
        paddingRight:8,
    },
    selectedNavTag:{
        paddingRight:0,
        backgroundColor:'white',
        borderBottomLeftRadius:10,
        borderTopLeftRadius:10,
    },
    navText:{
        fontSize:10,
        marginTop:3,
        color:'#fff',
    },
    selectedNavText:{
       color:'#3182CE',
    },
    overlay:{
        paddingRight:0, 
        flex:1, 
        borderBottomLeftRadius:10,
        borderTopLeftRadius:10,
        width:'100%', 
        height:'100%',
        position:"absolute", 
        backgroundColor:'rgba(0,0,0,0.33)'
    }
})