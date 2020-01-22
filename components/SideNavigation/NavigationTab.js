import React, { Component } from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import ActionContainer from '../common/ActionContainer';
import Svg,{Path, Rect} from 'react-native-svg';
import SvgIcon from '../../assets/SvgIcon';


export default class NavigationTab extends Component {
    // componentDidMount(){
    //     setTimeout(() =>{
    //         this.navTagRef.measure((x,y,w,h,px,py)=>{
    //             console.log("Event: ",this.props.section, this.props.tabName, y)
    //         })
    //     })
    // }

    render() {
        const icon = (name, strokeColor) => {
            return(
                name === 'quick menu' ?
                    <SvgIcon iconName="quickMenu" strokeColor={strokeColor}/>
                :
                name === 'schedule'?
                   <SvgIcon iconName="schedule" strokeColor={strokeColor}/>
                :
                name === 'case files' ?
                    <SvgIcon iconName="caseFiles" strokeColor={strokeColor}/>
                :
                name === 'theatres' ?
                    <SvgIcon iconName="theatres" strokeColor={strokeColor}/>
                :
                name === 'inventory' ?
                    <SvgIcon iconName="inventory" strokeColor={strokeColor}/>
                :
                name === 'suppliers' ?
                    <SvgIcon iconName="delivery" strokeColor={strokeColor}/>
                :
                name === 'equipment'?
                    <SvgIcon iconName="equipment" strokeColor={strokeColor}/>
                :
                name === 'alerts' ?
                    <SvgIcon iconName="notifications" strokeColor = {strokeColor}/>
                :
                name === 'orders' ?
                    <SvgIcon iconName="orders" strokeColor = {strokeColor}/>
                :
                name === 'invoices' ?
                    <SvgIcon iconName="invoices" strokeColor = {strokeColor}/>
                :
                name === 'storage' ?
                    <SvgIcon iconName="storage" strokeColor = {strokeColor}/>
                :
                name === 'physicians' ?
                    <SvgIcon iconName="staff" strokeColor = {strokeColor}/>
                :
                name === 'procedures' ?
                    <SvgIcon iconName="procedures" strokeColor={strokeColor}/>
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
            <View 
                ref = {ref => this.navTagRef = ref}
                style={styles.container} 
                //onLayout={event => console.log("Y: ", this.props.tabName, event.nativeEvent.layout.y)}
            >
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
                                    {svgRightCorner("#b3b3b3")}
                                    <View>
                                        <TouchableOpacity style={[styles.navTag, styles.selectedNavTag,{backgroundColor:"#b3b3b3", paddingBottom:12}]} onPress={e => this.props.onPressTab(e,this.props.tabName)}>
                                            {icon (this.props.tabName,"#3182CE")}
                                        </TouchableOpacity>
                                    </View>
                                    {svgLeftCorner("#b3b3b3")}
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
        paddingBottom:17,
        paddingTop:18, 
    },
    selectedNavTag:{
        paddingRight:0,
        backgroundColor:'white',
        paddingBottom:4,
        paddingTop:12
    },
    navText:{
        fontSize:9,
        paddingTop:10,
        color:'#fff',
    },
    selectedNavText:{
       color:'#FFFFFF',
       paddingTop:0
    },
})
