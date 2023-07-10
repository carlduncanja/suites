import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {ScrollView, StyleSheet, Text, View, TouchableOpacity, Alert} from "react-native";
import SvgIcon from "../../../assets/SvgIcon";
import NavigationTab from "./SideBarTabComponent";
import MultipleShadowsContainer from '../common/MultipleShadowContainer';
import jwtDecode from 'jwt-decode';
import {connect} from 'react-redux'
import QuickMenu from "../../../assets/svg/QuickMenu";
import {useModal} from "react-native-modalfy";
import { getUserCall } from '../../api/network';

const shadows = [
    {
        shadowColor: 'black',
        shadowOffset: { width: -2, height: 0 },
        shadowOpacity: 0.06,
        shadowRadius: 4
    },
    {
        shadowColor: 'black',
        shadowOffset: { width: -4, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: -6
    },
];

function SideBarComponent({routes, selectedIndex, screenDimensions, onTabPressed, onLogout, auth = {}}) { 
    const modal = useModal();
    const userID = auth.user.user_id

    const [userPermissions, setUserPermissions] = useState({});

    const fetchUser = id => {
        getUserCall(id)
            .then(data => {
                setUserPermissions(data.role?.permissions || {});
            })
            .catch(error => {
                console.error('fetch.user.failed', error);
            })
            .finally();
    };

    useEffect(() => {
        fetchUser(userID);
    }, [userID]);

    const createCase = userPermissions?.cases?.create
    const showLogoutDialog = () => {
        // Works on both Android and iOS
        Alert.alert(
            'Logout',
            'Would you like to log out?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {text: 'OK', onPress: onLogout},
            ],
            {cancelable: false}
        );
    }

    let authInfo = {};
    try {
        authInfo = auth.userToken && jwtDecode(auth.userToken);
    } catch(e) {
        console.log("Failed to parse auth token", e);
    }


    const showQuickMenuModal = () => {
        modal.openModal('QuickActionsModal')
    }
    
    // renders the side bar menu
    return (
        <View style={{
            flexDirection: 'row',
            width: 88,
            shadowColor: "#000",
            shadowOffset: {
                width: 3.5,
                height: 0,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            zIndex: 5,
            elevation: 5,
        }}>
            <View style={styles.tabContainer}>

                {/*Logo*/}
                <View style={[styles.logo,
                    {paddingBottom: screenDimensions.width > screenDimensions.height ? 10 : 25}
                ]}>
                    <SvgIcon iconName="logo"/>
                </View>

                <ScrollView
                    stickyHeaderIndices={[selectedIndex + 1]}
                    scrollEventThrottle={2}
                    scrollEnabled={true}
                    showsVerticalScrollIndicator={false}
                    style={[styles.container]}
                    contentContainerStyle={{alignItems: 'center', justifyContent: 'flex-start', width: '100%'}}
                >

                    {/*QUICK MENU*/}
                    {createCase && 
                    <View style={{width: '100%'}} key={"QUICK_MENU"}>
                        <NavigationTab
                            icon={QuickMenu}
                            tabName={"Quick Menu"}
                            isTabSelected={false}
                            onTabPress={showQuickMenuModal}
                        />
                    </View>
                    }
                    
                    {
                        // Spread the navigation routes.
                        routes.map((route, tabIndex) => {
                            const {name, params} = route;
                            const {icon, tabName} = params || {};
 
                            return (
                                <View style={{width: '100%'}} key={tabIndex}>

                                    <NavigationTab
                                        icon={icon}
                                        tabName={tabName}
                                        isTabSelected={tabIndex === selectedIndex}
                                        onTabPress={(e) => onTabPressed(e, name)}
                                        hasDivider={
                                            tabName === 'Theatres' || tabName === 'Procedures' || tabName === 'Invoices' ? true : false
                                        }
                                    />

                                </View>
                            )
                        })
                    }
                </ScrollView>

                {
                    authInfo &&
                    <TouchableOpacity
                        style={{height: 45, width: '100%'}}
                        onPress={showLogoutDialog}
                    >
                        <View style={{flex: 1}}>
                            <View style={styles.loginBadge}>
                                <Text style={
                                    {
                                        ...styles.textStyle,
                                        fontSize: 7
                                    }}>
                                    LOGGED IN AS
                                </Text>
                            </View>

                            <MultipleShadowsContainer shadows={shadows}>
                                <View style={styles.userNameBadge}>
                                    <Text style={{
                                        ...styles.textStyle,
                                        fontSize: 10,
                                    }}>
                                        {
                                            `${authInfo.first_name.toString()[0]}. ${authInfo.last_name}`
                                        }
                                    </Text>

                                </View>
                            </MultipleShadowsContainer>
                            
                        </View>
                    </TouchableOpacity>
                }

            </View>

            <View style={styles.sideBarEdge}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: 80,
        flexDirection: 'column',
    },
    tabContainer: {
        height: '100%',
        width: 80,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#104587',
        //flex:1,
    },
    logo: {
        paddingTop: 10
    },
    sideBarEdge: {
        width: 8,
        backgroundColor: "white"
    },
    loginBadge: {
        height: 20,
        width: '100%',
        backgroundColor: "#205EAC",
        justifyContent: 'center',
        alignItems: 'center',
    },
    textStyle: {
        fontStyle: 'normal',
        fontWeight: '500',
        textAlign: 'center',
        /* default/shade/white */
        color: '#FFFFFF',
    },
    userNameBadge: {
        // flex: 1,
        height: 25,
        // height: '100%',
        backgroundColor: '#2168C3',
        justifyContent: 'center',
        alignItems: 'center',
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: -3,
        // },
        // shadowOpacity: 0.23,
        // shadowRadius: 5,
        elevation: 5,
    }
});

SideBarComponent.propTypes = {};
SideBarComponent.defaultProps = {};


const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}


export default connect(mapStateToProps, null)(SideBarComponent);
